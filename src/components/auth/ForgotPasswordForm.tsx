"use client";
import Button from "@/components/auth/Button";
import PhoneInput from "@/components/shared/PhoneInput";
import TitleDesc from "@/components/auth/TitleDesc";
import BackTo from "@/components/shared/BackTo";
import FormContainer from "@/components/auth/FormContainer";
import { useRouter } from "next/navigation";

type ForgotPasswordFormProps = {
  phoneNumber: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  phoneNumber,
  onChange,
  onSubmit,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };

  return (
    <FormContainer>
      <div className="flex items-start flex-col w-full custom-gap-header-from">
        <div className="flex flex-col items-start custom-gap-form-title">
          <BackTo name="Login" onClick={handleClick} />
          <TitleDesc
            title="Forgot your password?"
            description="Don’t worry, happens to all of us. Enter your phone number below to recover your password"
          />
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
            onChange={onChange}
            label="Phone Number"
          />
          <Button type="submit">Submit</Button>
        </form>
        <div id="recaptcha-container"></div>
      </div>
    </FormContainer>
  );
};

export default ForgotPasswordForm;
