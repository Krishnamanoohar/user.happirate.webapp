import React, { useState } from "react";
import {
  Briefcase,
  User,
  Users,
  Building2,
  Hash,
  Calendar,
  CalendarOff,
  ShieldCheck,
  PlusCircle,
  Trash2,
  FileDigit,
  BadgeCheck,
} from "lucide-react";

// --- REUSABLE INPUT COMPONENT ---
const IconInput = ({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  required = false,
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      {/* <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
        {label}
      </label> */}
      <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
  {label}
  {required && (
    <span className="text-red-500">*</span>
  )}
</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <Icon size={16} />
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 shadow-sm
            ${
              error
                ? "bg-red-50 border border-red-500 focus:ring-2 focus:ring-red-400"
                : "bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500"
            }
          `}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

// --- SINGLE EMPLOYMENT CARD COMPONENT ---
const EmploymentCard = ({ data, index, onChange, onRemove, totalRecords, errors ={} }) => {
  const handleChange = (field, value) => {
    onChange(index, field, value);
  };

  const isCurrentRole = !data.date_of_exit || data.date_of_exit.trim() === "";

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden mb-6">
      {/* Card Header */}
      <div className="bg-slate-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 text-blue-700 h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm">
            {index + 1}
          </div>
          <h3 className="font-semibold text-gray-800 text-lg">
            {data.establishment_name
              ? data.establishment_name
              : "New Employment Record"}
          </h3>
          {/* {isCurrentRole && data.establishment_name && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              <BadgeCheck size={14} /> Current
            </span>
          )} */}
        </div>

        {/* {totalRecords > 1 && ( */}
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-1 text-sm"
        >
          <Trash2 size={16} />
          <span className="hidden sm:inline">Remove</span>
        </button>
        {/* )} */}
      </div>

      <div className="p-6">
        {/* Section 1: Personal Details */}
        {/* <div className="mb-6">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">
            Employee Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <IconInput
              label="Employee Name"
              icon={User}
              value={data.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. John Doe"
            />
            <IconInput
              label="Guardian Name"
              icon={Users}
              value={data.guardian_name}
              onChange={(e) => handleChange("guardian_name", e.target.value)}
              placeholder="e.g. Richard Doe"
            />
          </div>
        </div> */}

        {/* Section 2: Establishment Details */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">
            Company Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-3 lg:col-span-1">
              <IconInput
                label="Establishment Name"
                icon={Building2}
                value={data.establishment_name}
                onChange={(e) =>
                  handleChange("establishment_name", e.target.value)
                }
                placeholder="Company Name"
                error={errors.establishment_name}
                required
              />
            </div>
            <IconInput
              label="Member ID"
              icon={Hash}
              value={data.member_id}
              onChange={(e) => handleChange("member_id", e.target.value)}
              placeholder="e.g. APHYD123..."
            />
            <IconInput
              label="UAN"
              icon={FileDigit}
              value={data.uan}
              onChange={(e) => handleChange("uan", e.target.value)}
              placeholder="12-digit UAN"
              error={errors.uan}
              required
            />
          </div>
        </div>

        {/* Section 3: Timeline & PF */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">
            Timeline & Provident Fund
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <IconInput
              label="Date of Joining"
              icon={Calendar}
              value={data.date_of_joining}
              onChange={(e) => handleChange("date_of_joining", e.target.value)}
              placeholder="DD/MM/YYYY"
              error={errors.date_of_joining}
              required
            />
            <IconInput
              label="Date of Exit"
              icon={CalendarOff}
              value={data.date_of_exit}
              onChange={(e) => handleChange("date_of_exit", e.target.value)}
              placeholder="Leave blank if current"
            />
            <IconInput
              label="Last PF Submitted"
              icon={ShieldCheck}
              value={data.last_pf_submitted}
              onChange={(e) =>
                handleChange("last_pf_submitted", e.target.value)
              }
              placeholder="MM/YYYY"
            />
            <IconInput
              label="PF By Employer"
              icon={Briefcase}
              value={data.last_pf_submitted_by_employer}
              onChange={(e) =>
                handleChange("last_pf_submitted_by_employer", e.target.value)
              }
              placeholder="MM/YYYY"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN EXPORTABLE COMPONENT TO DROP INTO YOUR FORM ---
export const EmploymentHistorySection = ({
  employmentData,
  setEmploymentData,
  errors=[],
}) => {
  const emptyRecord = {
    uan: "",
    name: "",
    guardian_name: "",
    establishment_name: "",
    member_id: "",
    date_of_joining: "",
    date_of_exit: "",
    last_pf_submitted: "",
    last_pf_submitted_by_employer: "",
  };

  const handleAddEmployment = () => {
    setEmploymentData([...employmentData, { ...emptyRecord }]);
  };

  const handleRemoveEmployment = (index) => {
    const updatedData = employmentData.filter((_, i) => i !== index);
    setEmploymentData(updatedData);
  };

  const handleEmploymentChange = (index, field, value) => {
    const updatedData = [...employmentData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setEmploymentData(updatedData);
  };

  return (
    <div className="w-full mx-auto bg-white rounded-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Briefcase className="text-blue-600" />
          Employment History
        </h2>
        <p className="text-gray-500 mt-1">
          Please review and update your previous employment and PF details.
        </p>
      </div>

      <div className=" space-y-6">
        {/* Section 1: Personal Details */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">
            Employee Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <IconInput
              label="Employee Name"
              icon={User}
              value={employmentData[0]?.name || ""}
              onChange={(e) =>
                setEmploymentData((prev) => {
                  const updated = [...prev];
                  if (!updated[0]) updated[0] = {};
                  updated[0] = { ...updated[0], name: e.target.value };
                  return updated;
                })
              }
              placeholder={"e.g. John Doe"}
              error={errors[0]?.name}
              required
            />
            <IconInput
              label="Guardian Name"
              icon={Users}
              value={employmentData[0]?.guardian_name || ""}
              onChange={(e) =>
                setEmploymentData((prev) => {
                  const updated = [...prev];
                  updated[0] = { ...updated[0], guardian_name: e.target.value };
                  return updated;
                })
              }
              placeholder={"e.g. Richard Doe"}
              error={errors[0]?.guardian_name}
              required
            />
          </div>
        </div>

        {employmentData?.map((record, index) => (
          <EmploymentCard
            key={index} // Note: In production, better to use a unique ID if available instead of index
            index={index}
            data={record}
            errors={errors[index] || {}}
            totalRecords={employmentData.length}
            onChange={handleEmploymentChange}
            onRemove={handleRemoveEmployment}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddEmployment}
        className="mt-6 w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
      >
        <PlusCircle size={20} />
        Add Another Employment Record
      </button>
    </div>
  );
};

// --- DEMO APP COMPONENT (Wraps the section to show how it works with data) ---
// export default function App() {
//   // Initial data mimicking your backend response
//   const initialData = [
//     {
//       uan: "102149006800",
//       name: "BIRUDARAJU KRISHNA MANOHAR",
//       guardian_name: "BIRUDARAJU SRINIVASA RAJU",
//       establishment_name: "REAL VARIABLE DIGITAL ASSETSERVICES PRIVATE LIMITED",
//       member_id: "APHYD19582150000010130",
//       date_of_joining: "11/11/2024",
//       date_of_exit: "",
//       last_pf_submitted: "",
//       last_pf_submitted_by_employer: "",
//     },
//   ];

//   const [employmentData, setEmploymentData] = useState(initialData);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitting to backend:", {
//       employmentHistory: { employment_data: employmentData },
//     });
//     alert("Data logged to console! Check your dev tools.");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4 font-sans">
//       <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8">
//         {/* You just drop the component here and pass the state */}
//         <EmploymentHistorySection
//           employmentData={employmentData}
//           setEmploymentData={setEmploymentData}
//         />

//         {/* Form Action Buttons */}
//         <div className="flex justify-end gap-4 mt-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//           <button
//             type="button"
//             className="px-6 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-medium shadow-sm shadow-blue-200 transition-colors"
//           >
//             Save Employment Data
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
