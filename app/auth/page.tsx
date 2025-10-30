import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import Dashboard from "../dashboard";
import NavBarAuth from "./components/nabvar";

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

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