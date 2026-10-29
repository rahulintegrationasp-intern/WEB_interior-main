import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaUtensils,
  FaWarehouse,
  FaHouseUser,
} from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {
  studioAchievements,
  clientTestimonials,
} from "../../data/studioData";

const studioPillars = [
  "Personalized approach tailored to each client's vision and lifestyle",
  "Expertise in modern, contemporary, minimalist, and traditional styles",
  "Sustainable and budget-conscious design solutions",
  "3D visualization and mood board presentations for every project",
  "Strong network of trusted contractors, artisans, and vendors",
  "Seamless project management from concept to completion",
];

const spacesWeDesign = [
  { title: "Flat", icon: <FaHome className="text-2xl text-[#D49B6A]" /> },
  { title: "Villa", icon: <FaHouseUser className="text-2xl text-[#D49B6A]" /> },
  {
    title: "Row House",
    icon: <FaWarehouse className="text-2xl text-[#D49B6A]" />,
  },
  {
    title: "Offices",
    icon: <FaBuilding className="text-2xl text-[#D49B6A]" />,
  },
  {
    title: "Restaurants",
    icon: <FaUtensils className="text-2xl text-[#D49B6A]" />,
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#140904] text-[#F4ECE4] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        {/* 1. Studio Story & Philosophy */}
        <section className="studio-container py-8 lg:py-14">
          <div className="max-w-4xl mb-12">
            <span className="section-eyebrow">About Patterns &amp; Pallettes</span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#F4ECE4] leading-[1.2] font-normal">
              Our designs blend elegance with functionality, bringing together
              modern aesthetics and timeless sensibilities to create spaces that
              truly feel like home.
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-[#B8A394] text-base sm:text-lg leading-relaxed">
                Patterns &amp; Pallettes is a full-service interior design studio
                providing budget-friendly luxury interior options, bespoke
                spatial concepts, and honest guidance from experienced interior
                designers.
              </p>

              <ul className="space-y-4 pt-2">
                {studioPillars.map((pillar) => (
                  <li
                    key={pillar}
                    className="flex items-start gap-3.5 text-[#F4ECE4]/90 text-sm sm:text-base"
                  >
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#C87D3B] flex-shrink-0" />
                    <span>{pillar}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/portfolio" className="btn-studio-primary">
                  Explore Our Work
                </Link>
                <Link to="/contact" className="btn-studio-outline">
                  Schedule Consultation
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-[#D49B6A]/30 shadow-studio">
                <img
                  className="h-[420px] sm:h-[500px] w-full object-cover"
                  src="/images/project-library.jpg"
                  alt="Warm editorial living space designed by Patterns & Pallettes"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Spaces We Design */}
        <section className="studio-container py-16 lg:py-20 border-t border-[#D49B6A]/15">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow">Residential &amp; Commercial</span>
            <h2 className="section-heading">Spaces We Design</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {spacesWeDesign.map((area) => (
              <div
                key={area.title}
                className="card-studio p-7 flex flex-col items-center justify-center text-center hover:border-[#D49B6A]/50 hover:-translate-y-1"
              >
                <div className="mb-4 w-14 h-14 rounded-full bg-[#26130A] border border-[#D49B6A]/30 flex items-center justify-center">
                  {area.icon}
                </div>
                <h3 className="font-serif text-xl text-[#F4ECE4] tracking-wider">
                  {area.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Design Philosophy & Principal Designer Spotlight */}
        <section className="studio-container py-12 lg:py-16">
          <div className="rounded-2xl border border-[#D49B6A]/30 bg-gradient-to-br from-[#26130A] via-[#1D0E07] to-[#140904] p-8 sm:p-14 shadow-studio text-center max-w-4xl mx-auto">
            <span className="section-eyebrow">Design Philosophy &amp; Leadership</span>
            <svg
              className="w-9 h-9 mx-auto mb-6 text-[#D49B6A]/70"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>

            <blockquote>
              <p className="font-serif italic text-2xl sm:text-3xl text-[#F4ECE4] leading-relaxed">
                &ldquo;At Patterns &amp; Pallettes, we believe every space tells a
                story. Our goal is to blend creativity, functionality, and
                Vaastu principles to design interiors that inspire and
                uplift.&rdquo;
              </p>
            </blockquote>

            <figcaption className="mt-8 flex items-center justify-center gap-3 text-sm">
              <div className="w-10 h-10 rounded-full bg-[#C87D3B]/20 border border-[#D49B6A]/40 flex items-center justify-center font-serif text-lg text-[#D49B6A]">
                JB
              </div>
              <div className="text-left">
                <cite className="not-italic font-medium text-[#F4ECE4] block">
                  Janhavi Bagul
                </cite>
                <span className="text-xs uppercase tracking-widest text-[#D49B6A]">
                  Principal Interior Designer
                </span>
              </div>
            </figcaption>
          </div>
        </section>

        {/* 4. Our Achievements */}
        <section className="studio-container py-16 lg:py-20 border-t border-[#D49B6A]/15">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow">Studio Milestones</span>
            <h2 className="section-heading">Our Achievements</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {studioAchievements.map((stat) => (
              <div
                key={stat.title}
                className="card-studio p-8 text-center hover:border-[#D49B6A]/45"
              >
                <span className="font-serif text-4xl sm:text-5xl text-[#D49B6A] block mb-2">
                  {stat.count}
                </span>
                <p className="text-xs sm:text-sm uppercase tracking-widest text-[#F4ECE4]">
                  {stat.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. What Our Clients Say */}
        <section className="studio-container py-16 lg:py-20 border-t border-[#D49B6A]/15">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow">Testimonials</span>
            <h2 className="section-heading">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clientTestimonials.map((item) => (
              <div
                key={item.id}
                className="card-studio p-8 flex flex-col justify-between"
              >
                <blockquote className="relative mb-6">
                  <span className="font-serif text-5xl text-[#D49B6A]/40 leading-none block mb-2">
                    &ldquo;
                  </span>
                  <p className="text-sm sm:text-base text-[#B8A394] leading-relaxed">
                    {item.quote}
                  </p>
                </blockquote>

                <div className="pt-4 border-t border-[#D49B6A]/15 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#26130A] border border-[#D49B6A]/35 flex items-center justify-center font-serif text-lg text-[#D49B6A]">
                    {item.initial}
                  </div>
                  <div>
                    <cite className="not-italic font-medium text-[#F4ECE4] text-sm block">
                      {item.name}
                    </cite>
                    <span className="text-xs text-[#8A7263]">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
