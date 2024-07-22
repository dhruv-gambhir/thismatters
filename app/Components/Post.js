import LikeButton from "./LikeButton";
import ReplyButton from "./ReplyButton";

export default function Post({ username, textContent, imgSource }) {
    // Ensure imgSource is an array
    const images = Array.isArray(imgSource) ? imgSource : [];

    return (
        <div className="border-dotted border-black border-2 m-4 p-4">
            <h1 className="pl-2">{username}</h1>
            <div className="border border-1 border-black w-full mb-2"></div>
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
        </div>
    );
}
