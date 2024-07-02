"use client";

import { useState } from "react";
import Image from "next/image";

export default function Title() {
    const [heart, setHeart] = useState("/heart.png");

    const handleHeartClick = () => {
        if (heart === "/heart.png") {
            setHeart("/heart_fill.png");
        } else {
            setHeart("/heart.png");
        }
    };

    return (
        <div className="flex flex-row items-center justify-center m-8">
            <h1 className="font-bold pr-2">this matters</h1>
            <button onClick={handleHeartClick}>
                <Image src={heart} height="15" width="15" alt="heart" />
            </button>
        </div>
    );
}
