import ModeToggle from "../ui/mode-toggle";
import { ChevronLeft, Home } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/app";
  const isProfile = location.pathname === "/app/profile";

  return (
    <>
      <header className="fixed z-100 w-full top-0 bg-gradient-to-b from-background via-background/70 to-transparent">
        <nav className="layout flex items-center justify-between h-[70px] text-main">
          <div className="flex items-center gap-2">
            {!isDashboard && !isProfile && (
              <button
                onClick={() => navigate(-1)}
                className="h-10 w-10 rounded-full dark:bg-secondary bg-background border border-line"
                title="Go back"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {isDashboard && (
              <Link
                to="/app/profile"
                className="h-10 w-10 bg-sky-500 rounded-full center"
                title="Profile"
              >
                <img src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.name}`} alt="" />
              </Link>
            )}
            {!isDashboard && !isProfile && (
              <Link
                to="/app"
                className="flex items-center gap-2 bg-background dark:bg-secondary p-2 rounded-full border border-line"
              >
                <Home size={18} />
                <span className="text-sm font-medium">Home</span>
              </Link>
            )}
            {isProfile && (
               <button
               onClick={() => navigate(-1)}
               className="h-10 w-10 rounded-full dark:bg-secondary bg-background border border-line"
               title="Go back"
             >
               <ChevronLeft size={20} />
             </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </nav>
      </header>
    </>
  );
}
