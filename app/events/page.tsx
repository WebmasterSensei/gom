import { createClient } from "@/lib/supabaseServer";

import { redirect } from "next/navigation";
import NavBarAuth from "../auth/components/nabvar";
import EventLists from "./components/event-lists";

export default async function EventsAdmin() {
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
            <EventLists/>
        </div>
    );
}
