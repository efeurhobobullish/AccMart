import { ButtonWithLoader } from "@/components/ui";
import { Wrapper } from "@/layouts";
import { ChevronLeft, Plus, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useCredentials from "@/hooks/useCredentials";

interface FormField {
  id: string;
  label: string;
  value: string;
}

export default function AddPassword() {
  const navigate = useNavigate();
  const { addCredential } = useCredentials();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState<FormField[]>([
    { id: "1", label: "", value: "" },
  ]);

  // Add a new field
  const handleAddField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      label: "",
      value: "",
    };
    setFields([...fields, newField]);
  };

  // Remove a field
  const handleRemoveField = (id: string) => {
    if (fields.length > 1) {
      setFields(fields.filter((field) => field.id !== id));
    }
  };

  // Update field label
  const handleLabelChange = (id: string, label: string) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, label } : field))
    );
  };

  // Update field value
  const handleValueChange = (id: string, value: string) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title for this credential");
      return;
    }

    // Filter out empty fields
    const validFields = fields.filter(
      (field) => field.label.trim() && field.value.trim()
    );

    if (validFields.length === 0) {
      alert("Please add at least one field with both label and value");
      return;
    }

    setLoading(true);

    try {
      // Prepare credential data
      const credentialData = {
        title: title.trim(),
        fields: validFields.map((field) => ({
          label: field.label.trim(),
          value: field.value.trim(),
        })),
      };

      // Add credential (encryption happens in the hook)
      addCredential({ ...credentialData, type: "auth" });
      
      setLoading(false);
      navigate("/app/credentials");
    } catch (error) {
      console.error("Error saving credential:", error);
      alert("Failed to save credential. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Wrapper title="Add Credentials">
      <form
      
       
        onSubmit={handleSubmit}
        className="max-w-[700px] mx-auto space-y-6"
      >
        {/* Title Field */}
        <div className="bg-background dark:bg-secondary p-4 rounded-xl border border-line text-xl">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title e.g. Facebook Account"
            required
            autoFocus
            className="w-full h-full outline-none caret-violet-500"
          />
        </div>

        {/* Dynamic Fields */}
        <div className="space-y-4">
          <h4 className="text-lg font-space font-medium">Fields</h4>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="bg-background dark:bg-secondary p-4 rounded-xl border border-line space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium w-fit px-4 py-2 center rounded-full bg-yellow-500/10 dark:text-yellow-500 text-yellow-700">
                   Field #{index + 1}
                  </span>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField(field.id)}
                      className="btn text-red-500 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors"
                      title="Remove field"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-muted">Label</label>
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) =>
                        handleLabelChange(field.id, e.target.value)
                      }
                      placeholder="e.g., Username, Password, Email"
                      className="h-10 w-full px-3 capitalize placeholder:normal-case text-sm border-b border-line focus:border-main bg-background dark:bg-secondary outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted">Value</label>
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) =>
                        handleValueChange(field.id, e.target.value)
                      }
                      placeholder="Enter value..."
                      className="h-10 w-full px-3 text-sm border-b border-line focus:border-main bg-background dark:bg-secondary outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddField}
            className="bg-background dark:bg-secondary text-muted text-sm min-h-30 p-4 w-full rounded-xl border border-line"
          >
            <Plus size={18} />
            <span>Add New Field</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-line">
          <ButtonWithLoader
            type="submit"
            loading={loading}
            initialText="Save Credentials"
            loadingText="Saving..."
            className="flex-1 btn-primary h-11 rounded-xl text-sm font-space"
          />
          <Link
            to="/app/credentials"
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
