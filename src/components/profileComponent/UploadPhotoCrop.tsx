import React, { useEffect, useState } from "react";
import { Upload } from "antd";
import type { UploadFile } from "antd";
import ImgCrop from "antd-img-crop";
import { uploadFileService } from "@/services/media";

interface UploadPhotoCropProps {
  picture?: string;
  onPictureChange: (url: string) => void;
}

const UploadPhotoCrop: React.FC<UploadPhotoCropProps> = ({
  picture,
  onPictureChange,
}) => {
  const [file, setFile] = useState<UploadFile | null>(null);

  useEffect(() => {
    if (picture) {
      setFile({
        uid: "existing-file",
        name: "Profile Picture",
        status: "done",
        url: picture,
      });
    }
  }, [picture]);

  const onUpload = async (
    file: File,
    onSuccess: (url: string) => void,
    onError: (err: any) => void,
  ) => {
    try {
      await uploadFileService({
        folderName: "PROFILE_PICTURE",
        file,
        onSuccess: (data) => {
          const uploadedFile: UploadFile = {
            uid: `${file.name}-${Date.now()}`,
            name: file.name,
            status: "done",
            url: data.results,
          };
          setFile(uploadedFile);
          onPictureChange(data.results);
          onSuccess(data.results);
        },
      });
    } catch (error) {
      onError(error);
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const imgWindow = window.open(src);
    imgWindow?.document.write(`<img src="${src}" style="max-width:100%" />`);
  };

  const onRemove = () => {
    setFile(null);
    onPictureChange("");
  };

  return (
    <ImgCrop rotationSlider>
      <Upload
        listType="picture-circle"
        customRequest={({ file, onSuccess, onError }) => {
          onUpload(
            file as File,
            onSuccess as (url: string) => void,
            onError as (err: any) => void,
          );
        }}
        onPreview={onPreview}
        maxCount={1}
        fileList={file ? [file] : []}
        onRemove={onRemove}
      >
        {!file && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};

export default UploadPhotoCrop;
