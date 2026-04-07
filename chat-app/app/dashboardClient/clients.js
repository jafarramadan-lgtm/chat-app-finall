"use client";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Friends from "./listFriend";
import { Avatar, Stack } from "@mui/material";
import CryptoJS from "crypto-js";
export default function Clients({ secretkey }) {
  const [myFriends, setMyFriends] = useState("");
  const [msg, setmsg] = useState([]);
  const bottomRef = useRef(null);
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || theme === "night";
  const [moun, setmount] = useState(false);
  const [friends, setFriends] = useState([]);

  const [onlinefriend, setonlinefriend] = useState(false);
  useEffect(() => {
    try {
      socketRef.current = new WebSocket("ws://localhost:3005");
      socketRef.current.onopen = () => {
        console.log("Socket opened");
      };
      socketRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setmsg((p) => [...p, data.msg]);
          setonlinefriend(data.act);
          if (typeof setFriends === "function") {
            setFriends((p) => {
              const friendsId = data.msg.messageFrom;
              const index = p.findIndex(
                (f) => String(f._id) === String(friendsId),
              );
              if (index !== -1) {
                const updatedFriend = {
                  ...p[index],
                  messageData: data.msg,
                };
                const refriend = p.filter((_, i) => i !== index);
                return [updatedFriend, ...refriend];
              }
              return p;
            });
          }
        } catch (e) {
          console.log(e.message);
        }
      };
    } catch (e) {
      (console.log(e), "ss");
    }
    setmount(true);
    return () => {
       socketRef.current.close();
    };
  }, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  useEffect(() => {
    const fetchHistory = async () => {
      if (myFriends._id) {
        try {
          const res = await fetch("http://localhost:8000/getlastmessage", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({ frienId: myFriends._id }),
          });
          const data = await res.json();
           setonlinefriend(data.act);
          if (Array.isArray(data.msg)) setmsg(data.msg);
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchHistory();
  }, [myFriends]);
  const myFriendsMap = msg
    .filter((e) => {
      const isFromFriend = e.messageFrom === myFriends?._id;
      const isFromMeToFriend = e.messageTo === myFriends?._id;
      return isFromFriend || isFromMeToFriend;
    })
    .map((e) => {
      let decryptText = "";
      try {
        const bytes = CryptoJS.AES.decrypt(e.message, secretkey);
        decryptText = bytes.toString(CryptoJS.enc.Utf8);
      } catch (e) {
        console.log(e);
      }
      return (
        <div
          key={e.id || e._id}
          className={`p-3  flex ${
            isDark ? "bg-black text-white" : "bg-gray-200 text-black"
          }  rounded-2xl   ${e.messageFrom !== myFriends._id ? "justify-start" : "justify-end"}`}
        >
          <p
            className={`p-3 rounded-2xl text-wrap break-all w-1/2 ${e.messageFrom !== myFriends._id ? "bg-gray-400  text-black" : "bg-gray-700 text-white "} `}
          >
            {decryptText}
          </p>{" "}
          <sub className="p-3   text-sm">{e.time}</sub>
        </div>
      );
    });
  if (!moun) return;

  return (
    <div
      className={` md:flex-row  gap-9 w-11/12 md:w-9/12 h-11/12 py-4 px-2     text-black flex  flex-col shadow  shadow-black  rounded-3xl ${
        isDark ? "bg-black text-white" : "bg-gray-200 text-black"
      }`}
    >
      <Friends
        setMyFriends={setMyFriends}
        friends={friends}
        setFriends={setFriends}
      />
      {myFriends ? (
        <div
          className={`overflow-auto no-scrollbar${
            isDark ? "bg-black text-white" : "bg-white-300 text-black"
          } w-full  h-full rounded-2xl p-2      `}
        >
          <div className="  border-b-2 shadow-2xl    flex justify-between p-3">
            <div className="flex  items-center w-3/12 justify-between p-2 gap-3 ">
              {" "}
              <Avatar
                alt="my Imagae"
                src={myFriends.profileImg}
                sx={{ width: 40, height: 40 }}
              />
              <h1> {myFriends.name}</h1>
            </div>
            <h1
              className={` text-2xl ${onlinefriend ? "text-green-500" : "text-red-500"}`}
            >
              {onlinefriend ? "Online" : "Offline"}
            </h1>
          </div>
          <div className="w-full h-11/12   overflow-auto   no-scrollbar  flex  flex-col justify-between   p-3 rounded-2xl text-3xl  ">
            {myFriendsMap}

            <form
              className="  w-full mt-2   h-1/12 flex gap-2 items-center justify-center p-3 "
              onSubmit={(e) => {
                if (message === "") {
                  e.preventDefault();
                  return;
                }
                if (
                  socketRef.current.readyState === WebSocket.OPEN &&
                  socketRef.current
                ) {
                  const messageData = { to: myFriends._id, message: message };
                  socketRef.current.send(JSON.stringify(messageData));
                  setMessage("");
                  if (typeof setFriends === "function") {
                    setFriends((p) => {
                      const friendsId =  myFriends._id;
                      const index = p.findIndex(
                        (f) => String(f._id) === String(friendsId),
                      );
                      if (index !== -1) {
                        const updatedFriend = {
                          ...p[index],
                          messageData:{
                            message:message,
                            messageFrom:"me",
                            time:new Date().toLocaleTimeString()
                          }
                         };
                        const refriend = p.filter((_, i) => i !== index);
                        return [updatedFriend, ...refriend];
                      }
                      return p;
                    });
                  }
                } else {
                  console.log("not connected with websocket");
                }
                e.preventDefault();
              }}
            >
              <input
                ref={bottomRef}
                className=" border  text-2xl bg-gray-200 text-black w-8/12 rounded-2xl p-3"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></input>

              <button className="bg-blue-900 p-2  text-2xl text-white rounded-2xl">
                Send
              </button>
            </form>
          </div>
          <div></div>
        </div>
      ) : null}
    </div>
  );
}
