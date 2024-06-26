"use client";

import SideBar from "./Components/SideBar";
import Post from "@/app/Components/Post";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
    const isLoggedIn = true;
    const router = useRouter();

    if (!isLoggedIn) {
        router.push("/login");
        return null;
    }
    return (
        <div className="min-h-screen grid grid-cols-12">
            <SideBar className="col-span-2" />
            <div className="min-h-screen col-span-10 flex flex-col items-center overflow-y-auto ml-48">
                <div className=""></div>
                <div className="flex flex-row">
                    <h1 className="font-bold m-4 ">Home</h1>
                </div>
                <button
                    className="h-10/12 w-10/12 border-dashed border-2 border-black rounded"
                    onClick={() => router.push("/newpost")}>
                    + Add Post
                </button>
                <Post
                    username="dhhrooov"
                    textContent="Hello this is dhruv. This is my diwali post."
                    imgSource="/images/1.jpg"></Post>

                <Post
                    username="vansh"
                    textContent="Hello this is vansh. Idk why im posting this."
                    imgSource="/home.png"></Post>
                <Post
                    username="cat_account"
                    textContent="i am posting a sad cat"
                    imgSource="/sadcat.gif"></Post>
            </div>
        </div>
    );
}
