import ModeToggle from "@/components/ui/mode-toggle";
import { Pattern } from "@/components/ui";
import { Link } from "react-router-dom";

// Replace libraries with features or keep same constant if reused
const features = [
  "Secure Payments",
  "Verified Sellers",
  "Instant Delivery",
  "Multi-Platform Accounts",
  "Escrow Protection",
  "24/7 Support",
];

export default function Home() {
  return (
    <>
      <Pattern>
        <div className="h-[100dvh] relative z-10 center flex-col gap-10 text-center layout">

          {/* HERO SECTION */}
          <div className="space-y-2">
            <h1 className="text-6xl md:leading-[80px] leading-[60px] font-space font-bold text-transparent bg-clip-text bg-gradient-to-r from-main to-main/70 dark:to-main/50">
              AccMart
            </h1>

            <p className="text-muted text-xs">
              Buy & Sell Verified Social Media Accounts Securely.
            </p>

            <p className="text-muted text-sm">
              A trusted marketplace for Instagram, TikTok, Facebook, and other social media accounts — 
              <span className="font-bold text-primary"> safe, fast, and verified.</span>
            </p>
          </div>

          {/* CTA BUTTONS */}
          <div className="flex gap-4 text-sm md:flex-row flex-col">
            <Link to="/buy">
              <button className="btn-primary min-w-[200px] h-10 rounded-full">
                Buy Accounts
              </button>
            </Link>

            <Link to="/sell">
              <button className="border border-primary text-primary dark:text-primary h-10 min-w-[200px] rounded-full font-space">
                Sell Accounts
              </button>
            </Link>
          </div>

          {/* FEATURE PILL LIST */}
          <ul className="center flex-wrap gap-2">
            {features.map((item) => (
              <li
                key={item}
                className="text-xs text-muted bg-secondary border border-line rounded-full px-4 py-2"
              >
                {item}
              </li>
            ))}
          </ul>

          {/* MODE TOGGLE BUTTON */}
          <div className="absolute top-4 right-4">
            <ModeToggle />
          </div>
        </div>
      </Pattern>
    </>
  );
}