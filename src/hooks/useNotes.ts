import { decryptData, encryptData } from "@/helpers/cryptojs";
import { useNotesStore } from "@/store";
import { useEffect, useState } from "react";

export default function useNotes() {
  const { notes, setNotes } = useNotesStore();
  const [decryptedData, setDecryptedData] = useState<PrivateNote[]>([]);

  useEffect(() => {
    const decrypted = notes.map((note) => {
      return {
        ...note,
        title: decryptData(note.title),
        content: decryptData(note.content),
      };
    });
    setDecryptedData(decrypted);
  }, [notes]);

  const addNote = (data: Omit<PrivateNote, "id">) => {
    const newNote: PrivateNote = {
      ...data,
      id: Date.now().toString(),
    };

    const encryptedData: PrivateNote = {
      ...newNote,
      title: encryptData(newNote.title),
      content: encryptData(newNote.content),
    };
    setNotes([encryptedData, ...notes]);
    return newNote.id;
  };

  const updateNote = (id: string, data: Omit<PrivateNote, "id">) => {
    const encryptedData: PrivateNote = {
      ...data,
      id,
      title: encryptData(data.title),
      content: encryptData(data.content),
    };
    const updated = notes.map((note) =>
      note.id === id ? encryptedData : note
    );
    setNotes(updated);
  };

  const deleteNote = (id: string) => {
    const filtered = notes.filter((note) => note.id !== id);
    setNotes(filtered);
  };

  const getNoteById = (id: string): PrivateNote | undefined => {
    const note = notes.find((note) => note.id === id);
    if (!note) return undefined;

    return {
      ...note,
      title: decryptData(note.title),
      content: decryptData(note.content),
    };
  };

  return {
    decryptedData,
    addNote,
    updateNote,
    deleteNote,
    getNoteById,
  };
}

