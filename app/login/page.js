"use client";

import "@/app/css/typewriter.css";

import Title from "../Components/Title";

import { login } from "../Authentication/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "../store";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { zLogin } = useStore();
    const [monkey, setMonkey] = useState(false);

    const toggleMonkey = (event) => {
        event.preventDefault();
        setMonkey(!monkey);
    };

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
                    router.push("/");
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
        } catch (error) {
            alert("Login error:", error.message);
        }
    };

    return (
        <main className="flex h-screen flex-col items-center justify-center">
            <Title />

            <div className="flex flex-row m-8 justify-center items-center">
                <video autoPlay loop muted className="w-2/6 h-5/6">
                    <source src="/images/3.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <form className="bg-white rounded m-8 flex flex-col justify-center items-center w-2/6 h-4/6 relative">
                    <h1 className="absolute top-5 left-5 text-xl text-black">
                        {" "}
                        Login{" "}
                    </h1>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="m-4 bg-pink-100 rounded pl-1 w-5/6 h-8"
                    />
                    <div className="flex flex-col relative justify-center w-5/6">
                        <input
                            type={monkey ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-pink-100 rounded pl-1 w-full h-8"
                        />
                        <button
                            type="button"
                            onClick={toggleMonkey}
                            className="absolute right-2 w-8"
                        >
                            {monkey ? (
                                <img src="see_password.png" />
                            ) : (
                                <img src="hide_password.png" />
                            )}
                        </button>
                    </div>{" "}
                    <div className="flex flex-col justify-center items-center">
                        <button
                            type="submit"
                            className="bg-pink-100 w-16 m-4 rounded p-2"
                            onClick={handleLogIn}
                        >
                            Log In
                        </button>

                        <a href="/signup" className="text-lg underline">
                            New User? Sign Up
                        </a>

                        <a href="/" className="text-lg underline">
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
            <div className="text-3xl font-mono typewriter absolute bottom-0 mb-8">
                <p>Share what matters with those who matter</p>
            </div>
        </main>
    );
}
