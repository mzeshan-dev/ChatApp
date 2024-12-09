import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthentic: false,
  user: null,
  loading: true,
  allUsers: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.isAuthentic = action.payload.success;
      state.loading = false;
      state.user = action.payload;
    },
    getAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { getUser, getAllUsers } = userSlice.actions;

export default userSlice.reducer;
