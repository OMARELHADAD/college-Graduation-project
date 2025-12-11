import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:8800",
  withCredentials: true,   // مهم جداً عشان Cookies تبان
});

// Add token to every request
newRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default newRequest;
