"use client";

import Title from "@/app/Components/Title";
import { useRouter } from "next/navigation";

export default function SideBar() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-cente w-1/6 m-2 pt-4 border-r border-r-2 border-r-black">
            <Title />
            <button
                className="border-solid border-2 border-black rounded m-2 w-10/12"
                onClick={() => router.push("/")}>
                Home
            </button>
            <button
                className="border-solid border-2 border-black rounded m-2 w-10/12"
                onClick={() => router.push("/messages")}>
                Messages
            </button>
            <button
                className="border-solid border-2 border-black rounded m-2 w-10/12"
                onClick={() => router.push("/profile")}>
                Profile
            </button>
            <button
                className="border-solid border-2 border-black rounded m-2 w-10/12"
                onClick={() => router.push("/settings")}>
                Settings
            </button>
        </div>
    );
}
