"use client";

import { useEffect, useState } from "react";

import { Textarea } from "@nextui-org/input";
import SideBar from "../Components/SideBar";
import AddUser from "../Components/AddUser";

export default function Friends() {
    const [users, setUsers] = useState([]);

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
    }, []);

    return (
        <main className="min-h-screen flex flex-row">
            <SideBar />
            <div className="w-1/6" />
            <div className="flex flex-row items-center w-5/6 mx-4">
                <div className="flex flex-col h-5/6 w-1/2 items-center border border-black m-4 overflow-y-auto">
                    <h1>Friends</h1>
                    <div className="w-5/6 border border-dashed border-2">
                        <Textarea placeholder="Search"></Textarea>
                    </div>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <AddUser id={user.id} username={user.username} />
                        ))
                    ) : (
                        <p>No users to show</p>
                    )}
                </div>
                <div className="flex flex-col h-5/6 w-1/2 items-center border border-black m-4 overflow-y-auto">
                    <h1>Requests</h1>
                </div>
            </div>
        </main>
    );
}
