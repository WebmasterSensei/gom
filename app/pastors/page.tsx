import { getCurrentUser } from "@/lib/appwriteServer";

import { redirect } from "next/navigation";
import NavBarAuth from "../auth/components/nabvar";
import PastorAdmin from "./components/pastorsadmin";

export default async function Dashboard() {
    const user = await getCurrentUser();

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