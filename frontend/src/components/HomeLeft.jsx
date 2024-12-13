import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";
import { IoLogOut } from "react-icons/io5";
import Messages from "./Messages";
import { SiGooglemessages } from "react-icons/si";
import { GiThreeFriends } from "react-icons/gi";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";

import Groups from "./Groups";
import AddUsers from "./AddUsers";
import Friends from "./Friends";
import { useNavigate } from "react-router-dom";
import FriendRequests from "./FriendRequests";
import Notifications from "./Notifications";
import { useSelector } from "react-redux";

function HomeLeft({ selectChat, setSelectChat, search, setSearch }) {
  const [selectTab, setSelectTab] = useState("friends");
  const noties = useSelector((state) => state.user.notifications);
  const navigate = useNavigate();
  return (
    <div className="relative flex w-[40%] h-screen">
      <div className="flex sticky w-28 h-screen bg-blue-500 flex-col items-center justify-around">
        <div className=" flex flex-col gap-3">
          <SiGooglemessages
            title="friends"
            onClick={() => {
              setSelectTab("friends");
              setSelectChat("");
            }}
            color={selectTab == "friends" ? "black" : "white"}
            size={30}
            cursor={"pointer"}
          />
          <MdGroups
            title="groups"
            onClick={() => {
              setSelectTab("groups");
              setSelectChat("");
            }}
            color={selectTab == "groups" ? "black" : "white"}
            size={30}
            cursor={"pointer"}
          />

          <TiUserAdd
            title="add friend"
            onClick={() => {
              setSelectTab("add");
              setSelectChat("");
            }}
            color={selectTab == "add" ? "black" : "white"}
            size={30}
            cursor={"pointer"}
          />
          <FaCodePullRequest
            title="add friend"
            onClick={() => {
              setSelectTab("request");
              setSelectChat("");
            }}
            color={selectTab == "request" ? "black" : "white"}
            size={25}
            cursor={"pointer"}
          />
          <div className=" flex items-center gap-0 flex-col">
            <span className="text-[14px] text-red-700 font-semibold">
              {noties.length}
            </span>
            <IoIosNotifications
              title="add friend"
              onClick={() => {
                setSelectTab("noti");
                setSelectChat("");
              }}
              color={selectTab == "noti" ? "black" : "white"}
              size={25}
              cursor={"pointer"}
              value={"helo"}
            />
          </div>
        </div>

        <div className="">
          <IoLogOut
            onClick={() => {
              localStorage.clear("token");
              navigate("/register");
            }}
            color="red"
            title="logout"
            size={30}
            cursor={"pointer"}
          />
        </div>
      </div>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Sticky header */}
        <div className="sticky top-0 bg-blue-500 h-24 w-full z-10 shadow-md">
          <h1 className="text-2xl font-bold text-white ml-3">Chats</h1>
          <div className="flex justify-center relative p-2 w-full">
            <IoIosSearch
              color="black"
              className="top-3 left-8 cursor-pointer text-2xl absolute"
              size={25}
            />
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chats"
              className="p-1 w-[90%] rounded-md border ps-9 border-gray-300 outline-none"
              type="text"
            />
          </div>
        </div>

        {selectTab === "messages" ? (
          <Messages />
        ) : selectTab === "groups" ? (
          <Groups />
        ) : selectTab === "friends" ? (
          <Friends
            search={search}
            setSelectChat={setSelectChat}
            selectChat={selectChat}
          />
        ) : selectTab === "add" ? (
          <AddUsers />
        ) : selectTab === "request" ? (
          <FriendRequests />
        ) : selectTab === "noti" ? (
          <Notifications />
        ) : (
          ""("")
        )}
      </div>
    </div>
  );
}

export default HomeLeft;
