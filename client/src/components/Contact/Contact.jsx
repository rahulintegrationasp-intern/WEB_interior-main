import React from "react";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebookF,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import EnquiryForm from "../Shared/EnquiryForm";
import { studioContactInfo } from "../../data/studioData";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#140904] text-[#F4ECE4] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <section className="studio-container py-8 lg:py-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow">Connect With Our Studio</span>
            <h1 className="section-heading mb-4">Contact Us</h1>
            <p className="text-sm sm:text-base text-[#B8A394]">
              Reach out to schedule a site visit, discuss floor plans, or
              request a customized interior estimate.
            </p>
          </div>

          {/* Contact Details on Top (matching documentation & existing contact info) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            <a
              href={studioContactInfo.mailto}
              className="card-studio p-6 flex items-start gap-4 hover:border-[#D49B6A]/50 transition-colors"
            >
              <div className="w-11 h-11 rounded-full bg-[#26130A] border border-[#D49B6A]/35 flex items-center justify-center text-[#D49B6A] flex-shrink-0">
                <FaEnvelope size={16} />
              </div>
              <div className="min-w-0">
                <span className="text-xs uppercase tracking-widest text-[#8A7263] block mb-1">
                  Email Us
                </span>
                <span className="text-sm sm:text-base text-[#F4ECE4] break-all">
                  {studioContactInfo.email}
                </span>
              </div>
            </a>

            <a
              href={studioContactInfo.phoneHref}
              className="card-studio p-6 flex items-start gap-4 hover:border-[#D49B6A]/50 transition-colors"
            >
              <div className="w-11 h-11 rounded-full bg-[#26130A] border border-[#D49B6A]/35 flex items-center justify-center text-[#D49B6A] flex-shrink-0">
                <FaPhone size={16} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8A7263] block mb-1">
                  Call Studio
                </span>
                <span className="text-sm sm:text-base text-[#F4ECE4]">
                  {studioContactInfo.phone}
                </span>
              </div>
            </a>

            <div className="card-studio p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#26130A] border border-[#D49B6A]/35 flex items-center justify-center text-[#D49B6A] flex-shrink-0">
                <FaMapMarkerAlt size={16} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8A7263] block mb-1">
                  Studio Address
                </span>
                <span className="text-sm sm:text-base text-[#F4ECE4]">
                  {studioContactInfo.address}
                </span>
              </div>
            </div>
          </div>

          {/* Enquiry Form & Map Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F4ECE4] mb-6">
                Send a Service Enquiry
              </h2>
              <EnquiryForm />
            </div>

            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F4ECE4] mb-6">
                Studio Location &amp; Hours
              </h2>
              <div className="card-studio overflow-hidden p-3">
                <iframe
                  title="Our Location"
                  src={studioContactInfo.mapEmbedUrl}
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg filter grayscale-[30%] contrast-[1.05]"
                />
              </div>

              <div className="card-studio p-6 space-y-4">
                <div>
                  <h3 className="font-serif text-xl text-[#F4ECE4] mb-1">
                    Consultation Hours
                  </h3>
                  <p className="text-sm text-[#B8A394]">
                    {studioContactInfo.hours}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D49B6A]/15 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-[#8A7263]">
                    Follow Our Work
                  </span>
                  <div className="flex items-center gap-4 text-lg text-[#B8A394]">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="hover:text-[#D49B6A] transition-colors"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="hover:text-[#D49B6A] transition-colors"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="hover:text-[#D49B6A] transition-colors"
                    >
                      <FaFacebookF />
                    </a>
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

export default Contact;
