"use client";
import SunnyIcon from "@mui/icons-material/Sunny";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkMode() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark" || theme === "night";

  return (
    <div
      className={`flex flex-col text-2xl font-bold shadow-lg w-full md:w-4/12    rounded-2xl  text-wrap ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className={` ${
        isDark ? "bg-black text-white" : "bg-gray-300 text-black"
      } p-3 flex rounded-t-2xl`}>
        <SunnyIcon sx={{ fontSize: 30 }} className="mr-1 text-blue-800" />
        <p> Appearance & Theme</p>
      </div>
      <div
        className={`p-3 rounded-2xl flex flex-col gap-5 ${
          isDark ? "bg-slate-900" : "bg-white"
        }`}
      >
        <h1> Dark Mode</h1>
        <div
          className={`flex border-0 justify-around gap-6 items-center ${
            isDark ? "bg-slate-800" : "bg-white"
          }`}
        >
          <FormControlLabel
            control={
              <Switch
                className="scale-200 transform-gpu"
                checked={isDark}
                onChange={() => setTheme(isDark ? "light" : "dark")}
              />
            }
          />
          <BedtimeOutlinedIcon
            sx={{ fontSize: 40 }}
            className="text-blue-700"
          />
        </div>
      </div>
    </div>
  );
}