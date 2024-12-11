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
  console.log(allChats);
  const dispatch = useDispatch();
  const socket = useSocket();
  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log("redering");
    dispatch(getAllUser());
    dispatch(getCurrentUser());
    dispatch(getAllChats());
    // dispatch(getAllChats());
    // dispatch(initializeSocket());
  }, []);
  console.log(id);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("user connected with id: ");
    });
    if (id) {
      socket.emit("register", { userId: id });
    }

    socket.on("reqReceive", (data) => {
      console.log(data);
      dispatch(createNotifications(data));
    });
    socket.on("receiveMessage", (data) => {
      console.log(data, "message");
    });
    socket.on("notify", (data) => {
      console.log(data);
      dispatch(createNotifications(data));
    });
  }, [id]);

  return (
    <>
      {loading && (
        <div className=" rgba w-full h-screen  flex items-center justify-center">
          <p className=" font-bold text-3xl ">Loading...</p>
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
