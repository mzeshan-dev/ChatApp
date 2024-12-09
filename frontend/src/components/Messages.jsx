import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Messages() {
  const [allChats, setAllChats] = useState([]);
  const token = localStorage.getItem("token");

  return (
    <div className="custom-scroll overflow-y-scroll h-[calc(100%-96px)]">
      {allChats &&
        allChats.map((item) => {
          <div className="border border-gray-300 p-2 h-16 w-full gap-2 flex items-center">
            <div className="flex items-center gap-2">
              <img
                className="h-full  rounded-[100%]  w-14"
                src="https://img.freepik.com/free-photo/portrait-person-attending-vibrant-techno-music-party_23-2150551577.jpg?t=st=1733377461~exp=1733381061~hmac=c71276a07cc448be652346516cd4753f19dc7b273b6ecf6a1c14dcee1f9244e8&w=826"
              />
              <p className="font-bold">name</p>
            </div>
            <p className="text-gray-400 text-sm">{item.text}</p>
          </div>;
        })}

      {/* Add more chat items here */}
    </div>
  );
}

export default Messages;
