import axios from 'axios';
import {auth} from './auth';
import router from '../routes';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000

    // baseURL: 'https://lern-stasy-server.onrender.com/api',
    // timeout: 10000
});

//attach token to every request if available

api.interceptors.request.use((config) => {
    const token = auth.token || localStorage.getItem('token');
   if (token) config.headers["Authorization"] = `Bearer ${token}`;

    return config;
}, (error) => Promise.reject(error));

// Add a response interceptor
// api.interceptors.response.use(
//     (response) => response, // For successful responses, just return the response
//     async (error) => {
//         // Handle errors
//         const { response } = error;
//         if (response?.status === 401) {
//             // Token has expired or is invalid, log out the user
//             localStorage.removeItem('token'); // Or the correct key for your token
            
//             // Redirect to the login page
//             router.push('/');
            
//             // Optional: Provide a user-friendly message
//             console.error('Session expired. Redirecting to home.');
//         }
        
//         return Promise.reject(error);
//     }
// );

export default api;
