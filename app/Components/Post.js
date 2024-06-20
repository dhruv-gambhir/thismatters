import Image from "next/image";

export default function Post() {
    return (
        <div className="border border-black border-1 p-4 m-4">
            <h1>Post</h1>
            <Image
                src="/images/1.jpg"
                height="400"
                width="400"
                alt="post image"
            />
        </div>
    );
}
