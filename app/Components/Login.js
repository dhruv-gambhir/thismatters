"use client";

import { login } from "../auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogIn = async (event) => {
        event.preventDefault();

        try {
            const user = await login(email, password);
            alert("Logged in user:", user);
            router.push("/home");
        } catch (error) {
            alert("Login error:", error.message);
        }
    };

    return (
        <form
            className="bg-white h-64 w-64 rounded m-8 flex flex-col justify-center items-center"
            onSubmit={handleLogIn}>
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

export default Login;
