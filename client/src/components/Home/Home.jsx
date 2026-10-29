import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import EnquiryForm from "../Shared/EnquiryForm";
import { ENDPOINTS } from "../../config/api";
import {
  defaultProjects,
  homeServiceShowcases,
  studioAchievements,
  clientTestimonials,
} from "../../data/studioData";

const Home = () => {
  // Interactive Services Accordion state (matches reference slice 1 & 2)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  // Live API projects + fallback projects
  const [apiProjects, setApiProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [projectPage, setProjectPage] = useState(0);

  // Testimonials carousel state (matches reference slice 3)
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        const response = await fetch(ENDPOINTS.projects);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setApiProjects(data);
        }
      } catch {
        // Fallback to curated repository projects when backend is offline
      } finally {
        if (isMounted) setIsLoadingProjects(false);
      }
    };
    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const allProjects =
    apiProjects.length > 0 ? [...apiProjects, ...defaultProjects] : defaultProjects;

  const categories = ["All", "Residential", "Commercial", "Hospitality"];

  const filteredProjects =
    selectedCategory === "All"
      ? allProjects
      : allProjects.filter(
          (project) =>
            (project.cat || "").toLowerCase() === selectedCategory.toLowerCase()
        );

  const itemsPerPage = 2;
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));
  const currentProjectSlice = filteredProjects.slice(
    projectPage * itemsPerPage,
    projectPage * itemsPerPage + itemsPerPage
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setProjectPage(0);
  };

  const handlePrevProjects = () => {
    setProjectPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextProjects = () => {
    setProjectPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonialIndex((prev) =>
      prev > 0 ? prev - 1 : clientTestimonials.length - 1
    );
  };

  const handleNextTestimonial = () => {
    setActiveTestimonialIndex((prev) =>
      prev < clientTestimonials.length - 1 ? prev + 1 : 0
    );
  };

  const activeTestimonial = clientTestimonials[activeTestimonialIndex];

  return (
    <div className="min-h-screen bg-[#140904] text-[#F4ECE4] flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* 1. HERO SECTION — Matches Reference Screenshot Composition */}
        <section className="relative min-h-[580px] lg:min-h-[88vh] w-full overflow-hidden flex items-center bg-[#140904]">
          {/* Left-anchored warm interior scene with seamless right & bottom dark gradient blend */}
          <div className="absolute inset-0 lg:w-[68%]">
            <img
              src="/images/hero-interior.jpg"
              alt="Warm amber-lit living room interior by Patterns & Pallettes"
              className="w-full h-full object-cover object-left"
              fetchPriority="high"
            />
            {/* Multi-stop horizontal gradient connecting left image to right dark surface */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(20,9,4,0.12) 0%, rgba(20,9,4,0.48) 52%, rgba(20,9,4,0.94) 84%, #140904 100%)",
              }}
            />
            {/* Bottom gradient fade into stats section */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(20,9,4,0.45) 0%, transparent 25%, transparent 68%, #140904 100%)",
              }}
            />
          </div>

          {/* Ambient warm glow */}
          <div
            className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background: "radial-gradient(circle, #C87D3B 0%, transparent 70%)",
            }}
          />

          <div className="studio-container relative z-10 w-full pt-28 pb-16 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
              {/* Left spacer over the illuminated pendant/sofa focal area on desktop */}
              <div className="hidden lg:block lg:col-span-6" />

              {/* Right editorial headline & CTA matching reference screenshot */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-6 max-w-xl lg:pl-6"
              >
                <span className="text-xs sm:text-sm tracking-[0.2em] text-[#B8A394] block mb-3">
                  Interior Design Studio
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl xl:text-6xl font-normal text-[#F4ECE4] leading-[1.14] tracking-wide mb-7">
                  Transform Your Spaces <br className="hidden sm:inline" />
                  with Timeless Elegance
                </h1>
                <p className="text-sm sm:text-base text-[#B8A394] leading-relaxed mb-8 max-w-md font-light">
                  Patterns &amp; Pallettes crafts bespoke residential, commercial,
                  and hospitality interiors—blending warm architectural lighting,
                  curated textures, and enduring functionality.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link to="/contact" className="btn-studio-outline px-8 py-3">
                    Contact Us
                  </Link>
                  <Link
                    to="/portfolio"
                    className="text-xs sm:text-sm tracking-widest uppercase text-[#D49B6A] hover:text-[#F4ECE4] transition-colors px-3 py-2"
                  >
                    Explore Portfolio →
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. STUDIO STATS BAR & EDITORIAL MANIFESTO — Matches Reference Slice 1 */}
        <section className="studio-container relative z-20 -mt-4 sm:-mt-8 pb-16 lg:pb-24">
          <div className="rounded-xl border border-[#D49B6A]/25 bg-[#1A0C06]/95 px-6 py-8 sm:px-12 sm:py-10 shadow-studio">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#D49B6A]/15">
              {studioAchievements.map((stat, idx) => (
                <div
                  key={stat.title}
                  className={`${
                    idx > 0 ? "pt-6 md:pt-0 md:pl-8" : ""
                  } flex flex-col items-start`}
                >
                  <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F4ECE4] font-normal tracking-wide mb-1.5">
                    {stat.count}
                  </span>
                  <span className="text-xs sm:text-sm text-[#B8A394] tracking-wider">
                    {stat.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Manifesto Paragraph */}
          <div className="mt-16 lg:mt-24 max-w-4xl mx-auto">
            <p className="font-serif text-xl sm:text-2xl lg:text-[28px] text-[#B8A394] leading-[1.65] tracking-wide font-normal">
              Here we breathe life into the charm and grace of every space. Our
              interior design studio,{" "}
              <span className="text-[#F4ECE4]">Patterns &amp; Pallettes</span>, is
              dedicated to reviving the elegance of classic aesthetics while
              infusing it with modern sensibilities and Vaastu harmony. At the
              heart of our passion lies the desire to create captivating spaces
              that tell stories of timeless beauty.
            </p>
            <div className="mt-6 flex items-center gap-6">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D49B6A] hover:text-[#F4ECE4] transition-colors"
              >
                Read Our Story <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. OUR SERVICES INTERACTIVE ACCORDION — Matches Reference Slice 1 & 2 */}
        <section className="studio-container py-16 lg:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#D49B6A]/25">
            <div>
              <span className="section-eyebrow">Craft &amp; Expertise</span>
              <h2 className="section-heading">Our Services</h2>
            </div>
            <Link
              to="/services"
              className="mt-4 sm:mt-0 text-xs uppercase tracking-[0.2em] text-[#D49B6A] hover:text-[#F4ECE4] transition-colors"
            >
              View All 8 Services →
            </Link>
          </div>

          <div className="divide-y divide-[#D49B6A]/20 border-b border-[#D49B6A]/20">
            {homeServiceShowcases.map((service, index) => {
              const isOpen = activeServiceIndex === index;
              return (
                <div key={service.id} className="py-6 sm:py-8 transition-all">
                  {isOpen ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-5 space-y-4">
                        <span className="text-[11px] uppercase tracking-[0.2em] text-[#D49B6A]">
                          {service.subtitle}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl text-[#F4ECE4]">
                          {service.title}
                        </h3>
                        <p className="text-sm text-[#B8A394] leading-relaxed">
                          {service.description}
                        </p>
                        <div className="pt-2 flex items-center gap-6">
                          <Link
                            to="/portfolio"
                            className="inline-block text-xs uppercase tracking-widest text-[#F4ECE4] border-b border-[#D49B6A] pb-1 hover:text-[#D49B6A] transition-colors"
                          >
                            View Projects
                          </Link>
                          <Link
                            to="/services"
                            className="inline-block text-xs uppercase tracking-widest text-[#B8A394] hover:text-[#F4ECE4] transition-colors"
                          >
                            Service Details →
                          </Link>
                        </div>
                      </div>

                      <div className="lg:col-span-6">
                        <div className="overflow-hidden rounded-xl border border-[#D49B6A]/25 h-60 sm:h-72">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                        </div>
                      </div>

                      <div className="lg:col-span-1 flex justify-end self-start">
                        <button
                          type="button"
                          onClick={() => setActiveServiceIndex(-1)}
                          aria-label={`Collapse ${service.title}`}
                          className="w-9 h-9 rounded-full border border-[#D49B6A]/25 flex items-center justify-center text-[#B8A394] hover:text-[#F4ECE4] hover:border-[#D49B6A] transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveServiceIndex(index)}
                      className="w-full flex items-center justify-between text-left group py-1 focus:outline-none"
                    >
                      <span className="font-serif text-xl sm:text-2xl text-[#B8A394] group-hover:text-[#F4ECE4] transition-colors">
                        {service.title}
                      </span>
                      <span className="text-[#B8A394] group-hover:text-[#D49B6A] group-hover:translate-x-1 transition-all text-lg">
                        →
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. OUR PROJECTS — Matches Reference Slice 2 */}
        <section className="studio-container py-16 lg:py-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="section-eyebrow">Curated Works</span>
            <h2 className="section-heading">Our Projects</h2>
          </div>

          {/* Horizontal Category Tabs with Active Underline */}
          <div
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-12 border-b border-[#D49B6A]/15 pb-3"
            role="tablist"
            aria-label="Project Categories"
          >
            {categories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleCategorySelect(category)}
                  className={`pb-3 -mb-[13px] text-xs sm:text-sm tracking-widest uppercase transition-all ${
                    active
                      ? "text-[#F4ECE4] border-b-2 border-[#D49B6A] font-medium"
                      : "text-[#8A7263] hover:text-[#B8A394]"
                  }`}
                >
                  {category === "All" ? "Show All" : category}
                </button>
              );
            })}
          </div>

          {/* Project Showcase Grid (2 editorial columns matching reference slice 2) */}
          {isLoadingProjects ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[0, 1].map((skeleton) => (
                <div
                  key={skeleton}
                  className="h-96 rounded-xl bg-[#1D0E07] border border-[#D49B6A]/15 animate-pulse"
                />
              ))}
            </div>
          ) : currentProjectSlice.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {currentProjectSlice.map((project, idx) => {
                const projectId = project._id || `proj-${idx}`;
                const title = project.name || project.title;
                const desc = project.desc || project.description;
                const imageSrc = project.pimg || project.img || "/images/project-library.jpg";
                return (
                  <article
                    key={projectId}
                    className="group flex flex-col border-b border-[#D49B6A]/20 pb-6"
                  >
                    <Link
                      to={`/portfolio/${projectId}`}
                      className="overflow-hidden rounded-xl border border-[#D49B6A]/20 bg-[#1D0E07] h-72 sm:h-80 lg:h-96 mb-5 block relative"
                    >
                      <img
                        src={imageSrc}
                        alt={title}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            project.fallbackImg || "/images/project-library.jpg";
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 rounded-full bg-[#140904]/85 backdrop-blur-sm border border-[#D49B6A]/35 px-3.5 py-1 text-[11px] uppercase tracking-widest text-[#D49B6A]">
                        {project.cat || "Interior"}
                      </span>
                    </Link>

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-2xl text-[#F4ECE4] mb-1.5 group-hover:text-[#D49B6A] transition-colors">
                          {title}
                        </h3>
                        <p className="text-sm text-[#B8A394] line-clamp-2 mb-3">
                          {desc}
                        </p>
                        <Link
                          to={`/portfolio/${projectId}`}
                          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D49B6A] hover:text-[#F4ECE4] transition-colors"
                        >
                          View Details <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="card-studio p-12 text-center">
              <p className="text-[#B8A394] mb-4">
                No projects found in this category.
              </p>
              <button
                type="button"
                onClick={() => handleCategorySelect("All")}
                className="btn-studio-outline"
              >
                Show All Projects
              </button>
            </div>
          )}

          {/* Pagination bar & arrows matching Reference Slice 2 */}
          <div className="mt-10 flex items-center justify-between">
            <Link
              to="/portfolio"
              className="text-xs uppercase tracking-[0.2em] text-[#B8A394] hover:text-[#F4ECE4] transition-colors"
            >
              View Full Portfolio ({filteredProjects.length}) →
            </Link>

            <div className="hidden sm:flex items-center gap-2 w-40 h-0.5 bg-[#D49B6A]/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D49B6A] transition-all duration-300"
                style={{
                  width: `${((projectPage + 1) / totalPages) * 100}%`,
                }}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrevProjects}
                aria-label="Previous projects"
                className="w-10 h-10 rounded-full border border-[#D49B6A]/30 flex items-center justify-center text-[#B8A394] hover:text-[#F4ECE4] hover:border-[#D49B6A] transition-colors"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNextProjects}
                aria-label="Next projects"
                className="w-10 h-10 rounded-full border border-[#D49B6A]/30 flex items-center justify-center text-[#B8A394] hover:text-[#F4ECE4] hover:border-[#D49B6A] transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </section>

        {/* 5. TESTIMONIALS ("What They Say About Us") — Matches Reference Slice 3 */}
        <section className="studio-container py-16 lg:py-24">
          <div className="text-center max-w-xl mx-auto pb-8 border-b border-[#D49B6A]/20">
            <span className="section-eyebrow">Client Voices</span>
            <h2 className="section-heading">
              What They Say <br /> About Us
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto py-12 px-4 sm:px-12 text-center">
            {/* Avatar Badge */}
            <div className="mx-auto mb-8 w-20 h-20 rounded-full border-2 border-[#D49B6A]/50 bg-gradient-to-br from-[#2E170D] to-[#140904] flex items-center justify-center shadow-studio-sm">
              <span className="font-serif text-3xl text-[#D49B6A]">
                {activeTestimonial.initial}
              </span>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevTestimonial}
                aria-label="Previous testimonial"
                className="hidden sm:flex w-11 h-11 rounded-full border border-[#D49B6A]/25 items-center justify-center text-[#B8A394] hover:text-[#F4ECE4] hover:border-[#D49B6A] transition-colors flex-shrink-0"
              >
                ←
              </button>

              <blockquote className="max-w-2xl mx-auto">
                <p className="font-serif italic text-xl sm:text-2xl lg:text-[26px] text-[#F4ECE4]/90 leading-relaxed mb-6">
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </p>
                <footer className="text-xs sm:text-sm tracking-widest uppercase text-[#D49B6A]">
                  {activeTestimonial.name}{" "}
                  <span className="text-[#8A7263]">
                    · {activeTestimonial.role}
                  </span>
                </footer>
              </blockquote>

              <button
                type="button"
                onClick={handleNextTestimonial}
                aria-label="Next testimonial"
                className="hidden sm:flex w-11 h-11 rounded-full border border-[#D49B6A]/25 items-center justify-center text-[#B8A394] hover:text-[#F4ECE4] hover:border-[#D49B6A] transition-colors flex-shrink-0"
              >
                →
              </button>
            </div>

            {/* Mobile controls & indicator dots */}
            <div className="mt-8 flex items-center justify-center gap-3">
              {clientTestimonials.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTestimonialIndex(idx)}
                  aria-label={`View testimonial by ${item.name}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeTestimonialIndex
                      ? "w-8 bg-[#D49B6A]"
                      : "w-2 bg-[#D49B6A]/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 6. MASTERPIECE CTA BANNER & CONSULTATION ENQUIRY — Matches Reference Slice 3 */}
        <section className="relative py-20 lg:py-28 overflow-hidden border-t border-[#D49B6A]/20">
          <div className="absolute inset-0">
            <img
              src="/images/cta-sofa.jpg"
              alt="Vintage velvet sofa in a moody espresso setting"
              className="w-full h-full object-cover object-center opacity-45"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #140904 0%, rgba(20,9,4,0.65) 45%, #140904 100%)",
              }}
            />
          </div>

          <div className="studio-container relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="section-eyebrow">Begin Your Journey</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F4ECE4] leading-tight mb-6">
                Let us create a masterpiece for you. Elevate your space with
                timeless elegance.
              </h2>
              <a href="#consultation-form" className="btn-studio-outline">
                Let&apos;s Connect
              </a>
            </div>

            <div id="consultation-form" className="max-w-3xl mx-auto pt-4">
              <div className="text-center mb-8">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F4ECE4]">
                  Request a Private Design Consultation
                </h3>
                <p className="text-sm text-[#B8A394] mt-1">
                  Share your project details below and our design team will get
                  in touch.
                </p>
              </div>
              <EnquiryForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
