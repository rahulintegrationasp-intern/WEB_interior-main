import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import OurServices from "./components/OurServices/OurServices";
import Portfolio from "./components/Portfolio/Portfolio";
import ProjectDetail from "./components/Portfolio/ProjectDetail";
import Contact from "./components/Contact/Contact";
import Authentication from "./components/Admin/Authentication";
import Dashboard from "./components/Admin/Dashboard";
import NotFound from "./components/Shared/NotFound";

const App = () => {
  return (
    <div className="app min-h-screen bg-[#140904] text-[#F4ECE4]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />

          {/* Existing Admin Routes + Documented Route Aliases */}
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/admin/login" element={<Authentication />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/projects" element={<Dashboard />} />

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
