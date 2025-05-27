"use client";
import React, { useState } from "react";
import "cropperjs/dist/cropper.css";
import { ALLOWED_FILE_TYPES } from "@/constants/extensions";
import { toast } from "sonner";
import { Modal } from "antd";
import CustomButton from "../shared/CustomButton";
import { svgs } from "../icons/svgs";

interface SearchImgPopupProps {
  onClose: () => void;
  onSave: (file: File) => void;
  isOpen: boolean;
}

const SearchImgPopup: React.FC<SearchImgPopupProps> = ({
  onClose,
  onSave,
  isOpen,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file type
      if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
        alert("Only PNG, JPG, and JPEG files are allowed.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSave = () => {
    if (file) {
      onSave(file);
      onClose();
    } else {
      toast.error("No file selected.");
    }
    setFile(null);
    setImage(null);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Can't find the product? Try searching with an image"
      footer={null}
      height="300px"
      width="570px"
      style={{ borderRadius: "24px" }}
      closeIcon={false}
      className="flex flex-col items-center justify-between"
    >
      <div
        className="flex flex-col items-center justify-center h-[200px] mx-auto my-4 w-[540px] bg-bgSearch
        text-center cursor-pointer border-2 border-placeholder border-dashed rounded-3xl z-50 overflow-hidden"
        onClick={() => document.getElementById("file-input")?.click()}
      >
        {image ? (
          <>
            <img
              src={image}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
            <input
              id="file-input"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
          </>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <input
              id="file-input"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
            <span>{svgs.uploadIcon}</span>
            <div className="flex flex-col items-center gap-1 md:gap-[6px] xxl:gap-2 hd:gap-[0.55vw]">
              <p
                className="text-meduimBlack font-normal text-[8px] sm:text-[10px] 
          md:text-xs xxl:text-sm hd:text-[0.97vw]"
              >
                Drag your Image to start uploading
              </p>
              <div className="flex items-center gap-1 md:gap-2 xxl:gap-3 hd:gap-[0.83vw]">
                <div className="min-w-10 w-[5.55vw] border-[0.7px] xxl:border hd:border-[0.03vw] border-lightBorder"></div>
                <span className="text-[8px] md:text-[10px] xxl:text-xs hd:text-[0.83vw] text-textButton font-normal">
                  OR
                </span>
                <div className="min-w-10 w-[5.55vw] border-[0.7px] xxl:border hd:border-[0.03vw] border-lightBorder"></div>
              </div>
              <button
                type="button"
                className={`px-3 py-[6px] hd:px-[0.83vw] hd:py-[0.58vh] h-[30px] text-xs font-semibold border rounded-lg flex items-center 
            justify-center text-main border-main bg-white
          `}
              >
                Browse Image
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end gap-8">
        <CustomButton
          title="Cancel"
          onClick={onClose}
          mode="light"
          color="#700c18"
          bgColor="#FFFFFF"
          hoverBgColor="#700c18"
          hoverColor="#FFFFFF"
        />
        <CustomButton title="Upload" onClick={handleSave} disabled={!file} />
      </div>
    </Modal>
  );
};

export default SearchImgPopup;
