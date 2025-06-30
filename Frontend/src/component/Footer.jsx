import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gray-900 text-gray-200 py-12 px-4"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo + Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start mb-3">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-yellow-400"
            >
              <path d="M12 6v6m0 0v6m0-6H6m6 0h6" />
            </svg>
            <span className="ml-2 text-2xl font-bold tracking-wide text-white">
              BizTender
            </span>
          </div>
          <p className="text-sm text-gray-400">
            Connecting trusted companies with verified tenders across industries.
          </p>
          <p className="text-xs mt-2 text-gray-500">
            © {new Date().getFullYear()} BizTender. All rights reserved.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="space-y-2 text-center md:text-right"
        >
          <p className="font-semibold text-white">Quick Links</p>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:text-yellow-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/tenders" className="hover:text-yellow-400 transition">
                Tenders
              </a>
            </li>
            <li>
              <a href="/companies" className="hover:text-yellow-400 transition">
                Companies
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-yellow-400 transition">
                About
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex gap-4"
        >
          {[
            {
              href: "#",
              path: "M24 4.557c-.883...", // Twitter path
              label: "Twitter",
            },
            {
              href: "#",
              path: "M19.615 3.184c-3.604...", // LinkedIn path
              label: "LinkedIn",
            },
            {
              href: "#",
              path: "M9 8h-3v4h3v12h5...", // Facebook path
              label: "Facebook",
            },
          ].map((icon, i) => (
            <motion.a
              whileHover={{ scale: 1.2 }}
              key={i}
              href={icon.href}
              aria-label={icon.label}
              className="bg-gray-800 p-2 rounded-full hover:bg-yellow-400 hover:text-black transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d={icon.path} />
              </svg>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
}
