import LikeButton from "./LikeButton";
import ReplyButton from "./ReplyButton";

export default function Post({ username, title, textContent, imgSource }) {
    // Ensure imgSource is an array
    const images = Array.isArray(imgSource) ? imgSource : [];

    return (
        <main className="border-dotted border-black border-2 m-4 w-5/6">
            <div className="flex w-full justify-between items-center px-4">
                <h1 className="flex px-4 border border-black rounded-full items-center justify-center">
                    {username}
                </h1>
                <p className="text-bold text-xl">{title}</p>
                <button className="p-2 text-bold text-xl">...</button>
            </div>
            <hr className="border-black border-dotted" />
            <p className="m-8">{textContent}</p>
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
