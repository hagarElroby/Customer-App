"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/auth/Button";
import InputField from "@/components/auth/InputField";
import CheckboxField from "@/components/auth/CheckboxField";
import TitleDesc from "@/components/auth/TitleDesc";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { toast } from "sonner";
import FormContainer from "@/components/auth/FormContainer";

import PhoneInput from "@/components/shared/PhoneInput";
import { validatePassword, validatePhoneNumber } from "@/utils/validationUtils";
import { login } from "@/services/auth/login";
import { setUser } from "@/redux/authSlice";
import withAuthRedirect from "@/utils/withAuthRedirect";
import { sendFCMToken } from "@/utils/sendFCMToken";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [errorQueue, setErrorQueue] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({
    phoneNumber: "",
    password: "",
    rememberMe: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value.trim(),
    }));
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: e.target.value,
    }));
    setFormErrors((prev) => ({ ...prev, phoneNumber: "" }));
  };
  const validateForm = () => {
    const errors: any = [];
    const tempFormErrors = { ...formErrors };
    const phoneError = validatePhoneNumber(formData.phoneNumber);
    if (phoneError) {
      errors.push(phoneError);
    }
    if (!formData.password) {
      errors.push("Password is required");
    }

    setFormErrors(tempFormErrors);
    setErrorQueue(errors);

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length === 0) {
      setLoading(true);
      await login({
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        role: "USER",
        onSuccess: async (data) => {
          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("jwtRefreshToken", data.jwtRefreshToken);
            localStorage.setItem("jwtToken", data.jwtToken);
            dispatch(setUser(data));
            await sendFCMToken();
          }
          setLoading(false);
          toast.success("Login Successful");
          router.push("/");
        },
        onError: (error) => {
          toast.error(error.description);
          setLoading(false);
        },
      });
    } else {
      if (errors.length > 0) {
        toast.error(errors[0]);
        setErrorQueue((prevQueue) => prevQueue.slice(1));
      }
    }
  };

  return (
    <FormContainer>
      <div className="flex flex-col items-start w-full custom-gap-header-from">
        <div className="flex flex-col items-start custom-gap-form-title">
          <p className="custom-font12 text-meduimBlack font-normal">
            WELCOME BACK
          </p>
          <TitleDesc title="Log in to your Account" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="custom-form-child flex flex-col items-center w-full font-poppins"
        >
          <PhoneInput
            isAuthField={true}
            placeholder="( +964 ) 24-848-125"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handlePhoneInputChange}
            label="Phone Number"
            error={formErrors.phoneNumber}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            error={formErrors.password}
          />
          <div className="w-full flex flex-row gap-1 justify-between items-center">
            <CheckboxField
              label="Remember me"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
            />
            <a
              className="font-medium cursor-pointer text-borderAuth custom-font12 hover:text-main"
              onClick={() => router.push("/auth/forgot-password/")}
            >
              Forgot Password?
            </a>
          </div>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <Button type="submit">CONTINUE</Button>
          )}
        </form>
      </div>
      <div className="flex items-center justify-center gap-1 xxl:gap-[0.27vw]">
        <p className="text-blackTitle custom-font12 font-normal">
          New User?{" "}
          <a
            className="font-bold cursor-pointer custom-font12 uppercase
                   text-blackTitle border-b-[1px] border-blackTitle
                    hover:text-redText hover:border-redText transition-all duration-300 ease-in-out"
            onClick={() => router.push("/auth/signup/")}
          >
            SIGN UP HERE
          </a>
        </p>
      </div>
    </FormContainer>
  );
};

export default withAuthRedirect(Page);
