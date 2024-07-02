"use client";

import { useState } from "react";

import Title from "../Components/Title.js";
import { signup } from "../Authentication/auth.js";
import { useRouter } from "next/navigation";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const router = useRouter();

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const user = await signup(email, password);
            router.push("/login");
        } catch (error) {
            alert("Signup error:", error.message);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center h-full">
            <Title />
            <form
                className="bg-white h-64 w-64 rounded m-8 flex flex-col justify-center items-center"
                onSubmit={handleSignUp}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="m-2 bg-pink-100 rounded pl-1"
                    style={{ height: "10%", width: "80%" }}></input>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="m-2 bg-pink-100 rounded pl-1"
                    style={{ height: "10%", width: "80%" }}></input>
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
                <input
                    type="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="m-2 bg-pink-100 rounded pl-1"
                    style={{ height: "10%", width: "80%" }}></input>

                <div className="flex flex-col justify-center items-center">
                    <button
                        type="submit"
                        className="bg-pink-100 w-16 m-4 rounded">
                        Sign Up
                    </button>

                    <a href="/" className="text-xs underline">
                        Have an Account? Log In
                    </a>
                </div>
            </form>
        </main>
    );
}

export default SignUp;
