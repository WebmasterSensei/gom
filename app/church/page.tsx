import { getCurrentUser } from "@/lib/appwriteServer";

import { redirect } from "next/navigation";
import NavBarAuth from "../auth/components/nabvar";
import ChurchesAdmin from "./component/churchadmin";

export default async function Churches() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }
    return (
        <div className="max-w-screen py-15">
            <NavBarAuth />
            <ChurchesAdmin />
        </div>
    );
}