import axios from 'axios';
import {auth} from './auth';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000
});

//attach token to every request if available

api.interceptors.request.use((config) => {
    const token = auth.token || localStorage.getItem('token');
    if (token) config.headers.Authorization =  `Bearer ${token}`;
    return config;
}, (error) => Promise.reject(error));


export default api;
