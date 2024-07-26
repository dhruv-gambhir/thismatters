"use client";

import useStore from "../store";

export default function AddFriendComponent({ username }) {
    const { zUsername } = useStore();

    async function addFriend(sender, reciever) {
        const response = await fetch("/api/add-friend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender: sender,
                reciever: reciever,
            }),
        });
        const data = await response.json();
    }

    return (
        <main className="w-4/6 scroll-y">
            <div className="flex flex-row border border-dotted border-black border-1 rounded m-4 p-2 relative">
                <h3>{username}</h3>
                <button
                    onClick={() => {
                        addFriend(username, zUsername);
                    }}
                    className="absolute right-2"
                >
                    Add Friend
                </button>
            </div>
        </main>
    );
}
