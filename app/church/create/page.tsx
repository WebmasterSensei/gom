import NavBarAuth from "@/app/auth/components/nabvar";
import { createClient } from "@/lib/supabaseServer";

import { redirect } from "next/navigation";
import AddChurhForm from "../component/addchuch";

export default async function ChurchCreate() {
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
            <AddChurhForm />
        </div>
    );
}