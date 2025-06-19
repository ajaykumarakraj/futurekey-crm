// src/api.js
import axios from 'axios';

const api = axios.create({

    baseURL: 'https://api.almonkdigital.in/api/admin',
    // You can add other default config here if needed, like headers
});

export default api;