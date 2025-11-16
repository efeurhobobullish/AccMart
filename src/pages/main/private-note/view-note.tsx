import { Wrapper } from "@/layouts";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useNotes from "@/hooks/useNotes";
import { motion } from "framer-motion";

export default function ViewNote() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getNoteById, deleteNote } = useNotes();
  const [note, setNote] = useState<PrivateNote | null>(null);

  useEffect(() => {
    if (id) {
      const foundNote = getNoteById(id);
      if (foundNote) {
        setNote(foundNote);
      } else {
        // Note not found, redirect back
        navigate("/app/notes");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      if (id) {
        deleteNote(id);
        navigate("/app/notes");
      }
    }
  };

  if (!note) {
    return (
      <Wrapper title="View Note">
        <div className="text-center text-muted">Loading...</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper title="View Private Note">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <Link
            to="/app/notes"
            className="btn border border-line bg-secondary dark:bg-foreground px-4 h-10 rounded-xl text-sm font-space hover:bg-foreground dark:hover:bg-secondary transition-colors"
          >
            <ChevronLeft size={18} />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <Link to={`/app/notes/edit/${note.id}`}>
              <button className="btn border border-line px-4 h-10 rounded-xl text-sm font-space hover:bg-foreground dark:hover:bg-secondary transition-colors">
                <Pencil size={18} className="text-muted" />
                <span>Edit</span>
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 h-10 rounded-xl text-sm font-space hover:bg-red-600 transition-colors"
            >
              <Trash2 size={18} />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Note Content */}
        <div className="bg-background dark:bg-secondary p-6 rounded-xl border border-line space-y-6">
          <div>
            <h1 className="text-2xl font-space font-medium mb-2">
              {note.title}
            </h1>
            <div className="h-px bg-line"></div>
          </div>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="whitespace-pre-wrap text-muted leading-relaxed">
              {note.content}
            </p>
          </div>
        </div>
      </motion.div>
    </Wrapper>
  );
}

