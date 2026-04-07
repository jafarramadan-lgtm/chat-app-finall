"use client";
import ForumIcon from "@mui/icons-material/Forum";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import ImportantDevicesOutlinedIcon from "@mui/icons-material/ImportantDevicesOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div className=" rounded-2xl w-fit  overflow-auto p-7 justify-around flex flex-col bg-gray-200">
      {/* top */}
      <div className="flex flex-col justify-between items-center    w-full p-5">
        <div className="flex justify-between w-fit items-center gap-4">
          {" "}
          <ForumIcon className="text-blue-400 " fontSize="large" />
          <p className="text-black font-bold text-2xl">
            Connect<span className="text-blue-500">Chat</span>
          </p>
        </div>
        <div className="flex justify-between p-3 rtl items-center gap-4 text-black font-bold">
          <button className="cursor-pointer transition duration-100  hover:scale-125 hover:text-white rounded-2xl hover:bg-black  p-1">
            Fratures
          </button>
          <button className="cursor-pointer transition duration-100  hover:scale-125 hover:text-white rounded-2xl hover:bg-black  p-1">
            Security
          </button>
          <button className="cursor-pointer transition duration-100  hover:scale-125 hover:text-white rounded-2xl hover:bg-black  p-1">
            Pricing
          </button>
          <button className="cursor-pointer transition duration-100  hover:scale-125 hover:text-white rounded-2xl hover:bg-black  p-1">
            Help Center
          </button>
        </div>
      </div>

      {/* top */}
      {/* center */}
      <div className="flex  my-5 justify-center items-center">
        <div className="px-11  text-black font-bold  w-1/2 flex flex-col">
          <h1 className=" text-wrap    text-5xl ">
            Experience Messaging in a New Light.
          </h1>
          <br />
          <p className="text-xl">
            A poerful, secure, and modern way to stay connected with your
            friend, family, and team, across all deviced
          </p>
          <br />
          <div className="w-full gap-2  flex justify-between items-center">
            <Link href={"/login"} className="cursor-pointer transition duration-100  shadow-2xl hover:text-black text-white  bg-blue-500 rounded-3xl  px-10 text-2xl py-6  ">
              Login
            </Link>
            <Link href={"/register"} className="cursor-pointer transition duration-100  shadow-2xl hover:text-black text-blue-400 border border-blue-500 bg-white rounded-4xl  px-10 text-2xl py-6 ">
              Register
            </Link>
          </div>
        </div>
        <div className="w-1/2 h-1/2">
          {" "}
          <img className="w-9/12 h-auto"  src="/1775328336393.png" />
        </div>
      </div>
      {/* center */}
      {/* end */}
      <div className="w-full text-black gap-3     flex justify-around items-center bg-red">
        <div className="bg-white font-bold p-4 flex gap-2 rounded-2xl">
          <GppGoodOutlinedIcon className="text-blue-800 text-2xl    " />

          <div>
            {" "}
            <h1>End-to-End Encryption</h1>
            <br />
            <p>Secure and modern encryption and Lend-to-end encryption</p>
          </div>
        </div>
        <div className="bg-white font-bold p-4 flex gap-2 rounded-2xl">
          <ImportantDevicesOutlinedIcon className="text-blue-800 text-2xl    " />
          <div>
            {" "}
            <h1>Cross-Platform Sync</h1>
            <br />
            <p> Connect with friends,devices,your platform,all devices</p>
          </div>
        </div>
        <div className="bg-white  font-bold p-4 flex gap-2 rounded-2xl">
          <RocketLaunchOutlinedIcon className="text-blue-800 text-2xl    " />
          <div>
            {" "}
            <h1>Blazing Fast Speed</h1>
            <br />
            <p> Speed fast speed to roller for everyone sync and slunk</p>
          </div>
        </div>
      </div>
      {/* end */}
      <hr className="mt-3 text-black" />
    </div>
  );
}
