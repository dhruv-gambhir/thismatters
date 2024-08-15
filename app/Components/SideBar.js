"use client";

import Title from "@/app/Components/Title";
import { useRouter } from "next/navigation";
import useStore from "../store";

export default function SideBar() {
    const router = useRouter();
    const { zUsername } = useStore(); // Destructure zUsername from the store

    return (
        <main className="fixed top-0 left-0 flex flex-col min-h-screen items-center w-1/6 pt-4 border-r border-r-2 border-r-black m-2">
            <Title />
            <nav className="flex-grow">
                <button
                    className="border-solid border-2 border-black rounded m-2 w-10/12"
                    onClick={() => router.push("/")}
                >
                    Home
                </button>
                <button
                    className="border-solid border-2 border-black rounded m-2 w-10/12"
                    onClick={() => router.push("/newpost")}
                >
                    Post
                </button>
                <button
                    className="border-solid border-2 border-black rounded m-2 w-10/12"
                    onClick={() => router.push("/friends")}
                >
                    Friends
                </button>
                <button
                    className="border-solid border-2 border-black rounded m-2 w-10/12"
                    onClick={() => router.push("/settings")}
                >
                    Settings
                </button>
            </nav>
            <button
                className="border-solid border-2 border-black rounded my-8 w-10/12 h-16 flex items-center justify-center"
                onClick={() => router.push("/myprofile")}
            >
                {zUsername}
            </button>
        </main>
    );
}
