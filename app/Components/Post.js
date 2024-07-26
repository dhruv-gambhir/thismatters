import LikeButton from "./LikeButton";
import ReplyButton from "./ReplyButton";

export default function Post({ username, title, textContent, imgSource }) {
    // Ensure imgSource is an array
    const images = Array.isArray(imgSource) ? imgSource : [];

    return (
        <main className="border-dotted border-black border-2 m-4 p-4 w-5/6">
            <div className="flex w-full border border-2 border-black">
                <h1 className="p-2">{username}</h1>
                <button className="p-2 right-2">yo</button>
            </div>

            <p>{title}</p>
            <p>{textContent}</p>
            <div className="flex flex-wrap justify-center">
                {images.length > 0 ? (
                    images.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`post image ${index}`}
                            height="400"
                            width="400"
                            className="m-2"
                        />
                    ))
                ) : (
                    <p>No images</p>
                )}
            </div>
            <div className="flex flex-row mt-2">
                <LikeButton />
                <ReplyButton />
            </div>
        </main>
    );
}
