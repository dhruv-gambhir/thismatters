export default function AddUser({ username }) {
    function addUser() {}

    return (
        <main className="w-4/6 scroll-y">
            <div className="flex flex-row border border-dotted border-black border-1 rounded m-4 p-2 relative">
                <h3>{username}</h3>
                <button className="absolute right-2" onClick={addUser}>
                    Add Friend
                </button>
            </div>
        </main>
    );
}
