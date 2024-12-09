import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { useSocket } from "../../context/socketContext";

function HomeRight({ chat, selectChat }) {
  const user = useSelector((state) => state.user.user);
  const allChats = useSelector((state) => state.chat.allChats);
  const [chats, setChats] = useState(null);
  const id = user && user.data.user._id;
  const isocktId = user && user?.data.user.socketId;
  const socket = useSocket();
  const formData = new FormData();
  // const [userChats, setUserChats] = useState([]);
  formData.append("recieverId", chat._id);
  formData.append("senderId", id);
  const [messageToSent, setMessageToSent] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    socket.on("test", (data) => {
      console.log(data);
    });
    socket.on("receiveMessage", (data) => {
      console.log(data, "datas");
    });
  }, [messageToSent]);

  const sendMessage = async () => {
    if (messageToSent.trim()) {
      socket.emit("sendMessage", {
        senderId: id,
        recieverId: chat._id,
        message: messageToSent,
      });

      setChats(
        (prev) =>
          prev && [
            ...prev,
            { senderId: id, text: messageToSent, status: "sent" },
          ]
      );

      setMessageToSent("");
    }
  };

  return (
    <div className=" w-full flex flex-col overflow-hidden h-screen justify-between">
      <div className="h-[90%] flex flex-col">
        <div className="sticky overflow-hidden h-14 flex items-center w-full bg-blue-600 shadow-md ">
          <div className=" flex items-center w-full justify-between p-2">
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
            <span className=" font-bold text-xl text-white cursor-pointer">
              .....
            </span>
          </div>
        </div>
        <div className=" flex h-full flex-col gap-2 p-2 overflow-y-scroll custom-scroll">
          {chats &&
            chats.map((msg) => (
              <span
                key={msg._id}
                className={`${
                  msg.senderId === id
                    ? "self-end bg-slate-500"
                    : "self-start bg-blue-700"
                } p-2 text-white rounded-md max-w-[50%]`}
              >
                {msg.text}
              </span>
            ))}
        </div>
      </div>
      <div className=" flex items-center justify-center mb-2 gap-1">
        <IoIosSend onClick={sendMessage} size={30} cursor={"pointer"} />

        <input
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
