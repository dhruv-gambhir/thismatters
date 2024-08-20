"use client";

import useStore from "../store";
import Username from "./Username";

export default function SendRequestComponent({ username }) {
    const { zUsername } = useStore();

    async function addRequest(sender, receiver) {
        const response = await fetch("/api/send-request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender: sender,
                receiver: receiver,
            }),
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <main className="w-5/6 scroll-y">
            <div className="flex flex-row border border-dotted border-black border-1 rounded m-4 p-2 relative">
                <Username username={username} />
                <button
                    className="absolute right-2"
                    onClick={() => {
                        addRequest(zUsername, username);
                    }}
                >
                    Send Request
                </button>
            </div>
        </main>
    );
}
