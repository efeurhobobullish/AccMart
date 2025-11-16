import { encryptData, decryptData } from "@/helpers/cryptojs";
import { useAuthStore } from "@/store";
import { useCredentialsStore } from "@/store";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useAuthStore();
  const { setCredentials } = useCredentialsStore();
  const navigate = useNavigate();

  // Check if user exists (first-time user check)
  const checkUserExists = (): boolean => {
    return user !== null;
  };

  // Check if security question is set
  const hasSecurityQuestion = (): boolean => {
    return !!(user?.securityQuestion && user?.securityAnswer);
  };

  // Setup first-time user
  const setupUser = (name: string, password: string) => {
    try {
      const newUser: User = {
        id: Date.now().toString(),
        name: name.trim(),
        password: encryptData(password), // Encrypt password before storing
      };

      setUser(newUser);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Error setting up user:", error);
      return false;
    }
  };

  // Login with password
  const login = (password: string): boolean => {
    try {
      if (!user) {
        return false;
      }

      // Decrypt stored password and compare
      const decryptedPassword = decryptData(user.password);
      
      if (decryptedPassword === password) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  // Change password
  const changePassword = (currentPassword: string, newPassword: string): boolean => {
    try {
      if (!user) {
        return false;
      }

      // Verify current password
      const decryptedPassword = decryptData(user.password);
      if (decryptedPassword !== currentPassword) {
        return false;
      }

      // Update password
      const updatedUser: User = {
        ...user,
        password: encryptData(newPassword),
      };

      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error("Error changing password:", error);
      return false;
    }
  };

  // Set security question and answer
  const setSecurityQuestion = (question: string, answer: string): boolean => {
    try {
      if (!user) {
        return false;
      }

      const updatedUser: User = {
        ...user,
        securityQuestion: question,
        securityAnswer: encryptData(answer.toLowerCase().trim()),
      };

      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error("Error setting security question:", error);
      return false;
    }
  };

  // Verify security answer and get password
  const verifySecurityAnswer = (answer: string): string | null => {
    try {
      if (!user || !user.securityQuestion || !user.securityAnswer) {
        return null;
      }

      const decryptedAnswer = decryptData(user.securityAnswer);
      if (decryptedAnswer === answer.toLowerCase().trim()) {
        // Return decrypted password
        return decryptData(user.password);
      }
      return null;
    } catch (error) {
      console.error("Error verifying security answer:", error);
      return null;
    }
  };

  // Reset account (clear all data)
  const resetAccount = () => {
    try {
      setUser(null);
      setCredentials([]);
      setIsAuthenticated(false);
      navigate("/setup");
    } catch (error) {
      console.error("Error resetting account:", error);
    }
  };

  // Logout
  const logout = () => {
    setIsAuthenticated(false);
    // Don't clear user data, just set authenticated to false
    // This way user data persists but they need to re-enter password
    navigate("/pin");
  };

  return {
    isAuthenticated,
    user,
    checkUserExists,
    hasSecurityQuestion,
    setupUser,
    login,
    logout,
    changePassword,
    setSecurityQuestion,
    verifySecurityAnswer,
    resetAccount,
  };
}
