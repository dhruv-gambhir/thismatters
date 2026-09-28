import SideBar from "../Components/SideBar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useStore from "../store";

export default function Messages() {
    const { zIsLoggedIn } = useStore();
    const router = useRouter();

    useEffect(() => {
        if (!zIsLoggedIn) {
            router.push("/login");
        }
    }, [zIsLoggedIn, router]);
    if (!zIsLoggedIn) return null;

    return (
        <div className="min-h-screen flex flex-row">
            <SideBar />
            <div className="w-1/6" />
            <div className="flex flex-col items-center overflow-y-auto w-5/6">

                <h1>Messages</h1>
            </div>
        </div>
    );
}
