"use client";

import { useState, useEffect } from "react";

import Title from "../Components/Title.js";
import { signup } from "../Authentication/auth.js";
import { useRouter } from "next/navigation";
import useStore from "../store";

async function addUser(email, username) {
    const response = await fetch("/api/add-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username }),
    });

    const data = await response.json();
    return { ok: response.ok, data };
}

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const router = useRouter();
    const { zIsLoggedIn } = useStore();

    useEffect(() => {
        if (zIsLoggedIn) {
            router.push("/");
        }
    }, [zIsLoggedIn, router]);

    const handleSignUp = async (event) => {
        event.preventDefault();
        setErrorMsg("");

        if (!email || !password || !username) {
            setErrorMsg("All fields are required.");
            return;
        }

        if (password.length < 6) {
            setErrorMsg("Password must be at least 6 characters.");
            return;
        }

        setIsLoading(true);
        try {
            // Create user in Postgres first to ensure username is unique
            const dbResult = await addUser(email, username);
            if (!dbResult.ok) {
                throw new Error(dbResult.data.error || "Username or email already exists.");
            }

            // If Postgres succeeds, create in Firebase
            await signup(email, password);
            router.push("/login");
        } catch (error) {
            setErrorMsg(error.message || "An error occurred during signup.");
        } finally {
            setIsLoading(false);
        }
    };

    if (zIsLoggedIn) return null;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center relative">
            <Title />
            <form
                className="bg-white rounded m-8 p-6 flex flex-col items-center shadow-lg w-80 relative"
                onSubmit={handleSignUp}
            >
                <h1 className="text-xl font-bold mb-4 text-black">Sign Up</h1>
                
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
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-pink-100 rounded pl-2 w-full h-10 pr-10"
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 w-6 h-6 focus:outline-none"
                    >
                        <img 
                            src={showPassword ? "/see_password.png" : "/hide_password.png"} 
                            alt="Toggle Password" 
                            className="w-full h-full object-contain"
                        />
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="m-2 bg-pink-100 rounded pl-2 w-full h-10"
                    disabled={isLoading}
                />

                <div className="flex flex-col justify-center items-center mt-4 w-full">
                    <button
                        type="submit"
                        className="bg-pink-200 hover:bg-pink-300 transition-colors w-full h-10 rounded font-semibold disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing Up..." : "Sign Up"}
                    </button>

                    <a href="/login" className="text-sm underline mt-4 text-gray-600">
                        Have an Account? Log In
                    </a>
                </div>
            </form>
        </main>
    );
}

export default SignUp;
