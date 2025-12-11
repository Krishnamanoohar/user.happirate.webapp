import React, { useState } from 'react';
import { Card, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { CreditCard, FileText, UserCheck, DollarSign, Clock } from 'lucide-react';

// --- DUMMY ACCEPTED LOAN DATA (from previous form state) ---
const DUMMY_ACCEPTED_DATA = {
    borrowerName: "Mr. Aarav Sharma",
    loanType: "Personal Loan (IndusLand Bank)",
    sanctionedAmount: "₹ 10,00,000",
    tenure: "60 Months",
    apr: "10.50%",
    referenceID: "HPR/PSL/120925/4532",
};
// -----------------------------------------------------------

// Loan Processing Steps
const trackingSteps = [
    { label: "Document Verification", icon: <FileText size={24} /> },
    { label: "Credit & Eligibility Check", icon: <UserCheck size={24} /> },
    { label: "Final Sanction & Agreement", icon: <CreditCard size={24} /> },
    { label: "Disbursement", icon: <DollarSign size={24} /> },
];

export default function LoanTrackingDashboard() {
    // Current step index (0 to 3)
    const [activeStep, setActiveStep] = useState(1); // Set to 1 (Credit Check) as docs were just uploaded

    // Dynamic Status and Next Action based on the active step
    const stepDetails = [
        {
            title: "Document Verification (Completed)",
            status: "We have received your ITR, Payslips, and Photo.",
            action: "System check completed successfully.",
            variant: "success",
            isComplete: true,
        },
        {
            title: "Credit & Eligibility Check (In Progress)",
            status: "Your credit score (785) and DTI ratio are being reviewed against the final eligibility criteria of IndusLand Bank.",
            action: "No action required from you at this time. This usually takes 24-48 hours.",
            variant: "warning",
            isComplete: false,
        },
        {
            title: "Final Sanction & Agreement",
            status: "Awaiting final approval from the lending partner.",
            action: "Once approved, you will receive the final loan agreement via email for e-signing.",
            variant: "info",
            isComplete: false,
        },
        {
            title: "Disbursement",
            status: "The loan amount will be transferred to your designated bank account.",
            action: "Transfer initiated upon successful agreement signing and bank verification.",
            variant: "info",
            isComplete: false,
        },
    ];

    const currentStepDetail = stepDetails[activeStep];
    const progressPercentage = ((activeStep + 1) / trackingSteps.length) * 100;

    const getStatusStyle = (variant) => {
        switch (variant) {
            case 'success':
                return 'bg-green-100 text-green-700 border-green-400';
            case 'warning':
                return 'bg-yellow-100 text-yellow-700 border-yellow-400';
            case 'info':
            default:
                return 'bg-blue-100 text-blue-700 border-blue-400';
        }
    };

    return (
        <div className="container mx-auto p-4 mt-12 mb-12 max-w-6xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <Clock className="mr-3 text-blue-600" size={30} />
                Loan Application Tracker
            </h1>

            {/* --- Accepted Offer Summary --- */}
            <Card variant="outlined" className="p-6 mb-8 shadow-lg">
                <Typography variant="h6" component="h2" className="text-xl font-semibold text-blue-700 mb-4 border-b pb-2">
                    Accepted Loan Offer
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <p><strong>Applicant:</strong> {DUMMY_ACCEPTED_DATA.borrowerName}</p>
                    <p><strong>Reference ID:</strong> {DUMMY_ACCEPTED_DATA.referenceID}</p>
                    <p><strong>Loan Type:</strong> {DUMMY_ACCEPTED_DATA.loanType}</p>
                    <p><strong>Status:</strong> <span className="font-bold text-orange-600">Processing</span></p>
                    
                    <p className="md:col-span-2"><strong>Sanctioned Amount:</strong> <span className="text-2xl font-bold text-green-600">{DUMMY_ACCEPTED_DATA.sanctionedAmount}</span></p>
                    <p><strong>APR:</strong> {DUMMY_ACCEPTED_DATA.apr}</p>
                    <p><strong>Tenure:</strong> {DUMMY_ACCEPTED_DATA.tenure}</p>
                </div>
            </Card>

            {/* --- Progress Stepper --- */}
            <Card variant="outlined" className="p-6 mb-8 shadow-lg">
                <Typography variant="h6" component="h2" className="text-xl font-semibold text-gray-800 mb-6">
                    Application Progress
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {trackingSteps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel StepIconComponent={() => (
                                <div className={`p-3 rounded-full ${index < activeStep ? 'bg-green-500 text-white' : index === activeStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    {step.icon}
                                </div>
                            )}>
                                <span className={`text-sm font-medium mt-1 ${index === activeStep ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>{step.label}</span>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* Progress Bar */}
                <div className="mt-8">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <p className="text-right text-sm font-medium mt-2 text-blue-600">{Math.round(progressPercentage)}% Complete</p>
                </div>
            </Card>

            {/* --- Current Status & Next Action Card --- */}
            <Card variant="elevation" elevation={6} className={`p-6 border-l-4 rounded-lg ${getStatusStyle(currentStepDetail.variant)}`}>
                <Typography variant="h5" component="h3" className="text-2xl font-bold mb-3">
                    Current Status: {currentStepDetail.title}
                </Typography>
                <p className="text-base mb-4">
                    {currentStepDetail.status}
                </p>
                <div className="p-4 bg-white rounded-lg border border-dashed border-gray-300">
                    <Typography component="h4" className="text-base font-semibold text-gray-800 mb-1">
                        Next Action / Guidance:
                    </Typography>
                    <p className="italic text-gray-600">
                        {currentStepDetail.action}
                    </p>
                </div>
            </Card>

            {/* --- Quick Links/Support --- */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 border rounded-lg hover:shadow-md transition">
                    <h4 className="font-semibold text-gray-700 mb-2">Need Help?</h4>
                    <p className="text-sm">Contact your dedicated Relationship Manager for faster updates.</p>
                    <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800">Call Support</button>
                </div>
                <div className="p-4 bg-gray-50 border rounded-lg hover:shadow-md transition">
                    <h4 className="font-semibold text-gray-700 mb-2">Check Documents</h4>
                    <p className="text-sm">Review the files you submitted during the application process.</p>
                    <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800">View Files</button>
                </div>
                <div className="p-4 bg-gray-50 border rounded-lg hover:shadow-md transition">
                    <h4 className="font-semibold text-gray-700 mb-2">View Offer Letter</h4>
                    <p className="text-sm">Download your Provisional Sanction Letter again.</p>
                    <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800">Download PSL</button>
                </div>
            </div>
        </div>
    );
}