import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NotesStore {
  notes: PrivateNote[];
  setNotes: (notes: PrivateNote[]) => void;
}

const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],
      setNotes: (notes: PrivateNote[]) => set({ notes }),
    }),
    {
      name: "private-notes",
      partialize: (state) => ({ notes: state.notes }),
    }
  )
);

export default useNotesStore;

