import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Friends({ setSelectChat, search }) {
  const user = useSelector((state) => state.user.user);
  const users = useSelector((state) => state.user.allUsers);
  const friends = [];
  const allFriends = user && user.friends;
  console.log(user.friends);

  const email = user && user.email;
  if (allFriends) {
    for (let i = 0; i < users.length; i++) {
      // Ensure allFriends[i] is an ID (not an object)
      if (allFriends.includes(users[i]._id)) {
        friends.push(users[i]);
      }
    }
  }

  // useEffeconsct(() => {
  //   socket.on("connect", () => {
  //     console.log("Socket connected with ID:", socket.id);
  //   });

  //   socket.on("connect_error", (error) => {
  //     console.error("Connection error:", error);
  //   });
  //   socket.emit("register", email && email);
  // }, []);

  const startChat = (email) => {
    console.log("e");
    setSelectChat(email);
  };
  console.log(friends, "firnds");
  return (
    <div className="custom-scroll overflow-y-scroll h-[calc(100%-96px)]">
      {!search &&
        friends &&
        friends.map((friend) => {
          return (
            <div
              onClick={() => startChat(friend.email)}
              key={friend._id}
              className="border border-gray-300 p-2 h-16 w-full gap-2 flex items-center"
            >
              <div className="flex items-center gap-2">
                <img
                  className="h-full  rounded-[100%]  w-14"
                  src={`http://192.168.18.132:3003/${friend.avatar.replace(
                    "public\\",
                    "/"
                  )}`}
                />
                <p className="font-bold">{friend.username}</p>
              </div>
            </div>
          );
        })}
      {search &&
        friends.map((friend) => {
          if (friend.username.includes(search)) {
            return (
              <div
                onClick={() => startChat(friend.email)}
                key={friend._id}
                className="border border-gray-300 p-2 h-16 w-full gap-2 flex items-center"
              >
                <div className="flex items-center gap-2">
                  <img
                    className="h-full  rounded-[100%]  w-14"
                    src={`http://192.168.18.132:3003/${friend.avatar.replace(
                      "public\\",
                      "/"
                    )}`}
                  />
                  <p className="font-bold">{friend.username}</p>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}

export default Friends;
