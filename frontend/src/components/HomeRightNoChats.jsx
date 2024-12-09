import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useSelector } from "react-redux";

import { FaFrownOpen } from "react-icons/fa";

function HomeRightNoChats({ c }) {
  return (
    <div className=" w-full h-screen border border-red-200 flex items-center justify-center ">
      <div className="  h-full flex justify-center flex-col items-center">
        <FaFrownOpen size={50} />{" "}
        <span className=" font-bold text-3xl ">No Chats..!</span>
      </div>
    </div>
  );
}

export default HomeRightNoChats;
