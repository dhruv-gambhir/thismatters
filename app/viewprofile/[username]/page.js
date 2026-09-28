"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SideBar from "../../Components/SideBar";
import Post from "../../Components/Post";
import useStore from "../../store";

export default function ViewProfile({params}) {
    const { zIsLoggedIn } = useStore();
    const router = useRouter();

    useEffect(() => {
        if (!zIsLoggedIn) {
            router.push("/login");
        }
    }, [zIsLoggedIn, router]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch(
                `/api/get-my-posts?username=${params.username}`
            );
            const data = await response.json();
            console.log(data);
            if (data.success) {
                setPosts(data.myposts.rows); 
            }
        }
        fetchPosts();
    }, [params.username]);
    if (!zIsLoggedIn) return null;


    return (
        <main className="min-h-screen flex flex-row">
            <SideBar />
            <div className="w-1/6" />
            <div className="flex flex-col items-center overflow-y-auto w-5/6">
                <h1>{params.username}</h1>
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
