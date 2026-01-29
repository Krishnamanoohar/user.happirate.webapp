import * as React from "react";
// import happirateLogo from "@/assets/happirate-logo.png";
import { AuroraBackdrop } from "../AuthenticationPageNew/AuroraBackdrop";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
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
import { toast } from "sonner";
import { sendOtpToMobile, verifyOtpApi } from "../../../src/api/api";

function Stat({ value, label }) {
  return (
    <div className="min-w-0">
      <div className="text-3xl font-semibold tracking-tight">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function HappirateSplitAuth() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const [errors, setErrors] = useState({});
  const [isMobileVerified, setIsMobileVerified] = useState(false);

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

    if (mobileNumber.length !== 10) {
      setErrors({
        mobileNumber: "Please enter a valid 10-digit mobile number",
      });
      toast.error("Please enter a valid mobile number");
      return;
    }

    try {
      await sendOtpToMobile(mobileNumber);
      toast.success(`OTP sent successfully to ${mobileNumber}`);
      setShowOtp(true);
      setErrors({});
    } catch (error) {
      console.error("OTP send failed", error);
      toast.error("Failed to send OTP");
      setErrors({
        mobileNumber: "Failed to send OTP. Please try again.",
      });
    }
  };

  const verifyOtp = async (enteredOtp) => {
    if (enteredOtp.length !== 4) {
      setErrors({ otp: "Enter valid 4-digit OTP" });
      return;
    }

    const payload = {
      otp: enteredOtp,
      mobileNumber: mobileNumber,
    };

    console.log("VERIFY OTP PAYLOAD:", payload);

    try {
      await verifyOtpApi(payload);

      toast.success("OTP verified successfully");
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
    }
  };

  return (
    <AuroraBackdrop className="min-h-screen bg-gradient-to-br from-[#fdfcfd] via-[#f3e8ff] to-[#e9d5ff]">
      <div className="min-h-screen w-full">
        <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 items-stretch gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          {/* Left marketing panel */}
          <section className="flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border bg-card/70 p-3 shadow-soft backdrop-blur supports-[backdrop-filter]:bg-card/55">
                {/* <img
                  src={happirateLogo}
                  alt="Happirate"
                  className="h-7 w-auto"
                  loading="eager"
                  decoding="async"
                /> */}
              </div>
              <div className="text-sm text-muted-foreground">
                Transparent • Privacy-first
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
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
          <section className="flex items-center justify-center lg:justify-end">
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
                <div className="flex items-center gap-3">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">
                    OR CONTINUE WITH EMAIL
                  </span>
                  <Separator className="flex-1" />
                </div>

                <form onSubmit={handleSendOtp} className="space-y-4">
                  {/* MOBILE INPUT */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mobile Number</label>
                    <Input
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      required
                      disabled={showOtp}
                    />
                  </div>

                  {!showOtp && (
                    <Button
                      type="submit"
                      variant="hero"
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    >
                      Send OTP
                    </Button>
                  )}

                  {/* OTP INPUTS */}
                  {showOtp && (
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

                      <Button
                        type="button"
                        variant="hero"
                        className="w-full"
                        onClick={() => verifyOtp(otp.join(""))}
                      >
                        Verify OTP
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
  );
}
