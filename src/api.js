import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // must match .env
  withCredentials: true // important if sending cookies/JWT
});

export default API;
