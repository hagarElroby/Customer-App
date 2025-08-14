import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import CustomHeaderInModal from "@/components/shared/CustomHeaderInModal";

const ChangePasswordModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword) newErrors.currentPassword = "Required";
    if (!newPassword) newErrors.newPassword = "Required";
    else if (newPassword.length < 6 || !/[!$@%]/.test(newPassword))
      newErrors.newPassword =
        "Must be at least 6 characters and include a special character (!@$%)";
    if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    //TODO:: add API integration
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      bodyStyle={{
        borderRadius: "10px",
      }}
    >
      <CustomHeaderInModal title="Change Password" onClose={onClose} />
      <div className="mb-4 mt-2 border-b border-[#700c18]" />

      <p className="text-gray-500 mb-6 text-sm">
        Use the form below to change the password for your account
      </p>

      <div className="flex flex-col gap-4">
        <div>
          <Input.Password
            placeholder="Current password"
            value={formData.currentPassword}
            onChange={(e) => handleChange("currentPassword", e.target.value)}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            className={`h-11 border ${errors.currentPassword ? "border-red-500" : "border-green-500"}`}
          />
        </div>

        <div>
          <Input.Password
            placeholder="New password *"
            value={formData.newPassword}
            onChange={(e) => handleChange("newPassword", e.target.value)}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            className={`h-11 border ${
              errors.newPassword ? "border-red-500" : ""
            }`}
          />
          {errors.newPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.newPassword}</p>
          )}
        </div>

        <div>
          <Input.Password
            placeholder="Confirm password *"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            className={`h-11 border ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <p className="text-gray-500 mt-1 text-xs">
          Your new password must be at least 6 characters and should include a
          combination of numbers, letters and special characters (!$@%).
        </p>

        <Button
          block
          className="mt-4 h-12 rounded bg-[#700c18] font-semibold text-white"
          onClick={handleSubmit}
        >
          Update Password
        </Button>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
