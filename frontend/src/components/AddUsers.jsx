import React from "react";

import { TiUserAdd } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useSocket } from "../../context/socketContext";
function AddUsers() {
  const users = useSelector((state) => state.user.allUsers);
  const user = useSelector((state) => state.user.user);
  const socket = useSocket();
  const requests = user && user.requests;
  const friends = user && user.friends;
  const senderId = user && user._id;
  const username = user && user.username;

  const token = localStorage.getItem("token");
  const usersToAdd = [];
  for (let i = 0; i < users.length; i++) {
    if (
      !requests.includes(users[i]._id) &&
      !user.friends.includes(users[i]._id) &&
      user._id !== users[i]._id
    ) {
      usersToAdd.push(users[i]);
    }
  }

  const addFriend = async (receiverId) => {
    if (!receiverId) {
      return console.log("ids not found");
    }
    const formData = new FormData();

    formData.append("reciverId", receiverId);
    try {
      const res = await fetch("http://192.168.18.132:3003/auth/api/send_req", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      if (data.success && socket) {
        socket.emit("sendReq", { senderId, receiverId, username });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="custom-scroll overflow-y-scroll h-[calc(100%-96px)]">
      {usersToAdd &&
        usersToAdd.length > 0 &&
        usersToAdd.map((user) => {
          if (!user._id) {
            return null;
          }
          return (
            <div
              key={user._id}
              className="border border-gray-300 p-2 h-16 w-full gap-2 flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <img
                  className="h-full  rounded-[100%]  w-14"
                  src={`http://192.168.18.132:3003/${user.avatar.replace(
                    "public\\",
                    "/"
                  )}`}
                />
                <p className="font-bold">{user.username}</p>
              </div>
              <TiUserAdd
                onClick={() => addFriend(user._id)}
                size={30}
                cursor={"pointer"}
              />
            </div>
          );
        })}

      {/* Add more chat items here */}
    </div>
  );
}

export default AddUsers;
