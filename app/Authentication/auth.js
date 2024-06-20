import { auth } from "./firebaseConfig";
import { db } from "@vercel/postgres";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const signup = async (email, password) => {
    addUserToDB();

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return userCredential.user;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
};

export default async function addUserToDB(request, respone) {
    const client = db.connect;

    try {
        await client.query(
            `CREATE TABLE Users (Email varchar(255), Password varchar(255));`
        );
        await client.query(
            `INSERT INTO Users (Email,Password) VALUES ("dhruv@vercel.com", "vercel123")`
        );
    } catch {
        console.log("not added");
    }

    const users = await client.sql`SELECT * FROM Users`;
    console.log(users);
}

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};
