import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = (credentials) =>
  api.post("/user/login", credentials).then((res) => res.data);
export const registerUser = (userData) =>
  api.post("/user/register", userData).then((res) => res.data);
export const getUsers = () => api.get("/user/").then((res) => res.data);
export const createChat = (userId) =>
  api.post("/chat", { userId }).then((res) => res.data);
export const getChats = () => api.get("/chat").then((res) => res.data);
export const getMessages = (chatId) =>
  api.get(`/message/${chatId}`).then((res) => res.data);

export const sendMessage = (chatId, content) =>
  api.post("/message", { chatId, content }).then((res) => res.data);

export default api;
