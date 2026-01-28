import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:8800",
  withCredentials: true,   // مهم جداً عشان Cookies تبان
});

// Add token to every request
newRequest.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("authToken");

    // Fallback: Try decoding currentUser if authToken is missing
    if (!token) {
      try {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (user?.token) token = user.token;
      } catch (e) {
        // ignore
      }
    }

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
