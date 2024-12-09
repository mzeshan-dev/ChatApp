import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allChats: null,
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getChat: (state, action) => {},
    getChats: (state, action) => {
      state.allChats = action.payload;
    },
  },
});

export const { getChats } = chatSlice.actions;

export default chatSlice.reducer;
