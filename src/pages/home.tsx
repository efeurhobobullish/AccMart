import ModeToggle from "@/components/ui/mode-toggle";
import { Pattern } from "@/components/ui";
import { libraries } from "@/constants/data";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Pattern>
        <div className="h-[100dvh] relative z-10 center flex-col gap-10 text-center layout">
          <div className="center gap-2">
            <div className="center gap-2 drop-shadow-2xl drop-shadow-main/10 dark:bg-foreground bg-background rounded-full px-4 py-2 backdrop-blur border border-foreground">
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
              </span>
              <p className="text-sm text-muted">Active Security 24/7</p>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-6xl md:leading-[80px] leading-[60px] font-space font-bold text-transparent bg-clip-text bg-gradient-to-r from-main to-main/70 dark:to-main/50">
            Quest Lock
            </h1>
           
          <p className="text-muted text-xs">Secure with <span className="font-bold text-yellow-500">AES-256</span> encryption.</p>
          <p className="text-muted text-sm">Stay Secure, Stay Safe. Store any sensitive information securely with Quest Lock.</p>
          </div>

          <div className="flex gap-4 text-sm md:flex-row flex-col">
            <Link to="/pin">
            <button className="btn-primary min-w-[200px] h-10 rounded-full">
              Enter Passcode
            </button>
            </Link>
           
          </div>

          <ul className="center flex-wrap gap-2">
            {libraries.map((library) => (
              <li
                key={library}
                className="text-xs text-muted bg-secondary border border-line rounded-full px-4 py-2"
              >
                {library}
              </li>
            ))}
          </ul>
          <div className="absolute top-4 right-4">
            <ModeToggle />
          </div>

        </div>
      </Pattern>
    </>
  );
}
