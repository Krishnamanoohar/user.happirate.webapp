import React from "react";
import {
  Banknote,
  Calendar,
  PercentCircle,
  BadgeCheck,
  User,
} from "lucide-react";

const ApplicationPage = () => {
  const applicationSteps = [
    {
      title: "Application Submitted",
      status: "Completed",
      time: "June 20, 2025 • 10:12 AM",
      description:
        "We’ve received your application and it's now in our system.",
    },
    {
      title: "Initial Review",
      status: "Completed",
      time: "June 20, 2025 • 11:45 AM",
      description:
        "Your basic details are verified and sent for next-level processing.",
    },
    {
      title: "Document Verification",
      status: "In Progress",
      time: "June 21, 2025 • 09:00 AM",
      description:
        "Your documents are under verification by our operations team.",
    },
    {
      title: "Credit Assessment",
      status: "Pending",
      description:
        "We will assess your credit profile once document verification is done.",
    },
    {
      title: "Approval & Offer",
      status: "Pending",
      description:
        "If approved, your personalized offer will be available for review.",
    },
    {
      title: "Final Disbursement",
      status: "Pending",
      description: "The loan amount will be transferred to your bank account.",
    },
  ];

  return (
    <div className="pt-[110px] min-h-screen bg-gray-50 py-12 px-6 lg:px-20">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Loan Details (Styled as Cards) */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Loan Summary
          </h2>

          {/* Detail Card */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-2 flex items-center gap-4 shadow-sm">
            <svg
              className="text-yellow-500 w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                mb-0
                fillRule="evenodd"
                d="M18 13a1 1 0 011-1V5a1 1 0 00-1-1h-3.382a1 1 0 01-.894-.553L12.382 2H7.618l-.342.447A1 1 0 016.382 4H3a1 1 0 00-1 1v7a1 1 0 011 1h2v1a1 1 0 001 1h10a1 1 0 001-1v-1h2zm-5 2v-1H7v1h6z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="mb-0 text-sm text-yellow-700 font-medium">
                Current Status
              </p>
              <p className="mb-0 text-base font-semibold text-yellow-800">
                Document Verification
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center bg-gray-50 rounded-xl p-4 flex items-center gap-4 shadow-md">
            <User className="text-blue-600" size={24} />
            <div className="d-flex gap-3 align-items-center">
              <p className="mb-0 text-sm text-gray-500">Applicant</p>
              <p className="mb-0 text-base font-medium text-gray-900">
                Rajesh Kumar
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center bg-gray-50 rounded-xl p-4 flex items-center gap-4 shadow-md">
            <Banknote className="text-green-600" size={24} />
            <div className="d-flex gap-3 align-items-center">
              <p className="mb-0 text-sm text-gray-500">Loan Amount</p>
              <p className="mb-0 text-base font-medium text-gray-900">
                ₹8,00,000
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center bg-gray-50 rounded-xl p-4 flex items-center gap-4 shadow-md">
            <PercentCircle cmb-0 lassName="text-indigo-600" size={24} />
            <div className="d-flex gap-3 align-items-center">
              <p className="mb-0 text-sm text-gray-500">Interest Rate</p>
              <p className="mb-0 text-base font-medium text-gray-900">
                10.5% p.a.
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center bg-gray-50 rounded-xl p-4 flex items-center gap-4 shadow-md">
            <Calendar className="text-orange-500" size={24} />
            <div className="d-flex gap-3 align-items-center">
              <p className="mb-0 text-sm text-gray-500">Tenure</p>
              <p className="mb-0 text-base font-medium text-gray-900">
                5 Years
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center bg-gray-50 rounded-xl p-4 flex items-center gap-4 shadow-md">
            <BadgeCheck className="text-purple-600" size={24} />
            <div className="d-flex gap-3 align-items-center">
              <p className="mb-0 text-sm text-gray-500">Bank</p>
              <p className="mb-0 text-base font-medium text-gray-900">
                HDFC Bank
              </p>
            </div>
          </div>
        </div>

        {/* Right: Tracker */}
        <div className="h-full bg-white rounded-2xl shadow-lg p-6 max-h-[620px] overflow-y-auto custom-scrollbar">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Application Tracker
          </h2>
          <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {applicationSteps.map((step, index) => (
              <li key={index} className="mb-10 ms-6">
                <span
                  className={`absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900
                    ${
                      step.status === "Completed"
                        ? "bg-green-600"
                        : step.status === "In Progress"
                        ? "bg-yellow-400"
                        : "bg-gray-300"
                    }`}
                >
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path dmb-0="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11.414l3.707 3.707-1.414 1.414L9 9.414 7.707 10.707 6.293 9.293 9 6.586z" />
                  </svg>
                </span>
                <h3 className="text-lg font-semibold text-gray-900">
                  {step.title}
                  {step.status === "In Progress" && (
                    <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                      In Progress
                    </span>
                  )}
                  {step.status === "Completed" && (
                    <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      Completed
                    </span>
                  )}
                </h3>
                {step.time && (
                  <time className="block mb-2 text-sm text-gray-500">
                    {step.time}
                  </time>
                )}
                <p className="mb-0 text-sm text-gray-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
