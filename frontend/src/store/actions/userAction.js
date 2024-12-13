// import { getAllUsers, getUser } from "../reducers/userSlice";

export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "loadingUser" });
    const res = await fetch("http://192.168.18.132:3003/auth/api/login", {
      method: "POST",

      body: formData,
      credentials: "include",
    });
    const data = await res.json();
    if (data.status > 399) {
      console.log(data.error);
      dispatch({ type: "userFailiure", payload: data.error });
      return data;
    }
    dispatch({ type: "userSuccess", payload: data });
    localStorage.setItem("token", data.data.token);

    return data;
  } catch (error) {
    console.log(error.message);
    dispatch({ type: "userFailiure", payload: error.message });
  }
};

export const signInUser = (formData) => async (dispatch) => {
  dispatch({ type: "loadingUser" });

  try {
    const res = await fetch("http://192.168.18.132:3003/auth/api/signup", {
      method: "POST",

      body: formData,
      credentials: "include",
    });
    const data = await res.json();
    if (data.status > 399) {
      console.log(data.error);
      dispatch({ type: "userFailiure", payload: data.error });

      return data;
    }
    dispatch({ type: "userSuccess", payload: data });
    localStorage.setItem("token", data.data.token);

    return data;
  } catch (error) {
    console.log(error.message);
    dispatch({ type: "userFailiure", payload: error.message });
  }
};

const token = localStorage.getItem("token");

export const getCurrentUser = () => async (dispatch) => {
  dispatch({ type: "loadingUser" });

  try {
    const res = await fetch("http://192.168.18.132:3003/auth/api/get_user", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch({ type: "userSuccess", payload: data });
  } catch (error) {
    console.log(error.message, "err");
    dispatch({ type: "userFailiure", payload: error.message });
  }
};

export const getAllUser = () => async (dispatch) => {
  dispatch({ type: "loadingAllUser" });

  try {
    const res = await fetch("http://192.168.18.132:3003/auth/api/All_user", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    dispatch({ type: "AllUserSuccess", payload: data });
  } catch (error) {
    console.log(error.message, "err");
    dispatch({ type: "AllUserFailiure", payload: error.message });
  }
};
export const createNotifications = (noti) => async (dispatch) => {
  dispatch({ type: "onNoti", payload: noti });
};
export const chatMessages = (messages) => async (dispatch) => {
  dispatch({ type: "chatMessages", payload: messages });
};

export const getAllChats = () => async (dispatch) => {
  dispatch({ type: "loadingAllChats" });

  try {
    const res = await fetch("http://192.168.18.132:3003/chat/api/all_chats", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch({ type: "AllChatsSuccess", payload: data });
  } catch (error) {
    console.log(error.message, "err");
    dispatch({ type: "AllChatsFailiure", payload: error.message });
  }
};
export const getAllMessages = (formData) => async (dispatch) => {
  dispatch({ type: "loadingMessages" });

  try {
    const res = await fetch(
      "http://192.168.18.132:3003/chat/api/all_messages",
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    const data = await res.json();

    dispatch({ type: "messagessSuccess", payload: data });
  } catch (error) {
    console.log(error.message, "err");
    dispatch({ type: "messagesFailiure", payload: error.message });
  }
};
