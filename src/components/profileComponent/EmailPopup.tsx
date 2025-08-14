"use client";
import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import CustomHeaderInModal from "../shared/CustomHeaderInModal";

const EmailPopup = ({
  onSubmit,
  isOpen,
  onClose,
}: {
  onSubmit: (email: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [form] = useForm<{ email: string }>();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      footer={null}
      height="auto"
      style={{ borderRadius: "24px" }}
      closeIcon={false}
      className="flex flex-col items-center justify-between gap-2"
    >
      <CustomHeaderInModal title="Enter Your Email Address" onClose={onClose} />
      <div className="h-[1px] w-full bg-[#700c18]" />
      <div className="flex h-[200px] w-[400px] flex-col items-center justify-center gap-6 p-5">
        <Form
          className="signup-form w-full"
          layout="vertical"
          form={form}
          size="large"
          onFinish={(e) => {
            onSubmit(e.email);
          }}
        >
          <div className="flex w-full flex-col items-center justify-center gap-5">
            <Form.Item
              className="w-full"
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email address",
                },
              ]}
            >
              <Input className="w-full" />
            </Form.Item>
            <Button
              className="w-full max-w-[380px]"
              type="primary"
              htmlType="submit"
            >
              Send OTP to Your Email
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default EmailPopup;
