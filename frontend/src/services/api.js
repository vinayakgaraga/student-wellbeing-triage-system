import axios from "axios";

const api = axios.create({
    baseURL: "https://student-wellbeing-triage-system-1.onrender.com",
});

export default api;