import { Switch } from "antd";
import React, { useState } from "react";
import AddressForm from "./AddressForm";
import { Address } from "@/types/user";
import { useProfile } from "@/hooks/userProfile";
import { updateAddress } from "@/services/profile";
import showPopup from "../shared/ShowPopup";

type AddressData = {
  name: string;
  address: Address;
  phone: string;
};

const AddressCard = ({ name, address, phone }: AddressData) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const { refetchProfile } = useProfile();
  const onChange = async (newChecked: boolean) => {
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
        refetchProfile();
      },
      onError: (err) => {
        showPopup({
          text: err.description || "An unexpected error occurred",
          type: "failed",
        });
      },
    });
  };

  const handleConfirmDeleteAddress = async () => {
    await updateAddress({
      formData: {
        geoLocation: {
          lat: 0,
          lng: 0,
          // _id: "68663bf668ef6d374cd66bdd",
        },
        type: address.type,
        isDefault: true,
        country: "",
        zipCode: "",
        state: "",
        city: "",
        streetAddress: "",
        address2: "",
        apartment: "",
      },
      onSuccess: (data) => {
        showPopup({ text: data, type: "success" });
        refetchProfile();
      },
      onError: (err) => {
        showPopup({
          text: err.description || "An unexpected error occurred",
          type: "failed",
        });
      },
    });
  };

  return (
    <div className="flex h-[250px] w-[93vw] max-w-[710px] flex-col gap-6 overflow-auto rounded-lg bg-white px-10 py-8 xl:w-[45vvw]">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-profileLabel">
          {address.type}
        </h3>
        <div className="flex items-center gap-10">
          <button
            onClick={() =>
              showPopup({
                text: "Are you want to delete this address",
                type: "failed",
                isQuestion: true,
                titleError: "Confirm",
                onConfirm: handleConfirmDeleteAddress,
              })
            }
            className="text-sm font-normal text-[#9BA0B1] underline"
          >
            Delete
          </button>
          <button
            onClick={() => setIsEditOpen(true)}
            className="text-sm font-normal text-[#9BA0B1] underline"
          >
            Edit
          </button>
          <div className="flex cursor-pointer items-center gap-3">
            <span className="text-sm font-normal text-main">
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
        <div className="flex items-start justify-start gap-8">
          <span className="text-sm font-normal text-[#9BA0B1]">Name</span>
          <p className="mb-0 text-sm font-normal text-[#404553]">{name}</p>
        </div>
        <div className="flex items-start justify-start gap-8">
          <span className="text-sm font-normal text-[#9BA0B1]">Address</span>
          <p className="mb-0 text-sm font-normal text-[#404553]">
            <span className="font-bold">{address?.apartment} </span>
            {" , "}
            <span className="font-bold"> {address?.streetAddress} </span>
            {" , "}
            {address?.city}
            {" , "}
            {address?.state}
            {" , "} {address?.country}
          </p>
        </div>
        <div className="flex items-start justify-start gap-8">
          <span className="text-sm font-normal text-[#9BA0B1]">Phone</span>
          <p className="mb-0 text-sm font-normal text-[#404553]">{phone}</p>
        </div>
      </div>

      {/* Edit Address Popup */}
      <AddressForm
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={address}
      />
    </div>
  );
};

export default AddressCard;
