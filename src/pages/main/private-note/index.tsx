import { Wrapper } from "@/layouts";
import { Notebook, Pencil, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useNotes from "@/hooks/useNotes";

export default function PrivateNotes() {
  const { decryptedData, deleteNote } = useNotes();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(id);
    }
  };

  return (
    <Wrapper title="Private Notes">
      <div className="grid md:grid-cols-2 gap-4">
        {decryptedData.map((note) => (
          <div
            key={note.id}
            className="dark:bg-secondary bg-background relative p-4 space-y-4 text-sm rounded-xl border border-line"
          >
            <div className="absolute top-4 right-4">
              <Notebook size={17} className="text-purple-500" />
            </div>

            <div className="space-y-2">
              <p className="truncate max-w-[80%] font-medium text-lg">
                {note.title}
              </p>
             
            </div>

            <div className="flex items-center gap-2 border-t border-line pt-2">
              <button
                onClick={() => navigate(`/app/notes/view/${note.id}`)}
                className="btn-primary text-sm px-4 py-2 rounded-md flex-1"
              >
                <span>View</span>
              </button>
              <Link to={`/app/notes/edit/${note.id}`}>
                <button className="border border-line text-sm px-4 py-2 rounded-md">
                  <Pencil size={18} className="text-muted" />
                  <span>Edit</span>
                </button>
              </Link>
              <button
                onClick={() => handleDelete(note.id)}
                className="bg-red-500 text-white text-sm px-4 py-2 rounded-md"
              >
                <Trash2 size={20} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
        <Link to="/app/notes/add">
          <button className="bg-secondary min-h-30 text-sm text-muted rounded-xl border border-line w-full h-full center flex-col gap-2">
            <Plus size={20} />
            <span>Add New Note</span>
          </button>
        </Link>
      </div>
    </Wrapper>
  );
}

