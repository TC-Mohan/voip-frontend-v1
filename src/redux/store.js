import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "../slices/sidebarSlice";
import walletSlice from "./../slices/WalletSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    wallet: walletSlice,
   
  },
});

export default store;
