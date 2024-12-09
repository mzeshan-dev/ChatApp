import { getAllUsers, getUser } from "../features/userSlice";

export const loginUser = (formData) => async (dispatch) => {
  try {
    console.log("runrr");

    const res = await fetch("http://192.168.18.132:3003/auth/api/login", {
      method: "POST",

      body: formData,
      credentials: "include",
    });
    const data = await res.json();
    if (data.status > 400) {
      console.log(data.error);
      return data;
    }
    dispatch(getUser(data));
    localStorage.setItem("token", data.data.token);

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const signInUser = (formData) => async (dispatch) => {
  try {
    const res = await fetch("http://192.168.18.132:3003/auth/api/signup", {
      method: "POST",

      body: formData,
      credentials: "include",
    });
    const data = await res.json();
    if (data.status > 400) {
      console.log(data.error);
      return data;
    }
    dispatch(getUser(data));
    localStorage.setItem("token", data.data.token);

    return data;
  } catch (error) {
    console.log(error.message);
    return data;
  }
};

const token = localStorage.getItem("token");

export const getCurrentUser = () => async (dispatch) => {
  try {
    const res = await fetch("http://192.168.18.132:3003/auth/api/get_user", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch(getUser(data));
  } catch (error) {
    console.log(error.message, "err");
  }
};

export const getAllUser = () => async (dispatch) => {
  try {
    const res = await fetch("http://192.168.18.132:3003/auth/api/All_user", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch(getAllUsers(data));
  } catch (error) {
    console.log(error.message, "err");
  }
};
