import { ButtonWithLoader, InputWithIcon, Pattern } from "@/components/ui";
import ModeToggle from "@/components/ui/mode-toggle";
import { Check, ChevronLeft, Copy, Lock, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

export default function ForgotPasscode() {
  const navigate = useNavigate();
  const { user, verifySecurityAnswer, hasSecurityQuestion } = useAuth();
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!hasSecurityQuestion()) {
      toast.error("No security question set. Please contact support.");
      navigate("/pin");
    }
  }, [hasSecurityQuestion, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!answer.trim()) {
      toast.error("Please enter your answer");
      return;
    }

    setLoading(true);

    try {
      const retrievedPassword = verifySecurityAnswer(answer);
      if (retrievedPassword) {
        setPassword(retrievedPassword);
        toast.success("Answer verified! Your passcode is displayed below.");
      } else {
        toast.error("Incorrect answer. Please try again.");
        setAnswer("");
      }
    } catch (error) {
      console.error("Error verifying answer:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast.success("Passcode copied to clipboard!");
      setTimeout(() => {
        setCopied(false);
        navigate("/pin");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy passcode");
    }
  };

  if (!user?.securityQuestion) {
    return null;
  }

  return (
    <Pattern>
      <div className="h-[100dvh] relative z-10 py-20 flex-col gap-10 text-center layout space-y-10">
        <h1 className="text-2xl font-space font-bold">Recover Your Passcode</h1>

        {!password ? (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="w-full max-w-[400px] mx-auto space-y-4 dark:bg-secondary bg-white p-4 rounded-xl border border-line"
          >
            <div className="text-left space-y-2">
              <div className="flex items-center gap-2 text-muted">
                <Shield size={18} />
                <span className="text-sm font-medium">Security Question</span>
              </div>
              <p className="text-sm bg-secondary dark:bg-foreground p-3 rounded-lg border border-line">
                {user.securityQuestion}
              </p>
            </div>

            <InputWithIcon
              icon={<Lock size={20} />}
              type="text"
              placeholder="Enter your answer"
              className="dark:bg-foreground bg-white"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              autoFocus
            />

            <ButtonWithLoader
              type="submit"
              loading={loading}
              initialText="Verify Answer"
              loadingText="Verifying..."
              className="w-full btn-primary h-10 rounded-full text-sm font-space"
            />

            <div>
              <Link to="/pin">
                <button className="w-full font-medium text-muted text-sm">
                  <ChevronLeft size={20} />
                  Back to login
                </button>
              </Link>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[400px] mx-auto space-y-4 dark:bg-secondary bg-white p-4 rounded-xl border border-line"
          >
            <div className="space-y-2">
              <p className="text-sm text-muted">Your Passcode:</p>
              <div className="flex items-center gap-2 bg-secondary dark:bg-foreground p-3 rounded-lg border border-line">
                <p className="text-lg font-mono flex-1 text-center">{password}</p>
                <button
                  onClick={copyToClipboard}
                  className="btn border border-line px-3 py-2 rounded-lg hover:bg-secondary dark:hover:bg-foreground transition-colors"
                  title="Copy passcode"
                >
                  {copied ? (
                    <Check size={18} className="text-green-500" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted text-center">
                Passcode copied! Redirecting to login...
              </p>
              <Link to="/pin">
                <button className="w-full btn-primary h-10 rounded-full text-sm font-space">
                  Go to Login
                </button>
              </Link>
            </div>
          </motion.div>
        )}

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

