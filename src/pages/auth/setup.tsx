import { ButtonWithLoader, InputWithIcon, Pattern } from "@/components/ui";
import ModeToggle from "@/components/ui/mode-toggle";
import { ChevronLeft, Lock, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

export default function Setup() {
  const navigate = useNavigate();
  const { setupUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!password.trim() || password.length < 4) {
      toast.error("Password must be at least 4 characters");
      return;
    }

    setLoading(true);

    try {
      const success = setupUser(name, password);
      if (success) {
        toast.success("Account created successfully!");
        navigate("/app");
      } else {
        toast.error("Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("Error setting up user:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pattern>
      <div className="h-[100dvh] relative z-10 py-20 flex-col gap-10 layout space-y-10">
        <h1 className="text-2xl font-space font-bold text-center">Setup your account</h1>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="w-full max-w-[400px] mx-auto space-y-4 dark:bg-secondary bg-white p-4 rounded-xl border border-line"
          autoComplete="off"
        >
          <InputWithIcon
            icon={<UserRound size={20} />}
            type="text"
            label="Name"
            placeholder="e.g John Doe"
            className="dark:bg-foreground bg-secondary"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <InputWithIcon
            icon={<Lock size={20} />}
            type="password"
            label="Passcode"
            placeholder="4 Characters Passcode"
            className="dark:bg-foreground bg-secondary"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={4}
            maxLength={4}
          />

          <ButtonWithLoader
            type="submit"
            loading={loading}
            initialText="Submit"
            loadingText="Submitting..."
            className="w-full btn-primary h-10 rounded-full text-sm font-space"
          />

          <div>
            <Link to="/pin">
              <button className="w-full font-medium border border-line dark:bg-foreground bg-background h-10 rounded-full text-sm font-space">
                Old user? Click here
              </button>
            </Link>
          </div>

          <div>
            <Link to="/">
              <button className="w-full font-medium text-muted text-sm">
                <ChevronLeft size={20} />
                Back to home
              </button>
            </Link>
          </div>
        </motion.form>
        <p className="text-muted text-xs text-center">
          Secure with <span className="font-bold text-yellow-500">AES-256</span>{" "}
          encryption.
        </p>
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
      </div>
    </Pattern>
  );
}
