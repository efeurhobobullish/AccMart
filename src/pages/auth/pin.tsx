import { ButtonWithLoader, Pattern } from "@/components/ui";
import ModeToggle from "@/components/ui/mode-toggle";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

export default function Pin() {
  const navigate = useNavigate();
  const { login, checkUserExists, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  // Redirect if no user exists (first-time user)
  useEffect(() => {
    if (!checkUserExists()) {
      navigate("/setup");
    }
  }, [checkUserExists, navigate]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      toast.error("Please enter your passcode");
      return;
    }

    setLoading(true);

    try {
      const success = login(password);
      if (success) {
        toast.success("Login successful!");
        navigate("/app");
      } else {
        toast.error("Incorrect passcode. Please try again.");
        setPassword("");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pattern>
      <div className="h-[100dvh] relative z-10 py-20 flex-col gap-10 text-center layout space-y-10">
        <h1 className="text-2xl font-space font-bold">Enter your passcode</h1>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="w-full max-w-[400px] mx-auto space-y-4 dark:bg-secondary bg-white p-4 rounded-xl border border-line"
        >
          <input
            type="password"
            placeholder="0000"
            className="text-4xl h-20 font-space font-bold text-center w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={4}
            required
            autoFocus
            autoComplete="new-password"
          />

          <ButtonWithLoader
            type="submit"
            loading={loading}
            initialText="Verify"
            loadingText="Verifying..."
            className="w-full btn-primary h-10 rounded-full text-sm font-space"
          />

          <div>
            <Link to="/setup">
              <button className="w-full font-medium border border-line dark:bg-foreground bg-background h-10 rounded-full text-sm font-space">
                New user? Click here
              </button>
            </Link>
          </div>
          <div>
            <Link to="/forgot-passcode">
              <button className="w-full font-medium text-muted text-sm hover:text-main transition-colors">
                Forgot passcode?
              </button>
            </Link>
          </div>

          <div className="border-t border-line pt-4">
            <Link to="/">
              <button className="w-full font-medium text-muted text-sm">
                <ChevronLeft size={20} />
                Back to home
              </button>
            </Link>
          </div>
        </motion.form>
        <p className="text-muted text-xs">
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
