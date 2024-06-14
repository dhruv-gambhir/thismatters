import { Inter } from "next/font/google";
import "./globals.css";
import { initializeApp } from "firebase/app";

const inter = Inter({ subsets: ["latin"] });

const firebaseConfig = {
    apiKey: "AIzaSyBUb3cVSTAPC4pwi-Jbef1cuA8Ppz2al4U",
    authDomain: "thismatters-24fb3.firebaseapp.com",
    projectId: "thismatters-24fb3",
    storageBucket: "thismatters-24fb3.appspot.com",
    messagingSenderId: "1024864182441",
    appId: "1:1024864182441:web:091301dc6b7c654be5c9b8",
};

const app = initializeApp(firebaseConfig);

export const metadata = {
    title: "thismatters.com",
    description: "By Dhruv Gambhir",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
