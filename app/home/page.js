import SideBar from "../Components/SideBar";
import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-row">
            <SideBar />
            <div className="min-h-screen w-10/12 flex flex-col items-center">
                <div className="flex flex-row">
                    <h1 className="font-bold m-4 ">Home</h1>
                    <Image src="/home.png" width="0" height="0" />
                </div>
                <button className="h-10/12 w-10/12 border-dashed border-2 border-black rounded">
                    + Add Post
                </button>
            </div>
        </div>
    );
}
