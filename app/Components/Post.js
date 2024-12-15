import LikeButton from "./LikeButton";
import ReplyButton from "./ReplyButton";
import Username from "./Username";

export default function Post({ username, title, textContent, imgSource }) {
    const images = Array.isArray(imgSource) ? imgSource : [];

    return (
        <article className="mx-auto my-4 w-full max-w-3xl rounded-lg border border-black bg-transparent p-4 shadow-sm">
            <header className="flex w-full items-center justify-between pb-2 border-b border-black">
                <div className="flex items-center space-x-2">
                    <Username username={username} />
                </div>
                <h1 className="font-bold text-xl text-gray-800">{title}</h1>
                <button className="p-2 text-lg font-bold text-gray-500 hover:text-gray-700 transition">
                    ...
                </button>
            </header>

            <div className="py-4">
                <p className="mb-4 text-black leading-relaxed">{textContent}</p>
                <div className="flex flex-wrap justify-center">
                    {images.length > 0 ? (
                        images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`post image ${index}`}
                                className="h-40 w-auto m-2 rounded-md object-cover"
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No images</p>
                    )}
                </div>
            </div>

            <footer className="flex flex-row items-center space-x-4 pt-2 border-t border-black">
                <LikeButton />
                <ReplyButton />
            </footer>
        </article>
    );
}
