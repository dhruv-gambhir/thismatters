// store.js
import { create } from "zustand";

const useStore = create((set) => ({
    zIsLoggedIn: false,
    zUsername: "",
    zLogin: (username) => set({ zIsLoggedIn: true, zUsername: username }),
    zLogout: () => set({ zIsLoggedIn: false, zUsername: "" }),
}));

export default useStore;
