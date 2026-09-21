import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/appwriteServer";
import Dashboard from "../dashboard";
import NavBarAuth from "./components/nabvar";

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="max-w-screen p-8">
            <NavBarAuth />
            <Dashboard />
        </div>
    );
}