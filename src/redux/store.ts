import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import mediaReducer from "./mediaSlice";
import productReducer from "./product";
import cartReducer from "./cartSlice";
import whishlistReducer from "./whishlistSlice";
import profileReducer from "./profileSlice";
import notificationReducer from "./notificationsSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  media: mediaReducer,
  product: productReducer,
  cart: cartReducer,
  whishlist: whishlistReducer,
  profile: profileReducer,
  notifications: notificationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
