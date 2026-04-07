"use client";
import { Avatar, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import CircularEnableTrack from "../load";

import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import Link from "next/link";
export default function ImageAvatars() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || theme === "night";
  const [preview, setPreview] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [load, setload] = useState(false);
  const [name, setName] = useState("");
  const [act, setAct] = useState(false);
  useEffect(() => {
    setMounted(true);
    setload(true);
    const getImage = async () => {
      const response = await fetch("http://localhost:8000/getImageProfile", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data, "ll");
      if (data) setload(false);
      setPreview(data.profileImg);
      setName(data.name);
      setAct(data.activated);
    };

    getImage();
  }, []);
  if (!mounted) return null;
  return (
    <Stack
      direction="row"
      spacing={2}
      className={`flex flex-col w-full md:w-6/12 justify-around text-2xl font-bold shadow-lg  p-4   rounded-2xl  text-wrap ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Link href={"/dashboard"}>
        <KeyboardBackspaceOutlinedIcon
          sx={{ fontSize: 40 }}
          className={`hover:text-blue-400  ${
            isDark ? "bg-black text-white" : "bg-white text-black"
          } `}
        />
      </Link>
      {load ? (
        <CircularEnableTrack />
      ) : (
        <Avatar
          alt="my Imagae"
          src={preview}
          sx={{ width: 150, height: 150 }}
        />
      )}
      <div>
        {act ? (
          <p className="text-2xl m-5 text-green-500">Active</p>
        ) : (
          <p className="text-2xl m-5 text-red-500">Not Active</p>
        )}
        <h1 className="text-2xl font-bold  ">Settings</h1>
        <h1 className="text-2xl font-bold">{name} Account</h1>
      </div>
    </Stack>
  );
}
