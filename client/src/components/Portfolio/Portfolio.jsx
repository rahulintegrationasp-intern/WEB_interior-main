import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ENDPOINTS } from "../../config/api";
import { defaultProjects } from "../../data/studioData";

const Portfolio = () => {
  const [apiProjects, setApiProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sliderPosition, setSliderPosition] = useState(50);

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
        // Fallback to curated repository projects when backend is unavailable
      } finally {
        if (isMounted) setIsLoading(false);
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
          (p) => (p.cat || "").toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-[#140904] text-[#F4ECE4] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <section className="studio-container py-8 lg:py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="section-eyebrow">Selected Commissions</span>
              <h1 className="section-heading">Our Portfolio</h1>
            </div>
            <p className="text-sm sm:text-base text-[#B8A394] max-w-md">
              Explore our completed residential homes, executive commercial
              workspaces, and atmospheric hospitality interiors.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div
            className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12 pb-4 border-b border-[#D49B6A]/20"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {categories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-md text-xs uppercase tracking-widest transition-all ${
                    active
                      ? "bg-[#C87D3B] text-[#140904] font-semibold"
                      : "bg-[#1D0E07] text-[#B8A394] border border-[#D49B6A]/25 hover:border-[#D49B6A] hover:text-[#F4ECE4]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Project Gallery Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="h-80 rounded-xl bg-[#1D0E07] border border-[#D49B6A]/15 animate-pulse"
                />
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => {
                const projectId = project._id || `proj-${idx}`;
                const title = project.name || project.title;
                const desc = project.desc || project.description;
                const img = project.pimg || project.img || "/images/project-library.jpg";
                return (
                  <article
                    key={projectId}
                    className="card-studio overflow-hidden group flex flex-col justify-between"
                  >
                    <div>
                      <Link
                        to={`/portfolio/${projectId}`}
                        className="block relative h-64 overflow-hidden border-b border-[#D49B6A]/15"
                      >
                        <img
                          src={img}
                          alt={title}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              project.fallbackImg || "/images/project-library.jpg";
                          }}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute top-3 left-3 rounded-full bg-[#140904]/85 border border-[#D49B6A]/35 px-3 py-1 text-[10px] uppercase tracking-widest text-[#D49B6A]">
                          {project.cat || "Interior"}
                        </span>
                      </Link>
                      <div className="p-6">
                        <h2 className="font-serif text-2xl text-[#F4ECE4] mb-2 group-hover:text-[#D49B6A] transition-colors">
                          {title}
                        </h2>
                        <p className="text-sm text-[#B8A394] leading-relaxed line-clamp-3">
                          {desc}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-3 border-t border-[#D49B6A]/15 flex items-center justify-between text-xs">
                      <span className="text-[#8A7263]">
                        {project.location || "Mumbai Metropolitan Region"}
                      </span>
                      <Link
                        to={`/portfolio/${projectId}`}
                        className="uppercase tracking-widest text-[#D49B6A] hover:text-[#F4ECE4] transition-colors"
                      >
                        View Details →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="card-studio p-12 text-center">
              <p className="text-[#B8A394] mb-4">
                No projects match the selected filter.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="btn-studio-outline"
              >
                Reset Filter
              </button>
            </div>
          )}
        </section>

        {/* Interactive Before / After Transformation Showcase */}
        <section className="studio-container py-16 lg:py-20 border-t border-[#D49B6A]/20 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="section-eyebrow">Spatial Transformation</span>
              <h2 className="section-heading">Before &amp; After Comparison</h2>
              <p className="text-sm sm:text-base text-[#B8A394] leading-relaxed">
                Slide the comparison handle to inspect how our lighting design,
                custom walnut millwork, and curated finishes transform raw shell
                interiors into warm, inviting living spaces.
              </p>
              <div className="pt-2">
                <label
                  htmlFor="before-after-range"
                  className="label-studio flex justify-between"
                >
                  <span>Initial Concept Mood</span>
                  <span>Completed Interior ({sliderPosition}%)</span>
                </label>
                <input
                  id="before-after-range"
                  type="range"
                  min="5"
                  max="95"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="w-full accent-[#C87D3B] cursor-pointer"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative h-80 sm:h-[420px] rounded-2xl overflow-hidden border border-[#D49B6A]/30 select-none shadow-studio">
                {/* After Image (Full Background) */}
                <img
                  src="/images/project-library.jpg"
                  alt="Completed bespoke living room after transformation"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-4 right-4 z-20 rounded-md bg-[#140904]/85 border border-[#D49B6A]/40 px-3 py-1 text-xs uppercase tracking-widest text-[#F4ECE4]">
                  After
                </span>

                {/* Before Image (Clipped by Slider Position) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    src="/images/cta-sofa.jpg"
                    alt="Initial room state before transformation"
                    className="w-full h-full object-cover filter sepia-[0.25] brightness-75"
                  />
                  <span className="absolute top-4 left-4 z-20 rounded-md bg-[#140904]/85 border border-[#D49B6A]/40 px-3 py-1 text-xs uppercase tracking-widest text-[#D49B6A]">
                    Before
                  </span>
                </div>

                {/* Vertical Divider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#D49B6A] z-30 pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#140904] border-2 border-[#D49B6A] flex items-center justify-center text-xs text-[#F4ECE4] shadow-lg">
                    ↔
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
