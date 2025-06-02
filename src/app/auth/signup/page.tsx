"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SignupForm from "@/components/auth/SignupForm";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
} from "@/utils/validationUtils";
import VerifyCode from "@/components/auth/page";
import { useEffect, useRef, useState } from "react";
import PhoneNumberForm from "@/components/auth/PhoneNumberForm";
import {
  completeSignup,
  initiateSignup,
  resendSignup,
  verifySignup,
} from "@/services/auth/signup";

const Signup = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signupError, setSignupError] = useState<string>();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (step === 2 && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(timerRef.current!);
            setCanResend(true);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const trimmedValue = type === "checkbox" ? checked : value.trim();
    setFormData((prev) => ({
      ...prev,
      [name]: trimmedValue,
    }));
  };
  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    setSignupError("");
  };

  const handleSendPhoneNumber = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }
    const phoneError = validatePhoneNumber(phoneNumber);
    if (phoneError) {
      toast.error(phoneError);
      return;
    }

    await initiateSignup({
      phoneNumber,
      onSuccess: (data) => {
        toast.success(data.message || "Verification code sent successfully!");
        setStep(2);
      },
      onError: async (error) => {
        if (error.flag === "174" || error.flag === "175") {
          await resendSignup({
            phoneNumber,
            onSuccess: (data) => {
              toast.success(
                data.message || "Verification code resent successfully!",
              );
              setCanResend(true);
              setStep(2);
            },
            onError: (error) => {
              toast.error(
                error.description ||
                  "Failed to resend verification code. Try again.",
              );
            },
          });
        } else if (error.flag === "101") {
          toast.error(error.description || "Phone number already exists.");
          setSignupError("Phone number already exists. Please try logging in.");
        } else {
          toast.error(
            error.description || "Failed to send verification code. Try again.",
          );
        }
      },
    });
  };

  const handleCodeChange = (e: any) => {
    setCode(e);
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    await verifySignup({
      phoneNumber,
      code,
      onSuccess: (data) => {
        toast.success(data.message || "Verification successful!");
        setStep(3);
        setIsVerifying(false);
      },
      onError: (error) => {
        toast.error(
          error.description || "Verification failed. Please try again.",
        );
        setIsVerifying(false);
      },
    });
  };

  const handleResend = async () => {
    setCanResend(false);
    setTimer(60);
    await resendSignup({
      phoneNumber,
      onSuccess: (data) => {
        toast.success(data.message || "Verification code resent successfully!");
        setCanResend(true);
      },
      onError: (error) => {
        toast.error(
          error.description || "Failed to resend verification code. Try again.",
        );
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      termsAccepted,
      confirmPassword,
    } = formData;
    const firstNameError = validateName(firstName, "First name");
    const lastNameError = validateName(lastName, "Last name");
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

    await completeSignup({
      firstName,
      middleName,
      lastName,
      email,
      password,
      onSuccess: (data) => {
        toast.success(data.message || "Sign-up completed successfully!");
        router.push("/auth/login");
      },
      onError: (error) => {
        toast.error(error.description || "Sign-up failed. Please try again.");
      },
    });
  };

  return (
    <>
      {step === 1 && (
        <PhoneNumberForm
          phoneNumber={phoneNumber}
          onPhoneChange={handlePhoneInputChange}
          onSubmit={handleSendPhoneNumber}
          error={signupError}
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
      {step === 3 && (
        <SignupForm
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Signup;
