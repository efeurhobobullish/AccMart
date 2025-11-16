import { useEffect } from "react";
import { useAuthStore } from "@/store";
import { useNavigate } from "react-router-dom";

export default function AuthGuard() {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle visibility change (tab switch, minimize, etc.)
    const handleVisibilityChange = () => {
      if (document.hidden && isAuthenticated) {
        // User switched tabs or minimized window, force logout
        setIsAuthenticated(false);
        navigate("/pin", { replace: true });
      }
    };

    // Handle page unload (closing tab/window)
    const handleBeforeUnload = () => {
      if (isAuthenticated) {
        setIsAuthenticated(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isAuthenticated, setIsAuthenticated, navigate]);

  return null;
}

