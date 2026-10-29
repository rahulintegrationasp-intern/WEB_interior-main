import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#140904] text-[#F4ECE4] flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-28 px-4">
        <div className="card-studio max-w-lg w-full p-10 sm:p-12 text-center">
          <span className="section-eyebrow">Error 404</span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#F4ECE4] mb-4">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-[#B8A394] mb-8 leading-relaxed">
            The room or page you are looking for may have been moved or
            redesigned. Return to our studio showcase below.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className="btn-studio-primary">
              Return Home
            </Link>
            <Link to="/portfolio" className="btn-studio-outline">
              View Portfolio
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
