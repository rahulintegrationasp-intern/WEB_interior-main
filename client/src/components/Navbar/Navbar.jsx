import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./logo.jpeg";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMenuOpen
          ? "bg-[#140904]/95 backdrop-blur-md border-b border-[#D49B6A]/20 py-3.5 shadow-studio-sm"
          : "bg-gradient-to-b from-[#140904]/90 via-[#140904]/50 to-transparent py-5"
      }`}
    >
      <nav
        className="studio-container flex items-center justify-between"
        aria-label="Primary Navigation"
      >
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D49B6A] rounded-md"
          >
            <img
              src={Logo}
              alt="Patterns & Pallettes Logo"
              className="h-9 w-9 rounded-full object-cover border border-[#D49B6A]/40 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl tracking-[0.08em] text-[#F4ECE4] leading-none">
                Interior Design Studio
              </span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#D49B6A] mt-1">
                Patterns &amp; Pallettes
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links & CTA */}
        <div className="hidden md:flex items-center gap-7 lg:gap-9">
          <ul className="flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`text-xs lg:text-sm tracking-wider transition-colors duration-200 py-1 border-b ${
                    isActive(item.path)
                      ? "text-[#F4ECE4] border-[#D49B6A] font-medium"
                      : "text-[#B8A394] border-transparent hover:text-[#F4ECE4]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="rounded-md border border-[#D49B6A]/50 px-4 py-1.5 text-xs tracking-wider text-[#F4ECE4] transition-all duration-300 hover:border-[#D49B6A] hover:bg-[#D49B6A]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D49B6A]"
            >
              Contact Us
            </Link>
            <Link
              to="/authentication"
              title="Admin Portal"
              className="text-[11px] uppercase tracking-widest text-[#8A7263] hover:text-[#D49B6A] transition-colors px-2 py-1"
            >
              Admin
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          type="button"
          className="inline-flex md:hidden items-center justify-center p-2.5 w-10 h-10 text-[#F4ECE4] rounded-md border border-[#D49B6A]/30 hover:bg-[#D49B6A]/10 focus:outline-none focus:ring-2 focus:ring-[#D49B6A]"
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
        >
          {isMenuOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden bg-[#1D0E07] border-b border-[#D49B6A]/25 px-6 pt-4 pb-6 space-y-4"
        >
          <ul className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2.5 px-3 rounded-md text-sm tracking-wider transition-colors ${
                    isActive(item.path)
                      ? "bg-[#D49B6A]/15 text-[#F4ECE4] font-medium border-l-2 border-[#D49B6A]"
                      : "text-[#B8A394] hover:text-[#F4ECE4] hover:bg-[#26130A]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/authentication"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2.5 px-3 rounded-md text-xs uppercase tracking-widest text-[#8A7263] hover:text-[#D49B6A]"
              >
                Admin Portal
              </Link>
            </li>
          </ul>
          <div className="pt-2 border-t border-[#D49B6A]/15">
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="btn-studio-outline w-full text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
