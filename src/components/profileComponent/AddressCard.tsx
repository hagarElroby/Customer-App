import { Address } from "@/types/user";
import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import { getMyProfile, updateAddress } from "@/services/profile";
import showPopup from "../shared/ShowPopup";
import { useDispatch } from "react-redux";
import { setProfileData } from "@/redux/profileSlice";

type AddressData = {
  name: string;
  address: Address;
  phone: string;
};

const AddressCard = ({ name, address, phone }: AddressData) => {
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const onChange = async (newChecked: boolean) => {
    try {
      await updateAddress({
        formData: {
          country: address.country,
          city: address.city,
          streetAddress: address.streetAddress,
          address2: address.address2,
          apartment: address.apartment,
          state: address.state,
          geoLocation: address.geoLocation,
          type: address.type,
          zipCode: address.zipCode,
          isDefault: newChecked,
        },
        onSuccess: async (data) => {
          showPopup({ text: data, type: "success" });
          // Fetch updated profile data
          await getMyProfile({
            onSuccess: (profileData) => {
              console.log("Profile data updated", profileData);
              dispatch(setProfileData(profileData)); // Update Redux store
            },
            onError: (err) => {
              showPopup({
                text: err.description || "Failed to refresh profile",
                type: "failed",
              });
            },
          });
        },
        onError: (err) => {
          showPopup({
            text: err.description || "An unexpected error occurred",
            type: "failed",
          });
        },
      });
    } catch (error) {
      showPopup({ text: "Failed to update address", type: "failed" });
    }
  };

  return (
    <div className="max-w-[710px] w-[93vw] xl:w-[45vvw] bg-white h-[250px] py-8 px-10 rounded-lg flex flex-col gap-6 overflow-auto">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-base text-profileLabel">
          {address.type}
        </h3>
        <div className="flex items-center gap-10">
          <button
            onClick={() => setIsEditOpen(true)}
            className="text-[#9BA0B1] text-sm font-normal underline"
          >
            Edit
          </button>
          <div className="flex items-center gap-3 cursor-pointer">
            <span className="text-main text-sm font-normal">
              Default address
            </span>
            <Switch
              checked={address.isDefault}
              defaultChecked
              onChange={onChange}
              style={{
                backgroundColor: address.isDefault ? "#700c18" : "#EBEBEB",
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-start gap-8">
          <span className="text-sm font-normal text-[#9BA0B1]">Name</span>
          <p className="font-normal text-sm text-[#404553]">{name}</p>
        </div>
        <div className="flex items-center justify-start gap-8">
          <span className="text-sm font-normal text-[#9BA0B1]">Address</span>
          <p className="font-normal text-sm text-[#404553]">
            <span className="font-bold">{address?.geoLocation?.lat}</span>
            <span className="font-bold">{address?.geoLocation?.lng}</span>{" "}
            {address?.address2}
            {address?.apartment}
            {address?.city}
            {address?.country}
            {address?.streetAddress}
            {address?.state}
          </p>
        </div>
        <div className="flex items-center justify-start gap-8">
          <span className="text-sm font-normal text-[#9BA0B1]">Phone</span>
          <p className="font-normal text-sm text-[#404553]">{phone}</p>
        </div>
      </div>

      {/* Edit Address Popup */}
      <AddressForm
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={address} // Pass address data for editing
      />
    </div>
  );
};

export default AddressCard;
