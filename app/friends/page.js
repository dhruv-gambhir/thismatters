"use client";

import { useEffect, useState } from "react";

import SideBar from "../Components/SideBar";
import SendRequestComponent from "../Components/SendRequestComponent";
import useStore from "../store";
import AddFriendComponent from "../Components/AddFriendComponent";

export default function Friends() {
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [friendSearch, setFriendSearch] = useState("");
    const { zUsername } = useStore();

    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch(`/api/get-all-users`);
            const data = await response.json();
            console.log(data);
            if (data.success) {
                setUsers(data.allusers.rows);
            }
        }
        fetchUsers();

        async function fetchRequests() {
            const response = await fetch(
                `/api/get-my-requests?username=${zUsername}`
            );

            const data = await response.json();
            console.log(data);
            if (data.success) {
                console.log(data.data.rows);
                setRequests(data.data.rows);
            }
        }

        fetchRequests();
    }, []);

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(friendSearch.toLowerCase())
    );

    return (
        <main className="min-h-screen flex flex-row">
            <SideBar />
            <div className="w-1/6" />
            <div className="flex flex-row items-center w-5/6 mx-4">
                <div className="flex flex-col h-5/6 w-1/2 items-center border border-black m-4 overflow-y-auto">
                    <h1>Friends</h1>
                    <input
                        type="text"
                        placeholder="Search"
                        value={friendSearch}
                        onChange={(e) => setFriendSearch(e.target.value)}
                        className="w-5/6 bg-pink-100 border border-black border-1 rounded m-4 px-2"
                    ></input>

                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <SendRequestComponent username={user.username} />
                        ))
                    ) : (
                        <p>No users to show</p>
                    )}
                </div>
                <div className="flex flex-col h-5/6 w-1/2 items-center border border-black m-4 overflow-y-auto">
                    <h1>Requests</h1>
                    {filteredUsers.length > 0 ? (
                        requests.map((user) => (
                            <AddFriendComponent username={user.sender} />
                        ))
                    ) : (
                        <p>No users to show</p>
                    )}
                </div>
            </div>
        </main>
    );
}
