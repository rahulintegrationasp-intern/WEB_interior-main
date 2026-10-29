import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import Logo from "../Navbar/logo.jpeg";
import { ENDPOINTS } from "../../config/api";

const Dashboard = () => {
  const navigate = useNavigate();

  // Add Project modal state
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [formData, setFormData] = useState({
    name: "",
    cat: "Residential",
    desc: "",
    pimg: "",
  });

  const [isSubmittingAdd, setIsSubmittingAdd] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Projects state & filter
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCat, setFilterCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Update Project modal state
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const openModalUpdate = () => setIsOpenUpdate(true);
  const closeModalUpdate = () => setIsOpenUpdate(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [formDataUpdate, setFormDataUpdate] = useState({
    name: "",
    desc: "",
    cat: "Residential",
    pimg: "",
  });
  const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState("");
  const [successMessageUpdate, setSuccessMessageUpdate] = useState("");

  // Delete confirmation state
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [errorDelete, setErrorDelete] = useState("");
  const [successMessageDelete, setSuccessMessageDelete] = useState("");

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(ENDPOINTS.projects);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingAdd(true);
    setError("");
    setSuccessMessage("");
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch(ENDPOINTS.projects, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const createdProject = await response.json();
      setProjects((prev) => [createdProject, ...prev]);
      setFormData({
        name: "",
        cat: "Residential",
        desc: "",
        pimg: "",
      });
      setSuccessMessage("Project added successfully");
      setTimeout(() => {
        setSuccessMessage("");
        closeModal();
      }, 1400);
    } catch (err) {
      setError(err.message || "Could not add project");
      setTimeout(() => setError(""), 3500);
    } finally {
      setIsSubmittingAdd(false);
    }
  };

  const handleChangesUpdate = (e) => {
    const { name, value, files } = e.target;
    setFormDataUpdate((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setIsSubmittingUpdate(true);
    setErrorUpdate("");
    setSuccessMessageUpdate("");
    try {
      const url = ENDPOINTS.projectById(currentProjectId);
      const formDataToSend = new FormData();
      Object.entries(formDataUpdate).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch(url, {
        method: "PATCH",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedProject = await response.json();
      setProjects((prev) =>
        prev.map((project) =>
          project._id === currentProjectId ? updatedProject : project
        )
      );

      setSuccessMessageUpdate("Project updated successfully");
      setTimeout(() => {
        setSuccessMessageUpdate("");
        closeModalUpdate();
      }, 1200);
    } catch (err) {
      setErrorUpdate(err.message || "Could not update project");
      setTimeout(() => setErrorUpdate(""), 3500);
    } finally {
      setIsSubmittingUpdate(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(ENDPOINTS.projectById(id), {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setProjects((prev) => prev.filter((project) => project._id !== id));
      setProjectToDelete(null);
      setSuccessMessageDelete("Project deleted successfully");
      setErrorDelete("");
      setTimeout(() => setSuccessMessageDelete(""), 2500);
    } catch (err) {
      setProjectToDelete(null);
      setErrorDelete("Failed to delete project.");
      console.error("Error deleting project:", err);
      setTimeout(() => setErrorDelete(""), 3000);
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("pp_admin_authenticated");
    } catch {
      // Ignore storage errors
    }
    navigate("/authentication");
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      filterCat === "All" ||
      (project.cat || "").toLowerCase() === filterCat.toLowerCase();
    const matchesSearch =
      !searchQuery.trim() ||
      (project.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.desc || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryCounts = {
    All: projects.length,
    Residential: projects.filter((p) => p.cat === "Residential").length,
    Commercial: projects.filter((p) => p.cat === "Commercial").length,
    Hospitality: projects.filter((p) => p.cat === "Hospitality").length,
  };

  return (
    <div className="min-h-screen bg-[#140904] text-[#F4ECE4] flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="bg-[#1D0E07] border-b border-[#D49B6A]/25 sticky top-0 z-30">
        <div className="studio-container py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Patterns & Pallettes Logo"
              className="h-9 w-9 rounded-full object-cover border border-[#D49B6A]/40"
            />
            <div>
              <h1 className="font-serif text-xl sm:text-2xl text-[#F4ECE4] leading-none">
                Admin Dashboard
              </h1>
              <span className="text-[11px] uppercase tracking-widest text-[#D49B6A]">
                Patterns &amp; Pallettes · Portfolio Manager
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/" className="btn-studio-outline py-2 px-4 text-xs">
              View Live Website
            </Link>
            <button
              type="button"
              onClick={openModal}
              className="btn-studio-primary py-2 px-4 text-xs"
            >
              + Add New Project
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs uppercase tracking-widest text-[#B8A394] hover:text-red-300 px-3 py-2 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="studio-container flex-grow py-10 w-full">
        {/* Summary Metrics & Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {Object.entries(categoryCounts).map(([cat, count]) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCat(cat)}
              className={`p-5 rounded-xl border text-left transition-all ${
                filterCat === cat
                  ? "bg-[#26130A] border-[#D49B6A] shadow-studio-sm"
                  : "bg-[#1D0E07] border-[#D49B6A]/20 hover:border-[#D49B6A]/45"
              }`}
            >
              <span className="text-xs uppercase tracking-widest text-[#B8A394] block mb-1">
                {cat === "All" ? "Total Projects" : cat}
              </span>
              <span className="font-serif text-3xl text-[#F4ECE4]">{count}</span>
            </button>
          ))}
        </div>

        {/* Search & Filter Toolbar */}
        <div className="card-studio p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Residential", "Commercial", "Hospitality"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCat(cat)}
                className={`px-3.5 py-1.5 rounded-md text-xs uppercase tracking-wider transition-colors ${
                  filterCat === cat
                    ? "bg-[#C87D3B] text-[#140904] font-semibold"
                    : "text-[#B8A394] hover:text-[#F4ECE4] bg-[#140904]/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-72">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name or description..."
              aria-label="Search projects"
              className="input-studio py-2 text-xs"
            />
          </div>
        </div>

        {/* Status Alerts */}
        {errorDelete && (
          <div
            className="p-4 mb-6 text-sm text-red-200 rounded-lg bg-red-950/80 border border-red-500/40"
            role="alert"
          >
            {errorDelete}
          </div>
        )}
        {successMessageDelete && (
          <div
            className="p-4 mb-6 text-sm text-emerald-200 rounded-lg bg-emerald-950/80 border border-emerald-500/40"
            role="status"
          >
            {successMessageDelete}
          </div>
        )}

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 rounded-xl bg-[#1D0E07] border border-[#D49B6A]/15 animate-pulse"
              />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project._id}
                className="card-studio overflow-hidden flex flex-col justify-between group hover:border-[#D49B6A]/45"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-[#140904] border-b border-[#D49B6A]/15">
                    <img
                      className="w-full h-full object-cover"
                      src={project.pimg}
                      alt={project.name || "Project Image"}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/project-library.jpg";
                      }}
                    />
                    <span className="absolute top-3 left-3 bg-[#140904]/90 border border-[#D49B6A]/40 text-[#D49B6A] text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {project.cat}
                    </span>
                  </div>

                  <div className="p-5">
                    <h2 className="font-serif text-xl text-[#F4ECE4] mb-1.5">
                      {project.name}
                    </h2>
                    <p className="text-xs text-[#B8A394] leading-relaxed line-clamp-3">
                      {project.desc}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-[#140904]/50 border-t border-[#D49B6A]/15 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentProjectId(project._id);
                      setFormDataUpdate({
                        name: project.name,
                        cat: project.cat,
                        desc: project.desc,
                        pimg: project.pimg,
                      });
                      openModalUpdate();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#D49B6A]/30 text-xs text-[#F4ECE4] hover:border-[#D49B6A] hover:bg-[#D49B6A]/15 transition-colors"
                    title="Edit Project"
                  >
                    <MdOutlineModeEdit className="text-base text-[#D49B6A]" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProjectToDelete(project)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-red-500/30 text-xs text-red-300 hover:border-red-400 hover:bg-red-950/50 transition-colors"
                    title="Delete Project"
                  >
                    <MdDeleteOutline className="text-base" />
                    <span>Delete</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="card-studio p-12 text-center max-w-lg mx-auto my-8">
            <h2 className="font-serif text-2xl text-[#F4ECE4] mb-2">
              No Projects Added Yet
            </h2>
            <p className="text-sm text-[#B8A394] mb-6">
              Add your completed residential, commercial, or hospitality
              interior projects to showcase them on the public portfolio.
            </p>
            <button
              type="button"
              onClick={openModal}
              className="btn-studio-primary"
            >
              + Add First Project
            </button>
          </div>
        )}
      </main>

      {/* ADD PROJECT MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target.id === "modal-background") closeModal();
          }}
          id="modal-background"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-project-title"
        >
          <div className="card-studio bg-[#1D0E07] w-full max-w-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#D49B6A]/20 pb-4 mb-6">
              <h2
                id="add-project-title"
                className="font-serif text-2xl text-[#F4ECE4]"
              >
                Add New Project
              </h2>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full border border-[#D49B6A]/30 flex items-center justify-center text-[#B8A394] hover:text-[#F4ECE4]"
              >
                ✕
              </button>
            </div>

            {error && (
              <div
                className="p-4 mb-5 text-xs sm:text-sm text-red-200 rounded-lg bg-red-950/80 border border-red-500/40"
                role="alert"
              >
                {error}
              </div>
            )}
            {successMessage && (
              <div
                className="p-4 mb-5 text-xs sm:text-sm text-emerald-200 rounded-lg bg-emerald-950/80 border border-emerald-500/40"
                role="status"
              >
                {successMessage}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div>
                <label htmlFor="add-name" className="label-studio">
                  Project Name
                </label>
                <input
                  id="add-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Modern Living Room"
                  className="input-studio"
                  required
                />
              </div>

              <div>
                <label htmlFor="add-cat" className="label-studio">
                  Project Category
                </label>
                <select
                  id="add-cat"
                  name="cat"
                  value={formData.cat}
                  onChange={handleChange}
                  className="input-studio"
                >
                  <option value="Residential" className="bg-[#1D0E07]">
                    Residential
                  </option>
                  <option value="Commercial" className="bg-[#1D0E07]">
                    Commercial
                  </option>
                  <option value="Hospitality" className="bg-[#1D0E07]">
                    Hospitality
                  </option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="add-desc" className="label-studio">
                  Project Description
                </label>
                <textarea
                  id="add-desc"
                  name="desc"
                  rows="3"
                  value={formData.desc}
                  onChange={handleChange}
                  placeholder="Describe the spatial layout, materials, and lighting..."
                  className="input-studio"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="add-file" className="label-studio">
                  Project Cover Image
                </label>
                <input
                  id="add-file"
                  type="file"
                  name="pimg"
                  accept="image/*"
                  onChange={handleChange}
                  className="input-studio file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#C87D3B] file:text-[#140904] hover:file:bg-[#D49B6A] cursor-pointer"
                  required
                />
                <p className="mt-1.5 text-xs text-[#8A7263]">
                  Supported formats: PNG, JPG, WEBP, or SVG. Uploaded to
                  Cloudinary.
                </p>
              </div>

              <div className="md:col-span-2 pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-studio-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingAdd}
                  className="btn-studio-primary"
                >
                  {isSubmittingAdd ? "Uploading..." : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPDATE PROJECT MODAL */}
      {isOpenUpdate && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target.id === "modal-update-background") closeModalUpdate();
          }}
          id="modal-update-background"
          role="dialog"
          aria-modal="true"
          aria-labelledby="update-project-title"
        >
          <div className="card-studio bg-[#1D0E07] w-full max-w-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#D49B6A]/20 pb-4 mb-6">
              <h2
                id="update-project-title"
                className="font-serif text-2xl text-[#F4ECE4]"
              >
                Update Project
              </h2>
              <button
                type="button"
                onClick={closeModalUpdate}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full border border-[#D49B6A]/30 flex items-center justify-center text-[#B8A394] hover:text-[#F4ECE4]"
              >
                ✕
              </button>
            </div>

            {errorUpdate && (
              <div
                className="p-4 mb-5 text-xs sm:text-sm text-red-200 rounded-lg bg-red-950/80 border border-red-500/40"
                role="alert"
              >
                {errorUpdate}
              </div>
            )}
            {successMessageUpdate && (
              <div
                className="p-4 mb-5 text-xs sm:text-sm text-emerald-200 rounded-lg bg-emerald-950/80 border border-emerald-500/40"
                role="status"
              >
                {successMessageUpdate}
              </div>
            )}

            <form
              onSubmit={handleSubmitUpdate}
              encType="multipart/form-data"
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div>
                <label htmlFor="update-name" className="label-studio">
                  Project Name
                </label>
                <input
                  id="update-name"
                  type="text"
                  name="name"
                  value={formDataUpdate.name}
                  onChange={handleChangesUpdate}
                  placeholder="Project Name"
                  className="input-studio"
                  required
                />
              </div>

              <div>
                <label htmlFor="update-cat" className="label-studio">
                  Project Category
                </label>
                <select
                  id="update-cat"
                  name="cat"
                  value={formDataUpdate.cat}
                  onChange={handleChangesUpdate}
                  className="input-studio"
                >
                  <option value="Residential" className="bg-[#1D0E07]">
                    Residential
                  </option>
                  <option value="Commercial" className="bg-[#1D0E07]">
                    Commercial
                  </option>
                  <option value="Hospitality" className="bg-[#1D0E07]">
                    Hospitality
                  </option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="update-desc" className="label-studio">
                  Project Description
                </label>
                <textarea
                  id="update-desc"
                  name="desc"
                  rows="3"
                  value={formDataUpdate.desc}
                  onChange={handleChangesUpdate}
                  placeholder="Elegant and functional interior"
                  className="input-studio"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="update-file" className="label-studio">
                  Replace Image (Optional)
                </label>
                <input
                  id="update-file"
                  type="file"
                  name="pimg"
                  accept="image/*"
                  onChange={handleChangesUpdate}
                  className="input-studio file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#C87D3B] file:text-[#140904] hover:file:bg-[#D49B6A] cursor-pointer"
                />
                <p className="mt-1.5 text-xs text-[#8A7263]">
                  Leave empty to keep the existing project photograph.
                </p>
              </div>

              <div className="md:col-span-2 pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModalUpdate}
                  className="btn-studio-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingUpdate}
                  className="btn-studio-primary"
                >
                  {isSubmittingUpdate ? "Saving..." : "Update Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {projectToDelete && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-project-title"
        >
          <div className="card-studio bg-[#1D0E07] w-full max-w-md p-6 sm:p-8 text-center">
            <h2
              id="delete-project-title"
              className="font-serif text-2xl text-[#F4ECE4] mb-2"
            >
              Delete Project?
            </h2>
            <p className="text-sm text-[#B8A394] mb-6">
              Are you sure you want to permanently remove{" "}
              <span className="text-[#F4ECE4] font-medium">
                &ldquo;{projectToDelete.name}&rdquo;
              </span>{" "}
              from the portfolio?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className="btn-studio-outline"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(projectToDelete._id)}
                className="px-6 py-2.5 rounded-md bg-red-700 hover:bg-red-600 text-white text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
