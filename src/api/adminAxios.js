import axios from "axios";

const BASE_URL = (import.meta.env.VITE_API_URL || "");

const adminApi = axios.create({ baseURL: BASE_URL });

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("nk_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("nk_admin");
      localStorage.removeItem("nk_admin_token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(err);
  }
);

export default adminApi;
