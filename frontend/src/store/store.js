import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice.js";
import chatSlice from "./features/chatSlice.js";
import socketSlice from "./features/socketSlice.js";
const store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
    sockt: socketSlice,
  },
});

export default store;
