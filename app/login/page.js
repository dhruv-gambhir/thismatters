import "@/app/css/typewriter.css";

import LoginBox from "../Components/LoginBox";
import Collage from "../Components/Collage";
import Title from "../Components/Title";

export default function Login() {
    return (
        <main className="flex min-h-screen flex-col items-center h-full">
            <Title />

            <div className="flex flex-row m-8">
                <Collage />
                <LoginBox />
            </div>
            <div className="text-3xl font-mono typewriter">
                <p>Share what matters with those who matter</p>
            </div>
        </main>
    );
}
