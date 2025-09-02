import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Notifications = {
  unReadCount: number;
};

const initialState: Notifications = {
  unReadCount: 0,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setUnReadCount: (state, action: PayloadAction<number>) => {
      state.unReadCount = action.payload;
    },
  },
});

export const { setUnReadCount } = notificationsSlice.actions;

export default notificationsSlice.reducer;
