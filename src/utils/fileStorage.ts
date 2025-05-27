let tempFile: File | null = null;

export const setTempFile = (file: File | null) => {
  tempFile = file;
};

export const getTempFile = () => tempFile;
