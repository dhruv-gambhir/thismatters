import Title from "@/app/Components/Title";

export default function SideBar() {
    return (
        <div className="flex flex-col items-cente w-1/6 m-2 pt-4 border-r border-r-2 border-r-black">
            <Title />
            <button className="border-solid border-2 border-black rounded m-2 w-10/12">
                <a href="/home">Home</a>
            </button>
            <button className="border-solid border-2 border-black rounded m-2 w-10/12">
                <a href="/messages">Messages</a>
            </button>
            <button className="border-solid border-2 border-black rounded m-2 w-10/12">
                <a href="/profile">Profile</a>
            </button>
            <button className="border-solid border-2 border-black rounded m-2 w-10/12">
                <a href="/settings">Settings</a>
            </button>
        </div>
    );
}
