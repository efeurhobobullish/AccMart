import Modal from "@/components/ui/modal";
import { Wrapper } from "@/layouts";
import { Check, Copy, Eye, Lock, Pencil, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useCredentials from "@/hooks/useCredentials";

export default function Password() {
    const { decryptedData, deleteCredential } = useCredentials();
    const [isViewing, setIsViewing] = useState(false);
    const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);
    const [copiedField, setCopiedField] = useState<string | null>(null);
    
    const toggleView = (credential?: Credential) => {
        if (credential) {
            setSelectedCredential(credential);
            setIsViewing(true);
        } else {
            setIsViewing(false);
            setSelectedCredential(null);
        }
    }

    const copyToClipboard = async (text: string, field: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this credential?")) {
            deleteCredential(id);
        }
    }
  return (
    <>
      <Wrapper title="Authentication Credentials">
        <div className="grid md:grid-cols-2 gap-4">
          {decryptedData.map((credential) => (
            <div
              key={credential.id}
              className="dark:bg-secondary bg-background relative p-4 space-y-4 text-sm rounded-xl border border-line"
            >
              <div className="absolute top-4 right-4">
                <Lock size={17} className="text-yellow-500" />
              </div>

              <div className="space-y-2">
                <p className="truncate max-w-[80%] font-medium">
                  {credential.title}
                </p>
                <div className="flex items-center gap-2 text-muted flex-wrap">
                  {credential.fields.slice(0, 3).map((field, index) => (
                    <div
                      key={index}
                      className="text-xs bg-foreground rounded-full px-2 py-1 font-medium capitalize"
                    >
                      {field.label}
                    </div>
                  ))}
                  {credential.fields.length > 3 && (
                    <div className="text-xs bg-foreground rounded-full px-2 py-1 font-medium">
                      +{credential.fields.length - 3} more
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-line pt-2">
                <button
                  onClick={() => toggleView(credential)}
                  className="btn-primary text-sm px-4 py-2 rounded-md"
                >
                  <Eye size={20} />
                  <span>View</span>
                </button>
                <Link to={`/app/credentials/edit/${credential.id}`}>
                  <button className="border border-line text-sm px-4 py-2 rounded-md">
                    <Pencil size={18} className="text-muted" />
                    <span>Edit</span>
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(credential.id)}
                  className="bg-red-500 text-white text-sm px-4 py-2 rounded-md"
                >
                  <Trash2 size={20} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
          <Link to="/app/credentials/add">
            <button className="bg-secondary min-h-30 text-sm text-muted rounded-xl border border-line w-full h-full center flex-col gap-2">
              <Plus size={20} />
              <span>Add New</span>
            </button>
          </Link>
        </div>
      </Wrapper>

      {isViewing && selectedCredential && (
        <Modal
          title="Decrypted Credentials"
          isOpen={isViewing}
          onClose={() => toggleView()}
        >
          <div className="space-y-4 mt-4">
            <div className="text-sm bg-secondary dark:bg-foreground p-4 rounded-md">
              {selectedCredential.title}
            </div>

            {selectedCredential.fields.map((field, index) => (
              <div key={index} className="space-y-2">
                <p className="text-sm text-muted font-medium capitalize">
                  {field.label}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm flex-1 bg-secondary dark:bg-foreground px-3 py-2 rounded-lg border border-line font-mono break-all">
                    {field.value}
                  </p>
                  <button
                    onClick={() =>
                      copyToClipboard(field.value, `field-${index}`)
                    }
                    className="btn border border-line px-3 py-2 rounded-lg hover:bg-secondary dark:hover:bg-foreground transition-colors"
                    title={`Copy ${field.label}`}
                  >
                    {copiedField === `field-${index}` ? (
                      <Check size={18} className="text-green-500" />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
}
