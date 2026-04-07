"use client";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import CircularEnableTrack from "../load";
export default function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme, setTheme } = useTheme();
  const [load, setLoad] = useState(false);
  const isDark = theme === "dark" || theme === "night";
  const [mount, setmount] = useState(false);
  useEffect(() => {
    setmount(true);
  }, []);
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoad(true);

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      setConfirmPassword("");
      setNewPassword("");
      setCurrentPassword("");
      return;
    }
    const res = await fetch("http://localhost:8000/updatePassword", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    });
    const data = await res.json();
    if (data) {
      setLoad(false);
      alert("success updatae password");
    }
    setConfirmPassword("");
    setNewPassword("");
    setCurrentPassword("");
    // Handle password change logic here
  };
  if (!mount) return;
  return (
    <div
      className={`flex flex-col text-2xl font-bold shadow-lg w-full md:w-4/12    rounded-2xl  text-wrap ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`${
          isDark ? "bg-black text-white" : "bg-gray-300 text-black"
        } p-3 flex rounded-t-2xl`}
      >
        <HttpsOutlinedIcon
          sx={{ fontSize: 30 }}
          className="mr-1 text-blue-800"
        />
        <p> Security & Passowrd</p>
      </div>
      <div className="  p-3 flex flex-col  gap-5">
        <h1>Change Password</h1>
        <form onSubmit={handleChangePassword}>
          <input
            maxLength={30}
            minLength={8}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password"
            placeholder="current password"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            maxLength={30}
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="new password"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />
          <input
            maxLength={30}
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="confirm new password"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />
          <button
            type="submit"
            className="w-full flex justify-center bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-300"
          >
            {load ? <CircularEnableTrack /> : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
