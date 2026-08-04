import axios from "axios"

// "https://muzoro-music-app.onrender.com/api" for production

export const AxiosInstance = axios.create({
  baseURL:'https://muzoro-music-app.onrender.com/api',
  withCredentials: true,
  // headers: {
  //   'Content-Type': 'multipart/form-data',
  // },
});
