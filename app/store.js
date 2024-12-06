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
            zUpdateUsername: (username) => set({ zUsername: username }),
        }),
        {
            name: "thismatters-auth-storage", // unique name for this storage
            storage: createJSONStorage(() => {
                if (typeof window !== "undefined") {
                    return localStorage;
                }
                return {
                    getItem: () => null,
                    setItem: () => {},
                    removeItem: () => {},
                };
            }),
            onRehydrateStorage: () => (state) => {
                state.setHasHydrated(true);
            },
            listenToStorageChanges: true,
        }
    )
);

export default useStore;
