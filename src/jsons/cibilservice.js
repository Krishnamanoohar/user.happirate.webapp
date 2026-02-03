const idspayResp = require("./arun.json");

const phoneTypeMap = {
  "01": "Mobile",
  "02": "Home",
  "03": "Office",
  "07": "Personal",
};

const inquiryPurposeMap = {
  "01": "Credit Card",
  "02": "Auto Loan",
  "03": "Housing Loan",
  "04": "Property Loan",
  "05": "Personal Loan",
  "06": "Consumer Loan",
  "07": "Business Loan",
  "08": "Gold Loan",
  "09": "Education Loan",
  10: "Other / General Loan Enquiry",
  52: "Agriculture Loan",
};

const accountTypeMap = {
  "02": "Housing Loan (Secured)",
  "03": "Housing / Home Loan",
  "04": "Business Loan",
  "05": "Personal Loan",
  "06": "Consumer Loan",
  "07": "Gold Loan",
  "08": "Education Loan",
  "09": "Credit Card",
  10: "Credit Card / Unsecured Credit",
  36: "Consumer Loan",
  69: "BNPL / Pay Later",
};

const occupationCodeMap = {
  "01": "Salaried",
  "02": "Self-Employed Professional",
  "03": "Self-Employed",
  "04": "Others",
};

function calculateExistingEmi(tradeLines = []) {
  return tradeLines.reduce((sum, t) => {
    const emiAmount = Number(t.emiAmount);
    const actualPayment = Number(t.actualPaymentAmount);

    let monthlyCommitment = 0;

    if (emiAmount > 0) {
      monthlyCommitment = emiAmount;
    } else if (actualPayment > 0) {
      monthlyCommitment = actualPayment;
    }

    return sum + monthlyCommitment;
  }, 0);
}

function calculateEmiBounces(tradeLines = []) {
  let bounces = 0;

  tradeLines.forEach((t) => {
    const history = t.paymentHistoryStatus || "";
    history.split(",").forEach((s) => {
      if (s && s !== "0" && s !== "STD") bounces++;
    });
  });

  return bounces;
}

function calculateCreditCardUtilization(tradeLines = []) {
  let totalBalance = 0;
  let totalLimit = 0;

  tradeLines.forEach((t) => {
    const balance = Number(t.currentBalance);
    const limit = Number(t.creditLimit);
    if (limit > 0) {
      totalBalance += balance;
      totalLimit += limit;
    }
  });

  if (totalLimit === 0) return null;
  return Math.round((totalBalance / totalLimit) * 100);
}

const parseInquiryDate = (dateStr) => {
  return new Date(dateStr.replace("+05:30", "T00:00:00+05:30"));
};

const countRecentInquiries = (data) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  return data.filter(
    (item) => parseInquiryDate(item.Inquiry.inquiryDate) >= sixMonthsAgo,
  ).length;
};

