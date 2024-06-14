import { Textarea } from "@nextui-org/input";

function Login() {
    return (
        <div className="bg-white h-64 w-64 rounded m-8 flex flex-col justify-center items-center">
            <input
                placeholder="Username"
                className="m-2 bg-pink-100 rounded pl-1"
                style={{ height: "10%", width: "80%" }}></input>
            <input
                type="password"
                placeholder="Password"
                className="m-2 bg-pink-100 rounded pl-1"
                style={{ height: "10%", width: "80%" }}></input>
            <div className="flex flex-row"></div>
            <button></button>
            <button></button>
            <div className="flex flex-col justify-center items-center">
                <button className=" bg-pink-100 w-16 m-4 rounded">
                    Log In
                </button>
                <a href="/" className="text-xs underline">
                    New User? Sign Up
                </a>
                <a href="/" className="text-xs underline">
                    Forgot Password?
                </a>
            </div>
        </div>
    );
}

export default Login;
