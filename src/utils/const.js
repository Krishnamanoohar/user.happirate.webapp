import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const sendFirebaseOtpToMobileNumber = async (mobile) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA solved");
        },
      },
    );
  }

  const confirmationResult = await signInWithPhoneNumber(
    auth,
    `+91${mobile}`,
    window.recaptchaVerifier,
  );

  window.confirmationResult = confirmationResult;
  return confirmationResult;
};


