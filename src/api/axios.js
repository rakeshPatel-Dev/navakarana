import axios from "axios";

const BASE_URL = (import.meta.env.VITE_API_URL || "");

const api = axios.create({ baseURL: BASE_URL });

// Request interceptor — attach student token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("nk_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — handle 401 + token refresh
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = localStorage.getItem("nk_refresh_token");
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refresh_token: refreshToken });
          localStorage.setItem("nk_token", data.token);
          localStorage.setItem("nk_refresh_token", data.refresh_token);
          original.headers.Authorization = `Bearer ${data.token}`;
          return api(original);
        } catch {
          localStorage.removeItem("nk_token");
          localStorage.removeItem("nk_refresh_token");
          localStorage.removeItem("nk_user");
          window.location.href = "/login";
        }
      } else {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;
