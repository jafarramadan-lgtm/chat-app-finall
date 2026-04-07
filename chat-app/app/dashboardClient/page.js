import Clients from "./clients"
 
export default function DashboardClient(){
  const secretkey=process.env.NEXT_PUBLIC_HASHMSGKEY;
   return <Clients secretkey={secretkey}/>
}