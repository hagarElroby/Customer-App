"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { validatePassword, validatePhoneNumber } from "@/utils/validationUtils";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import VerifyCode from "@/components/auth/page";
import SetPasswordForm from "@/components/auth/SetPasswordForm";
import {
  forgotPasswordSendOtp,
  forgotPasswordVerifyOtp,
  resetPassword,
} from "@/services/auth/forgotPassword";

const ForgotPassword = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [code, setCode] = useState("");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
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

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phoneError = validatePhoneNumber(phoneNumber);
    if (phoneError) {
      toast.error(phoneError);
      return;
    }
    await forgotPasswordSendOtp({
      phoneNumber,
      onSuccess: (data) => {
        toast.success(data.body || "OTP sent successfully");
        setStep(2);
      },
      onError: (error) => {
        toast.error(error.description || "An unexpected error occurred");
      },
    });
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    if (!code) {
      return;
    }

    await forgotPasswordVerifyOtp({
      phoneNumber,
      role: "USER",
      code,
      onSuccess: (data) => {
        toast.success("OTP has been verified successfully");
        setStep(3);
      },
      onError: (error) => {
        toast.error(error.description || "An unexpected error occurred");
      },
    });
  };

  const handleResend = async () => {
    setCanResend(false);
    setTimer(60);
    await forgotPasswordSendOtp({
      phoneNumber,
      onSuccess: (data) => {
        toast.success(data.body || "OTP sent successfully");
        setStep(2);
      },
      onError: (error) => {
        toast.error(error.description || "An unexpected error occurred");
      },
    });
  };

  const handleCodeChange = (e: any) => {
    setCode(e);
  };

  const handleSetPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }
    if (passwordError) {
      toast.error(passwordError);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords don't match.");
      return;
    }
    await resetPassword({
      password: formData.password,
      onSuccess: (data) => {
        toast.success(data.body || "Password updated successfully");
        router.push("/auth/login");
        localStorage.removeItem("forgotPasswordToken");
      },
      onError: (error) => {
        toast.error(error.description || "An unexpected error occurred");
      },
    });
  };

  return (
    <>
      {step === 1 && (
        <ForgotPasswordForm
          phoneNumber={phoneNumber}
          onChange={handlePhoneInputChange}
          onSubmit={handleSendOtp}
        />
      )}

      {step === 2 && (
        <VerifyCode
          verifyCode={handleVerifyCode}
          handleResend={handleResend}
          handleCodeChange={handleCodeChange}
          code={code}
          canResend={canResend}
          timer={timer}
          isVerifying={isVerifying}
        />
      )}

      {step == 3 && (
        <SetPasswordForm
          formData={formData}
          onChange={handleSetPasswordChange}
          onSubmit={handleUpdatePassword}
        />
      )}
    </>
  );
};

export default ForgotPassword;
