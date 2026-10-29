export const API_BASE_URL =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  "http://localhost:8080";

export const ENDPOINTS = {
  projects: `${API_BASE_URL}/api/project`,
  projectById: (id) => `${API_BASE_URL}/api/project/${id}`,
  enquiry: `${API_BASE_URL}/api/form/enq`,
};
