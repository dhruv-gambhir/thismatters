"use client";

import useStore from "../store";
import { useRouter } from "next/navigation";

export default function Username({ username }) {
    const router = useRouter();
    const zUsername = useStore();

    const usernameClicked = () => {
        if(username == zUsername) {
            router.push("/myprofile");
        } else {
            router.push(`/viewprofile/${username}`);
        }
    };

    return (
        <button className="flex px-4 border border-black rounded-full items-center justify-center" onClick={usernameClicked}>
            {username}
        </button>
    );
}
