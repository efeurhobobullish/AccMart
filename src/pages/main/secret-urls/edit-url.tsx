import { ButtonWithLoader } from "@/components/ui";
import { Wrapper } from "@/layouts";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useSecretUrls from "@/hooks/useSecretUrls";

export default function EditUrl() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getSecretUrlById, updateSecretUrl } = useSecretUrls();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  // Load existing secret URL data
  useEffect(() => {
    if (id) {
      const secretUrl = getSecretUrlById(id);
      if (secretUrl) {
        setTitle(secretUrl.title);
        setUrl(secretUrl.url);
      } else {
        // Secret URL not found, redirect back
        navigate("/app/secret-urls");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title for this URL");
      return;
    }

    if (!url.trim()) {
      alert("Please enter a URL");
      return;
    }

    if (!id) {
      alert("Invalid secret URL ID");
      return;
    }

    setLoading(true);

    try {
      // Update secret URL (encryption happens in the hook)
      updateSecretUrl(id, {
        title: title.trim(),
        url: url.trim(),
      });

      setLoading(false);
      navigate("/app/secret-urls");
    } catch (error) {
      console.error("Error updating secret URL:", error);
      alert("Failed to update secret URL. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Wrapper title="Edit Secret URL">
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit}
        className="max-w-[700px] mx-auto space-y-6"
      >
        {/* Title Field */}
        <div className="space-y-2">
          <label className="text-sm text-muted font-medium">Title</label>
          <div className="bg-background dark:bg-secondary p-4 rounded-xl border border-line">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., My Secret Website"
              required
              autoFocus
              className="w-full outline-none caret-violet-500 text-lg"
            />
          </div>
        </div>

        {/* URL Field */}
        <div className="space-y-2">
          <label className="text-sm text-muted font-medium">URL</label>
          <div className="bg-background dark:bg-secondary p-4 rounded-xl border border-line">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com or example.com"
              required
              className="w-full outline-none caret-violet-500 font-mono"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-line">
          <ButtonWithLoader
            type="submit"
            loading={loading}
            initialText="Update URL"
            loadingText="Updating..."
            className="flex-1 btn-primary h-11 rounded-xl text-sm font-space"
          />
          <Link
            to="/app/secret-urls"
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

