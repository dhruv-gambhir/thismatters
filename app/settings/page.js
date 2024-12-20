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
            <div className="w-1/6"/>
            <div className="flex flex-col items-center overflow-y-auto w-5/6 mx-4">
                <h1 className="mb-32">Settings</h1>
                <div className="flex flex-col w-full items-center"> 
                    <button onClick={() => router.push("/editprofile")} className="w-5/6 border-2 border-black rounded m-4">Edit Profile</button>
                    <button onClick={() => router.push("/changepassword")} className="w-5/6 border-2 border-black rounded m-4">Change Password</button>
                    <button onClick={Logout} className="w-5/6 border-2 border-black rounded m-4">Logout</button>
                </div>
            </div>
        </main>
    );
}
