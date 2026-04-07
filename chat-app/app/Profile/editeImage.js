"use client";
import { useTheme } from "next-themes";
import { Avatar, IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CircularEnableTrack from "../load";

export default function EditeImage() {
  const [load, setLoad] = useState(false);

  const [preview, setPreview] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || theme === "night";
  const [act, setact] = useState(false);
  const handleFileChange = async (event) => {
    setLoad(true);

    const selectFile = event.target.files[0];
    if (selectFile) {
      const formDta = new FormData();
      formDta.append("image", selectFile);
      try {
        const res = await fetch("http://localhost:8000/editeImageProfile", {
          method: "POST",
          body: formDta,
          credentials: "include",
        });
        const data = await res.json();
        if (data && res.ok) {
          setLoad(false);
          alert("success updatae image profile");
        }
        setPreview(data.profileImg);
        window.location.href = "/Profile";
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    setMounted(true);

    const getImage = async () => {
      setLoad(true);
      const response = await fetch("http://localhost:8000/getImageProfile", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data) setLoad(false);
      setPreview(data.profileImg);
      setName(data.name);
      setEmail(data.email);
      setact(data.activated);
    };
    getImage();
  }, []);
  if (!mounted) return null;

  return (
    <Stack
      direction="column"
      className={`w-full md:w-3/12 flex rounded-2xl  flex-col justify-center items-center   p-4 text-wrap break-all ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {load ? (
        <CircularEnableTrack />
      ) : (
        <Avatar alt="my Imagae" src={preview} sx={{ width: 75, height: 75 }} />
      )}
      <div className="mt-0 flex  items-center gap-2">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            type="file"
            id="avatar"
            accept="image/*"
            name="avatar"
            hidden
            onChange={handleFileChange}
          />
          <EditIcon
            sx={{ fontSize: 40 }}
            className="hover:text-blue-900 transition delay-75"
          />
        </IconButton>
        <h2 className=" font-bold ">Account Info</h2>
        {act ? (
          <p className="text-green-500 text-sm">Active</p>
        ) : (
          <p className="text-red-500 text-sm">Not Active</p>
        )}
      </div>{" "}
      <h1 className="text-2xl  font-bold">{name} </h1>
      <div className="flex  font-bold w-full justify-center items-center   gap-1">
        {" "}
        <EmailOutlinedIcon
          sx={{ fontSize: 30 }}
          className="mr-1 text-blue-800"
        />
        <div className="flex flex-col ">
          <p>email : </p>
          {load ? <CircularEnableTrack /> : <span>{email}</span>}
        </div>
      </div>
    </Stack>
  );
}
