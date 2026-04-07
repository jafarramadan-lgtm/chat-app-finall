"use client";
import { useTheme } from "next-themes";
import { useState,useEffect } from "react";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import CircularEnableTrack from "../load";

export default function AccountActive() {
const[loadlogout,setloadlogout]=useState(false)
const[loaddelete,setloaddelete]=useState(false)
const[loadexport,setloadexport]=useState(false)
const[loaddeactivated,setloaddeactivated]=useState(false)

  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || theme === "night";
   const[mount,setmount]=useState(false)
 useEffect(()=>{setmount(true)},[])
 if(!mount )return
  return (
    <div
      className={`flex mb-9 flex-col text-2xl font-bold shadow-lg w-full md:w-4/12    rounded-2xl  text-wrap ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className={`   p-3 flex rounded-t-2xl ${
        isDark ? "bg-black text-white" : "bg-gray-300 text-black"
      }`}>
        <PermIdentityOutlinedIcon
          sx={{ fontSize: 30 }}
          className="mr-1 text-blue-800"
        />
        <p>Account Active</p>
      </div>
      <div className="  p-3 flex flex-col  ">
        <div className="border-b flex justify-between p-2">
          <p>Logout</p>
          <button
            onClick={async () => {
              setloadlogout(true)
              const res = await fetch("https://chat-app-finall-1.onrender.com/logout", {
                method: "GET",
                credentials: "include",
              });
              const data = await res.json();
              if (data) {
                setloadlogout(false)
                alert("success logout")};
               window.location.href = "/login";
            }}
            className="w-4/12 cursor-pointer  bg-blue-600 p-2 text-white rounded-2xl shadow-2xl hover:bg-blue-800 transition duration-75"
          >
            {loadlogout?<CircularEnableTrack/>:"Logout"}
          </button>
        </div>{" "}
        <div className="border-b flex justify-between p-2">
          <p>Delete Account</p>
          <button
            onClick={async () => {
              setloaddelete(true)
              const res = await fetch("https://chat-app-finall-1.onrender.com/delete", {
                method: "GET",
                credentials: "include",
              });
              const data = await res.json();
              if (data){              setloaddelete(false)
 alert("success delete account")};
              window.location.href = "/login";
              console.log(data);
            }}
            className="w-4/12 cursor-pointer bg-red-600 p-2 text-white rounded-2xl shadow-2xl hover:bg-red-800 transition duration-75"
          >
            {loaddelete?<CircularEnableTrack/>:"Delete"}
          </button>
        </div>{" "}
        <div className="border-b flex justify-between p-2">
          <p>Export Data</p>
          <button
            download
            onClick={async () => {
              try {
                setloadexport(true)
                const res = await fetch("https://chat-app-finall-1.onrender.com/export", {
                  method: "GET",
                  credentials: "include",
                });
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");

                a.href = url;
                a.download = "user-data.json";
                document.body.appendChild(a);
                a.click();
                a.remove();
                if(blob){setloadexport(false)}
              } catch (e) {
                console.log(e);
              }
            }}
            className="w-4/12 cursor-pointer bg-green-600 p-2 flex justify-center text-white rounded-2xl shadow-2xl hover:bg-green-800 transition duration-75"
          >
            {loadexport?<CircularEnableTrack/>:"Export"}
          </button>
        </div>{" "}
        <div className=" flex justify-between p-2">
          <p>Deactivate </p>
          <button
            onClick={async () => {
              setloaddeactivated(true)
              const res = await fetch("https://chat-app-finall-1.onrender.com/activateAccount", {
                method: "GET",
                credentials: "include",
              });
              const data = await res.json();
              if(data)setloaddeactivated(false)
              window.location.href = "/Profile";
            }}
            className="w-4/12 cursor-pointer bg-yellow-600 p-2 text-white rounded-2xl shadow-2xl hover:bg-yellow-800 transition duration-75"
          >            {loaddeactivated?<CircularEnableTrack/>:"Deactivate"}

          </button>
        </div>
      </div>
    </div>
  );
}
