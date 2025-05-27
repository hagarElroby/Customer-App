export const handleFileUpload = (
  file: File,
  setSearchedImg: (file: File | null) => void,
  handleSearchSubmit: (searchTerm?: string, file?: File) => void,
) => {
  if (file) {
    setSearchedImg(file);
    handleSearchSubmit("", file);
  }
};
