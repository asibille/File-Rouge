import axios from "axios";

// Crée une instance Axios pour communiquer avec le backend
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "http://localhost:5000/api", // Render ou local
});

// Intercepteur pour ajouter le token à chaque requête si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
