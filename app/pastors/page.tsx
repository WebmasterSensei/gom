import { createClient } from "@/lib/supabaseServer";

import { redirect } from "next/navigation";
import NavBarAuth from "../auth/components/nabvar";
import PastorAdmin from "./components/pastorsadmin";

export default async function Dashboard() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }
    return (
        <div className="max-w-screen py-15">
            <NavBarAuth />
            <PastorAdmin />
        </div>
    );
}