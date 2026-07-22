import axios from "axios"

// baseURL: import.meta.env.VITE_API_BASE_URL,

export const AxiosInstance = axios.create({
    baseURL : "http://localhost:3000/api",
    withCredentials :true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
});
