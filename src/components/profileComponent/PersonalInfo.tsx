"use-client";
import React, { useEffect, useState } from "react";
import EditableInput from "./EditableInput";
import Label from "./Label";
import BirthdayInput from "./BirthdayInput";
import NationalityDropdown from "./Nationality";
import { useDispatch, useSelector } from "react-redux";
import { getChangedFields } from "@/utils/getUpdatedFields";
import OTPPopup from "./OTPPopup";
import {
  validateEmail,
  validateName,
  validateTitle,
} from "@/utils/validationUtils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UpdateProfile } from "@/types/user";
import CustomButton from "../shared/CustomButton";
import TitleDesc from "../shared/TitleDesc";
import UploadPhotoCrop from "./UploadPhotoCrop";
import { AppDispatch, RootState } from "@/redux/store";
import { sendEmailOtp, updateProfile } from "@/services/profile";
import { updateUser } from "@/redux/authSlice";
import showPopup from "../shared/ShowPopup";
import { text } from "stream/consumers";

const PersonalInfo = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { userProfileData } = useSelector((state: RootState) => state.profile);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<UpdateProfile>>({
    profilePicture: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    nationality: "",
  });

  useEffect(() => {
    if (userProfileData) {
      setFormData({
        profilePicture: userProfileData?.profilePicture,
        firstName: userProfileData.firstName,
        middleName: userProfileData?.middleName,
        lastName: userProfileData.lastName,
        email: userProfileData?.email,
        dateOfBirth: userProfileData?.dateOfBirth,
        nationality: userProfileData?.nationality,
      });
    }
  }, [userProfileData]);

  const handleFieldChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handlePictureChange = (url: string) => {
    setFormData((prev) => ({ ...prev, profilePicture: url }));
  };

  const handleDateOfBirthChange = (value: string) => {
    try {
      const trimmedValue = value.trim();
      const date = new Date(trimmedValue);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      const isoString = date.toISOString();
      setFormData({
        ...formData,
        dateOfBirth: isoString,
      });
    } catch (error) {
      toast.error("Invalid date format");
    }
  };

  const changedData =
    userProfileData && getChangedFields(userProfileData, formData);
  let hasChanges = userProfileData && Object.keys(changedData).length > 0;

  const handleUpdate = async () => {
    const updatedData = getChangedFields(userProfileData, formData);
    const fNameError = validateName(formData.firstName || "", "First Name");
    const lNameError = validateName(formData.lastName || "", "Last Name");
    const mNameError = validateName(formData.middleName || "", "Middle Name");
    const emailError = validateEmail(formData.email || "");

    if (fNameError.length > 0) {
      toast.error(fNameError);
      return;
    }
    if (lNameError.length > 0) {
      toast.error(lNameError);
      return;
    }
    if (mNameError.length > 0) {
      toast.error(mNameError);
      return;
    }
    if ("nationality" in updatedData) {
      const nationalityErr = validateTitle(
        formData.nationality || "",
        "Nationality",
      );
      if (nationalityErr.length > 0) {
        toast.error(nationalityErr);
        return;
      }
    }

    if ("email" in updatedData) {
      if (emailError.length > 0) {
        toast.error(emailError);
        return;
      }
      if (formData.email && userProfileData?._id) {
        setLoading(true);
        await sendEmailOtp({
          email: formData.email,
          id: userProfileData?._id,
          onSuccess: (data) => {
            toast.success("OTP sent successfully!");
            setShowOTPPopup(true);
            setLoading(false);
          },
          onError: (err) => {
            toast.error(err.description);
            setLoading(false);
          },
        });
        // Stop further execution until OTP is verified
        return;
      }
    }

    // If no email update, directly dispatch profile update
    setLoading(true);
    await updateProfile({
      formData: updatedData,
      onSuccess: (data) => {
        showPopup({ text: "Profile updated successfully!", type: "success" });
        dispatch(updateUser(updatedData));
        setLoading(false);
        setShowOTPPopup(false);
        router.back();
      },
      onError: (err) => {
        toast.error(err.description);
        setLoading(false);
      },
    });
  };

  const handleOtpEntered = async (otp: string) => {
    const updatedData = getChangedFields(userProfileData, formData);
    updatedData.otp = otp;
    setLoading(true);
    await updateProfile({
      formData: updatedData,
      onSuccess: (data) => {
        showPopup({ text: "Profile updated successfully!", type: "success" });
        dispatch(updateUser(updatedData));
        setLoading(false);
        setShowOTPPopup(false);
      },
      onError: (err) => {
        toast.error(err.description);
        setLoading(false);
      },
    });
  };

  const handleResend = async () => {
    setResendTimer(20); // reset timer
    if (formData.email && userProfileData?._id) {
      await sendEmailOtp({
        email: formData.email,
        id: userProfileData?._id,
        onSuccess: (data) => {
          toast.success("OTP sent successfully!");
          setShowOTPPopup(true);
        },
        onError: (err) => {
          toast.error(err.description);
        },
      });
    }
  };

  // Countdown
  useEffect(() => {
    if (resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  return (
    <div className="flex items-start flex-col gap-9">
      <div className="flex flex-col items-start gap-2 w-full">
        <TitleDesc
          isProfileTitle
          title="Personal Info"
          description="Complete your personal info for a faster and smoother shopping experience."
        />
        <UploadPhotoCrop
          onPictureChange={handlePictureChange}
          picture={userProfileData?.profilePicture || ""}
        />
        <div className="w-full h-[0.5px] bg-main"></div>
      </div>

      <div className="flex flex-col gap-7 w-full">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-start gap-2 flex-1">
            <Label label="First name" />
            <EditableInput
              text={formData.firstName || ""}
              setText={(value) => handleFieldChange("firstName", value)}
            />
          </div>
          <div className="flex flex-col items-start gap-2 flex-1">
            <Label label="Middle name" />
            <EditableInput
              text={formData.middleName || ""}
              setText={(value) => handleFieldChange("middleName", value)}
            />
          </div>
          <div className="flex flex-col items-start gap-2 flex-1">
            <Label label="Last name" />
            <EditableInput
              text={formData.lastName || ""}
              setText={(value) => handleFieldChange("lastName", value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-6 w-full">
          <div className="flex flex-col items-start gap-2 flex-1">
            <Label label="Phone number" />
            <EditableInput
              text={userProfileData?.phoneNumber || ""}
              noEdit={true}
            />
          </div>
          <div className="flex flex-col items-start gap-2 flex-1">
            <Label label="Email" />
            <EditableInput
              text={formData.email || ""}
              setText={(value) => handleFieldChange("email", value)}
            />
          </div>
          <div className="flex flex-col items-start gap-2 flex-1">
            <Label label="Birthday" />
            <BirthdayInput
              birthDate={formData.dateOfBirth || ""}
              setBirthDate={(value) => handleDateOfBirthChange(value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-2 w-1/3">
            <Label label="Nationality" />
            <NationalityDropdown
              value={formData.nationality || ""}
              onChange={(value) => handleFieldChange("nationality", value)}
            />
          </div>
          <CustomButton
            className="w-[177px] py-3 uppercase"
            borderRadius="0"
            onClick={handleUpdate}
            title="Update profile"
            disabled={!hasChanges || loading}
          />
        </div>
      </div>

      <OTPPopup
        isOpen={showOTPPopup}
        onClose={() => setShowOTPPopup(false)}
        onOtpEntered={handleOtpEntered}
        email={formData.email || ""}
        onResend={handleResend}
        resendTimer={resendTimer}
      />
    </div>
  );
};

export default PersonalInfo;
