"use client";

import SideBar from "./Components/SideBar";
import Post from "@/app/Components/Post";
import { useRouter } from "next/navigation";
import useStore from "./store";
import { useEffect, useState } from "react";

export default function Home() {
    const { zIsLoggedIn } = useStore();
    const router = useRouter();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch(`/api/get-all-posts`);
            const data = await response.json();
            console.log(data);
            if (data.success) {
                setPosts(data.allposts.rows);
            }
        }
        fetchPosts();
    }, []);

    if (!zIsLoggedIn) {
        router.push("/login");
        return null;
    }
    return (
        <main className="min-h-screen flex flex-row">
            <SideBar />
            <div className="w-1/6" />
            <div className="flex flex-col items-center overflow-y-auto w-5/6">
                <h1>Home</h1>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Post
                            key={post.id}
                            username={post.username}
                            title={post.title}
                            textContent={post.text}
                            imgSource={post.images}
                        />
                    ))
                ) : (
                    <p>No posts to show</p>
                )}
            </div>
        </main>
    );
}
