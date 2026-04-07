"use client";
import { useRef, useState, useEffect } from "react";
import CircularEnableTrack from "../load";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
export default function VerifyClient() {
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
     const dataRaw = searchParams.get("data");
    if (dataRaw) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataRaw));
        setUserData(decodedData);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);
  const inputs = useRef([]);
  const [myCode, setMyCode] = useState(["", "", "", "", "", ""]);
  const [load, setload] = useState(false);
  const router = useRouter();
  const handleChange = (e, index) => {
    const val = e.target.value;
    if (isNaN(val)) return;
    const newCode = [...myCode];
    newCode[index] = val.slice(-1);
    setMyCode(newCode);
    if (val.length === 1 && index < 5) {
      inputs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs.current[index - 1].focus();
    }
  };
  return (
    <div className="flex w-full h-full flex-col justify-center items-center min-h-screen bg-gray-50  gap-8">
      <h2 className="text-2xl font-bold text-gray-800">Input Your Code</h2>
      <div className="flex gap-3">
        {[...Array(6)].map((digit, i) => {
          return (
            <input
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              value={digit}
              type="text"
              maxLength={1}
              className="w-12 h-16 text-center text-2xl 
            font-semibold border-2 rounded-xl border-gray-200
             focus:border-vlue-500 focus:ring-2 focus:ring-blue-200 
             outline-none transition-all bg-white text-gray-900"
              onChange={(e) => {
                handleChange(e, i);
              }}
              onKeyDown={(e) => {
                handleKeyDown(e, i);
              }}
            />
          );
        })}
      </div>
      <button
        onClick={async () => {
          try {
            const fullCode = myCode.join("");
             const response = await fetch("http://localhost:8000/code", {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify({
                code: fullCode,
                email: userData.email,
                name: userData.username,
                password: userData.password,
              }),
            });
            const result = await response.json();
            if (result) setload(false);
            console.log(result)
            if (response.ok && result.message === "sucess Register") {
              setload(false);
              router.push("/dashboard");
            } else {
              setload(false);
              alert(result.message || "wrong the code");
              router.push("/dashboard");
            }
          } catch (error) {
            setload(false);
            console.log(error.message);
          }
        }}
        className=" px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {load ? <CircularEnableTrack /> : " Submit"}
      </button>
    </div>
  );
}
