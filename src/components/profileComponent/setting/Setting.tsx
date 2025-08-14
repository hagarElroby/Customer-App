import SettingCard from "./SettingCard";
import ChangePasswordModal from "./ChangePasswordModal";
import { useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";
import TitleDesc from "@/components/shared/TitleDesc";

const Setting = () => {
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  return (
    <div className="flex flex-col gap-6 p-6">
      <TitleDesc
        isProfileTitle
        title="Setting"
        description="Manage & Secure Your Account"
      />
      <div className="flex w-full flex-col gap-4">
        <SettingCard
          onClick={() => setOpenDelete(true)}
          title="Delete Account"
          desc="Permanently Remove Your Account"
        />
        <SettingCard
          onClick={() => setIsChangePasswordModalOpen(true)}
          title="Change Password"
          desc="Secure Your Account with a New Password"
        />
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
      <DeleteAccountModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
      />
    </div>
  );
};

export default Setting;
