import { getChats } from "../features/chatSlice";

const token = localStorage.getItem("token");
export const getAllChats = () => async (dispatch) => {
  try {
    const res = await fetch("http://192.168.18.132:3003/chat/api/all_chats", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch(getChats(data));
  } catch (error) {
    console.log(error.message, "err");
  }
};