async function resolveCibil(userDetails) {
  try {
    // const cibilResp = await cibil(userDetails);
    // const cibilData = cibilResp?.data || cibilResp;
    // const cibilData = normalizeCibilReport(idspayResp)

    const cibilResp = idspayResp;
    const raw =
      cibilResp?.data?.GetCustomerAssetsResponse?.GetCustomerAssetsSuccess
        ?.Asset?.TrueLinkCreditReport;

    const scoreFactors =
      raw?.Borrower?.CreditScore?.CreditScoreFactor?.map((f) => ({
        code:
          f?.symbol ||
          f?.Code ||
          f?.ReasonCode ||
          f?.Factor?.Code ||
          f?.ScoreFactor?.Code ||
          null,
        description:
          f?.description ||
          f?.Description ||
          f?.ReasonDescription ||
          f?.Factor?.Description ||
          f?.ScoreFactor?.Description ||
          null,
      })) || [];

    const tradelines = (raw.TradeLinePartition || []).map((t) => {
      const accountTypeCode = t.Tradeline?.GrantedTrade?.AccountType?.symbol;

      return {
        accountTypeCode: t.Tradeline?.GrantedTrade?.AccountType?.symbol,
        accountTypeName: accountTypeMap[accountTypeCode] || "Other",
        bank: t.Tradeline?.creditorName || "Unknown Bank",
        currentBalance: t.Tradeline?.currentBalance,
        emiAmount: t.Tradeline?.GrantedTrade?.EMIAmount,
        amountOverdue: Number(t.Tradeline?.GrantedTrade?.amountOverdue) || 0,
        actualPaymentAmount: t.Tradeline?.GrantedTrade?.actualPaymentAmount,
        paymentHistoryStatus:
          t.Tradeline?.GrantedTrade?.PayStatusHistory?.status,
        creditLimit: t.Tradeline?.GrantedTrade?.CreditLimit,
        settlementAmount: t.Tradeline?.settlementAmount,
        loanAmount:
          Number(
            t.Tradeline?.GrantedTrade?.HighCreditAmount ||
              t.Tradeline?.GrantedTrade?.SanctionedAmount,
          ) || 0,
        collateralType:
          t.Tradeline?.GrantedTrade?.CollateralType?.description ||
          (["02", "03", "36"].includes(accountTypeCode)
            ? "Secured"
            : "Unsecured"),
        repaymentTenure:
          Number(t.Tradeline?.GrantedTrade?.RepaymentTenure) ||
          Number(t.Tradeline?.GrantedTrade?.LoanDuration) ||
          null,
        settlementAmount: Number(t.Tradeline?.settlementAmount) || 0,
      };
    });

    const inquiries = raw.InquiryPartition?.Inquiry || [];

    const borrower = raw.Borrower;

    const inquiryArray = (raw.InquiryPartition || [])
      .map((i) => i.Inquiry)
      .filter(Boolean);

    const occupationSymbol = borrower?.Employer?.OccupationCode?.symbol;

    console.log(".".repeat(20));
    console.log({
      ckycId: borrower.IdentifierPartition?.Identifier?.find(
        (id) => id.ID?.IdentifierName === "CkycId",
      )?.ID?.Id,

      phoneNumbers: [
        ...new Set(borrower.BorrowerTelephone?.map((item) => item.PhoneNumber)),
      ].filter(Boolean),
      inquiryHistory: inquiryArray.map((inq) => ({
        date: inq.inquiryDate?.split(/[+T]/)[0],
        bankName: inq.subscriberName || "Unknown Lender",
        amount: Number(inq.amount),
        purpose: inquiryPurposeMap[inq.inquiryType] || "Unknown Purpose",
      })),
      totalCurrentBalance: tradelines.reduce(
        (sum, t) => sum + (Number(t.currentBalance) || 0),
        0,
      ),
      tradelines,
      scoreFactors,
    });
    console.log(".".repeat(20));

    const cibilData = {
      fullName: borrower.BorrowerName?.Name?.Forename,
      emails:
        borrower.EmailAddress?.map((item) => ({
          email: item.Email,
          type: "Primary",
          // id: item.serialNumber
        })) || [],
      occupationCode: occupationSymbol,
      occupationName: occupationCodeMap[occupationSymbol] || "Others",
      panCard: borrower.IdentifierPartition?.Identifier?.find(
        (id) => id.ID?.IdentifierName === "TaxId",
      )?.ID?.Id,
      dateOfBirth: borrower.Birth?.date?.split(/[+T]/)[0],
      employmentStatus: borrower.Employer?.OccupationCode?.description,
      cibilScore: borrower.CreditScore?.riskScore,
      addresses:
        borrower.BorrowerAddress?.map((item) => {
          const types = {
            "01": "Permanent",
            "02": "Residence",
            "03": "Office",
            "04": "Not Categorized",
          };

          const stateMap = {
            36: "Telangana",
            28: "Andhra Pradesh",
            19: "West Bengal",
            27: "Maharashtra",
          };

          return {
            streetAddress: item.CreditAddress?.StreetAddress,
            pincode: item.CreditAddress?.PostalCode,
            type: types[item.Dwelling?.symbol] || "Other",
            state:
              stateMap[item.CreditAddress?.Region] ||
              `Code ${item.CreditAddress?.Region}`,
          };
        }) || [],
      city: null,
      last6MonthsEnquiryCount: countRecentInquiries(raw.InquiryPartition),
      creaditCardUtilization: calculateCreditCardUtilization(tradelines),
      existingEmi: calculateExistingEmi(tradelines),
      //  recentEnquiries: inquiries.length ?? 0,
      settlements: tradelines.filter((t) => Number(t.settlementAmount) > 0)
        .length,
      emiBounces: calculateEmiBounces(tradelines),
      // -----------!------------------
      ckycId: borrower.IdentifierPartition?.Identifier?.find(
        (id) => id.ID?.IdentifierName === "CkycId",
      )?.ID?.Id,

      phoneNumbers: [
        ...new Set(borrower.BorrowerTelephone?.map((item) => item.PhoneNumber)),
      ].filter(Boolean),
      inquiryHistory: inquiryArray.map((inq) => ({
        date: inq.inquiryDate?.split(/[+T]/)[0],
        bankName: inq.subscriberName || "Unknown Lender",
        amount: Number(inq.amount),
        purpose: inquiryPurposeMap[inq.inquiryType] || "Unknown Purpose",
      })),
      totalCurrentBalance: tradelines.reduce(
        (sum, t) => sum + (Number(t.currentBalance) || 0),
        0,
      ),
      tradelines,
      scoreFactors,
    };

    if (!cibilData) {
      throw new Error("No data received from Credit Bureau");
    }

    console.log("CIBIL Data Retrieved successfully:", cibilData);
    return cibilData;
  } catch (error) {
    console.error("Error in resolveCibil service:", error.message);
    throw new Error(error.message || "Failed to fetch CIBIL report");
  }
}

// resolveCibil();
