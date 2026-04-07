"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ForumIcon from "@mui/icons-material/Forum";
import CircularEnableTrack from "../load";
export default function Register() {
  const [load, setload] = useState(false);

  const handleClickShowPassword = (setShowPassword) =>
    setShowPassword((show) => !show);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatePassword, setShowRepeatePassword] = React.useState(false);

  const [formRegiter, setFormRegister] = useState({
    email: "",
    username: "",
    password: "",
    repeatePassowrd: "",
  });
  const router = useRouter();
  return (
    <div className=" w-full md:w-fit h-9/12 bg-gray-200  p-3  text-black flex flex-col items-center justify-center gap-10 rounded-3xl">
      <ForumIcon className="text-blue-400 " fontSize="large" />
      <p className="text-black font-bold text-2xl">
        Connect<span className="text-blue-500">Chat</span>
      </p>{" "}
      <form
        className="w-fit h-9/12    text-black flex flex-col items-center justify-center gap-10 rounded-3xl"
        onSubmit={async (e) => {
          setload(true);
          e.preventDefault();
          if (formRegiter.password !== formRegiter.repeatePassowrd) {
            setload(false);
            alert("password not same Repeate Password");
            return;
          }
          const url = "https://chat-app-finall-1.onrender.com/register";
          try {
            const response = await fetch(url, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify(formRegiter),
            });
            const result = await response.json();
            if (result) setload(false);
            if (response.ok   ) {
              setload(false);
              const data=encodeURIComponent(JSON.stringify(formRegiter))
              router.push(`/verifyCode?data=${data}`);
            } else {
              setload(false);
              alert(result.message || "Repeate email or password");
            }
          } catch (error) {
            setload(false);
            alert(result.message || "Repeate email or password");
          }
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            inputProps={{ minLength: "13", maxLength: "30" }}
            id="input-with-sx"
            label="Email"
            variant="standard"
            type="email"
            required
            value={formRegiter.email}
            onChange={(e) => {
              setFormRegister({ ...formRegiter, email: e.target.value });
            }}
          />
        </Box>
        <TextField
          inputProps={{ minLength: "4", maxLength: "30" }}
          value={formRegiter.username}
          onChange={(e) => {
            setFormRegister({ ...formRegiter, username: e.target.value });
          }}
          id="outlined-basic"
          label="userName : "
          variant="outlined"
        />

        <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            inputProps={{ minLength: "8", maxLength: "30" }}
            required
            id="filled-adornment-password"
            type={showPassword ? "text" : "password"}
            value={formRegiter.password}
            onChange={(e) => {
              setFormRegister({ ...formRegiter, password: e.target.value });
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={() => handleClickShowPassword(setShowPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            inputProps={{ minLength: "8", maxLength: "30" }}
            required
            id="filled-adornment-password"
            type={showRepeatePassword ? "text" : "password"}
            value={formRegiter.repeatePassowrd}
            onChange={(e) => {
              setFormRegister({
                ...formRegiter,
                repeatePassowrd: e.target.value,
              });
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showRepeatePassword
                      ? "hide the password"
                      : "display the password"
                  }
                  onClick={() =>
                    handleClickShowPassword(setShowRepeatePassword)
                  }
                  edge="end"
                >
                  {showRepeatePassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <div className="flex gap-10 w-fit justify-around items-center">
          <button
            type="submit"
            className="cursor-pointer transition duration-100  shadow-2xl hover:text-black text-white  bg-blue-500 rounded-3xl  px-10 text-2xl py-6  "
          >
            {load ? <CircularEnableTrack /> : "Register"}
          </button>
          <Link
            href={"/login"}
            className="cursor-pointer transition duration-100  shadow-2xl hover:text-black text-blue-400 border border-blue-500 bg-white rounded-4xl  px-8 text-2xl py-6 "
          >
            Login{" "}
          </Link>{" "}
        </div>
      </form>
    </div>
  );
}
