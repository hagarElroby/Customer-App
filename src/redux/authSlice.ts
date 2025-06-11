import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLoginResponse } from "@/types/user";

interface AuthState {
  user: UserLoginResponse | null;
  isLoggedIn: boolean;
}

const storedUser =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;

const initialState: AuthState = {
  user: storedUser,
  isLoggedIn: !!storedUser,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserLoginResponse>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    // updateUser: (state, action: PayloadAction<Partial<UserLoginResponse>>) => {
    //   if (state.user) {
    //     state.user = { ...state.user, ...action.payload };
    //   }
    // },
    updateUser: (state, action: PayloadAction<Partial<UserLoginResponse>>) => {
      if (!state.user) return;
      for (const key in action.payload) {
        (state.user as any)[key] =
          action.payload[key as keyof UserLoginResponse];
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, updateUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
