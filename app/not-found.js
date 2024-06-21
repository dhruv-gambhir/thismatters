import Image from "next/image";

export default function NotFound() {
    return (
        <main className="flex flex-col items-center">
            <h1 className="p-4 text-3xl">Page Not Found</h1>
            <img src="/sadcat.gif"></img>
        </main>
    );
}
