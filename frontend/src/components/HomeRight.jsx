import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../context/socketContext";
import { chatMessages, getAllMessages } from "../store/actions/userAction";
import { IoReload } from "react-icons/io5";

function HomeRight({ chat, setSelectChat }) {
  const user = useSelector((state) => state.user.user);
  const messages = useSelector((state) => state.user.messages);
  const chatMesgLoading = useSelector((state) => state.user.chatMesgLoading);
  const [pages, setPages] = useState(1);
  const loadin = useSelector((state) => state.user.loading);
  const allChats = useSelector((state) => state.user.allChats);
  const allMessages = useSelector((state) => state.user.chatMessges);
  const [chats, setChats] = useState(null);
  const senderId = user && user._id;
  const dispatch = useDispatch();
  const receiverId = chat._id;
  const socket = useSocket();
  const formData = new FormData();
  const [closeChats, setCloseChats] = useState(false);
  formData.append("recieverId", chat._id);
  formData.append("senderId", senderId);
  const [messageToSent, setMessageToSent] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const formData = new FormData();
    formData.append("page", pages);
    formData.append("limit", 20);
    formData.append("receiverId", chat._id);
    dispatch(getAllMessages(formData));
  }, [chat]);

  const sendMessage = (e) => {
    const message = {
      text: messageToSent,
      senderId: senderId,
      senderName: user && user.username,
    };
    if (messageToSent.trim()) {
      socket.emit("sendMessage", {
        senderId: senderId,
        recieverId: chat._id,
        message: message,
      });

      dispatch(chatMessages(message));
      setMessageToSent("");
    }
  };
  const onEnter = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    const data = { receiverId, senderId };
    socket.emit("joinRoom", data);
    socket.on("receiveMessage", (data) => {
      console.log(data, "message");
    });
  }, []);

  const loadMore = () => {
    const formData = new FormData();
    setPages((prev) => prev + 1);

    formData.append("page", pages);
    formData.append("limit", 20);
    formData.append("receiverId", chat._id);
    dispatch(getAllMessages(formData));
  };
  const loadPrev = () => {
    const formData = new FormData();
    setPages((prev) => (prev == 1 ? (prev = 1) : prev - 1));

    formData.append("page", pages);
    formData.append("limit", 20);
    formData.append("receiverId", chat._id);
    dispatch(getAllMessages(formData));
  };

  return (
    <div className=" w-full flex flex-col overflow-hidden h-screen justify-between">
      <div className="h-[90%] flex flex-col relative">
        <div className="sticky overflow-hidden h-14 flex items-center w-full bg-blue-600 shadow-md ">
          <div className=" flex items-center w-full justify-between p-4">
            <div className=" flex items-center gap-2">
              <img
                src={`http://192.168.18.132:3003/${chat.avatar.replace(
                  "public\\",
                  "/"
                )}`}
                className="h-full rounded-[100%] w-14"
                alt="sdf"
              />
              <p className=" font-bold text-2xl text-white">{chat.username}</p>
            </div>
            <span
              onClick={() => setCloseChats(true)}
              className=" font-bold text-xl text-white cursor-pointer"
            >
              .....
            </span>
          </div>
        </div>
        {closeChats && (
          <div
            onClick={() => {
              setSelectChat("");
              setCloseChats(false);
            }}
            className=" absolute  top-12 bg-white h-10 w-28  self-end mr-2 mt-2 rounded-md  flex items-center justify-center shadow-md"
          >
            <span className=" font-semibold text-black text-center">
              Close{" "}
            </span>
          </div>
        )}
        {messages.totalPages > pages && (
          <div className=" flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out ">
            <IoReload
              onClick={loadMore}
              size={20}
              color="purple"
              cursor={"pointer"}
            />
          </div>
        )}

        {!chatMesgLoading ? (
          <div className=" flex h-full flex-col gap-2 p-2 overflow-y-scroll custom-scroll">
            {messages.messgaesPaginated &&
              messages.messgaesPaginated.map((msg) => (
                <span
                  key={msg._id}
                  className={`${
                    msg.senderId === user._id
                      ? "self-end bg-slate-500"
                      : "self-start bg-blue-700"
                  } p-2 text-white rounded-md max-w-[50%]`}
                >
                  {msg.text}
                </span>
              ))}
          </div>
        ) : (
          <div className=" flex h-full  justify-center items-center  rgba ">
            <span className=" text-2xl font-bold   text-purple-600 ">
              Loading...
            </span>
          </div>
        )}

        {pages > 1 && (
          <div className=" flex items-center justify-center  opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out ">
            <IoReload
              className=" "
              onClick={loadPrev}
              size={20}
              color="purple"
              cursor={"pointer"}
            />
          </div>
        )}
      </div>
      <div className=" flex items-center justify-center mb-2 gap-1">
        <IoIosSend onClick={sendMessage} size={30} cursor={"pointer"} />

        <input
          onKeyDown={(e) => onEnter(e)}
          onChange={(e) => setMessageToSent(e.target.value)}
          value={messageToSent} // Bind the input to the state
          type="text"
          placeholder="enter text here..."
          className=" w-[90%] p-2 rounded-md ps-2 border border-gray-400 outline-none"
        />
      </div>
    </div>
  );
}

export default HomeRight;
