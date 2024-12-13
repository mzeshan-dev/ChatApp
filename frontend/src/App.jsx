import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { io, Socket } from "socket.io-client";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import Protected from "./components/Protected";
import {
  chatMessages,
  createNotifications,
  getAllChats,
  getAllUser,
  getCurrentUser,
} from "./store/actions/userAction";
// import { getAllChats } from "./store/actions/chatsAction";

import { useSocket } from "../context/socketContext";
// const socket = io("http://localhost:3003");
function App() {
  const [count, setCount] = useState(0);
  const user = useSelector((state) => state.user.user);
  const allChats = useSelector((state) => state.user.allChats);
  const loading = useSelector((state) => state.user.loading);
  const id = user && user._id;

  const dispatch = useDispatch();
  const socket = useSocket();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getCurrentUser());
    dispatch(getAllChats());

    // dispatch(getAllChats());
    // dispatch(initializeSocket());
  }, []);

  useEffect(() => {
    if (!id) return;
    socket.on("connect", () => {
      console.log("user connected with id: ");
    });

    socket.emit("register", { userId: id });
    socket.on("roomJoined", (data) => {});
    socket.on("reqReceive", (data) => {
      dispatch(getCurrentUser());
      dispatch(createNotifications(data));
    });
    socket.on("receiveMessage", (data) => {
      dispatch(chatMessages(data));
    });
    socket.on("notify", (data) => {
      dispatch(getCurrentUser());
      dispatch(createNotifications(data));
    });
  }, [id, dispatch, socket]);

  return (
    <>
      {loading && (
        <div className=" rgba w-full h-screen  flex items-center justify-center">
          <p className=" font-bold text-3xl text-purple-500">Loading...</p>
        </div>
      )}
      {!loading && (
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <Protected>
                  <HomePage />
                </Protected>
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
export default App;
