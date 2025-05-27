import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MediaState {
  file: File | null;
}

const initialState: MediaState = {
  file: null,
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<File | null>) => {
      state.file = action.payload;
    },
    clearFile: (state) => {
      state.file = null;
    },
  },
});

export const { setFile, clearFile } = mediaSlice.actions;

export default mediaSlice.reducer;
