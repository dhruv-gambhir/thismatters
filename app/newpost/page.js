"use client";

import { useState } from "react";
import SideBar from "../Components/SideBar";
import useStore from "../store";

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [images, setImages] = useState([]);
    const { zUsername } = useStore;

    async function addPost() {
        const response = await fetch("/api/add-post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: zUsername,
                title: title,
                text: text,
                images: images,
            }),
        });

        const data = await response.json();
        console.log(data);
    }

    function handleImageChange(event) {
        const files = event.target.files;
        const imageArray = Array.from(files).map((file) =>
            URL.createObjectURL(file)
        );
        setImages(imageArray);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const username = "current_user"; // Replace with actual username logic
        addPost(username, title, text, images);
    }

    return (
        <main className="flex h-screen items-center justify-center">
            <SideBar />
            <div className="w-1/6" />
            <form
                className="bg-white h-5/6 w-4/6 m-4 rounded flex flex-col justify-center items-center"
                onSubmit={handleSubmit}
            >
                <h3>New Post</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="m-2 bg-pink-100 rounded pl-1 w-5/6"
                />
                <textarea
                    placeholder="Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="m-2 bg-pink-100 rounded pl-1 w-5/6 h-5/6"
                />
                <div className="flex flex-row justify-center items-center">
                    <div className="m-2">
                        <input
                            type="file"
                            accept="image/*"
                            id="fileInput"
                            multiple
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        <label
                            htmlFor="fileInput"
                            className="bg-pink-100 rounded w-32 h-8 cursor-pointer py-2 px-2 inline-flex items-center justify-center"
                        >
                            Add Image
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-pink-100 w-32 h-8 m-4 rounded"
                        onClick={addPost}
                    >
                        Submit
                    </button>
                </div>
                <div className="flex flex-wrap justify-center mt-4">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Preview ${index}`}
                            className="w-32 h-32 object-cover m-2 rounded"
                        />
                    ))}
                </div>
            </form>
        </main>
    );
}
