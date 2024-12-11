import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthentic: false,
  loading: false,
  user: null,
  error: null,
  allUsers: [],
  notifications: [],
  allChats: [],
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("loadingUser", (state) => {
      state.loading = true;
    })
    .addCase("userSuccess", (state, action) => {
      state.loading = false;
      state.error = null;
      state.isAuthentic = true;
      state.user = action.payload.data.user;
    })
    .addCase("userFailiure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthentic = false;
    })
    .addCase("loadingAllUser", (state) => {
      state.loading = true;
    })
    .addCase("AllUserSuccess", (state, action) => {
      state.loading = false;
      state.error = null;
      state.isAuthentic = true;
      state.allUsers = action.payload;
    })
    .addCase("AllUserFailiure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.allUsers = null;
      state.isAuthentic = false;
    })
    .addCase("loadingAllChats", (state) => {
      state.loading = true;
    })
    .addCase("AllChatsSuccess", (state, action) => {
      state.loading = false;
      state.error = null;
      state.allChats = action.payload;
    })
    .addCase("AllChatsFailiure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.allChats = null;
    })
    .addCase("onNoti", (state, action) => {
      state.notifications.push(action.payload);
    });
});

export default userReducer;
