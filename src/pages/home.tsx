import ModeToggle from "@/components/ui/mode-toggle";
import { Pattern } from "@/components/ui";
import { Link } from "react-router-dom";

const features = [
  "Secure Payments",
  "Verified Sellers",
  "Instant Delivery",
  "Escrow Protection",
  "24/7 Support",
];

export default function Home() {
  return (
    <>
      <Pattern>
        <div className="min-h-[100dvh] relative z-10 flex flex-col items-center justify-center gap-10 text-center layout py-20">

          {/* MODE TOGGLE */}
          <div className="absolute top-4 right-4">
            <ModeToggle />
          </div>

          {/* HERO */}
          <div className="space-y-4 max-w-[700px]">
            <h1 className="text-5xl md:text-6xl font-space font-bold text-transparent bg-clip-text bg-gradient-to-r from-main to-main/70 dark:to-main/50">
              AccMart
            </h1>

            <p className="text-muted text-lg">
              Buy & Sell Verified Social Media Accounts securely — Instagram, TikTok, Facebook & more.
            </p>

            <p className="text-muted text-sm max-w-[600px] mx-auto">
              A trusted Nigerian marketplace for digital assets with escrow protection, safe payments, and instant delivery.
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
              <button className="border border-primary text-primary dark:text-primary min-w-[200px] h-10 rounded-full font-space">
                Sell Accounts
              </button>
            </Link>
          </div>

          {/* IMAGE SHOWCASE */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 w-full max-w-[900px] mt-8">
            <div className="bg-secondary border border-line rounded-xl p-4 shadow-sm">
              <img
                src="/Choose Service.png"
                alt="Choose Service"
                className="rounded-lg w-full object-cover"
              />
              <p className="text-muted text-sm mt-2">Choose the service you want</p>
            </div>

            <div className="bg-secondary border border-line rounded-xl p-4 shadow-sm">
              <img
                src="/Choose Country.png"
                alt="Choose Country"
                className="rounded-lg w-full object-cover"
              />
              <p className="text-muted text-sm mt-2">Pick your preferred country</p>
            </div>
          </div>

          {/* FEATURE LIST */}
          <ul className="center flex-wrap gap-2 mt-6">
            {features.map((item) => (
              <li
                key={item}
                className="text-xs text-muted bg-secondary border border-line rounded-full px-4 py-2"
              >
                {item}
              </li>
            ))}
          </ul>

        </div>

        {/* FOOTER */}
        <footer className="w-full border-t border-line py-6 mt-10">
          <div className="main flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

            <p className="text-muted text-sm">
              © {new Date().getFullYear()} AccMart — All rights reserved.
            </p>

            <div className="flex gap-4 text-sm">
              <Link to="/terms" className="text-muted hover:text-main">Terms</Link>
              <Link to="/privacy" className="text-muted hover:text-main">Privacy</Link>
              <Link to="/contact" className="text-muted hover:text-main">Contact</Link>
            </div>
          </div>
        </footer>

      </Pattern>
    </>
  );
}