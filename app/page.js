import "./CSS/typewriter.css";

import Login from "./Components/Login";
import Collage from "./Components/Collage";
import Title from "./Components/Title";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center h-full">
            <Title />

            <div className="flex flex-row m-8">
                <Collage />
                <Login />
            </div>
            <div className="text-3xl font-mono typewriter">
                <p>Share what matters with those who matter</p>
            </div>
        </main>
    );
}
