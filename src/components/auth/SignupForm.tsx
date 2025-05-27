"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/auth/Button";
import InputField from "@/components/auth/InputField";
import CheckboxField from "@/components/auth/CheckboxField";
import FormContainer from "@/components/auth/FormContainer";
import PhoneInput from "@/components/shared/PhoneInput";

type SignupFormProps = {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const SignupForm: React.FC<SignupFormProps> = ({
  formData,
  onChange,
  onPhoneChange,
  onSubmit,
}) => {
  const router = useRouter();
  return (
    <FormContainer width="60.33vw">
      <div className="flex flex-col w-full gap-[145px] md:gap-10 hd:gap-[3.9vh]">
        <div className="flex flex-col w-full custom-gap-header-from">
          <div className="flex flex-col items-center justify-center custom-gap-form-title">
            <p className="custom-font12 font-normal text-meduimBlack">
              LET'S GET YOU STARTED
            </p>
            <h2 className="font-auth-header font-medium text-meduimBlack">
              Create an Account
            </h2>
            <p className="custom-font12 text-meduimBlack font-normal">
              Let’s get you all set up so you can access your personal account.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="custom-form-child flex flex-col items-center w-full font-poppins"
          >
            <div className="w-full flex flex-col md:flex-row justify-between gap-6 hd:gap-[1.66vw] items-center">
              <InputField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={onChange}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={onChange}
              />
            </div>

            <div className="w-full flex flex-col md:flex-row justify-between gap-6 hd:gap-[1.66vw] items-center">
              <PhoneInput
                isAuthField={true}
                placeholder="( +964 ) 24-848-125"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onPhoneChange}
                label="Phone Number"
              />
              <InputField
                label="Email (Optional)"
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
              />
            </div>

            <div className="w-full flex flex-col md:flex-row justify-between gap-6 hd:gap-[1.66vw] items-center">
              <InputField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={onChange}
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={onChange}
              />
            </div>

            <div>
              <CheckboxField
                label="I agree to the Terms and Privacy Policy"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={onChange}
              />
            </div>

            <div className="min-w-[300px] w-full md:w-[26.45vw]">
              <Button type="submit">GET STARTED</Button>
            </div>
            <div id="recaptcha-container"></div>
          </form>
        </div>

        <div className="flex items-center justify-center gap-1">
          <p className="custom-font12 text-blackTitle font-normal">
            Already have an account?{" "}
            <a
              className="font-bold cursor-pointer custom-font12 uppercase
                   text-blackTitle border-b-[1px] hd:border-b-[0.06vw] border-blackTitle
                    hover:text-main hover:border-main transition-all duration-300 ease-in-out"
              onClick={() => router.push("/auth/login/")}
            >
              Login Here
            </a>
          </p>
        </div>
      </div>
    </FormContainer>
  );
};

export default SignupForm;
