import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Input, Modal, Select } from "antd";
import CustomButton from "../shared/CustomButton";
import { svgs } from "../icons/svgs";
import iraqRegions from "../../../iraqRegions";
import Label from "./Label";
import { getMyProfile, updateAddress } from "@/services/profile";
import { cleanParams } from "@/utils/filterUndefined";
import showPopup from "../shared/ShowPopup";
import CustomHeaderInModal from "../shared/CustomHeaderInModal";
import { Address, AddressType } from "@/types/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setProfileData } from "@/redux/profileSlice";
import { toast } from "sonner";

const libraries: "places"[] = ["places"];
const center = { lat: 33.3152, lng: 44.3661 }; // Baghdad, Iraq

type AddressFormProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Address | null;
};

const AddressForm: React.FC<AddressFormProps> = ({
  isOpen,
  onClose,
  initialData,
}: AddressFormProps) => {
  const dispatch = useDispatch();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const { userProfileData } = useSelector((state: RootState) => state.profile);

  const isFirstAddress = !userProfileData?.addresses;

  const [markerPosition, setMarkerPosition] = useState(
    initialData?.geoLocation || center,
  );
  //   const addressInputRef = useRef<HTMLInputElement>(null);
  const [selectedType, setSelectedType] = useState<AddressType>(
    initialData?.type || "HOME",
  );

  const [formData, setFormData] = useState<Address>({
    country: initialData?.country || "",
    state: initialData?.state || "",
    city: initialData?.city || "",
    streetAddress: initialData?.streetAddress || "",
    address2: initialData?.address2 || "",
    apartment: initialData?.apartment || "",
    zipCode:
      initialData?.zipCode !== undefined
        ? Number(initialData.zipCode)
        : undefined,
    type: initialData?.type || "HOME",
    isDefault: initialData?.isDefault || false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setMarkerPosition(initialData.geoLocation || center);
      setSelectedType(initialData.type || "HOME");
    }
  }, [initialData]);

  useEffect(() => {
    if (
      markerPosition &&
      window.google &&
      window.google.maps &&
      window.google.maps.Geocoder
    ) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: markerPosition }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const addressComponents = results[0].address_components;

          // Extract address components
          const country = addressComponents.find((c) =>
            c.types.includes("country"),
          )?.long_name;
          const state = addressComponents.find((c) =>
            c.types.includes("administrative_area_level_1"),
          )?.long_name;
          const city = addressComponents.find((c) =>
            c.types.includes("locality"),
          )?.long_name;
          const street = addressComponents.find((c) =>
            c.types.includes("route"),
          )?.long_name;
          const zip = addressComponents.find((c) =>
            c.types.includes("postal_code"),
          )?.long_name;

          // Update form data
          setFormData((prev) => ({
            ...prev,
            country: country || "",
            state: state || "",
            city: city || "",
            streetAddress: street || "",
            zipCode: zip ? Number(zip) : undefined,
          }));
        }
      });
    }
  }, [markerPosition]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [cityOptions, setCityOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    if (initialData?.state) {
      const selectedRegionData = iraqRegions.find(
        (r) => r.name === initialData.state,
      );
      setCityOptions(
        selectedRegionData
          ? selectedRegionData.cities.map((city) => ({
              label: city,
              value: city,
            }))
          : [],
      );
    }
  }, [initialData?.state]);

  const handleRegionChange = (stateName: string) => {
    setFormData((prev) => ({ ...prev, state: stateName, city: "" }));
    const selectedRegionData = iraqRegions.find((r) => r.name === stateName);
    setCityOptions(
      selectedRegionData
        ? selectedRegionData.cities.map((city) => ({
            label: city,
            value: city,
          }))
        : [],
    );
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded || !isOpen) return null;

  const handleConfirm = async () => {
    if (!formData) return;
    const {
      country,
      state,
      city,
      streetAddress,
      apartment,
      address2,
      zipCode,
      type,
    } = formData;
    if (
      !country ||
      !state ||
      !city ||
      !streetAddress ||
      !apartment ||
      !type ||
      !zipCode ||
      !address2
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    const payload = { ...formData, geoLocation: markerPosition };

    await updateAddress({
      formData: {
        ...cleanParams(payload),
        //check if that is first address make it default address
        isDefault:
          isFirstAddress === true ? true : (formData.isDefault ?? false),
      },
      onSuccess: async (data) => {
        onClose();
        showPopup({ text: data, type: "success" });
        // Fetch updated profile data
        await getMyProfile({
          onSuccess: (profileData) => {
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
        onClose();
        showPopup({
          text: err.description || "An unexpected error occurred",
          type: "failed",
        });
      },
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeIcon={false}
      footer={null}
      height="auto"
      width="60vw"
      style={{
        borderRadius: "24px",
        minWidth: "250px",
        maxWidth: "900px",
      }}
      className="flex items-center justify-between"
    >
      {/* Custom Header */}
      <CustomHeaderInModal title="Add Address" onClose={onClose} />
      <div className="w-full h-[1px] bg-main mt-3" />
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Google Map Section */}
        <div className="w-full">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{
                width: "400px",
                height: "500px",
              }}
              center={markerPosition}
              zoom={15}
              onClick={handleMapClick}
            >
              <Marker position={markerPosition} />
            </GoogleMap>
          ) : (
            <p>Loading Map...</p>
          )}
        </div>

        {/* Address Form  */}
        <div className="flex flex-col gap-4 justify-between h-[500px] px-8 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <div className="flex flex-col gap-1">
                <Label label="Country" />
                <Select
                  showSearch
                  placeholder="Select"
                  value={formData.country}
                  optionFilterProp="label"
                  onChange={(value) => handleChange("country", value)}
                  options={[{ value: "Iraq", label: "Iraq" }]}
                  className="w-[120px] h-11"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label label="State/Region *" />
                <Select
                  showSearch
                  placeholder="Select"
                  value={formData.state}
                  optionFilterProp="label"
                  onChange={handleRegionChange}
                  disabled={!formData.country}
                  options={iraqRegions.map((region) => ({
                    label: region.name,
                    value: region.name,
                  }))}
                  className="w-[120px] h-11"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label label="City *" />
                <Select
                  showSearch
                  placeholder="Select"
                  optionFilterProp="label"
                  value={formData.city}
                  onChange={(val) => handleChange("city", val)}
                  disabled={!formData.state}
                  options={cityOptions}
                  className="w-[120px] h-11"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label label="Street Address *" />
              <Input
                placeholder="street address"
                value={formData.streetAddress}
                onChange={(e) => handleChange("streetAddress", e.target.value)}
                className="w-full h-11"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label label="Address2" />
              <Input
                placeholder="second address optional"
                value={formData.address2}
                onChange={(e) => handleChange("address2", e.target.value)}
                className="w-full h-11"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1 w-full">
                <Label label="Apartment, Suite, etc *" />
                <Input
                  placeholder="Name on card"
                  value={formData.apartment}
                  onChange={(e) => handleChange("apartment", e.target.value)}
                  className="w-full h-11"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Label label="Zip/Postal Code" />
                <Input
                  placeholder="zip code"
                  value={formData.zipCode}
                  onChange={(e) => handleChange("zipCode", e.target.value)}
                  className="w-full h-11"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 my-2">
              <CustomButton
                title="Home"
                icon={svgs.redHome}
                hoverIcon={svgs.redHome}
                onClick={() => {
                  handleChange("type", "HOME");
                  setSelectedType("HOME");
                }}
                bgColor="#E4D1D4"
                hoverBgColor="#E4D1D4"
                color="#700c18"
                hoverColor="#700c18"
                borderRadius="46px"
                borderColor={
                  selectedType === "HOME" ? "#700c18" : "transparent"
                }
                width="188px"
                height="42px"
              />

              <CustomButton
                title="Work"
                icon={svgs.blackWork}
                hoverIcon={svgs.blackWork}
                onClick={() => {
                  handleChange("type", "WORK");
                  setSelectedType("WORK");
                }}
                bgColor="#F3F4F8"
                hoverBgColor="#F3F4F8"
                color="#000000"
                hoverColor="#700c18"
                borderRadius="46px"
                borderColor={
                  selectedType === "WORK" ? "#700c18" : "transparent"
                }
                width="188px"
                height="42px"
              />
            </div>
          </div>
          <CustomButton
            title="CONFIRM"
            onClick={handleConfirm}
            borderRadius="5px"
            height="60px"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddressForm;
