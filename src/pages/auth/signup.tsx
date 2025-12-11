import { Link } from "react-router-dom";
import ModeToggle from "@/components/ui/mode-toggle";

import {
  Pattern,
  ButtonWithLoader,
  InputWithIcon,
  GobackButton,
} from "@/components/ui";

export default function Signup() {
  return (
    <Pattern>
      <div className="min-h-[100dvh] flex items-center justify-center px-4 relative">

        {/* Mode Toggle */}
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>

        {/* Go Back Button */}
        <div className="absolute top-4 left-4">
          <GobackButton />
        </div>

        {/* Card */}
        <div className="w-full max-w-[420px] bg-secondary border border-line rounded-2xl p-8 shadow-md space-y-6">

          {/* Title */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold font-space text-main">
              Create Account
            </h1>
            <p className="text-muted text-sm">
              Join AccMart to buy and sell accounts securely.
            </p>
          </div>

          {/* GOOGLE BUTTON */}
          <button
            className="w-full h-10 rounded-full border border-line bg-background flex items-center justify-center gap-2 font-space text-sm hover:bg-foreground transition"
          >
            <img src="/google.png" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <span className="flex-1 h-[1px] bg-line"></span>
            <span className="text-xs text-muted">or</span>
            <span className="flex-1 h-[1px] bg-line"></span>
          </div>

          {/* FORM */}
          <form className="space-y-4">

            <InputWithIcon
              icon="user"
              placeholder="Full Name"
              type="text"
              name="fullName"
            />

            <InputWithIcon
              icon="mail"
              placeholder="Email Address"
              type="email"
              name="email"
            />

            <InputWithIcon
              icon="lock"
              placeholder="Password"
              type="password"
              name="password"
            />

            <ButtonWithLoader
              loading={false}
              className="w-full h-10 rounded-full font-space"
            >
              Create Account
            </ButtonWithLoader>
          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>

        </div>
      </div>
    </Pattern>
  );
}