import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the store with persistence
const useStore = create(
    persist(
        (set) => ({
            zIsLoggedIn: false,
            zUsername: "",
            zLogin: (username) =>
                set({ zIsLoggedIn: true, zUsername: username }),
            zLogout: () => set({ zIsLoggedIn: false, zUsername: "" }),
        }),
        {
            name: "thismatters-auth-storage", // unique name for this storage
            storage: createJSONStorage(() => localStorage), // using localStorage
        }
    )
);

export default useStore;
