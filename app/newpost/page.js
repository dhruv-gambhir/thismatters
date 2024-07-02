export default function NewPost() {
    return (
        <main className="flex h-full items-center justify-center">
            <form className="bg-white w-8/12 m-4 rounded flex flex-col justify-center items-center">
                <h3>New Post</h3>
                <input
                    type="title"
                    placeholder="Title"
                    className="m-2 bg-pink-100 rounded pl-1"></input>
                <input
                    type="text"
                    placeholder="Text"
                    className="m-2 bg-pink-100 rounded pl-1"></input>
                <div className="flex flex-row">
                    <button className="bg-pink-100 w-32 m-4 rounded">
                        Add Photos
                    </button>
                    <button className="bg-pink-100 w-16 m-4 rounded">
                        Submit
                    </button>
                </div>
            </form>
        </main>
    );
}
