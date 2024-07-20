"use client";

import { login } from "../Authentication/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "../store";

export default function LoginBox() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { zLogin } = useStore();

    const addUserToState = async (email) => {
        try {
            const response = await fetch("/api/get-username-from-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.username) {
                    zLogin(data.username);
                } else {
                    console.error("Username not found");
                }
            } else {
                console.error("Failed to fetch username");
            }
        } catch (error) {
            console.error(
                "An error occurred while fetching the username:",
                error
            );
        }
    };

    const handleLogIn = async (event) => {
        event.preventDefault();

        try {
            const user = await login(email, password);
            addUserToState(email);
            router.push("/");
        } catch (error) {
            alert("Login error:", error.message);
        }
    };

    return (
        <form
            className="bg-white h-64 w-64 rounded m-8 flex flex-col justify-center items-center"
            onSubmit={handleLogIn}
        >
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="m-2 bg-pink-100 rounded pl-1"
                style={{ height: "10%", width: "80%" }}
            ></input>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="m-2 bg-pink-100 rounded pl-1"
                style={{ height: "10%", width: "80%" }}
            ></input>
            {/* Money Button
                <div className="bg-blue-100 w-12 rounded">
                    <button className="w-6 align-left p-1">
                        <Image src="/see_password.png" height="20" width="20" />
                    </button>

                    <button className="w-6 align-right p-1">
                        <Image src="/hide_password.png" height="20" width="20" />
                    </button>
                </div>
            */}

            <div className="flex flex-col justify-center items-center">
                <button type="submit" className=" bg-pink-100 w-16 m-4 rounded">
                    Log In
                </button>

                <a href="/signup" className="text-xs underline">
                    New User? Sign Up
                </a>

                <a href="/" className="text-xs underline">
                    Forgot Password?
                </a>
            </div>
        </form>
    );
}
