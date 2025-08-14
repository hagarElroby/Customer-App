import React from "react";
import { Modal, Button } from "antd";
import showPopup from "@/components/shared/ShowPopup";
import CustomHeaderInModal from "@/components/shared/CustomHeaderInModal";
import { deleteAccount } from "@/services/profile/delete-account";
import { svgs } from "@/components/icons/svgs";
import { useLogout } from "@/hooks/useLogout";

const DeleteAccountModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const logoutUser = useLogout();

  const points = [
    "Your profile information, photos, and posts will be deleted.",
    "You will lose access to all your activity history and interactions.",
    "Any active subscriptions or services tied to your account will be canceled.",
    "You won't be able to log in with this email once deletion is complete.",
    "You have 30 days to recover your account by logging in before it’s permanently deleted.",
  ];

  const handleConfirm = async () => {
    await deleteAccount({
      onSuccess: (res) => {
        onClose();
        showPopup({
          text:
            `${res.message} You can still log in and restore it within the next 30 days. After that, it will be permanently removed.` ||
            "Your account has been deleted successfully.",
          type: "success",
          onConfirm: () => {
            logoutUser();
          },
          duration: 5000,
        });
        //any way after that time logout user
        setTimeout(() => {
          logoutUser();
        }, 5300);
      },
      onError: (err) => {
        onClose();
        showPopup({
          text: err.description || "unexpected error occurred",
          type: "failed",
        });
      },
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      bodyStyle={{ borderRadius: "10px" }}
    >
      <CustomHeaderInModal title="Delete Account" onClose={onClose} />
      <div className="mb-4 mt-2 border-b border-[#700c18]" />

      <p className="text-gray-700 mb-4 text-sm">
        Are you sure you want to delete your account?
      </p>

      <ul className="mb-2 flex flex-col gap-3">
        {points.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span>{svgs.grayCircle}</span>
            <p className="text-gray-600 text-sm">
              <strong>{item.split(":")[0]}</strong>{" "}
              {item.includes(":") && item.split(":")[1]}
            </p>
          </li>
        ))}
      </ul>

      <p className="text-gray-500 mt-4 text-xs">
        By clicking Delete below, I acknowledge that I have read and understand
        the above and that I wish to delete my account.
      </p>

      <Button
        block
        className="mt-6 h-12 rounded bg-[#700c18] font-semibold text-white"
        onClick={() => {
          onClose();
          showPopup({
            titleError: "Confirm",
            text: "By clicking confirm below, I acknowledge that I have read and understand the above and that I wish to delete my account.",
            type: "failed",
            onConfirm: handleConfirm,
          });
        }}
      >
        Delete Account
      </Button>
    </Modal>
  );
};

export default DeleteAccountModal;
