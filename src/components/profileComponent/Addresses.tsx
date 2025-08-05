import React, { useEffect, useState } from "react";
import TitleDesc from "../shared/TitleDesc";
import CustomButton from "../shared/CustomButton";
import { svgs } from "../icons/svgs";
import NoYetImg from "../shared/NoYetImg";
import NoYetText from "../shared/NoYetText";
import AddressForm from "./AddressForm";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AddressCard from "./AddressCard";

const Addresses = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { userProfileData } = useSelector(
    (state: RootState) => state.profile,
    shallowEqual,
  );

  console.log("userProfileData", userProfileData);

  return (
    <div className="p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <TitleDesc
          isProfileTitle
          title="Addresses"
          description="Manage your saved addresses for deliveries and billing. You can add, update, or remove addresses anytime."
        />

        {(userProfileData?.addresses ?? []).length < 1 && (
          <CustomButton
            className="uppercase text-sm font-bold"
            title="Add Address"
            icon={svgs.whitePlus}
            bgColor="#FFF4F4"
            color="#700c18"
            borderColor="none"
            hoverIcon={svgs.redPlus}
            hoverBgColor="#FFFFFF"
            hoverBorderColor="#700c18"
            onClick={() => setIsPopupOpen(true)}
          />
        )}
      </div>

      {(userProfileData?.addresses ?? []).length > 0 ? (
        <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
          {userProfileData?.addresses?.map((address, index) => (
            <AddressCard
              key={index}
              name={`${userProfileData.firstName} ${userProfileData.lastName}`}
              address={address}
              phone={userProfileData.phoneNumber}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-7 items-center justify-center h-full overflow-hidden mt-10">
          <NoYetImg />
          <NoYetText
            title="No Addresses Yet!"
            text="When you add Addresses, they’ll show up here."
          />
        </div>
      )}

      <AddressForm isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default Addresses;
