import { ButtonWithLoader } from "@/components/ui";
import { Wrapper } from "@/layouts";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useNotes from "@/hooks/useNotes";

export default function EditNote() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getNoteById, updateNote } = useNotes();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Load existing note data
  useEffect(() => {
    if (id) {
      const note = getNoteById(id);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      } else {
        // Note not found, redirect back
        navigate("/app/notes");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title for this note");
      return;
    }

    if (!content.trim()) {
      alert("Please enter some content for this note");
      return;
    }

    if (!id) {
      alert("Invalid note ID");
      return;
    }

    setLoading(true);

    try {
      // Update note (encryption happens in the hook)
      updateNote(id, {
        title: title.trim(),
        content: content.trim(),
      });

      setLoading(false);
      navigate("/app/notes");
    } catch (error) {
      console.error("Error updating note:", error);
      alert("Failed to update note. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Wrapper title="Edit Private Note">
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit}
        className="max-w-[700px] mx-auto space-y-6"
      >
        {/* Title Field */}
        <div className="bg-background dark:bg-secondary p-4 rounded-xl border border-line">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            required
            autoFocus
            rows={2}
            className="w-full h-full outline-none caret-violet-500 text-xl resize-none"
          />
        </div>

        {/* Content Field */}
        <div className="bg-background dark:bg-secondary p-4 rounded-xl border border-line">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            required
            rows={15}
            className="w-full h-full outline-none caret-violet-500 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-line">
          <ButtonWithLoader
            type="submit"
            loading={loading}
            initialText="Update Note"
            loadingText="Updating..."
            className="flex-1 btn-primary h-11 rounded-xl text-sm font-space"
          />
          <Link
            to="/app/notes"
            className="btn border border-line bg-secondary dark:bg-foreground px-6 h-11 rounded-xl text-sm font-space hover:bg-foreground dark:hover:bg-secondary transition-colors"
          >
            <ChevronLeft size={18} />
            Cancel
          </Link>
        </div>
      </motion.form>
    </Wrapper>
  );
}

