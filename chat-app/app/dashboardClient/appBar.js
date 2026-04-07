"use client";
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "next-themes";
import MoreIcon from "@mui/icons-material/MoreVert";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

import { Avatar } from "@mui/material";
import Link from "next/link";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar({ setFriends }) {
  try {
    const socketRef = useRef(null);
    const [mounted, setMounted] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [img, setImg] = useState("");
    const [name, setname] = useState("");
    const [act, setact] = useState(null);
    const [search, setSearch] = useState("");
    useEffect(() => {
      setMounted(true);
      const getImage = async () => {
        const res = await fetch("https://chat-app-finall-1.onrender.com/getFriendsLis", {
          method: "GET",
          credentials: "include",
        });
        const dataa = await res.json();
        setFriends(dataa);
        const response = await fetch("https://chat-app-finall-1.onrender.com/getImageProfile", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setImg(data.profileImg);
        setname(data.name);
        setact(data.activated);
      };
      getImage();
    }, []);
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark" || theme === "night";
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
    const handelSumbitSearch = async (e) => {
      e.preventDefault();
      if (search !== "") {
        // socketRef.current = new WebSocket("ws://localhost:3003");
        // socketRef.current.onopen = () => {
        //   console.log("Socket opened");
        //    if (
        //     socketRef.current.readyState === WebSocket.OPEN &&
        //     socketRef.current
        //   ) {
        //     const messageData =({search});
        //     socketRef.current.send(JSON.stringify(messageData));
        //   } else {
        //     console.log("not connected with websocket");
        //   }
        // };
        // socketRef.current.onmessage = (event) => {
        //   try {
        //     const data = JSON.parse(event.data);
        //     console.log(data,"ddd")
        //     setFriends(data.usersFound);
        //   } catch (e) {
        //     // console.log(e.message);
        //   }

        // };
        try {
          const response = await fetch("https://chat-app-finall-1.onrender.com/search", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({ name: search }),
          });
          const result = await response.json();
          console.log(result);
          setFriends(result);
        } catch (error) {
          console.error(error.message);
        }
        setSearch("");
      }
    };
    const menuId = "primary-search-account-menu";
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        sx={img}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <Link href={"/Profile"}>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Link>
      </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";

    if (!mounted) return null;

    return (
      <Box className={`w-full flex flex-col gap-3  relative z-10`}>
        <Box
          sx={{ display: { xs: "none", md: "flex" } }}
          className={` ${
            isDark ? "bg-black text-white" : "bg-gray-300 text-black"
          } rounded-2xl `}
        >
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar alt="my Imagae" src={img} sx={{ width: 75, height: 75 }} />
          </IconButton>
          <p className="text-4xl m-5">{name}</p>
          {act ? (
            <p className="text-2xl  m-5 text-green-500">Active</p>
          ) : (
            <p className="text-2xl m-5 text-red-500">Not Active</p>
          )}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>

        {renderMenu}
        <form
          onSubmit={handelSumbitSearch}
          className={` px-2   border  rounded-2xl ${
            isDark ? "bg-black text-white" : "bg-gray-300 text-black"
          }`}
        >
          <Search className="   not-first-of-type: flex ">
            <button className="text-2xl ">
              <SearchIcon className="cursor-pointer mr-2  " />
            </button>
            <StyledInputBase
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search…"
              className="w-full"
              inputProps={{ "aria-label": "search" }}
            />{" "}
            <KeyboardBackspaceOutlinedIcon
              onClick={async () => {
                //
                const res = await fetch("https://chat-app-finall-1.onrender.com/getFriendsLis", {
                  method: "GET",
                  credentials: "include",
                });
                const data = await res.json();
                console.log(data);
                setFriends(data);
              }}
              sx={{ fontSize: 40 }}
              className="cursor-pointer"
            />
          </Search>
        </form>
      </Box>
    );
  } catch (e) {
    console.log(e.message);
  }
}
