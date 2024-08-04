"use client";

import useStore from "../store";

export default function RemoveFriendomponent({ username }) {
    const { zUsername } = useStore();

    async function removeFriend(sender, receiver) {
        const response = await fetch("/api/remove-friend", {
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
                <h3>{username}</h3>
                <button
                    className="absolute right-2"
                    onClick={() => {
                        removeFriend(zUsername, username);
                    }}
                >
                    Remove Friend
                </button>
            </div>
        </main>
    );
}
