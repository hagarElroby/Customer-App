"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/auth/Button";
import FormContainer from "@/components/auth/FormContainer";
import PhoneInput from "@/components/shared/PhoneInput";

type PhoneFormProps = {
  phoneNumber: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error?: string;
};

const PhoneNumberForm: React.FC<PhoneFormProps> = ({
  phoneNumber,
  onPhoneChange,
  onSubmit,
  error,
}) => {
  const router = useRouter();
  return (
    <FormContainer width="35.33vw">
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
            <PhoneInput
              isAuthField={true}
              placeholder="( +964 ) 24-848-125"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onPhoneChange}
              label="Phone Number"
              error={error}
            />
            <Button type="submit">CONTINUE</Button>
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

export default PhoneNumberForm;
