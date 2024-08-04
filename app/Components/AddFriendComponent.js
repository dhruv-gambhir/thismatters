"use client";

import useStore from "../store";

export default function AddFriendComponent({ username }) {
    const { zUsername } = useStore();

    async function addFriend(sender, receiver) {
        const response = await fetch("/api/add-friend", {
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
    }

    async function removeRequest(sender, receiver) {
        const response = await fetch("/api/remove-friend-request", {
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
    }

    return (
        <main className="w-5/6 scroll-y">
            <div className="flex flex-row border border-dotted border-black border-1 rounded m-4 p-2 relative">
                <h3>{username}</h3>
                <div className="flex flex-row absolute right-2">
                    <button
                        onClick={() => {
                            addFriend(username, zUsername);
                            removeRequest(zUsername, username);
                        }}
                    >
                        Add Friend
                    </button>
                    <button
                        className="mx-4 px-2 border border-black border-dotted rounded"
                        onClick={() => {
                            removeRequest(zUsername, username);
                        }}
                    >
                        x
                    </button>
                </div>
            </div>
        </main>
    );
}
