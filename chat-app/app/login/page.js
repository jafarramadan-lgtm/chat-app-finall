"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
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
export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [load, setload] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
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
          const url = "http://localhost:8000/login";

          try {
            const response = await fetch(url, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify(formLogin),
            });
            if (!response.ok) {
              setload(false);

              alert("the email or password worng");
              router.push("/login");
              return;
            }
            if (response) {;setload(false)};
            const result = await response.json();
            if (result) {
              setload(false);
               router.push("/dashboard");
            }
          } catch (error) {
            setload(false);
            console.log(error.message);
          }
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            inputProps={{ minLength: "13", maxLength: "30" }}
            value={formLogin.value}
            id="input-with-sx"
            label="Email"
            variant="standard"
            type="email"
            required
            onChange={(e) => {
              setFormLogin({ ...formLogin, email: e.target.value });
            }}
          />
        </Box>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            inputProps={{ minLength: "8", maxLength: "30" }}
            required
            id="filled-adornment-password"
            type={showPassword ? "text" : "password"}
            value={formLogin.password}
            onChange={(e) => {
              setFormLogin({ ...formLogin, password: e.target.value });
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
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
            {load ? <CircularEnableTrack /> : "Login"}
          </button>
          <Link
            href={"/register"}
            className="cursor-pointer transition duration-100  shadow-2xl hover:text-black text-blue-400 border border-blue-500 bg-white rounded-4xl  px-8 text-2xl py-6 "
          >
            Register
          </Link>{" "}
        </div>
      </form>
    </div>
  );
}
