import React, { useState } from "react";
import AddressForm from "./AddressForm";
import AddressCard from "./AddressCard";
// import { useProfile } from "@/app/context/ProfileContext";
import NoYetComponent from "../shared/NoYetComponent";
import { Address } from "@/types/user";
import TitleDesc from "../shared/TitleDesc";
import CustomButton from "../shared/CustomButton";
import { svgs } from "../icons/svgs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Addresses = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { userProfileData } = useSelector((state: RootState) => state.profile);
  // Check if at least one property in the address is non-empty/non-zero
  const isValidAddress = (address: Address): boolean => {
    const { geoLocation } = address;

    if (
      !geoLocation ||
      typeof geoLocation.lat !== "number" ||
      typeof geoLocation.lng !== "number"
    ) {
      return false;
    }

    return geoLocation.lat !== 0 && geoLocation.lng !== 0;
  };

  // Count valid addresses
  const validAddresses = (userProfileData?.addresses ?? []).filter(
    isValidAddress,
  );

  return (
    <div className="flex flex-col gap-3 p-6">
      <div className="flex items-center justify-between">
        <TitleDesc
          isProfileTitle
          title="Addresses"
          description="Manage your saved addresses for deliveries and billing. You can add, update, or remove addresses anytime."
        />

        {/* Show "Add Address" button if there is space for more addresses */}
        {validAddresses.length < 2 && (
          <CustomButton
            className="text-sm font-bold uppercase"
            title="Add Address"
            icon={svgs.redPlus}
            bgColor="#FFF4F4"
            color="#700c18"
            borderColor="none"
            fontWight="700"
            hoverIcon={svgs.redPlus}
            hoverBgColor="#FFFFFF"
            hoverBorderColor="#700c18"
            onClick={() => setIsPopupOpen(true)}
          />
        )}
      </div>

      {validAddresses.length > 0 ? (
        <div className="flex flex-col items-center justify-between gap-4 xl:flex-row">
          {validAddresses.map((address) => (
            <AddressCard
              key={address?.type}
              name={`${userProfileData?.firstName} ${userProfileData?.lastName}`}
              address={address}
              phone={userProfileData?.phoneNumber ?? ""}
            />
          ))}
        </div>
      ) : (
        <NoYetComponent
          title="No Addresses Yet!"
          text="When you add Addresses, they’ll show up here."
        />
      )}

      <AddressForm isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default Addresses;
