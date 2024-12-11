import React, { useEffect, useState } from "react";

import { TiUserAdd } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useSocket } from "../../context/socketContext";
import { IoIosNotifications } from "react-icons/io";
function Notifications() {
  const notifications = useSelector((state) => state.user.notifications);
  console.log(notifications, "noti");

  return (
    <div className="custom-scroll overflow-y-scroll h-[calc(100%-96px)]">
      {notifications.length > 0 &&
        notifications.map((noti, index) => {
          return (
            <div
              key={index}
              className="border border-gray-300 p-2 h-16 w-full gap-2 flex justify-between items-center"
            >
              <IoIosNotifications
                title="add friend"
                color="black"
                size={25}
                cursor={"pointer"}
                value={"helo"}
              />
              <div className="flex items-center gap-2">
                <p className="font-bold ">{noti}</p>
              </div>
            </div>
          );
        })}

      {/* Add more chat items here */}
    </div>
  );
}

export default Notifications;
