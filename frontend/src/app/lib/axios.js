import axios from "axios"

// "https://muzoro-music-app.onrender.com/api" for production

export const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_DEPLOY_URL || import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  // headers: {
  //   'Content-Type': 'multipart/form-data',
  // },
});
