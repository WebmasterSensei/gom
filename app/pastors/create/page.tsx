import NavBarAuth from "@/app/auth/components/nabvar";
import { getCurrentUser } from "@/lib/appwriteServer";
import { redirect } from "next/navigation";
import AddPastorsForm from "../components/add-pastors";

export default async function AddPastors() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }
    return (
        <div className="max-w-screen py-15">
            <NavBarAuth />
            <AddPastorsForm />
        </div>
    );
}