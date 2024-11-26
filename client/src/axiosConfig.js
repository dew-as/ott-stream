// src/api/axiosConfig.js
import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://localhost:3001/api', // Set your API URL here
    withCredentials: true, // Allows cookies to be sent with requests
});

export default axiosConfig;