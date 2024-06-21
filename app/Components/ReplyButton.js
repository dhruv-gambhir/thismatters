import Image from "next/image";

export default function ReplyButton() {
    return (
        <div>
            <button className="ml-4">
                <Image src="/reply.png" height="15" width="15" alt="reply" />
            </button>
        </div>
    );
}
