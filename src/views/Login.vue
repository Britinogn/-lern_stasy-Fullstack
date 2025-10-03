<template>
    <section 
        class="min-h-screen flex items-center justify-center relative overflow-hidden"
        style="background-image: url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        >
         <!--    style="background-image: url('../public/images/hero.jpg')" -->
        <!-- Blurred background overlay -->
        <div class="absolute inset-0 bg-black/25 backdrop-blur-xs"></div>
        
        <form @submit.prevent="submit" 
            class="relative z-10 bg-white/90 backdrop-blur-md mx-auto p-8 rounded-xl shadow-3xl w-full max-w-sm md:max-w-md border border-white/20"
            >

            <h1 class="text-center text-3xl mb-4 font-bold text-gray-800">Log In</h1>
            <p class="text-center text-sm md:text-md mb-6 text-gray-600">
                Connect with your experts and learn from them!
            </p>  

            <!-- Email Field -->
            <div class="form-card">
                <label for="email" class="font-medium text-gray-700">Email or Username</label>
                <input 
                    type="text" 
                    id="email"
                    v-model="email"
                    placeholder="Enter your email or username"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                    
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute right-3 top-9 w-5 h-5 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
            </div>

            <!-- Password Field -->
            <div class="form-card">
                <label for="password" class="font-medium text-gray-700">Password</label>
                <input 
                    type="password"
                    id="password"
                    v-model="password"
                    placeholder="Enter your password"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                    required
                >
                <svg xmlns="http://www.w3.org/2000/svg" 
                    height="20px" viewBox="0 -960 960 960" width="20px" fill="#9CA3AF" class="absolute right-3 top-9">
                    <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/>
                </svg>
            </div>

            <!-- Submit Button -->
            <div class="mt-6">
                <button 
                    :disabled="loading" 
                    type="submit" 
                    class="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    <span v-if="loading" class="flex items-center justify-center">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                       Logging...
                    </span>
                    <span v-else>Log In</span>
                </button>
            </div>


            <div class="text-center mt-6 text-gray-600">
                <router-link to="/forgot-password" 
                    class="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-200"
                > 
                    Forgotten password?
                </router-link>
            </div>

            <!-- Error Message -->
            <p v-if="error" class="text-center font-medium bg-red-100 border border-red-300 text-red-700 rounded-lg p-3 mt-4">
                {{ error }}   
            </p>

            <!-- Login Link -->
            <div class="text-center mt-6 text-gray-600">
                Don't have an account?
                <router-link to="/register" 
                    class="text-blue-600 hover:text-blue-800 underline font-medium transition-colors duration-200"
                > 
                    Register
                </router-link>
            </div>
        </form>

    </section>
</template>

<script>

import api from '../services/api'
import { setToken , setUser } from '../services/auth';

export default {
    name: 'LoginForm',
    data() {
        return {
            email: '',
            password: '',
            loading: false,
            error: ''
        }
    },
    methods: {
       async submit() {
            if (!this.email || !this.password) {
                this.error = 'Please fill in all fields';
                this.loading = false;
                return;
            }
            this.loading = true;
            this.error = '';
        
            try {
                   // Determine if input is email or username
                const isEmail = this.email.includes('@');

                const payload = {
                    [isEmail ? 'email' : 'userName']: this.email,
                    password: this.password
                };

                const res = await api.post('/auth/login', payload);

                
                const token = res.data.token;
                setToken(token);
                setUser({
                    id: res.data.id,
                    fullName: res.data.fullName || this.fullName,
                    userName: res.data.userName || this.userName,
                    email: res.data.email || this.email,
                    role: res.data.role || this.role
                });
                
                // Redirect based on role
                // const userRole = res.data.role || 'student'; // Fallback to student
                // if (userRole === 'student') {
                //     this.$router.push({ name: '' });
                // } else if (userRole === 'instructor') {
                //     this.$router.push({ name: '' });
                // } else {
                    
                // }
                this.$router.push({ name: 'Courses' });
            } catch (error) {
                this.error = error.response?.data?.message || 'Login failed. Please try again.';
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>

<!-- <script>
import api from '../services/api';
import { setToken, setUser } from '../services/auth'; // ✅ Import setUser

export default {
    name: 'RegistrationForm',
    data() {
        return {
            email: '',
            password: '',
            loading: false,
            error: ''
        }
    },
    methods: {
        async submit() {
            if (!this.email || !this.password) {
                this.error = 'Please fill in all fields';
                this.loading = false;
                return;
            }
            this.loading = true;
            this.error = '';
            
            try {
                await api.post('/auth/register', {
                    fullName: this.fullName,
                    userName: this.userName,
                    email: this.email,
                    password: this.password,
                    role: this.role
                });
                
                const res = await api.post('/auth/login', {
                    email: this.email,
                    password: this.password
                });
                
                // ✅ Save BOTH token AND user data
                setToken(res.data.token);
                setUser({
                    id: res.data.id,
                    fullName: res.data.fullName || this.fullName,
                    userName: res.data.userName || this.userName,
                    email: res.data.email || this.email,
                    role: res.data.role || this.role
                });
                
                // Redirect based on role
                if (this.role === 'student') {
                    this.$router.push({ name: 'StudentDashboard' });
                } else if (this.role === 'instructor') {
                    this.$router.push({ name: 'InstructorDashboard' });
                } else {
                    this.$router.push({ name: 'Courses' });
                }
            } catch (error) {
                this.error = error.response?.data?.message || 'Registration failed. Please try again.';
            } finally {
                this.loading = false;
            }
        }
    }
}
</script> -->