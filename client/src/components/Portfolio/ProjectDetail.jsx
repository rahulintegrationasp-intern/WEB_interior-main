import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ENDPOINTS } from "../../config/api";
import { defaultProjects } from "../../data/studioData";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadProject = async () => {
      setIsLoading(true);
      // First check local defaultProjects match
      const fallbackMatch = defaultProjects.find(
        (item) => String(item._id) === String(id)
      );

      try {
        const response = await fetch(ENDPOINTS.projectById(id));
        if (response.ok) {
          const data = await response.json();
          if (isMounted && data) {
            setProject(data);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Ignore network error and use fallback match if available
      }

      if (isMounted) {
        setProject(fallbackMatch || defaultProjects[0]);
        setIsLoading(false);
      }
    };

    loadProject();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="min-h-screen bg-[#140904] text-[#F4ECE4] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="studio-container">
          <div className="mb-8">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D49B6A] hover:text-[#F4ECE4] transition-colors"
            >
              <span>←</span> Back to Portfolio
            </Link>
          </div>

          {isLoading ? (
            <div className="h-96 rounded-2xl bg-[#1D0E07] border border-[#D49B6A]/20 animate-pulse" />
          ) : project ? (
            <article className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-[#D49B6A]/30 bg-[#1D0E07] shadow-studio">
                  <img
                    src={project.pimg || project.img || "/images/project-library.jpg"}
                    alt={project.name || project.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        project.fallbackImg || "/images/project-library.jpg";
                    }}
                    className="w-full h-[360px] sm:h-[480px] object-cover"
                  />
                </div>

                <div className="lg:col-span-5 space-y-6 card-studio p-8">
                  <span className="inline-block rounded-full bg-[#26130A] border border-[#D49B6A]/35 px-3.5 py-1 text-xs uppercase tracking-widest text-[#D49B6A]">
                    {project.cat || "Interior Commission"}
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#F4ECE4]">
                    {project.name || project.title}
                  </h1>
                  <p className="text-sm sm:text-base text-[#B8A394] leading-relaxed">
                    {project.desc || project.description}
                  </p>

                  <dl className="grid grid-cols-2 gap-4 pt-4 border-t border-[#D49B6A]/20 text-xs">
                    <div>
                      <dt className="uppercase tracking-wider text-[#8A7263] mb-1">
                        Category
                      </dt>
                      <dd className="text-[#F4ECE4] font-medium">
                        {project.cat || "Residential"}
                      </dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-wider text-[#8A7263] mb-1">
                        Location
                      </dt>
                      <dd className="text-[#F4ECE4] font-medium">
                        {project.location || "Mumbai Metropolitan Region"}
                      </dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-wider text-[#8A7263] mb-1">
                        Design Style
                      </dt>
                      <dd className="text-[#F4ECE4] font-medium">
                        {project.style || "Timeless Contemporary"}
                      </dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-wider text-[#8A7263] mb-1">
                        Area Scope
                      </dt>
                      <dd className="text-[#F4ECE4] font-medium">
                        {project.area || "Turnkey Interior"}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="uppercase tracking-wider text-[#8A7263] mb-1">
                        Curated Materials
                      </dt>
                      <dd className="text-[#B8A394]">
                        {project.materials ||
                          "Seasoned Timber, Brushed Bronze Hardware, Ambient Cove Lighting, Textured Wall Finishes"}
                      </dd>
                    </div>
                  </dl>

                  <div className="pt-4">
                    <Link
                      to="/contact"
                      className="btn-studio-primary w-full text-center"
                    >
                      Commission a Similar Space
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
