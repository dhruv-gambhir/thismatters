"use client";

import { useState, useEffect } from "react";
import SideBar from "../Components/SideBar";
import useStore from "../store";

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const { zUsername } = useStore();

    useEffect(() => {
        // Clean up object URLs when the component is unmounted
        return () => {
            images.forEach((image) => URL.revokeObjectURL(image.preview));
        };
    }, [images]);

    // Handle file input change
    function handleImageChange(event) {
        const files = event.target.files;
        const newImages = Array.from(files).map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
    }

    // Upload images and add post
    async function addPost() {
        const urlArray = [];

        for (const [index, { file }] of images.entries()) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("filename", `${title}-${index}`);

            try {
                const response = await fetch("/api/upload-image", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(
                        `Error uploading image ${index}: ${response.statusText}`
                    );
                }
                const { url } = await response.json();
                urlArray.push(url);
            } catch (error) {
                console.error(error);
            }
        }

        // Once all images are uploaded, proceed with adding the post
        try {
            const response = await fetch("/api/add-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: zUsername,
                    title: title,
                    text: text,
                    images: JSON.stringify(urlArray), // Use urlArray directly
                }),
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                setTitle("");
                setText("");
                setImages([]);
                setImageUrls([]); // Clear the image URLs if needed
            } else {
                console.error("Failed to add post:", data.message);
            }
        } catch (error) {
            console.error("An error occurred while adding the post:", error);
        }
    }

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        addPost();
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
                    >
                        Submit
                    </button>
                </div>
                <div className="flex flex-wrap justify-center mt-4">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.preview}
                            alt={`Preview ${index}`}
                            className="w-32 h-32 object-cover m-2 rounded"
                        />
                    ))}
                </div>
            </form>
        </main>
    );
}
