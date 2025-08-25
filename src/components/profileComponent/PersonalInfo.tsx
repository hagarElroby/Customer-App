"use-client";
import React, { useEffect, useState } from "react";
import EditableInput from "./EditableInput";
import Label from "./Label";
import BirthdayInput from "./BirthdayInput";
import NationalityDropdown from "./Nationality";
import { useDispatch, useSelector } from "react-redux";
import { getChangedFields } from "@/utils/getUpdatedFields";
import dayjs from "dayjs";
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
import { useProfile } from "@/hooks/userProfile";
import {
  updatePhoneNumber,
  verifyPhoneNumberUpdate,
} from "@/services/profile/update-phone";
import { updateEmail, verifyEmailOtp } from "@/services/profile/email";
import EmailPopup from "./EmailPopup";

const PersonalInfo = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, refetchProfile } = useProfile();
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const { userProfileData } = useSelector((state: RootState) => state.profile);
  const [showEmailOTPPopup, setEmailShowOTPPopup] = useState(false);
  const [showPhoneOTPPopup, setPhoneShowOTPPopup] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [formData, setFormData] = useState<Partial<UpdateProfile>>({
    profilePicture: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    nationality: "",
  });
  const [resendTimer, setResendTimer] = useState(60);
  const [startCountdown, setStartCountdown] = useState(false);

  useEffect(() => {
    if (userProfileData) {
      setFormData({
        profilePicture: userProfileData?.profilePicture,
        firstName: userProfileData.firstName,
        middleName: userProfileData?.middleName,
        lastName: userProfileData.lastName,
        phoneNumber: userProfileData.phoneNumber,
        email: userProfileData?.email,
        dateOfBirth: userProfileData?.dateOfBirth,
        nationality: userProfileData?.nationality,
      });
    }
  }, [userProfileData]);

  const emailStatus =
    userProfileData?.email === null || userProfileData?.email === undefined
      ? "Add Email"
      : userProfileData?.isEmailVerified === false
        ? "Verify"
        : "update";

  const handleFieldChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  const handlePictureChange = async (url: string) => {
    if (!url) return;
    await updateProfile({
      formData: { profilePicture: url },
      onSuccess: (res) => {
        showPopup({
          text: res.message || "Profile updated successfully!",
          type: "success",
        });
        refetchProfile();
      },
      onError: (err) => {
        toast.error(err.description);
      },
    });
  };

  const handleUpdateFieldName = async (fieldName: string, value: string) => {
    await updateProfile({
      formData: { [fieldName]: value },
      onSuccess: (res) => {
        showPopup({
          text: res.message || "Profile updated successfully!",
          type: "success",
        });
        refetchProfile();
      },
      onError: (err) => {
        toast.error(err.description);
      },
    });
  };

  const handleDateOfBirthChange = async (value: string) => {
    try {
      const trimmedValue = value.trim();
      const date = new Date(trimmedValue);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      const localISOString = dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

      setFormData({
        ...formData,
        dateOfBirth: localISOString,
      });

      await updateProfile({
        formData: { dateOfBirth: localISOString },
        onSuccess: (res) => {
          showPopup({
            text: res.message || "Date of birth updated successfully!",
            type: "success",
          });
          refetchProfile();
        },
        onError: (err) => {
          toast.error(err.description);
        },
      });
    } catch (error) {
      toast.error((error as Error).message || "An unexpected error occurred");
    }
  };

  const handleUpdateNationality = async (value: string) => {
    setFormData({
      ...formData,
      nationality: value,
    });
    await updateProfile({
      formData: { nationality: value },
      onSuccess: (res) => {
        showPopup({
          text: res.message || "Profile updated successfully!",
          type: "success",
        });
        refetchProfile();
      },
      onError: (err) => {
        toast.error(err.description);
      },
    });
  };

  const handleUpdatePhoneNumber = async (value: string) => {
    setFormData({
      ...formData,
      phoneNumber: value,
    });

    if (profile) {
      await updatePhoneNumber({
        formData: {
          id: profile?._id,
          currentPhoneNumber: profile?.phoneNumber,
          newPhoneNumber: value,
          role: "SELLER",
        },
        onSuccess: (res) => {
          toast.success(
            res.message ||
              "Phone number updated successfully. Please verify your new phone number and login again",
          );
          setPhoneShowOTPPopup(true);
        },
        onError: (err) => {
          toast.error(err.description);
        },
      });
    }
  };

  const handleVerfiyPhoneOTP = async (otp: string) => {
    await verifyPhoneNumberUpdate({
      phoneNumber: formData?.phoneNumber || "",
      role: "SELLER",
      code: otp,
      onSuccess: (res) => {
        showPopup({
          text: res.message || "Phone number updated successfully",
          type: "success",
        });
        setPhoneShowOTPPopup(false);
      },
      onError: (e) => {
        showPopup({
          text: e.description || "failed to verify otp",
          type: "failed",
        });
      },
    });
  };

  const handleUpdateEmail = async (value: string) => {
    // const emailError = validateEmail(formData.email || "");
    // if (emailError.length > 0) {
    //   toast.error(emailError);
    //   return;
    // }

    setFormData({
      ...formData,
      email: value,
    });

    if (profile) {
      await updateEmail({
        formData: {
          id: profile?._id,
          ...(profile.email && { currentEmail: profile?.email }),
          newEmail: value,
          role: "SELLER",
        },
        onSuccess: (res) => {
          setEmailShowOTPPopup(false);
          toast.success(res.message || "OTP has been sent to your email");
          setEmailShowOTPPopup(true);
          setStartCountdown(true);
        },
        onError: (err) => {
          toast.error(err.description);
        },
      });
    }
  };

  const handleVerfiyEmailOTP = async (otp: string) => {
    await verifyEmailOtp({
      email: formData?.email || "",
      id: profile?._id || "",
      code: otp,
      onSuccess: (res) => {
        showPopup({
          text: res.message || "Email updated successfully",
          type: "success",
        });
        setEmailShowOTPPopup(false);
        localStorage.removeItem("verificationEmail");
      },
      onError: (e) => {
        showPopup({
          text: e.description || "failed to verify otp",
          type: "failed",
        });
      },
    });
  };

  const handleResend = async () => {
    setResendTimer(60); // reset timer
    if (formData.email && profile?._id) {
      await sendEmailOtp({
        email: formData.email,
        id: profile?._id,
        onSuccess: (res) => {
          toast.success("OTP sent successfully!");
          // setEmailShowOTPPopup(true);
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

      <div className="flex w-full flex-col gap-7">
        <div className="flex items-center gap-6">
          <div className="flex flex-1 flex-col items-start gap-2">
            <Label label="First name" />
            <EditableInput
              text={formData.firstName || ""}
              setText={(value) => handleFieldChange("firstName", value)}
              handleUpdate={(val) => handleUpdateFieldName("firstName", val)}
            />
          </div>
          <div className="flex flex-1 flex-col items-start gap-2">
            <Label label="Middle name" />
            <EditableInput
              text={formData.middleName || ""}
              setText={(value) => handleFieldChange("middleName", value)}
              handleUpdate={(val) => handleUpdateFieldName("middleName", val)}
            />
          </div>
          <div className="flex flex-1 flex-col items-start gap-2">
            <Label label="Last name" />
            <EditableInput
              text={formData.lastName || ""}
              setText={(value) => handleFieldChange("lastName", value)}
              handleUpdate={(val) => handleUpdateFieldName("lastName", val)}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-6">
          <div className="flex flex-1 flex-col items-start gap-2">
            <Label label="Phone number" />
            <EditableInput
              text={formData.phoneNumber || ""}
              //TODO:: show edit after confirmation from team
              handleUpdate={(val) => handleUpdatePhoneNumber(val)}
              noEdit
            />
          </div>
          <div className="flex flex-1 flex-col items-start gap-2">
            <Label label="Email" />
            <EditableInput
              text={formData.email || ""}
              setText={(value) => handleFieldChange("email", value)}
              isEmail
              emailStatus={emailStatus}
              // handleUpdate={handleUpdateEmail}
              onEmailFieldClicked={() => {
                if (emailStatus === "Verify") {
                  handleUpdateEmail(profile?.email || "");
                } else {
                  setShowEmailPopup(true);
                }
              }}
            />
          </div>
          <div className="flex flex-1 flex-col items-start gap-2">
            <Label label="Birthday" />
            <BirthdayInput
              birthDate={formData.dateOfBirth || ""}
              setBirthDate={(value) => handleDateOfBirthChange(value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex w-1/3 flex-col items-start gap-2">
            <Label label="Nationality" />
            <NationalityDropdown
              value={formData.nationality || ""}
              onChange={(value) => handleUpdateNationality(value)}
            />
          </div>
        </div>
      </div>
      <EmailPopup
        isOpen={showEmailPopup}
        onClose={() => setShowEmailPopup(false)}
        onSubmit={handleUpdateEmail}
      />

      <OTPPopup
        title="Verify E-mail Address"
        isOpen={showEmailOTPPopup}
        onClose={() => setEmailShowOTPPopup(false)}
        onOtpEntered={handleVerfiyEmailOTP}
        text={formData.email || ""}
        onResend={handleResend}
        resendTimer={resendTimer}
      />
    </div>
  );
};

export default PersonalInfo;
