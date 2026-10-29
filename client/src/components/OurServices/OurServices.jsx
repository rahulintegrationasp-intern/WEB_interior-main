import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineChair, MdOutlinePalette } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {
  detailedServices,
  featuresWeOffer,
  serviceProcessSteps,
} from "../../data/studioData";

const OurServices = () => {
  return (
    <div className="min-h-screen bg-[#140904] text-[#F4ECE4] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        {/* Page Header & Split Feature */}
        <section className="studio-container py-8 lg:py-14">
          <div className="max-w-3xl mb-12">
            <span className="section-eyebrow">What We Craft</span>
            <h1 className="section-heading mb-4">
              Comprehensive Interior Design &amp; Turnkey Execution
            </h1>
            <p className="text-[#B8A394] text-base sm:text-lg leading-relaxed">
              From initial spatial architecture and 3D visualization to custom
              joinery, civil engineering, and final lighting commissioning, we
              manage every discipline under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-[#D49B6A]/30 shadow-studio">
                <img
                  src="/images/project-dining.jpg"
                  alt="Bespoke dining and modular kitchen interior"
                  className="w-full h-[420px] sm:h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140904]/85 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#D49B6A] block mb-1">
                    Turnkey Craftsmanship
                  </span>
                  <p className="font-serif text-2xl text-[#F4ECE4]">
                    Every surface, fixture, and joint tailored to your lifestyle.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {detailedServices.map((service) => (
                  <div
                    key={service.title}
                    className="card-studio p-6 hover:border-[#D49B6A]/50 hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D49B6A] block mb-1.5">
                      {service.tag}
                    </span>
                    <h2 className="font-serif text-2xl text-[#F4ECE4] mb-2">
                      {service.title}
                    </h2>
                    <p className="text-sm text-[#B8A394] leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features We Offer */}
        <section className="studio-container py-16 lg:py-20 border-t border-[#D49B6A]/15">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow">Studio Standards</span>
            <h2 className="section-heading">Features We Offer</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresWeOffer.map((item) => (
              <div
                key={item.title}
                className="card-studio overflow-hidden group flex flex-col"
              >
                <div className="h-52 overflow-hidden border-b border-[#D49B6A]/15">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-[#F4ECE4] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#B8A394] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Services Process */}
        <section className="studio-container py-16 lg:py-20 border-t border-[#D49B6A]/15">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow">How We Work</span>
            <h2 className="section-heading">Our Services Process</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceProcessSteps.map((item) => (
              <div
                key={item.step}
                className="card-studio p-7 relative flex flex-col justify-between hover:border-[#D49B6A]/45"
              >
                <div>
                  <div className="w-12 h-12 rounded-full border border-[#D49B6A]/40 bg-[#26130A] flex items-center justify-center font-serif text-xl text-[#D49B6A] mb-5">
                    {item.step}
                  </div>
                  <h3 className="font-serif text-2xl text-[#F4ECE4] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#B8A394] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="studio-container py-16 lg:py-20 border-t border-[#D49B6A]/15">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow">The Patterns &amp; Pallettes Difference</span>
            <h2 className="section-heading mb-4">Why Choose Us</h2>
            <p className="text-sm sm:text-base text-[#B8A394]">
              We design spaces that combine elegance, functionality, and
              everyday comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-studio p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#26130A] border border-[#D49B6A]/30 flex items-center justify-center mb-5">
                <MdOutlineChair className="text-[#D49B6A] text-3xl" />
              </div>
              <h3 className="font-serif text-2xl text-[#F4ECE4] mb-2">
                Design Expertise
              </h3>
              <p className="text-sm text-[#B8A394] leading-relaxed">
                Thoughtfully designed interiors that balance architectural
                beauty and everyday comfort.
              </p>
            </div>

            <div className="card-studio p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#26130A] border border-[#D49B6A]/30 flex items-center justify-center mb-5">
                <MdOutlinePalette className="text-[#D49B6A] text-3xl" />
              </div>
              <h3 className="font-serif text-2xl text-[#F4ECE4] mb-2">
                Creative Solutions
              </h3>
              <p className="text-sm text-[#B8A394] leading-relaxed">
                Personalized concepts, curated color palettes, and materials
                tailored to your lifestyle.
              </p>
            </div>

            <div className="card-studio p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#26130A] border border-[#D49B6A]/30 flex items-center justify-center mb-5">
                <TbRulerMeasure className="text-[#D49B6A] text-3xl" />
              </div>
              <h3 className="font-serif text-2xl text-[#F4ECE4] mb-2">
                Precision &amp; Quality
              </h3>
              <p className="text-sm text-[#B8A394] leading-relaxed">
                Accurate site measurements, premium materials, and on-time
                execution.
              </p>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link to="/contact" className="btn-studio-primary">
              Request a Service Quote
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OurServices;
