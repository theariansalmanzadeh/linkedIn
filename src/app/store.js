import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import LoginSlice from "../store/Login";
import CartSlice from "../store/Cart";

export const store = configureStore({
  reducer: { logIn: LoginSlice.reducer, cart: CartSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
