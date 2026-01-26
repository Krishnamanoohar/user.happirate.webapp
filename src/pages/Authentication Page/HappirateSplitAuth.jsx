import { useState, useRef } from "react";

export default function HappirateSplitAuth() {
  const [step, setStep] = useState("MOBILE"); // MOBILE | OTP
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f3e6ff] via-[#f0e9ff] to-[#ecebff] flex items-center justify-center px-3">
      {/* MAIN FLEX CONTAINER */}
      <div className="max-w-7xl w-full flex items-center justify-between gap-20 mt-10">
        {/* LEFT PANEL */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-white shadow rounded-xl px-3 py-2 font-semibold text-sm">
              Happirate
            </div>
            <span className="text-sm text-gray-600">
              Transparent • Privacy-first
            </span>
          </div>
          <p className="text-[48px] font-bold leading-tight text-gray-900">
            Compare & Secure
            <br />
            <span className="text-[#7C3AED]">Smarter Loans</span>
          </p>

          <p className="mt-3 max-w-xl text-lg text-gray-600">
            India’s first transparent loan comparison platform with zero spam
            and no credit score damage.
          </p>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Why Happirate
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              {[
                "No data selling",
                "No bureau score damage",
                "RBI-aligned APR transparency",
                "Compare lenders in minutes",
                "Higher approval probability",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-green-600">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex justify-end">
          <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-7">
            {/* ===== MOBILE STEP ===== */}
            {step === "MOBILE" && (
              <>
                <p className="text-2xl font-bold text-gray-900 text-center mb-1">
                  Welcome back
                </p>
                <p className="text-gray-600 text-center text-sm mb-5">
                  Sign in to access your collections and downloads
                </p>

                <button className="w-full border border-gray-200 rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition mb-5">
                  <span className="text-lg font-bold text-purple-600">G</span>
                  <span className="text-sm font-medium">
                    Continue with Google
                  </span>
                </button>

                <div className="flex items-center my-5">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="px-3 text-xs text-gray-500">
                    OR CONTINUE WITH EMAIL
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-start gap-2 text-sm text-gray-600 mb-5">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600"
                  />
                  <p>
                    I agree to the{" "}
                    <span className="text-purple-600 font-medium">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-purple-600 font-medium">
                      Privacy Policy
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => setStep("OTP")}
                  className="w-full bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] text-white rounded-lg py-3 font-semibold shadow-md hover:opacity-95 transition"
                >
                  Send OTP
                </button>
              </>
            )}

            {/* ===== OTP STEP ===== */}
            {step === "OTP" && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  Verify OTP
                </h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                  Enter the 4-digit code sent to your mobile number
                </p>

                <div className="flex justify-center gap-3 mb-5">
                  {[0, 1, 2, 3].map((i) => (
                    <input
                      key={i}
                      ref={otpRefs[i]}
                      maxLength={1}
                      inputMode="numeric"
                      className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      onChange={(e) => {
                        if (e.target.value && i < 3) {
                          otpRefs[i + 1].current.focus();
                        }
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                  <span>OTP sent successfully</span>
                  <button className="text-purple-600 font-medium">
                    Resend OTP
                  </button>
                </div>

                <button className="w-full bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] text-white rounded-lg py-3 font-semibold shadow-md hover:opacity-95 transition">
                  Verify & Continue
                </button>

                <button
                  onClick={() => setStep("MOBILE")}
                  className="w-full text-sm text-gray-500 mt-4 hover:underline"
                >
                  Change mobile number
                </button>
              </>
            )}

            <p className="text-[11px] text-center text-gray-500 mt-4 leading-relaxed">
              By continuing, you agree to our{" "}
              <span className="underline cursor-pointer">Terms of Service</span>{" "}
              and{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
