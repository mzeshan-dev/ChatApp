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
import { getAllUser, getCurrentUser } from "./store/actions/userAction";
import { getAllChats } from "./store/actions/chatsAction";
import { initializeSocket } from "./store/features/socketSlice";
import { useSocket } from "../context/socketContext";
// const socket = io("http://localhost:3003");
function App() {
  const [count, setCount] = useState(0);
  const user = useSelector((state) => state.user);
  const isAuthentic = useSelector((state) => state.isAuthentic);
  const email = user && user.user?.data?.user?.email;
  const dispatch = useDispatch();
  const socket = useSocket();
  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log("redering");
    dispatch(getAllUser());
    dispatch(getCurrentUser());
    dispatch(getAllChats());
    // dispatch(initializeSocket());
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("user connected with id: ");
    });
    socket.emit("register", email);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<LoginPage />} />
          <Route
            path="/"
            element={
              // <Protected>
              <HomePage />
              // </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
