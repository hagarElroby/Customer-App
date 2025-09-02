import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileModel } from "@/types/user";

interface ProfileState {
  userProfileData: ProfileModel | null;
}

const initialState: ProfileState = {
  userProfileData: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<ProfileModel>) => {
      state.userProfileData = action.payload;
    },
    removeProfileData: (state) => {
      state.userProfileData = null;
    },
  },
});

export const { setProfileData, removeProfileData } = profileSlice.actions;

export default profileSlice.reducer;
