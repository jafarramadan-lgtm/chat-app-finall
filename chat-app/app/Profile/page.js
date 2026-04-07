// import { useRouter } from "next/navigation"
import EditeImage from "./editeImage";
import { cookies } from "next/headers";
import ImageAvatars from "./image";
import { redirect } from "next/navigation";
import DarkMode from "./darkmode";
import UpdatePassword from "./uodatePassword";
import AccountActive from "./accountActive";


export default async function Profile() {
  const cookiesStore = await cookies();
 

  return (
    <div className="w-9/12 md:h-fit   overflow-auto   no-scrollbar  text-black flex flex-col items-center   pt-10 gap-10 rounded-3xl">
 
      <ImageAvatars />
      <div className=" md:flex-row flex flex-col   md:h-full items-center justify-between gap-10   w-full   p-3 ">
        <EditeImage  />
        <DarkMode />
        <UpdatePassword />
      </div>
      <AccountActive />
    </div>
  );
}
