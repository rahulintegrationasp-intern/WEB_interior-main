import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Logo from "../Navbar/logo.jpeg";
import { studioContactInfo } from "../../data/studioData";

const Footer = () => {
  return (
    <footer className="bg-[#100602] border-t border-[#D49B6A]/20 text-[#B8A394]">
      <div className="studio-container py-14 lg:py-16">
        {/* Centered Studio Identity matching reference screenshot */}
        <div className="flex flex-col items-center text-center">
          <Link
            to="/"
            className="inline-flex flex-col items-center gap-3 group focus-visible:outline-none"
          >
            <img
              src={Logo}
              alt="Patterns & Pallettes Logo"
              className="h-11 w-11 rounded-full object-cover border border-[#D49B6A]/40"
            />
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.08em] text-[#F4ECE4]">
              Interior Design Studio
            </span>
            <span className="text-xs uppercase tracking-[0.26em] text-[#D49B6A]">
              {studioContactInfo.brandName}
            </span>
          </Link>

          {/* Navigation Row */}
          <nav
            aria-label="Footer Navigation"
            className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm tracking-wider"
          >
            <Link to="/" className="hover:text-[#F4ECE4] transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-[#F4ECE4] transition-colors">
              About Us
            </Link>
            <Link
              to="/services"
              className="hover:text-[#F4ECE4] transition-colors"
            >
              Services
            </Link>
            <Link
              to="/portfolio"
              className="hover:text-[#F4ECE4] transition-colors"
            >
              Portfolio
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#F4ECE4] transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/authentication"
              className="text-[#8A7263] hover:text-[#D49B6A] transition-colors"
            >
              Admin Login
            </Link>
          </nav>

          {/* Direct Contact Details Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#8A7263]">
            <a
              href={studioContactInfo.mailto}
              className="inline-flex items-center gap-2 hover:text-[#D49B6A] transition-colors"
            >
              <FaEnvelope className="text-[#D49B6A]" />
              <span>{studioContactInfo.email}</span>
            </a>
            <a
              href={studioContactInfo.phoneHref}
              className="inline-flex items-center gap-2 hover:text-[#D49B6A] transition-colors"
            >
              <FaPhone className="text-[#D49B6A]" />
              <span>{studioContactInfo.phone}</span>
            </a>
            <span className="inline-flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#D49B6A]" />
              <span>{studioContactInfo.address}</span>
            </span>
          </div>

          {/* Social Links matching reference footer */}
          <div className="mt-7 flex items-center justify-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-[#D49B6A]/30 flex items-center justify-center text-[#B8A394] hover:text-[#F4ECE4] hover:border-[#D49B6A] hover:bg-[#D49B6A]/10 transition-all"
            >
              <FaInstagram size={15} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-[#D49B6A]/30 flex items-center justify-center text-[#B8A394] hover:text-[#F4ECE4] hover:border-[#D49B6A] hover:bg-[#D49B6A]/10 transition-all"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-9 h-9 rounded-full border border-[#D49B6A]/30 flex items-center justify-center text-[#B8A394] hover:text-[#F4ECE4] hover:border-[#D49B6A] hover:bg-[#D49B6A]/10 transition-all"
            >
              <FaTwitter size={14} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full border border-[#D49B6A]/30 flex items-center justify-center text-[#B8A394] hover:text-[#F4ECE4] hover:border-[#D49B6A] hover:bg-[#D49B6A]/10 transition-all"
            >
              <FaLinkedinIn size={14} />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#D49B6A]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7263]">
          <p>
            © {new Date().getFullYear()} Patterns &amp; Pallettes · Integration. All
            Rights Reserved.
          </p>
          <p className="tracking-wider uppercase text-[11px]">
            Bespoke Residential · Commercial · Hospitality Interiors
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
