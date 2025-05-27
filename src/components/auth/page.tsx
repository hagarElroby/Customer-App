"use client";

import Button from "./Button";
import TitleDesc from "./TitleDesc";
import OTPInput from "react-otp-input";
import BackTo from "../shared/BackTo";
import FormContainer from "./FormContainer";
import { useRouter } from "next/navigation";

interface VerifyCodeProps {
  verifyCode: (e: React.FormEvent) => Promise<void>;
  handleResend: () => Promise<void>;
  handleCodeChange: (e: any) => void;
  code: string;
  canResend: boolean;
  timer: number;
  isVerifying: boolean;
}

const VerifyCode: React.FC<VerifyCodeProps> = ({
  verifyCode,
  handleResend,
  handleCodeChange,
  code,
  canResend,
  timer,
  isVerifying,
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/login");
  };

  return (
    <FormContainer>
      <div className="flex flex-col items-start w-full custom-gap-header-from">
        <div className="flex flex-col items-start custom-gap-form-title">
          <BackTo name="Login" onClick={handleClick} />
          <TitleDesc
            title="Verify code"
            description="An authentication code has been sent to your phone number."
          />
        </div>
        <form
          onSubmit={verifyCode}
          className="custom-form-child flex flex-col items-center w-full font-poppins"
        >
          <div className="flex justify-between items-center">
            <OTPInput
              value={code}
              onChange={handleCodeChange}
              numInputs={6}
              shouldAutoFocus
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: "3.47vw",
                    height: "3.47vw",
                    minWidth: "40px",
                    minHeight: "40px",
                  }}
                  className="border hd:border-[0.06vw] border-borderAuth rounded hd:rounded-[0.27vw] text-center custom-input-font16 font-normal focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              )}
              containerStyle="flex justify-between gap-2 md:gap-[1.11vw]"
            />
          </div>
          <div className="resend-font-size flex items-center justify-center gap-1">
            <p className="text-blackTitle font-medium">
              Didn’t receive a code?{" "}
              {canResend && (
                <a
                  className="text-success hover:text-main cursor-pointer"
                  onClick={handleResend}
                >
                  Resend
                </a>
              )}
            </p>
          </div>
          <Button
            type="submit"
            disabled={code.trim().length !== 6 || isVerifying}
          >
            Verify
          </Button>

          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-blackTitle">{`00:${timer.toString().padStart(2, "0")}`}</span>
            <p className="text-xs font-medium text-textAuth">
              resend confirmation code.
            </p>
          </div>
        </form>
        <div id="recaptcha-container"></div>
      </div>
    </FormContainer>
  );
};

export default VerifyCode;
