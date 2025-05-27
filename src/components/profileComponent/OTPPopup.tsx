"use client";
import React, { useState } from "react";
import CustomButton from "../shared/CustomButton";
import { Input, Modal } from "antd";
import CustomHeaderInModal from "../shared/CustomHeaderInModal";

interface OTPPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onOtpEntered: (otp: string) => void;
  email: string;
  onResend: () => void;
  resendTimer: number;
}

const OTPPopup: React.FC<OTPPopupProps> = ({
  isOpen,
  onClose,
  onOtpEntered,
  email,
  onResend,
  resendTimer,
}) => {
  const [otp, setOtpInput] = useState("");
  const handleVerify = () => {
    if (otp.length === 6) {
      onOtpEntered(otp);
      onClose();
    }
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      footer={null}
      height="auto"
      width="30vw"
      style={{ borderRadius: "24px" }}
      closeIcon={false}
      className="flex flex-col items-center justify-between"
    >
      <CustomHeaderInModal title="Verify E-mail Address" onClose={onClose} />
      <div className="h-[1px] w-full bg-[#700c18]" />
      <div className="flex flex-col items-center justify-center gap-6 p-5">
        <div className="flex flex-col gap-1">
          <p className="text-sm">To use this address, enter the OTP sent to</p>
          <p className="text-sm text-[#700c18]">{email}</p>
        </div>
        <Input.OTP size="large" value={otp} onChange={setOtpInput} />
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-[#313131]">
            Didn’t receive a code?
          </span>
          {resendTimer > 0 ? (
            <span className="text-sm font-bold text-[#D3D3D3]">
              Resend in {resendTimer}s
            </span>
          ) : (
            <button
              className="text-sm font-bold text-[#700c18] hover:underline"
              onClick={onResend}
            >
              Resend OTP
            </button>
          )}
        </div>
        <div className="flex items-center justify-end gap-6">
          <CustomButton
            title="VERIFY"
            width="30vw"
            disabled={otp.length !== 6}
            onClick={handleVerify}
          />
        </div>
      </div>
    </Modal>
  );
};

export default OTPPopup;
