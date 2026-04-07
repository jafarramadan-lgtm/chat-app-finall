"use client";
import { useEffect } from "react";
export default function AuthRefresh(){
    useEffect(()=>{
      const refreshtoken=async()=>{
        try{
          const res=await fetch("https://chat-app-finall-1.onrender.com/refresh",{method:'POST',credentials:'include'})
               window.location.reload()
        }catch(e){console.log(e)}}
        const interval=setInterval(refreshtoken,55*60*1000);
        return ()=>clearInterval(interval)
    },[])
    return null

}