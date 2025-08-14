// components/DepositFlowModal.tsx
import { Modal, Button, Input, Radio } from "antd";
import { useState } from "react";

interface DepositFlowModalProps {
  open: boolean;
  onClose: () => void;
  amount?: number;
  onConfirm?: () => void;
}

const DepositFlowModal = ({
  open,
  onClose,
  amount,
  onConfirm,
}: DepositFlowModalProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleConfirm = () => {
    onConfirm?.();
    // Call your backend/payment logic here
    onClose();
  };

  return (
    <>
      {/* Step 1: Prompt to pay deposit */}
      <Modal
        open={open && step === 1}
        onCancel={onClose}
        footer={null}
        closable
        className="!rounded-xl"
      >
        <div className="text-center py-6">
          <h2 className="text-lg font-bold text-[#700C18]">Auction Deposit</h2>
          <hr className="my-2 border-[#700C18]" />
          <img
            src="/images/deposit.svg"
            alt="deposit"
            className="mx-auto my-6 w-20 h-20 object-contain"
          />
          <p className="text-sm">Pay the deposit now</p>
          <p className="text-xs text-gray-500">
            it's safe, quick, and fully refundable if you don’t win
          </p>
          <Button
            type="primary"
            className="!bg-[#700C18] !rounded-lg mt-6 w-full"
            onClick={() => setStep(2)}
          >
            Deposit payment
          </Button>
        </div>
      </Modal>

      {/* Step 2: Actual Payment */}
      <Modal
        open={open && step === 2}
        onCancel={onClose}
        footer={null}
        className="!rounded-xl"
        width={750}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-[#700C18]">
              Deposit Payment
            </h2>
            <ul className="text-sm list-disc ml-4">
              <li>Valid until: Auction ends</li>
              <li>Fully refundable if you don’t win</li>
              <li>Your payment is 100% secure and protected</li>
            </ul>
            <div className="text-2xl font-semibold text-[#700C18]">
              IQD {amount?.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">
              Please make sure to complete the purchase.
              <br />
              <span className="text-red-500 font-medium">
                Auction Deposit will not be refunded if you win the auction and
                do not complete the purchase.
              </span>
            </p>
          </div>

          <div className="border-l pl-4 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-gray-700">Payment</h3>
            <Radio.Group
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <Radio value="card">Debit/Credit Card</Radio>
              <Radio value="wallet">Wallet</Radio>
            </Radio.Group>

            <div className="border p-3 rounded-lg flex justify-between items-center">
              <span>••• 2000</span>
              <span>Debit</span>
              <Input
                placeholder="CVV"
                maxLength={3}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                style={{ width: 80 }}
              />
            </div>

            <div className="text-right mt-4">
              <Button
                type="primary"
                className="!bg-[#700C18] !rounded-lg w-full !text-white"
                // disabled={!cvv}
                onClick={handleConfirm}
              >
                CONFIRM PAYMENT
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DepositFlowModal;
