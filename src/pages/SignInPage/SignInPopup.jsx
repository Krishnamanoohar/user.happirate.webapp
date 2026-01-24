import { Context } from "@/App";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import ShinyText from "@/ReactBitsComps/ShinyText/ShinyText";
import { Dialog } from "@mui/material";
import React, { useContext, useState } from "react";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth, setupRecaptcha } from "@/firebase";
import { loginWithPhone } from "@/api/api";
import { ConstructionIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";


const SignInPopup = () => {
  const [phone, setPhone] = useState("");
const [confirmationResult, setConfirmationResult] = useState(null);
const navigate = useNavigate();
  const { showSignInPopup, setShowSignInPopup } = useContext(Context);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

 const handleMobileNumberSubmit = async (e) => {
  e.preventDefault();
  try {
    const appVerifier = setupRecaptcha();
    const fullPhone = "+91" + phone;

    const result = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
    setConfirmationResult(result);
    setOtpSent(true);
    console.log("OTP Sent")
  } catch (err) {
    console.error("OTP send failed", err);
    alert(err.message);
  }
};


  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };
  const handleVerifyOtp = async () => {
  try {
    const code = otp.join("");
    console.log("111111111111111", code)
    console.log("2222222222222",otp)
    const result = await confirmationResult.confirm(code);
    const idToken = await result.user.getIdToken();

    const response = await loginWithPhone(idToken);

    const { accessToken } = response.data;
    localStorage.setItem("authToken", accessToken);
    
    setShowSignInPopup(false);
   navigate("/loan-application");
  } catch (err) {
    console.error("OTP verification failed", err);
  }
};


  return (
    <Dialog open={showSignInPopup} onClose={() => setShowSignInPopup(false)}>
      <div id="recaptcha-container"></div>
      {otpSent ? (
        <div
          className="bg-[#171717] z-50 grid min-w-fit gap-6 p-6  min-h-[500px] w-[600px] "
          style={{ boxShadow: "inset 0 -20px 80px -20px #ffffff1f" }}
        >
          <div className="flex w-full gap-16 shadow-[0_0_20px_5px_rgba(255,255,255,0.6)]">
            <div className="flex-1 p-8">
              <form
                id="login-form"
                className="flex h-full flex-col justify-between gap-6"
                onSubmit={handleOtpChange}
              >
                <div className="space-y-2">
                  <h1
                    className="text-h1 text-foreground/70"
                    style={{ color: "#fafafa" }}
                  >
                    OTP
                  </h1>{" "}
                  <p className="text-[#8f8f8f]">
                    We have sent it to {phone}{" "}
                    <button
                      className="mb-1 align-middle"
                      aria-label="Edit"
                    ></button>
                  </p>
                </div>
                <div className="grow space-y-4">
                  <div className="space-y-2">
                    <div
                      id="otp"
                      className="group/pininput text-foreground flex items-center gap-2"
                    >
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(e.target.value, index)
                          }
                          onKeyDown={(e) => handleOtpKeyDown(e, index)}
                          className="focus-override relative size-12 text-center transition-all duration-75 border-foreground/20 rounded-lg border text-foreground outline-0 group-focus-within/pininput:border-foreground/40 group-hover/pininput:border-foreground/40"
                        />
                      ))}
                    </div>

                    <p className="text-body1 text-foreground/40 empty:hidden"></p>
                    <p className="text-body2 text-destructive empty:hidden"></p>
                  </div>

                  <p className="text-body1 text-[#8f8f8f]">
                    Resend in <span className="text-[#fafafa]">00:16</span>
                  </p>
                </div>

                <div className="hidden lg:flex">
                  <button type="button" onClick={handleVerifyOtp} className="w-[250px] group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)]  px-6 py-3 whitespace-nowrap text-white [background:var(--bg)] transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px shadow-2xl">
                    <span className="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg dark:from-white dark:to-slate-900/10">
                      Verify
                    </span>
                    <div className="absolute inset-0 size-full rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f] transform-gpu transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"></div>
                    <div className="absolute [inset:var(--cut)] -z-20 [border-radius:var(--radius)] [background:var(--bg)]"></div>
                  </button>
                </div>
              </form>{" "}
              <footer className="fixed bottom-0 left-0 right-0 z-50 space-y-3  p-5 pb-safe-offset-5 border-t bg-background/30 backdrop-blur-md lg:hidden">
                <button
                  className="h-[3.25rem] px-6 py-3 text-h3  ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-1.5 cursor-pointer w-full text-primary-foreground bg-primary/80 hover:bg-primary/90"
                  type="button"
                  form="login-form"
                  onClick={handleVerifyOtp}
                >
                  {" "}
                  Verify OTP
                </button>
              </footer>{" "}
            </div>
          </div>{" "}
          <button className="ring-offset-background absolute top-4 right-4 cursor-pointer rounded-xl transition-opacity hover:opacity-100 focus:outline-hidden disabled:pointer-events-none">
            <span className="sr-only">Close</span>
          </button>
        </div>
      ) : (
        <div
          className="bg-[#171717] z-50 grid w-full min-w-fit gap-6 p-6 min-h-[500px]  
            "
          style={{
            boxShadow: "inset 0 -20px 80px -20px #ffffff1f  ",
          }}
        >
          <div className="flex w-full gap-16 shadow-[0_0_20px_5px_rgba(255,255,255,0.6)]  ">
            <div className="flex-1 p-8">
              <form
                id="login-form"
                className="flex h-full flex-col justify-between gap-6"
                onSubmit={handleMobileNumberSubmit}
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h1
                      className="text-h1 text-[#fafafa]"
                      style={{ color: "#fafafa" }}
                    >
                      What's your mobile number?
                    </h1>{" "}
                    <p className="text-[#8f8f8f]">
                      Please enter your Aadhaar-linked mobile number
                    </p>
                  </div>{" "}
                  <div className="grow">
                    <div className="space-y-2">
                      <div className="rounded-xl border border-foreground/10 bg-card dark:bg-foreground/10 flex min-h-16 flex-col justify-center">
                        <div className="flex items-center gap-2 px-4">
                          <div className="flex-1">
                            {" "}
                            <div className="flex items-center gap-2">
                              <span className="mr-2 border-r pr-4">+91</span>{" "}
                              <div className="grow">
                                <input
                                  id="0LWwklDnxD9AUSZU8ThG8"
                                  className="resize-none bg-transparent py-2 flex-1 rounded-xl text-heading4 file:text-h4 flex w-full file:border-0 file:bg-transparent file:font-medium placeholder:text-[#fafafa] focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                                  name="mobileNumber"
                                  maxlength="10"
                                  value={phone}
  onChange={(e) => setPhone(e.target.value)}
                                  autofocus=""
                                />
                           
                              </div>
                            </div>
                          </div>{" "}
                        </div>
                      </div>{" "}
                      <p className="text-body1 text-[#fafafa] empty:hidden"></p>{" "}
                      <p className="text-body2 text-destructive empty:hidden"></p>
                    </div>
                  </div>
                </div>{" "}
                <div className="hidden flex-col items-center space-y-4 lg:flex">
                  <p className="text-[#8f8f8f] text-center">
                    By proceeding, you agree to{" "}
                    <a
                      href="/compliance/terms-and-conditions"
                      target="_blank"
                      className="text-[#fafafa]"
                    >
                      T&amp;C
                    </a>{" "}
                    &amp;{" "}
                    <a
                      href="/compliance/privacy-policy"
                      target="_blank"
                      className="text-[#fafafa]"
                    >
                      Privacy Policy
                    </a>
                  </p>{" "}
                  <button type="submit" className="w-[250px] group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)]  px-6 py-3 whitespace-nowrap text-white [background:var(--bg)] transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px shadow-2xl">
                    <span className="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg dark:from-white dark:to-slate-900/10">
                      Proceed
                    </span>
                    <div className="absolute inset-0 size-full rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f] transform-gpu transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"></div>
                    <div className="absolute [inset:var(--cut)] -z-20 [border-radius:var(--radius)] [background:var(--bg)]"></div>
                  </button>
                </div>
              </form>{" "}
              <footer className="fixed bottom-0 left-0 right-0 z-50 space-y-3  p-5 pb-safe-offset-5 border-t bg-background/30 backdrop-blur-md lg:hidden">
                <p className="text-[#fafafa] text-center">
                  By proceeding, you agree to{" "}
                  <a
                    href="/compliance/terms-and-conditions"
                    target="_blank"
                    className="text-[#fafafa]"
                  >
                    T&amp;C
                  </a>{" "}
                  &amp;{" "}
                  <a
                    href="/compliance/privacy-policy"
                    target="_blank"
                    className="text-[#fafafa]"
                  >
                    Privacy Policy
                  </a>
                </p>{" "}
                <button
                  className="h-[3.25rem] px-6 py-3 text-h3  ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-1.5 cursor-pointer w-full text-primary-foreground bg-primary/80 hover:bg-primary/90"
                  type="submit"
                  form="login-form"
                >
                  {" "}
                  Proceed
                </button>
              </footer>{" "}
            </div>
          </div>{" "}
          <button
            className="ring-offset-background absolute top-4 right-4 cursor-pointer rounded-xl transition-opacity hover:opacity-100 focus:outline-hidden disabled:pointer-events-none"
            id="bits-120"
            data-dialog-close=""
            tabindex="0"
            data-state="open"
          >
            <span className="sr-only">Close</span>
          </button>
        </div>
      )}

      {/* </div> */}
    </Dialog>
  );
};

export default SignInPopup;
