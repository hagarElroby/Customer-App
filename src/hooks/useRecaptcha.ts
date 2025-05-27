import { useEffect } from "react";
import { toast } from "sonner";
import { auth } from "../firebase";
import { RecaptchaVerifier } from "firebase/auth";

const useRecaptcha = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && auth) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            console.log("reCAPTCHA solved:", response);
          },
          "expired-callback": () => {
            toast.error("reCAPTCHA expired, please try again.");
          },
        },
      );
    }
    return () => {
      window.recaptchaVerifier?.clear();
    };
  }, []);
};

export default useRecaptcha;
