"use client";

import "@/app/css/typewriter.css";

import Title from "../Components/Title";

import { login } from "../Authentication/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useStore from "../store";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [monkey, setMonkey] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    
    const router = useRouter();
    const { zLogin, zIsLoggedIn } = useStore();

    useEffect(() => {
        if (zIsLoggedIn) {
            router.push("/");
        }
    }, [zIsLoggedIn, router]);

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
                    setErrorMsg("Username not found for this account.");
                }
            } else {
                setErrorMsg("Failed to fetch user data.");
            }
        } catch (error) {
            console.error("An error occurred while fetching the username:", error);
            setErrorMsg("An error occurred connecting to the server.");
        }
    };

    const handleLogIn = async (event) => {
        event.preventDefault();
        setErrorMsg("");

        if (!email || !password) {
            setErrorMsg("Please enter both email and password.");
            return;
        }

        setIsLoading(true);
        try {
            await login(email, password);
            await addUserToState(email);
        } catch (error) {
            setErrorMsg(error.message || "Failed to log in.");
        } finally {
            setIsLoading(false);
        }
    };

    if (zIsLoggedIn) return null;

    return (
        <main className="flex h-screen flex-col items-center justify-center relative">
            <Title />

            <div className="flex flex-row m-8 justify-center items-center w-full max-w-5xl">
                <video autoPlay loop muted className="w-2/6 h-auto hidden md:block rounded-lg shadow-lg">
                    <source src="/images/3.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <form 
                    onSubmit={handleLogIn}
                    className="bg-white rounded m-8 p-6 flex flex-col justify-center items-center w-80 relative shadow-xl"
                >
                    <h1 className="text-2xl font-bold mb-4 text-black self-start ml-2">
                        Login
                    </h1>
                    
                    {errorMsg && (
                        <div className="text-red-500 text-sm mb-2 text-center w-full">
                            {errorMsg}
                        </div>
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="m-2 bg-pink-100 rounded pl-2 w-full h-10"
                        disabled={isLoading}
                    />
                    <div className="flex w-full m-2 relative items-center">
                        <input
                            type={monkey ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-pink-100 rounded pl-2 w-full h-10 pr-10"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={toggleMonkey}
                            className="absolute right-2 w-6 h-6 focus:outline-none"
                        >
                            <img 
                                src={monkey ? "/see_password.png" : "/hide_password.png"} 
                                alt="Toggle Password"
                                className="w-full h-full object-contain"
                            />
                        </button>
                    </div>
                    
                    <div className="flex flex-col justify-center items-center mt-4 w-full">
                        <button
                            type="submit"
                            className="bg-pink-200 hover:bg-pink-300 transition-colors w-full h-10 rounded font-semibold disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Log In"}
                        </button>

                        <div className="flex flex-col items-center mt-4 space-y-2">
                            <a href="/signup" className="text-sm underline text-gray-600">
                                New User? Sign Up
                            </a>
                            <a href="/" className="text-sm underline text-gray-600">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                </form>
            </div>
            <div className="text-xl md:text-3xl font-mono typewriter absolute bottom-0 mb-8 px-4 text-center">
                <p>Share what matters with those who matter</p>
            </div>
        </main>
    );
}
