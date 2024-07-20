"use client";

import SideBar from "./Components/SideBar";
import Post from "@/app/Components/Post";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useStore from "./store";

export default function Home() {
    const { zIsLoggedIn } = useStore();
    const router = useRouter();

    if (!zIsLoggedIn) {
        router.push("/login");
        return null;
    }
    return (
        <main className="min-h-screen flex flex-row">
            <SideBar />
            <div className="w-1/6" />
            <div className="flex items-center w-5/6">
                <div className="flex flex-col items-center overflow-y-auto w-full h-full">
                    <div className="flex flex-row">
                        <h1 className="font-bold m-4 ">Home</h1>
                    </div>
                    <Post
                        username="dhhrooov"
                        textContent="Hello this is dhruv. This is my diwali post."
                        imgSource="/images/1.jpg"
                    ></Post>

                    <Post
                        username="vansh"
                        textContent="Hello this is vansh. Idk why im posting this."
                        imgSource="/home.png"
                    ></Post>
                    <Post
                        username="cat_account"
                        textContent="i am posting a sad cat"
                        imgSource="/sadcat.gif"
                    ></Post>
                </div>
            </div>
        </main>
    );
}
