import { ButtonWithLoader, InputWithIcon, SelectWithIcon } from "@/components/ui";
import { Wrapper } from "@/layouts";
import { Lock, LogOut, Shield, Trash2 } from "lucide-react";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { SECURITY_QUESTIONS } from "@/constants/securityQuestions";
import { toast } from "sonner";
import Modal from "@/components/ui/modal";

export default function Profile() {
  const {
    user,
    logout,
    changePassword,
    setSecurityQuestion,
    resetAccount,
    hasSecurityQuestion,
  } = useAuth();

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showSecurityQuestion, setShowSecurityQuestion] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Change password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  // Security question state
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [settingQuestion, setSettingQuestion] = useState(false);

  // Reset account state
  const [resetting, setResetting] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword.length < 4) {
      toast.error("New password must be at least 4 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setChangingPassword(true);

    try {
      const success = changePassword(currentPassword, newPassword);
      if (success) {
        toast.success("Password changed successfully!");
        setShowChangePassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error("Current password is incorrect");
      }
    } catch (e) {
      console.error("Error changing password:", e);
      toast.error("Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleSetSecurityQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedQuestion || !securityAnswer.trim()) {
      toast.error("Please select a question and provide an answer");
      return;
    }

    setSettingQuestion(true);

    try {
      const success = setSecurityQuestion(selectedQuestion, securityAnswer);
      if (success) {
        toast.success("Security question set successfully!");
        setShowSecurityQuestion(false);
        setSelectedQuestion("");
        setSecurityAnswer("");
      } else {
        toast.error("Failed to set security question");
      }
    } catch (e) {
      console.error("Error setting security question:", e);
      toast.error("Failed to set security question");
    } finally {
      setSettingQuestion(false);
    }
  };

  const handleResetAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to reset your account? This will delete all your data and cannot be undone!"
      )
    ) {
      return;
    }

    setResetting(true);
    setTimeout(() => {
      resetAccount();
      setResetting(false);
    }, 500);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Wrapper title="Profile">
      <div className="max-w-[700px] mx-auto space-y-6">
        {/* User Details */}
        <div className="bg-background dark:bg-secondary p-6 rounded-xl border border-line space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-sky-500 center">
              <img src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.name}`} alt="" />
            </div>
            <div>
              <h3 className="text-lg font-space font-medium">{user?.name}</h3>
              <p className="text-sm text-muted">User ID: {user?.id}</p>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-background dark:bg-secondary p-6 rounded-xl border border-line space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-muted" />
              <div>
                <h4 className="font-medium">Change Password</h4>
                <p className="text-xs text-muted">Update your account password</p>
              </div>
            </div>
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="btn border border-line px-4 py-2 rounded-lg text-sm"
            >
              {showChangePassword ? "Cancel" : "Change"}
            </button>
          </div>

          {showChangePassword && (
            <form onSubmit={handleChangePassword} className="space-y-4 pt-4 border-t border-line">
              <InputWithIcon
                icon={<Lock size={20} />}
                type="password"
                label="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="dark:bg-background bg-white"
                required
              />
              <InputWithIcon
                icon={<Lock size={20} />}
                type="password"
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 4 characters)"
                className="dark:bg-background bg-white"
                required
                minLength={4}
              />
              <InputWithIcon
                icon={<Lock size={20} />}
                type="password"
                label="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="dark:bg-background bg-white"
                required
              />
              <ButtonWithLoader
                type="submit"
                loading={changingPassword}
                initialText="Update Password"
                loadingText="Updating..."
                className="w-full btn-primary h-11 rounded-xl text-sm font-space"
              />
            </form>
          )}
        </div>

        {/* Security Question Section */}
        <div className="bg-background dark:bg-secondary p-6 rounded-xl border border-line space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-muted" />
              <div>
                <h4 className="font-medium">Security Question</h4>
                <p className="text-xs text-muted">
                  {hasSecurityQuestion()
                    ? "Update your security question"
                    : "Set up a security question for password recovery"}
                </p>
              </div>
            </div>
            {hasSecurityQuestion() && (
              <div className="text-xs bg-green-500/10 text-green-500 px-3 py-1 rounded-full">
                Set
              </div>
            )}
          </div>

          {hasSecurityQuestion() && (
            <div className="p-3 bg-background dark:bg-secondary rounded-lg border border-line">
              <p className="text-sm font-medium mb-1">Current Question:</p>
              <p className="text-sm text-muted">{user?.securityQuestion}</p>
            </div>
          )}

          <button
            onClick={() => setShowSecurityQuestion(!showSecurityQuestion)}
            className="btn border border-line px-4 py-2 rounded-lg text-sm w-full"
          >
            {showSecurityQuestion ? "Cancel" : hasSecurityQuestion() ? "Update" : "Set Up"}
          </button>

          {showSecurityQuestion && (
            <form onSubmit={handleSetSecurityQuestion} className="space-y-4 pt-4 border-t border-line">
              <SelectWithIcon
                icon={<Shield size={20} />}
                label="Select Security Question"
                value={selectedQuestion}
                onChange={(e) => setSelectedQuestion(e.target.value)}
                options={SECURITY_QUESTIONS.map((q) => ({ label: q, value: q }))}
                defaultValue="Choose a security question"
                className="dark:bg-background bg-white"
                required
              />
              <InputWithIcon
                icon={<Lock size={20} />}
                type="text"
                label="Your Answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="dark:bg-background bg-white"
                required
              />
              <ButtonWithLoader
                type="submit"
                loading={settingQuestion}
                initialText={hasSecurityQuestion() ? "Update Question" : "Set Question"}
                loadingText="Saving..."
                className="w-full btn-primary h-11 rounded-xl text-sm font-space"
              />
            </form>
          )}
        </div>

        {/* Logout Section */}
        <div className="bg-background dark:bg-secondary p-6 rounded-xl border border-line">
          <button
            onClick={handleLogout}
            className="btn border border-line px-4 py-2 rounded-lg text-sm w-full"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

        {/* Reset Account Section */}
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-3">
            <Trash2 size={20} className="text-red-500" />
            <div>
              <h4 className="font-medium text-red-500">Danger Zone</h4>
              <p className="text-xs text-muted">Permanently delete all your data</p>
            </div>
          </div>
          <button
            onClick={() => setShowResetModal(true)}
            className="btn bg-red-500 text-white px-4 py-2 rounded-lg text-sm w-full hover:bg-red-600"
          >
            <Trash2 size={18} />
            <span>Reset Account</span>
          </button>
        </div>
      </div>

      {/* Reset Account Confirmation Modal */}
      {showResetModal && (
        <Modal
          title="Reset Account"
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
        >
          <div className="space-y-4 mt-4">
            <p className="text-sm text-muted">
              Are you sure you want to reset your account? This action will:
            </p>
            <ul className="text-sm text-muted list-disc list-inside space-y-1">
              <li>Delete all your credentials</li>
              <li>Delete all your saved data</li>
              <li>Delete your account</li>
              <li>This action cannot be undone</li>
            </ul>
            <div className="flex items-center gap-3 pt-4 border-t border-line">
              <ButtonWithLoader
                onClick={handleResetAccount}
                loading={resetting}
                initialText="Yes, Reset Account"
                loadingText="Resetting..."
                className="flex-1 bg-red-500 text-white h-11 rounded-xl text-sm font-space hover:bg-red-600"
              />
              <button
                onClick={() => setShowResetModal(false)}
                className="btn border border-line px-6 h-11 rounded-xl text-sm font-space"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </Wrapper>
  );
}

