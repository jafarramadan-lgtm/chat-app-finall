"use client";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import PrimarySearchAppBar from "./appBar";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
export default function Friends({ setMyFriends, myFriends ,friends,setFriends}) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || theme === "night";
  const [moun, setmount] = useState(false);
  useEffect(() => {
    setmount(true);
  }, []);

  if (!moun) return null;
  const friendsMap = friends.map((e) => {
    return (
      <div
        key={e._id}
        onClick={() => {
          setMyFriends(e);
        }}
        className="md:w-full w-fit relative
          z-10 flex flex-col md:flex-row justify-between rounded-2xl 
            px-4 py-2 hover:bg-gray-400
            cursor-pointer transition duration-300"
      >
        <Avatar alt="Remy Sharp" src={e.profileImg} />
        <p className="text-2xl   font-bold">{e.name}</p>
        {e.activated ? (
          <p className="text-green-500  ">Active</p>
        ) : (
          <p className="text-red-500  ">No Active</p>
        )}
        <div
          onClick={async () => {
            try {
              const response = await fetch("https://chat-app-finall-1.onrender.com/friendship", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({ idfriend: e._id }),
              });
              const result = await response.json();
               window.location.href = "/dashboard";
            } catch (error) {
              console.error(error.message);
            }
          }}
        >
          {!e.isFriend ? (
            <p className="  text-green-400"> Follow</p>
          ) : (
            <p className="  text-red-400"> UnFollow</p>
          )}
        </div>
      </div>
    );
  });
  return (
    <div
      // direction="column"
      // spacing={2}
      className={` border-r p-2 gap-4   rounded-2xl relative max-w-full min-w-1/2 ${
        isDark ? "bg-black text-white" : "bg-gray-300 text-black"
      }`}
    >
      <div>x
        {" "}
        <PrimarySearchAppBar setFriends={setFriends} />
      </div>
      <div className="gap-3 flex flex-row md:flex-col overflow-x-auto md:h-9/12     md:overflow-auto   md:no-scrollbar "> {friendsMap}</div>{" "}
      <div
        className="absolute w-full h-full   left-0 top-0"
        onClick={() => {
          setMyFriends("");
        }}
      ></div>
    </div>
  );
}
