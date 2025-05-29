// src/api.js

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",  // Later we'll change this for deployment
});

export default instance;
