import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CredentialsStore {
  credentials: Credential[];
  setCredentials: (credentials: Credential[]) => void;
}

const useCredentialsStore = create<CredentialsStore>()(
  persist(
    (set) => ({
      credentials: [],
      setCredentials: (credentials: Credential[]) => set({ credentials }),
    }),
    {
      name: "credentials",
      partialize: (state) => ({ credentials: state.credentials }),
    }
  )
);

export default useCredentialsStore;
