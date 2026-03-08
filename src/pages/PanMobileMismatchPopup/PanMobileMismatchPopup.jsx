import React from "react";
import { useContextData } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const PanMobileMismatchPopup = () => {
  const { isPanMobileMismatch } = useContextData();
  const navigate = useNavigate();

  if (!isPanMobileMismatch) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md text-center">

        <h2 className="text-xl font-semibold text-red-600 mb-3">
          Mobile Number Not Linked With PAN
        </h2>

        <p className="text-gray-600 mb-6">
          Please login using the mobile number linked with your PAN card to
          continue using HappiRate services.
        </p>

        <button
          onClick={() => navigate("/sign-in")}
          className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700"
        >
          Login
        </button>

      </div>
    </div>
  );
};

export default PanMobileMismatchPopup;