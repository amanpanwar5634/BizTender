
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";

const BookIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6m0 0v6m0-6H6m6 0h6"
    />
  </svg>
);

export default function Navbar() {
  const [sticky, setSticky] = useState(false);
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Tenders", href: "/tenders" },
    { label: "Companies", href: "/companies" },
    // Removed "About"
  ];

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        sticky
          ? "bg-white shadow-md text-gray-800"
          : "bg-gradient-to-b from-black/70 to-transparent text-white"
      }`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="navbar container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Mobile Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-white rounded-lg w-52 text-gray-800 space-y-2"
            >
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-yellow-500">
                    {link.label}
                  </a>
                </li>
              ))}
              {user && (
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/dashboard");
                    }}
                    className="hover:text-yellow-500"
                  >
                    Dashboard
                  </a>
                </li>
              )}
            </ul>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold tracking-wide ml-2"
            href="/"
          >
            BizTender
          </motion.a>
        </div>

        {/* Desktop Center */}
        <motion.div
          className="navbar-center hidden lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ul className="menu menu-horizontal gap-6 text-md font-semibold tracking-wide">
            {navLinks.map((link) => (
              <motion.li
                key={link.label}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href={link.href}
                  className={`relative group ${
                    location.pathname === link.href ? "text-yellow-400" : ""
                  }`}
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </motion.li>
            ))}

            {user && (
              <motion.li
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/owner");
                  }}
                  className="relative group"
                >
                  Dashboard
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </motion.li>
            )}
          </ul>
        </motion.div>

        {/* Right: User Auth */}
        <div className="navbar-end space-x-4">
          {user ? (
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Applications"
                  labelIcon={<BookIcon />}
                  onClick={() => navigate("/my-applications")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-yellow-400 text-black px-5 py-2 rounded-md hover:bg-yellow-500 transition text-sm font-semibold"
              onClick={openSignIn}
            >
              Log In
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
