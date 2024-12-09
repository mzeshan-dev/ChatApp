import React, { useEffect, useState } from "react";
import HomeLeft from "../components/HomeLeft";
import HomeRight from "../components/HomeRight";
import { useDispatch, useSelector } from "react-redux";
import HomeRightNoChats from "../components/HomeRightNoChats";

function cla() {
  const [search, setSearch] = useState("");
  const [selectChat, setSelectChat] = useState(null);
  const users = useSelector((state) => state.user.allUsers);
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const chat = users && users.find((user) => user.email === selectChat);
  useEffect(() => {
    console.log(chat && chat);
  }, []);

  // useEffect(() => {
  //   socket &&
  //     socket.on("connect", () => {
  //       console.log("Connected with ID:", socket.id);
  //     });

  //   socket &&
  //     socket.on("disconnect", () => {
  //       console.log("Disconnected");
  //     });
  //   socket && console.log(email, email);
  //   socket && socket.emit("register", email);

  //   return () => {
  //     socket && socket.off("connect");
  //     socket && socket.off("disconnect");
  //     socket && socket.close();
  //   };
  // }, [socket && socket, dispatch]);
  return (
    <div className=" flex ">
      <HomeLeft
        search={search}
        setSearch={setSearch}
        setSelectChat={setSelectChat}
        selectChat={selectChat}
      />
      {chat ? (
        <HomeRight chat={chat} selectChat={selectChat} />
      ) : (
        <HomeRightNoChats />
      )}
    </div>
  );
}

export default cla;
