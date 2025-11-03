"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-linear-to-br from-brand to-brand-dark text-white py-10 px-6 md:px-12 overflow-hidden">
      <div className="relative z-10 container mx-auto text-center md:text-left flex flex-col items-center md:items-start justify-center">
        {/* --- Hero Text --- */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4"
        >
          Everything You Need, <br className="hidden md:block" /> All in One
          Place
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/90 mb-6 text-base md:text-lg max-w-2xl"
        >
          Shop electronics, fashion, groceries, home essentials, beauty, and
          more — all delivered fast and safely with{" "}
          <span className="font-semibold">Mipi</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/login"
            className="inline-block bg-white text-brand font-semibold px-8 py-3 rounded-full hover:bg-brand-dark hover:text-white transition-all duration-300 text-lg"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
