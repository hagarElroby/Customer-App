"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useRecaptcha from "@/hooks/useRecaptcha";
import {
  PhoneAuthProvider,
  signInWithCredential,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/firebase";
import SignupForm from "@/components/auth/SignupForm";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
} from "@/utils/validationUtils";
import VerifyCode from "@/components/auth/page";
import { useState } from "react";
import { signup } from "@/services/auth";

const Signup = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  useRecaptcha();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const trimmedValue = type === "checkbox" ? checked : value.trim();
    setFormData((prev) => ({
      ...prev,
      [name]: trimmedValue,
    }));
  };
  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: e.target.value,
    }));
  };

  const sendVerificationCode = async (e: React.FormEvent) => {
    try {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        console.debug("reCAPTCHA not initialized");
        return;
      }
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formData.phoneNumber,
        appVerifier,
      );
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "verificationId",
          confirmationResult.verificationId,
        );
      }
      toast.success("SMS sent successfully!");
      setStep(2);
    } catch (error: any) {
      console.error("Verification error:", error.message);
      toast.error(
        error.message || "Failed to send verification code. Try again.",
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      termsAccepted,
      confirmPassword,
    } = formData;
    const firstNameError = validateName(firstName, "First name");
    const lastNameError = validateName(lastName, "Last name");
    const phoneError = validatePhoneNumber(phoneNumber);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const termsError = termsAccepted
      ? ""
      : "You must accept the terms and privacy policies";

    if (firstNameError.length > 0) {
      toast.error(firstNameError);
      return;
    }
    if (lastNameError.length > 0) {
      toast.error(lastNameError);
      return;
    }
    if (phoneError) {
      toast.error(phoneError);
      return;
    }

    if (email && emailError.length > 0) {
      toast.error(emailError);
      return;
    }
    if (passwordError) {
      toast.error(passwordError);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (termsError) {
      toast.error(termsError);
      return;
    }
    try {
      await sendVerificationCode(e);
    } catch (error) {
      console.debug("Error during form submission:", error);
      toast.error("There was an error submitting the form, please try again.");
    }
    setStep(2);
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const verificationIdStore = localStorage.getItem("verificationId");
      const verificationId = window.verificationId || verificationIdStore;
      if (!verificationId) {
        toast.error(
          "Verification ID not found. Please retry the verification process.",
        );
        setIsVerifying(false);
        router.push("/auth/login");
        return;
      }
      const credential = PhoneAuthProvider.credential(verificationId, code);
      const result = await signInWithCredential(auth, credential);
      const accessToken = await result?.user?.getIdToken();
      const { firstName, lastName, phoneNumber, email, password } = formData;
      const dataToSend = {
        firstName,
        lastName,
        phoneNumber,
        password,
        ...(email && { email }),
        role: "USER",
      };
      if (accessToken) {
        await signup({
          ...dataToSend,
          fireBaseToken: accessToken,
          onSuccess: () => {
            toast.success("Sign-up successful");
            router.push("/auth/login");
          },
          onError: (e) => {
            toast.error(`Sign-up failed: ${e.description}`);
          },
        });
      }
    } catch (error: any) {
      console.error("Error verifying code:", error);
      if (error.code === "auth/invalid-verification-code") {
        toast.error("Invalid verification code. Please try again.");
      }
    } finally {
      setIsVerifying(false);
      setCode("");
    }
  };

  const handleResend = async () => {
    setCanResend(false);
    setTimer(60);
    try {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        console.error("reCAPTCHA not initialized");
        toast.error("Something went wrong, please try again.");
        return;
      }
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formData.phoneNumber,
        appVerifier,
      );
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "verificationId",
          confirmationResult.verificationId,
        );
      }

      toast.success("SMS sent");
      router.push("/auth/verifycode");
    } catch (error) {
      console.error("Error sending verification code:", error);
      toast.error("Error sending verification code");
    }
  };

  const handleCodeChange = (e: any) => {
    setCode(e);
  };

  return (
    <>
      {step === 1 && (
        <SignupForm
          formData={formData}
          onChange={handleInputChange}
          onPhoneChange={handlePhoneInputChange}
          onSubmit={handleSubmit}
        />
      )}
      {step === 2 && (
        <VerifyCode
          verifyCode={verifyCode}
          handleResend={handleResend}
          handleCodeChange={handleCodeChange}
          code={code}
          canResend={canResend}
          timer={timer}
          isVerifying={isVerifying}
        />
      )}
    </>
  );
};

export default Signup;
