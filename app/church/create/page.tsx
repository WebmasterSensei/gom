import NavBarAuth from "@/app/auth/components/nabvar";
import { getCurrentUser } from "@/lib/appwriteServer";

import { redirect } from "next/navigation";
import AddChurhForm from "../component/addchuch";

export default async function ChurchCreate() {
    const user = await getCurrentUser();

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