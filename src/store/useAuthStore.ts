import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setUser: (user) => set({ user }),
    }),
    {
      name: "questlock-auth",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useAuthStore;
