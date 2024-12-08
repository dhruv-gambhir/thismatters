import { auth } from "./firebaseConfig";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updatePassword,
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

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

export const changePassword = async (currentPassword, newPassword) => {
    const user = auth.currentUser;

    if (user) {
        // Re-authenticate the user
        const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
        );

        try {
            await reauthenticateWithCredential(user, credential);
            // Update the password
            await updatePassword(user, newPassword);
            console.log("Password updated successfully.");
        } catch (error) {
            console.error("Error updating password:", error);
            throw error;
        }
    } else {
        throw new Error("No user is currently signed in.");
    }
};
