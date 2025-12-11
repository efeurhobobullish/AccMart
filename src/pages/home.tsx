import { motion } from "framer-motion";
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

// ⭐ FINAL FIX: No easing, no variants. 100% TS safe.
const orbAnimation = {
  y: [0, -20, 0],
  x: [0, 10, 0],
  transition: {
    repeat: Infinity,
    duration: 8,
  },
};

export default function Home() {
  return (
    <>
      <Pattern>
        <div className="relative overflow-hidden min-h-[100vh] flex flex-col items-center justify-center text-center px-4">

          {/* FLOATING ORBS (NO TS ERRORS) */}
          <motion.div
            className="absolute top-20 left-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full"
            animate={orbAnimation}
          />

          <motion.div
            className="absolute bottom-20 right-10 w-56 h-56 bg-main/10 blur-3xl rounded-full"
            animate={orbAnimation}
            transition={{ delay: 1 }}
          />

          {/* MODE TOGGLE */}
          <div className="absolute top-4 right-4 z-20">
            <ModeToggle />
          </div>

          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4 max-w-[700px] z-20"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl font-space font-bold text-transparent bg-clip-text bg-gradient-to-r from-main to-main/70 dark:to-main/40"
            >
              AccMart
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-muted text-xl"
            >
              The #1 Marketplace to Buy & Sell Social Media Accounts
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-muted text-sm max-w-[600px] mx-auto"
            >
              Safe escrow payments • Verified sellers • Instant delivery.
            </motion.p>
          </motion.div>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex gap-4 text-sm mt-6 md:flex-row flex-col z-20"
          >
            <Link to="/buy">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="btn-primary min-w-[220px] h-12 rounded-full shadow-lg shadow-primary/20"
              >
                Buy Accounts
              </motion.button>
            </Link>

            <Link to="/sell">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="border border-primary text-primary dark:text-primary min-w-[220px] h-12 rounded-full bg-background shadow-md"
              >
                Sell Accounts
              </motion.button>
            </Link>
          </motion.div>

          {/* IMAGES */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 w-full max-w-[1000px] mt-16 px-4 z-20">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              whileHover={{ scale: 1.03, rotateX: 4, rotateY: -4 }}
              className="bg-secondary border border-line rounded-xl p-4 shadow-lg hover:shadow-xl transition-all"
            >
              <motion.img
                src="/ChooseService.png"
                alt="Choose Service"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="rounded-xl w-full object-cover"
              />
              <p className="text-muted text-sm mt-2">Choose the service you want</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              whileHover={{ scale: 1.03, rotateX: 4, rotateY: 4 }}
              className="bg-secondary border border-line rounded-xl p-4 shadow-lg hover:shadow-xl transition-all"
            >
              <motion.img
                src="/ChooseCountry.png"
                alt="Choose Country"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 0.4 }}
                className="rounded-xl w-full object-cover"
              />
              <p className="text-muted text-sm mt-2">Pick your preferred country</p>
            </motion.div>

          </div>

          {/* FEATURES */}
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 1.4 },
              },
            }}
            className="center flex-wrap gap-3 mt-10 z-20"
          >
            {features.map((item) => (
              <motion.li
                key={item}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.07 }}
                className="text-xs text-muted bg-secondary border border-line rounded-full px-4 py-2 shadow"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>

          {/* FOOTER */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="w-full border-t border-line py-6 mt-20"
          >
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
          </motion.footer>

        </div>
      </Pattern>
    </>
  );
}