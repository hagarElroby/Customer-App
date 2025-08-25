import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Input, Modal, Select } from "antd";
import CustomButton from "../shared/CustomButton";
import { svgs } from "../icons/svgs";
import Label from "./Label";
import { updateAddress } from "@/services/profile";
import { cleanParams } from "@/utils/filterUndefined";
import showPopup from "../shared/ShowPopup";
import CustomHeaderInModal from "../shared/CustomHeaderInModal";
import { Address, AddressType } from "@/types/user";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { useProfile } from "@/hooks/userProfile";

const libraries: "places"[] = ["places"];

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
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const { userProfileData } = useSelector((state: RootState) => state.profile);
  const { refetchProfile } = useProfile();

  const isFirstAddress = !userProfileData?.addresses;

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [markerPosition, setMarkerPosition] = useState({
    lat: 33.3152, // Default Middle East coordinates (e.g., Baghdad)
    lng: 44.3661, //44.3661
  });
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
        ? String(initialData.zipCode)
        : undefined,
    type: initialData?.type || "HOME",
    isDefault: initialData?.isDefault || false,
  });

  // Update formData and markerPosition whenever initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        country: initialData.country || "",
        state: initialData.state || "",
        city: initialData.city || "",
        streetAddress: initialData.streetAddress || "",
        address2: initialData.address2 || "",
        apartment: initialData.apartment || "",
        zipCode: initialData.zipCode || undefined,
        type: initialData.type || "HOME",
        isDefault: initialData.isDefault || false,
        geoLocation: initialData.geoLocation,
        contact: initialData.contact,
      });
      setMarkerPosition(
        initialData.geoLocation || { lat: 33.3152, lng: 44.3661 },
      );
      setSelectedType(initialData.type || "HOME");
    }
  }, [initialData, isOpen]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition({ lat: latitude, lng: longitude });
        },
        () => {
          console.error("Error getting user's location.");
        },
      );
    }
  }, []);

  // Synchronize form data with the map position

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

          // Update form data with address components
          setFormData((prev) => ({
            ...prev,
            country: country || prev.country,
            state: state || prev.state,
            city: city || prev.city,
            streetAddress: street || prev.streetAddress,
            zipCode: zip ? zip : prev.zipCode,
          }));
        }
      });
    }
  }, [markerPosition]);

  const handleChange = (field: string, value: string) => {
    if (field === "phoneNumber") {
      setFormData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          phoneNumber: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
    // Clear error if user starts typing
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateField = (field: string, value: string) => {
    if (!value && field !== "address2" && field !== "apartment") {
      setErrors((prev) => ({ ...prev, [field]: "This field is required" }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const [cityOptions, setCityOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  const handleClose = () => {
    setFormData({
      country: "",
      state: "",
      city: "",
      streetAddress: "",
      address2: "",
      apartment: "",
      zipCode: undefined,
      type: "HOME",
      isDefault: false,
    });

    setMarkerPosition({ lat: 0, lng: 0 });
    onClose();
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
    if (payload?.contact?.phoneNumber === "") {
      delete payload.contact;
    }
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
        setFormData({
          country: "",
          state: "",
          city: "",
          streetAddress: "",
          address2: "",
          apartment: "",
          zipCode: undefined,
          type: "HOME",
          isDefault: false,
          geoLocation: { lat: 0, lng: 0 },
          contact: { phoneNumber: "" },
        });
        refetchProfile();
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
      onCancel={handleClose}
      closeIcon={false}
      footer={null}
      height="auto"
      width="60vw"
      style={{
        borderRadius: "24px",
        minWidth: "250px",
        maxWidth: "900px",
        padding: "26px 34px",
      }}
      className="flex items-center justify-between"
    >
      <CustomHeaderInModal title="Add Address" onClose={onClose} />
      <div className="mt-3 h-[1px] w-full bg-main" />
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{
                width: "460px",
                height: "100%",
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

        <div className="flex h-full flex-col justify-between gap-4 px-8 py-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2">
              <div className="flex flex-col gap-2">
                <Label label="Country" />
                <Input
                  placeholder="Enter Country"
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className={`h-11 w-full ${errors.country ? "border-red-500" : ""}`}
                  onBlur={() =>
                    validateField("country", formData?.country || "")
                  }
                />
                <span className="text-xs text-red-500">{errors.country}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Label label="State/Region *" />
                <Input
                  placeholder="Enter State or Region"
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  className="h-11 w-full"
                  onBlur={() => validateField("state", formData?.state || "")}
                />
                <span className="text-xs text-red-500">{errors.start}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Label label="City *" />
                <Input
                  placeholder="Enter City"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="h-11 w-full"
                  onBlur={() => validateField("city", formData?.city || "")}
                />
                <span className="text-xs text-red-500">{errors.city}</span>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label label="Street Address *" />
              <Input
                placeholder="street address"
                value={formData.streetAddress}
                onChange={(e) => handleChange("streetAddress", e.target.value)}
                className="h-11 w-full"
                onBlur={() =>
                  validateField("streetAddress", formData?.streetAddress || "")
                }
              />
              <span className="text-xs text-red-500">
                {errors.streetAddress}
              </span>
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label label="Address2" />
              <Input
                placeholder="second address optional"
                value={formData.address2}
                onChange={(e) => handleChange("address2", e.target.value)}
                className="h-11 w-full"
              />
            </div>
            <div className="flex items-start gap-2">
              <div className="flex w-full flex-col gap-2">
                <Label label="Apartment, Suite, etc *" />
                <Input
                  placeholder="Name on card"
                  value={formData.apartment}
                  onChange={(e) => handleChange("apartment", e.target.value)}
                  className="h-10 w-full"
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <Label label="Zip/Postal Code" />
                <Input
                  placeholder="zip code"
                  value={formData.zipCode}
                  onChange={(e) => handleChange("zipCode", e.target.value)}
                  className="h-10 w-full"
                  onBlur={() =>
                    validateField("zipCode", formData?.zipCode || "")
                  }
                />
                <span className="text-xs text-red-500">{errors.zipCode}</span>
              </div>
            </div>
            <div className="my-1 flex items-center gap-2">
              <CustomButton
                disabled={initialData !== undefined}
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
                height="40px"
              />
              <CustomButton
                title="Work"
                disabled={initialData !== undefined}
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
                height="40px"
              />
            </div>
          </div>
          <CustomButton
            title="CONFIRM"
            onClick={handleConfirm}
            borderRadius="5px"
            height="50px"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddressForm;
