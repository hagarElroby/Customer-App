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
  },
});

export const { setProfileData } = profileSlice.actions;

export default profileSlice.reducer;
