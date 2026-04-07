import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "../dashboardClient/page";

export default async function Dashboard() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("userToken");
  if (!token) redirect("/");
  return (
    
          <DashboardClient />
     
  );
}
