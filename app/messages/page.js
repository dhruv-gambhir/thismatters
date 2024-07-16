import SideBar from "../Components/SideBar";

export default function Messages() {
    return (
        <div className="min-h-screen flex flex-row">
            <SideBar />
            <div className="w-1/6" />
            <div className="flex flex-col items-center overflow-y-auto w-5/6">

                <h1>Messages</h1>
            </div>
        </div>
    );
}
