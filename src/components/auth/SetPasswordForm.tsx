"use client";
import Button from "./Button";
import InputField from "./InputField";
import TitleDesc from "./TitleDesc";
import FormContainer from "./FormContainer";

type SetPasswordFormProps = {
  formData: {
    password: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const SetPasswordForm: React.FC<SetPasswordFormProps> = ({
  formData,
  onChange,
  onSubmit,
}) => {
  return (
    <FormContainer>
      <div className="flex flex-col items-start w-full custom-gap-header-from">
        <TitleDesc
          title="Set a password"
          description="Your previous password has been reseted. Please set a new password for your account."
        />
        <form
          onSubmit={onSubmit}
          className="custom-form-child flex flex-col items-center w-full font-poppins"
        >
          <InputField
            label="Create Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={onChange}
          />
          <InputField
            label="Re-enter Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={onChange}
          />
          <Button type="submit">Set password</Button>
        </form>
      </div>
    </FormContainer>
  );
};

export default SetPasswordForm;
