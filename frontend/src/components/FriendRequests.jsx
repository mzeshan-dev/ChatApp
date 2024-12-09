import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { useSelector } from "react-redux";

function FriendRequests() {
  const user = useSelector((state) => state.user.user);

  const users = useSelector((state) => state.user.allUsers);
  const requests = user.data.user.requests;
  console.log(requests, "user");
  const token = localStorage.getItem("token");
  const friendRequests = [];
  for (let i = 0; i < users.length; i++) {
    if (
      requests.includes(users[i]._id) &&
      !user.data.user.friends.includes(users[i]._id)
    ) {
      friendRequests.push(users[i]);
    }
  }
  console.log(friendRequests);
  const responseRequest = async (reqUserId) => {
    console.log(reqUserId);
    const userId = user.data.user._id;
    console.log(friendRequests);
    const reqId = requests.find((id) => id === reqUserId);

    if (!reqUserId || !reqId) {
      return console.log("ids not found");
    }
    const formData = new FormData();
    formData.append("reqId", reqId);

    formData.append("reqUserId", reqUserId);
    formData.append("flag", true);
    try {
      const res = await fetch(
        "http://192.168.18.132:3003/auth/api/accept_req",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
          credentials: "include",
        }
      );

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="custom-scroll overflow-y-scroll h-[calc(100%-96px)]">
      {friendRequests &&
        friendRequests.length > 0 &&
        friendRequests.map((user) => {
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
              <IoMdAddCircle
                onClick={() => responseRequest(user._id)}
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

export default FriendRequests;
