
import NavBarAuth from "@/app/auth/components/nabvar";
import { createClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import AddEventComponent from "../components/add-events";

export default async function AddEvents(){
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
            <AddEventComponent/>
        </div>
    );
}
