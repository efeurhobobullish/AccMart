import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ModeToggle from "@/components/ui/mode-toggle";
import { Pattern } from "@/components/ui";

const features = [
  "Secure Payments",
  "Verified Sellers",
  "Instant Delivery",
  "Escrow Protection",
  "24/7 Support",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const featureVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

const imageHoverVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

export default function Home() {
  return (
    <Pattern>
      <div className="min-h-[100dvh] relative z-10 flex flex-col items-center justify-center gap-10 text-center layout py-20">
        {/* MODE TOGGLE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-6 right-6"
        >
          <ModeToggle />
        </motion.div>

        {/* HERO SECTION */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 max-w-[800px] px-4"
        >
          <motion.div variants={itemVariants}>
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
              className="text-5xl md:text-7xl font-space font-bold text-transparent bg-clip-text bg-gradient-to-r from-main via-main/80 to-main/60 dark:from-main dark:via-main/70 dark:to-main/50"
            >
              AccMart
            </motion.h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground font-medium"
            >
              Buy & Sell Verified Social Media Accounts Securely
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-muted text-base max-w-[700px] mx-auto leading-relaxed">
              A trusted Nigerian marketplace for digital assets with escrow protection, 
              safe payments, and instant delivery. Instagram, TikTok, Facebook & more.
            </p>
          </motion.div>
        </motion.div>

        {/* CTA BUTTONS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-4 text-sm md:flex-row flex-col items-center"
        >
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/buy">
              <button className="btn-primary min-w-[220px] h-12 rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-shadow">
                Buy Accounts
              </button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/sell">
              <button className="border-2 border-primary text-primary dark:text-primary min-w-[220px] h-12 rounded-full font-space text-base font-medium hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors">
                Sell Accounts
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* IMAGE SHOWCASE */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 grid-cols-1 gap-8 w-full max-w-[1000px] mt-12 px-4"
        >
          {[
            { src: "/ChooseService.png", alt: "Choose Service", text: "Choose the service you want" },
            { src: "/ChooseCountry.png", alt: "Choose Country", text: "Pick your preferred country" },
          ].map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              initial="initial"
              animate="visible"
              className="group"
            >
              <motion.div
                variants={imageHoverVariants}
                className="bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="overflow-hidden rounded-xl">
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="rounded-xl w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="text-muted-foreground font-medium mt-4"
                >
                  {image.text}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* FEATURE LIST */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mt-10 px-4"
        >
          {features.map((item, index) => (
            <motion.li
              key={item}
              variants={featureVariants}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgba(var(--primary), 0.1)",
                transition: { type: "spring", stiffness: 400 }
              }}
              className="text-sm font-medium text-muted-foreground bg-secondary/50 border border-border rounded-full px-5 py-2.5 cursor-default backdrop-blur-sm"
              custom={index}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>

        {/* FOOTER */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="w-full border-t border-border py-8 mt-16"
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-muted text-sm"
              >
                © {new Date().getFullYear()} AccMart — All rights reserved.
              </motion.p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex gap-6 text-sm"
              >
                {["Terms", "Privacy", "Contact"].map((link) => (
                  <motion.div
                    key={link}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Link
                      to={`/${link.toLowerCase()}`}
                      className="text-muted hover:text-primary transition-colors duration-200 font-medium"
                    >
                      {link}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.footer>
      </div>
    </Pattern>
  );
}