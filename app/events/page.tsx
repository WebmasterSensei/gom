import { getCurrentUser } from "@/lib/appwriteServer";

import { redirect } from "next/navigation";
import NavBarAuth from "../auth/components/nabvar";
import EventLists from "./components/event-lists";

export default async function EventsAdmin() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }
    return (
        <div className="max-w-screen py-15">
            <NavBarAuth />
            <EventLists />
        </div>
    );
}