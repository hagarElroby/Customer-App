import axiosInstance from "./axios/axiosInstance";

export const uploadFileService = async ({
  folderName,
  file,
}: {
  folderName: string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(
    `/files/uploadFile?folderName=${folderName}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response;
};
