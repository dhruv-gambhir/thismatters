"use client";

import { useEffect, useState } from "react";

import SideBar from "../Components/SideBar";
import SendRequestComponent from "../Components/SendRequestComponent";
import useStore from "../store";
import AddFriendComponent from "../Components/AddFriendComponent";
import RemoveFriendomponent from "../Components/RemoveFriendComponent";

export default function Friends() {
    const [myFriends, setMyFriends] = useState([]);
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [friendSearch, setFriendSearch] = useState("");
    const { zUsername } = useStore();

    useEffect(() => {
        async function fetchFriends() {
            const response = await fetch(
                `/api/get-my-friends?username=${zUsername}`
            );
            const data = await response.json();
            console.log("friends", data.myfriends.rows);
            if (data.success) {
                setMyFriends(data.myfriends.rows);
            }
        }
        fetchFriends();

        async function fetchUsers() {
            const response = await fetch(`/api/get-all-users`);
            const data = await response.json();
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
                setRequests(data.data.rows);
            }
        }

        fetchRequests();
    }, []);

    const filteredUsers = users.filter((user) => {
        const friendUsernames = new Set(
            myFriends.map((friend) =>
                friend.sender === zUsername ? friend.receiver : friend.sender
            )
        );
        const requestUsernames = new Set(
            requests.map((request) => request.sender)
        );

        return (
            !friendUsernames.has(user.username) &&
            !requestUsernames.has(user.username) &&
            user.username.toLowerCase().includes(friendSearch.toLowerCase())
        );
    });

    return (
        <main className="min-h-screen flex flex-row">
            <SideBar />
            <div className="w-1/6" />
            <div className="flex flex-row items-center w-5/6 mx-4">
                <div className="flex flex-col h-5/6 w-1/2">
                    <div className="flex flex-col h-2/6 w-5/6 items-center border border-black m-4 overflow-y-auto">
                        <h1 className="text-bold my-4">Friends</h1>
                        {myFriends.length > 0 ? (
                            myFriends.map((user) => (
                                <RemoveFriendomponent
                                    username={
                                        user.sender == zUsername
                                            ? user.receiver
                                            : user.sender
                                    }
                                />
                            ))
                        ) : (
                            <p>No friends to show</p>
                        )}
                    </div>
                    <div className="flex flex-col h-2/6 w-5/6 items-center border border-black m-4 overflow-y-auto">
                        <h1 className="text-bold my-4">Requests</h1>
                        {requests.length > 0 ? (
                            requests.map((user) => (
                                <AddFriendComponent username={user.sender} />
                            ))
                        ) : (
                            <p>No users to show</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col h-5/6 w-1/2 items-center border border-black m-4 overflow-y-auto">
                    <h1 className="text-bold my-4">Find Friends</h1>
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
            </div>
        </main>
    );
}
