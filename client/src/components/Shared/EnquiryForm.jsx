import React, { useState } from "react";
import { ENDPOINTS } from "../../config/api";
import { serviceSelectOptions } from "../../data/studioData";

const EnquiryForm = ({ preselectedService = "", compact = false }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobileno: "",
    email: "",
    address: "",
    selectedservice: preselectedService,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(ENDPOINTS.enquiry, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setFormData({
        firstname: "",
        lastname: "",
        mobileno: "",
        email: "",
        address: "",
        selectedservice: "",
        message: "",
      });
      setSuccessMessage(
        result.message ||
          "Your consultation enquiry has been sent. Our design team will reach out shortly."
      );
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Form submission error:", err);
      setError(
        "Failed to submit enquiry right now. Please verify the server connection or contact us directly by phone/email."
      );
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`card-studio ${
        compact ? "p-6 sm:p-8" : "p-6 sm:p-10 lg:p-12"
      }`}
    >
      {error && (
        <div
          className="p-4 mb-6 text-sm text-red-200 rounded-lg bg-red-950/70 border border-red-500/40"
          role="alert"
        >
          <span className="font-semibold">Unable to send enquiry:</span> {error}
        </div>
      )}

      {successMessage && (
        <div
          className="p-4 mb-6 text-sm text-emerald-200 rounded-lg bg-emerald-950/70 border border-emerald-500/40"
          role="status"
        >
          <span className="font-semibold">Thank you:</span> {successMessage}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="enq-firstname" className="label-studio">
              First Name <span className="text-[#C87D3B]">*</span>
            </label>
            <input
              id="enq-firstname"
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              placeholder="Enter first name"
              className="input-studio"
              required
            />
          </div>

          <div>
            <label htmlFor="enq-lastname" className="label-studio">
              Last Name <span className="text-[#C87D3B]">*</span>
            </label>
            <input
              id="enq-lastname"
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              placeholder="Enter last name"
              className="input-studio"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="enq-email" className="label-studio">
              Email Address <span className="text-[#C87D3B]">*</span>
            </label>
            <input
              id="enq-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className="input-studio"
              required
            />
          </div>

          <div>
            <label htmlFor="enq-mobileno" className="label-studio">
              Phone Number <span className="text-[#C87D3B]">*</span>
            </label>
            <input
              id="enq-mobileno"
              type="tel"
              name="mobileno"
              value={formData.mobileno}
              onChange={handleInputChange}
              placeholder="+91 77097 88896"
              className="input-studio"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="enq-address" className="label-studio">
              Project Location / Address <span className="text-[#C87D3B]">*</span>
            </label>
            <input
              id="enq-address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="City, neighborhood, or site address"
              className="input-studio"
              required
            />
          </div>

          <div>
            <label htmlFor="enq-service" className="label-studio">
              Select Service <span className="text-[#C87D3B]">*</span>
            </label>
            <select
              id="enq-service"
              name="selectedservice"
              value={formData.selectedservice}
              onChange={handleInputChange}
              className="input-studio"
              required
            >
              <option value="" className="bg-[#1D0E07] text-[#B8A394]">
                Select Service
              </option>
              {serviceSelectOptions.map((service) => (
                <option
                  key={service}
                  value={service}
                  className="bg-[#1D0E07] text-[#F4ECE4]"
                >
                  {service}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="enq-message" className="label-studio">
            Project Vision &amp; Requirements <span className="text-[#C87D3B]">*</span>
          </label>
          <textarea
            id="enq-message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows="4"
            placeholder="Tell us about your space, timeline, and aesthetic preferences..."
            className="input-studio resize-y"
            required
          />
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8A7263]">
            Our studio responds to all consultation enquiries within 24 business hours.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-studio-primary w-full sm:w-auto min-w-[190px]"
          >
            {isSubmitting ? "Sending Enquiry..." : "Book Consultation"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;
