import * as React from "react";
// import happirateLogo from "@/assets/happirate-logo.png";
import { AuroraBackdrop } from "../AuthenticationPageNew/AuroraBackdrop";
import { Button } from "@/components/ui/button";
import { useState, useRef, useTransition, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
// import { toast } from "sonner";
import { sendOtpToMobile, verifyOtp } from "../../../src/api/api";
import { Navigate, useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import { toast, Toaster } from "sonner";
import { sendFirebaseOtpToMobileNumber } from "@/utils/const";
import { auth } from "@/firebase/firebase";
import Loader from "../../ReactBitsComps/Loader/Loader";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function Stat({ value, label }) {
  return (
    <div className="min-w-0">
      <div className="text-3xl font-semibold tracking-tight">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function HappirateSplitAuth() {
  // const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [mobileNumber, setMobileNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendCountDown, setResendCountDown] = useState(0);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [otpResult, setOtpResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (mobileNumber.length !== 10) {
      setErrors({
        mobileNumber: "Please enter a valid 10-digit mobile number",
      });
      toast.error("Please enter a valid mobile number");
      return;
    }

    try {
      const resp = await sendOtpToMobile(mobileNumber);
      console.log("resp", resp);
      toast.success(
        `${resp?.data?.otp} OTP sent successfully to ${mobileNumber}`,
      );
      // setShowOtp(true);
      setOtpResult(true);
      setErrors({});
    } catch (error) {
      console.error("OTP send failed", error);
      toast.error("Failed to send OTP");
      setErrors({
        mobileNumber: "Failed to send OTP. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleSendOtp = async (e) => {
  //   e.preventDefault();

  //   if (mobileNumber.length !== 10) {
  //     setErrors({
  //       mobileNumber: "Please enter a valid 10-digit mobile number",
  //     });
  //     return;
  //   }

  //   setResendCountDown(60);

  //   startTransition(async () => {
  //     if (!recaptchaVerifier) {
  //       return toast.error("RecaptchaVerifier is not initialized");
  //     }
  //   });

  //   // if (!consentChecked) {
  //   //   setErrors({ consent: "You must agree to the consent statement." });
  //   //   return;
  //   // }

  //   try {
  //     const confirmationResult = await signInWithPhoneNumber(
  //       auth,
  //       `+91${mobileNumber}`,
  //       recaptchaVerifier,
  //     );

  //     setOtpResult(confirmationResult);
  //     toast.success("OTP sent successfully");
  //   } catch (error) {
  //     console.error("OTP send failed", error);
  //     setResendCountDown(0);
  //     if (error.code === "auth/invalid-phone-number") {
  //       toast.error("Invalid phone number. Please check the number.");
  //     } else if (error.code === "auth/too-many-requests") {
  //       toast.error("Too many requests, Please try again later.");
  //     } else {
  //       toast.error("Failed to send OTP, Please try again.");
  //     }

  //     // setErrors({
  //     //   mobileNumber: "Failed to send OTP. Please try again.",
  //     // });
  //   }
  // };

  const handleVerifyOtp = async (enteredOtp) => {
    if (enteredOtp.length !== 4) {
      setErrors({ otp: "Enter valid 4-digit OTP" });
      return;
    }
    setLoading(true);

    const payload = {
      otp: enteredOtp,
      mobileNumber: mobileNumber,
    };

    console.log("VERIFY OTP PAYLOAD:", payload);

    try {
      const resp = await verifyOtp(payload);
      toast.success("OTP verified successfully");
      sessionStorage.setItem("mobile_number", mobileNumber);
      navigate("/loan-application");
      setIsMobileVerified(true);
      setErrors({});
    } catch (error) {
      toast.error("OTP verification failed");
      console.error(
        "OTP verification failed:",
        error.response?.data || error.message,
      );

      setErrors({ otp: "Invalid OTP" });
      setOtp(["", "", "", ""]);
      otpRefs[0]?.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });

    setRecaptchaVerifier(verifier);

    return () => {
      verifier.clear();
    };
  }, [auth]);

  useEffect(() => {
    let timer;
    if (resendCountDown > 0) {
      timer = setTimeout(() => setResendCountDown(resendCountDown - 1), 1000);
    }
    return clearTimeout(timer);
  }, [resendCountDown]);

  return (
    <>
      {/* {loading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : ( */}
      <AuroraBackdrop className="min-h-[90vh] bg-gradient-to-br from-[#fdfcfd] via-[#f3e8ff] to-[#e9d5ff]">
        <Toaster richColors position="top-right" />
        <div id="recaptcha-container"></div>
        <div className="w-full">
          <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 items-stretch gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            {/* Left marketing panel */}
            <section className="flex flex-col justify-center py-0">
              <div className="flex items-center gap-3">
                {/* <div className="rounded-2xl border bg-card/70 p-3 shadow-soft backdrop-blur supports-[backdrop-filter]:bg-card/55">
              </div> */}
                {/* <div className="text-sm text-muted-foreground">
                Transparent • Privacy-first
              </div> */}
              </div>

              <div className="mt-8 space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Compare &amp; Secure{" "}
                  <span className="text-primary">Smarter Loans</span>
                </h1>
                <p className="max-w-xl text-pretty text-lg text-muted-foreground">
                  India’s first transparent loan comparison platform with zero
                  spam and no credit score damage.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <h2 className="text-sm font-medium text-foreground">
                  Why Happirate
                </h2>
                <ul className="grid gap-2 text-sm text-muted-foreground">
                  <li>✔ No data selling</li>
                  <li>✔ No bureau score damage</li>
                  <li>✔ RBI-aligned APR transparency</li>
                  <li>✔ Compare lenders in minutes</li>
                  <li>✔ Higher approval probability</li>
                </ul>
              </div>

              <div className="mt-10">
                <div className="grid gap-6 border-t border-border/60 pt-8 sm:grid-cols-3">
                  <Stat value="15+" label="Integrated Banks & NBFCs" />
                  <div className="hidden sm:block">
                    <div className="h-full w-px bg-border/60" />
                  </div>
                  <Stat value="0" label="Spam Calls Allowed" />
                </div>
              </div>
            </section>

            {/* Right auth card */}
            <section className="flex items-center justify-center py-0 lg:justify-end">
              <Card
                className={cn(
                  "w-full max-w-md border-border/70 bg-card/75 shadow-elev backdrop-blur",
                  "supports-[backdrop-filter]:bg-card/55",
                )}
              >
                <CardHeader className="space-y-2 text-center">
                  <CardTitle className="text-2xl">Welcome back</CardTitle>
                  <CardDescription>
                    Sign in to access your collections and downloads
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* <div className="flex items-center gap-3">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">
                    OR CONTINUE WITH EMAIL
                  </span>
                  <Separator className="flex-1" />
                </div> */}

                  <form onSubmit={handleSendOtp} className="space-y-4">
                    {/* MOBILE INPUT */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Mobile Number
                      </label>
                      <Input
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        required
                        disabled={otpResult}
                        placeholder="Enter your mobile number"
                      />
                    </div>

                    {!otpResult && (
                      <Button
                        type="submit"
                        variant="hero"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      >
                        {loading ? <div className="loader" /> : "Send OTP"}
                      </Button>
                    )}

                    {/* OTP INPUTS */}
                    {otpResult && (
                      <>
                        <div className="flex justify-center gap-3 pt-2">
                          {otp.map((digit, index) => (
                            <Input
                              ref={otpRefs[index]}
                              key={index}
                              id={`otp-${index}`}
                              value={digit}
                              onChange={(e) =>
                                handleOtpChange(e.target.value, index)
                              }
                              maxLength={1}
                              className="h-12 w-12 rounded-md border border-border text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                          <span>OTP sent successfully</span>
                          <button className="text-purple-600 font-medium">
                            Resend OTP
                          </button>
                        </div>
                        <Button
                          type="button"
                          variant="hero"
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                          onClick={() => handleVerifyOtp(otp.join(""))}
                        >
                          {loading ? (
                            <div className="loader" />
                          ) : (
                            "Verify OTP"
                          )}
                        </Button>
                      </>
                    )}
                  </form>

                  <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <a
                      className="text-primary underline-offset-4 hover:underline"
                      href="#"
                    >
                      Sign up
                    </a>
                  </p>
                  <p className="text-center text-xs text-gary-500">
                    By continuing, you agree to our{" "}
                    <a
                      className="underline-offset-4 hover:underline text-black font-bold"
                      href="#"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      className="underline-offset-4 hover:underline  text-black  font-bold"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </AuroraBackdrop>
      {/* )} */}
    </>
  );
}
