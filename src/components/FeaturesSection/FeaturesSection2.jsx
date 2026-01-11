import React from "react";
import ProfileCard from "../../ReactBitsComps/ProfileCard/ProfileCard";
import { useNavigate } from "react-router-dom";
const FeaturesSection2 = () => {
  const loanCards = [
    {
      title: "Personal Loan",
      description:
        "Get instant access to funds for your goals — from travel to home upgrades — with simple steps, transparent rates, and zero hidden charges.",
      // imgSrc: "PersonalLoanOrg.jpg",
      // imgSrc: "businessLoan.jpg",
      iconSrc: "Personal loan.png",
    },
    {
      title: "Business Loan",
      description:
        "Fuel your business growth with quick, collateral-free funding and flexible repayment options — designed for entrepreneurs who dream big.",
      // imgSrc: "businessLoan.jpg",
      iconSrc: "Buisness loan.png",
    },
    {
      title: "Home Loan",
      description:
        "Drive home your dream car or bike with fast approvals, low EMIs, and complete transparency from start to finish.",
      // imgSrc: "autoLoan.jpeg",
      iconSrc: "Car loan.png",
    },
    {
      title: "Education Loan",
      description:
        "Invest in your future with easy, affordable education loans — covering tuition, living, and travel expenses with flexible repayment terms.",
      // imgSrc: "educationloan.jpg",
      iconSrc: "Education loan.png",
    },
  ];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/sign-in");
  };

  return (
    <div className="dark-background" id="solutions">
      <div className="container">
        <div className="section-title">
          <h2 className="text-2xl font-semibold text-center mb-0">Solutions</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 py-6 rounded-2xl">
          {loanCards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col border border-white rounded-2xl hover:scale-105 transition duration-200 cursor-pointer"
            >
              <div className="rounded-2xl relative max-h-[200px] h-full">
                <img
                  src={`assets/img/${card.imgSrc}`}
                  alt=""
                  className="rounded-t-2xl h-full"
                />
                <div className="h-full w-full bg-red-50 absolute top-0 left-0 opacity-50 rounded-t-2xl"></div>
              </div>
              <div className="flex flex-col justify-center items-center  p-4 pt-2 text-white h-full rounded-t-2xl">
                <div>
                  {
                    <div className="h-15 w-15 ml-6 relative top-[-50px] p-1 rounded-2xl bg-white">
                      <img
                        src={`assets/img/${card.iconSrc}`}
                        alt=""
                        className="rounded-2xl"
                      />
                    </div>
                  }
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <button
                  className="vibrant-shadow-btn"
                  onClick={() => handleClick()}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 py-12 bg-gradient-to-br from-[#0d1853] to-[#07217e] rounded-2xl">
          {loanCards.map((card, index) => (
            <div key={index} className="flex justify-center items-center">
              <div className="relative w-[240px] h-[240px] rounded-[28px] bg-[#e8ecff] shadow-[inset_8px_8px_16px_#cfd6ff,inset_-8px_-8px_16px_#ffffff] flex justify-center items-center">
                <div className="w-[160px] h-[160px] rounded-[22px] bg-[#f4f6ff] shadow-[6px_6px_14px_#cfd6ff,-6px_-6px_14px_#ffffff] flex flex-col justify-center items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#e0e5ff] flex justify-center items-center shadow-md">
                    <img
                      src={`assets/img/${card.iconSrc}`}
                      alt=""
                      className="w-6 h-6 object-contain"
                    />
                  </div>

                  <h3 className="text-[#4f5bff] text-sm font-medium tracking-wide">
                    {card.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default FeaturesSection2;
