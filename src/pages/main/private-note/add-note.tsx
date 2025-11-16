import { ButtonWithLoader } from "@/components/ui";
import { Wrapper } from "@/layouts";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useNotes from "@/hooks/useNotes";

export default function AddNote() {
  const navigate = useNavigate();
  const { addNote } = useNotes();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

    setLoading(true);

    try {
      // Add note (encryption happens in the hook)
      addNote({
        title: title.trim(),
        content: content.trim(),
      });

      setLoading(false);
      navigate("/app/notes");
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Failed to save note. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Wrapper title="Add Private Note">
      <form
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
            initialText="Save Note"
            loadingText="Saving..."
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
      </form>
    </Wrapper>
  );
}

