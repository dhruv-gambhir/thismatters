"use client";

import SideBar from "../Components/SideBar";
import useStore from "../store";
import { useRouter } from "next/navigation";

export default function Settings() {
    const { zLogout } = useStore();
    const router = useRouter();

    const Logout = () => {
        zLogout();
        router.push("/login");
    };

    return (
        <main className="min-h-screen flex flex-row">
            <SideBar />
            <div className="w-1/6" />
            <div className="flex flex-col items-center overflow-y-auto w-5/6">
                <h1>Settings</h1>
                <button onClick={Logout}>Logout</button>
            </div>
        </main>
    );
}
