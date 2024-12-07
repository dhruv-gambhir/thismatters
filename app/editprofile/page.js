"use client";

import SideBar from "../Components/SideBar";
import useStore from "../store";
import { useState } from "react";

export default function EditProfile() {
    const { zUsername, zUpdateUsername } = useStore();
    const [username, setUsername] = useState(zUsername || "");
    const [oldUsername, setOldUsername] = useState(zUsername || "");

    const handleSave = async () => {
        if (username.trim()) {
            try {
                const response = await fetch("/api/edit-user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        oldUsername: oldUsername,
                        newUsername: username,
                    }),
                });

                const result = await response.json();

                if (result.success) {
                    zUpdateUsername(username);
                    alert("Profile updated successfully!");
                } else {
                    alert("Failed to update profile: " + result.message);
                }
            } catch (error) {
                console.error("Error updating profile:", error);
                alert("An error occurred while updating the profile.");
            }
        } else {
            alert("Username cannot be empty!");
        }
    };

    return (
        <main className="min-h-screen flex flex-row">
            <SideBar />
            <div className="w-1/6" />
            <div className="flex flex-col items-center overflow-y-auto w-5/6 mx-4">
                <h1 className="mb-32">Edit Profile</h1>
                <div className="flex flex-col w-full items-center">
                    <div className="w-5/6 flex flex-col mb-4">
                        <label className="mb-2 font-semibold">Username</label>
                        <input
                            type="text"
                            className="p-2 border-2 border-black rounded"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        className="w-5/6 border-2 border-black rounded m-4"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </main>
    );
}
