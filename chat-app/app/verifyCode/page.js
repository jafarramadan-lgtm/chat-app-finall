import { Suspense } from "react";
import VerifyClient from "./verify";
export default function Verify(){
  return <Suspense fallback={<div>Loading...</div>}><VerifyClient/></Suspense>
}