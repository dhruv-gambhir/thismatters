"use client";

import { useState, useEffect } from "react";
import SideBar from "../Components/SideBar";
import Post from "../Components/Post";
import useStore from "../store";

export default function MyProfile() {
    const [posts, setPosts] = useState([]);
    const { zUsername } = useStore();

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch(
                `/api/get-my-posts?username=${zUsername}`
            );
            const data = await response.json();
            console.log(data); // Log the response to verify structure
            if (data.success) {
                setPosts(data.myposts.rows); // Adjusted to access rows array
            }
        }
        fetchPosts();
    }, [zUsername]);

    return (
        <main className="min-h-screen flex flex-row">
            <SideBar />
            <div className="w-1/6" />
            <div className="flex flex-col items-center overflow-y-auto w-5/6">
                <h1>Profile</h1>
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
