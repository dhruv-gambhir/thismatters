import Image from "next/image";

import LikeButton from "./LikeButton";

export default function Post({ username, textContent, imgSource }) {
    return (
        <div className="border-dotted border-black border-2 m-4">
            <h1 className="pl-2">{username}</h1>
            <div className="border border-1 border-black w-full"></div>
            <text> {textContent}</text>
            <Image
                src={imgSource}
                height="400"
                width="400"
                alt="post image"
                className="p-4"
            />
            <LikeButton />
        </div>
    );
}
