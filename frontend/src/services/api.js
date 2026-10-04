import axios from "axios";

const api = axios.create({
    baseURL: "https://student-wellbeing-triage-system.onrender.com",
});

export default api;
