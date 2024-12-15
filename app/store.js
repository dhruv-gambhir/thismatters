"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      zIsLoggedIn: false,
      zUsername: "",
      hasHydrated: false,
      zLogin: (username) => set({ zIsLoggedIn: true, zUsername: username }),
      zLogout: () => set({ zIsLoggedIn: false, zUsername: "" }),
      zUpdateUsername: (username) => set({ zUsername: username }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "thismatters-auth-storage",
      storage: createJSONStorage(() => window.localStorage),
      onRehydrateStorage: () => (state) => {
        // Called after rehydration
        state.setHasHydrated(true);
      },
      listenToStorageChanges: true,
    }
  )
);

export default useStore;
