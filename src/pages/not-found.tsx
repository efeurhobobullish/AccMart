import { Wrapper } from "@/layouts";
import { Home, SearchX } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex justify-center">
            <div className="relative">
              <div className="text-8xl md:text-9xl font-bold text-muted opacity-20">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <SearchX size={80} className="text-pink-500" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-space font-medium">
              Oops! Page Not Found
            </h1>
            <p className="text-muted text-sm max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's
              get you back on track.
            </p>
          </div>

          <div className="pt-4 center">
            <Link to="/app">
              <button className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-space">
                <Home size={18} />
                <span>Go to Dashboard</span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </Wrapper>
  );
}
