import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SecretUrlsStore {
  secretUrls: SecretUrl[];
  setSecretUrls: (secretUrls: SecretUrl[]) => void;
}

const useSecretUrlsStore = create<SecretUrlsStore>()(
  persist(
    (set) => ({
      secretUrls: [],
      setSecretUrls: (secretUrls: SecretUrl[]) => set({ secretUrls }),
    }),
    {
      name: "secret-urls",
      partialize: (state) => ({ secretUrls: state.secretUrls }),
    }
  )
);

export default useSecretUrlsStore;

