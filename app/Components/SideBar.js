"use client";

import Title from "@/app/Components/Title";
import { useRouter } from "next/navigation";

export default function SideBar() {
    const router = useRouter();

    return (
        <main className="fixed top-0 left-0 flex flex-col min-h-screen items-center w-1/6 pt-4 border-r border-r-2 border-r-black m-2">
            <Title />
            <nav>
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

                <button className="border-solid border-2 border-black rounded m-2 w-10/12">
                    Friends
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
            </nav>
        </main>
    );
}
