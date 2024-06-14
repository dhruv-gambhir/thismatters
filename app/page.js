"use client";

import Image from "next/image";
import ".//typewriter.css";
import Login from "./Login";
import { useState } from "react";
import Collage from "./Collage";

export default function Home() {
    const [heart, setHeart] = useState("/heart.png");

    const handleHeartClick = () => {
        if (heart === "/heart.png") {
            setHeart("/heart_fill.png");
        } else {
            setHeart("/heart.png");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center h-full">
            <div className="flex flex-row items-center justify-center m-8">
                <h1 className="font-bold">This Matters</h1>
                <div className="w-2"></div>

                <button onClick={handleHeartClick}>
                    <Image src={heart} height="20" width="20" />
                </button>
            </div>

            <div className="flex flex-row m-8">
                <Login />
            </div>
            <div className="text-3xl font-mono typewriter">
                <p>Share what matters with those who matter</p>
            </div>
        </main>
    );
}
