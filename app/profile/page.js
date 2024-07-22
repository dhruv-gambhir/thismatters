import SideBar from "../Components/SideBar";

export default function Profile() {
    return (
        <main className="min-h-screen flex flex-row">
            <SideBar />
            <div className="w-1/6" />
            <div className="flex flex-col items-center overflow-y-auto w-5/6">
                <h1>Profile</h1>
            </div>
        </main>
    );
}
