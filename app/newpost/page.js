export default function NewPost() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <form className="bg-white h-full w-5/6 m-4 rounded flex flex-col justify-center items-center">
                <h3>New Post</h3>
                <input
                    type="title"
                    placeholder="Title"
                    className="m-2 bg-pink-100 rounded pl-1 w-5/6"
                ></input>
                <textarea
                    placeholder="Text"
                    className="m-2 bg-pink-100 rounded pl-1 w-5/6 h-40"
                ></textarea>
                <input
                    type="file"
                    accept="image/*"
                    className="m-2 bg-pink-100 rounded pl-1 w-5/6"
                />
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
