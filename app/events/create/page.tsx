import NavBarAuth from "@/app/auth/components/nabvar";
import { getCurrentUser } from "@/lib/appwriteServer";
import { redirect } from "next/navigation";
import AddEventComponent from "../components/add-events";

export default async function AddEvents() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }
    return (
        <div className="max-w-screen py-15">
            <NavBarAuth />
            <AddEventComponent />
        </div>
    );
}