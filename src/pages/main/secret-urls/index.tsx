import Modal from "@/components/ui/modal";
import { Wrapper } from "@/layouts";
import { Check, Copy, ExternalLink, Eye, Globe, Pencil, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSecretUrls from "@/hooks/useSecretUrls";

export default function SecretUrls() {
  const { decryptedData, deleteSecretUrl } = useSecretUrls();
  const [isViewing, setIsViewing] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<SecretUrl | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleView = (url?: SecretUrl) => {
    if (url) {
      setSelectedUrl(url);
      setIsViewing(true);
    } else {
      setIsViewing(false);
      setSelectedUrl(null);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const openLink = (url: string) => {
    // Ensure URL has protocol
    let formattedUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      formattedUrl = `https://${url}`;
    }
    window.open(formattedUrl, "_blank", "noopener,noreferrer");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this secret URL?")) {
      deleteSecretUrl(id);
    }
  };

  return (
    <>
      <Wrapper title="Secret URLs">
        <div className="grid md:grid-cols-2 gap-4">
          {decryptedData.map((url) => (
            <div
              key={url.id}
              className="dark:bg-secondary bg-background relative p-4 space-y-4 text-sm rounded-xl border border-line"
            >
              <div className="absolute top-4 right-4">
                <Globe size={17} className="text-pink-500" />
              </div>

              <div className="space-y-2">
                <p className="truncate max-w-[80%] font-medium">
                  {url.title}
                </p>
                <p className="text-muted text-xs truncate tracking-wider">
                  xxxxxxxxxxxxxxxxxxxxxxxx
                </p>
              </div>

              <div className="flex items-center gap-2 border-t border-line pt-2">
                <button
                  onClick={() => toggleView(url)}
                  className="btn-primary text-sm px-4 py-2 rounded-md"
                >
                  <Eye size={20} />
                  <span>View</span>
                </button>
                <Link to={`/app/secret-urls/edit/${url.id}`}>
                  <button className="border border-line text-sm px-4 py-2 rounded-md">
                    <Pencil size={18} className="text-muted" />
                    <span>Edit</span>
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(url.id)}
                  className="bg-red-500 text-white text-sm px-4 py-2 rounded-md"
                >
                  <Trash2 size={20} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
          <Link to="/app/secret-urls/add">
            <button className="bg-secondary min-h-30 text-sm text-muted rounded-xl border border-line w-full h-full center flex-col gap-2">
              <Plus size={20} />
              <span>Add New URL</span>
            </button>
          </Link>
        </div>
      </Wrapper>

      {isViewing && selectedUrl && (
        <Modal
          title="Secret URL"
          isOpen={isViewing}
          onClose={() => toggleView()}
        >
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <p className="text-sm text-muted font-medium">Title</p>
              <div className="text-sm bg-secondary dark:bg-foreground p-4 rounded-md">
                {selectedUrl.title}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted font-medium">URL</p>
              <div className="flex items-center gap-2">
                <p className="text-sm flex-1 bg-secondary dark:bg-foreground px-3 py-2 rounded-lg border border-line font-mono break-all">
                  {selectedUrl.url}
                </p>
                <button
                  onClick={() => copyToClipboard(selectedUrl.url)}
                  className="btn border border-line px-3 py-2 rounded-lg hover:bg-secondary dark:hover:bg-foreground transition-colors"
                  title="Copy URL"
                >
                  {copied ? (
                    <Check size={18} className="text-green-500" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={() => openLink(selectedUrl.url)}
              className="w-full btn-primary flex items-center justify-center gap-2 py-2 rounded-lg"
            >
              <ExternalLink size={18} />
              <span>Open Link</span>
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

