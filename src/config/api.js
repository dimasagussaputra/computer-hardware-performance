// src/config/api.js
import axios from 'axios';

const BASE_URL = 'https://computer-parts-api.vercel.app/';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

apiClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const errorMessage = 
            error.response?.data?.error || 
            error.message || 
            'An error occurred';
        
        console.error('API Error:', errorMessage);
        return Promise.reject(error.response?.data || error);
    }
);

export { apiClient, BASE_URL };