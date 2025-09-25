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

            <h1 class="text-center text-3xl mb-4 font-bold text-gray-800">Create your Account</h1>
            <p class="text-center text-sm md:text-md mb-6 text-gray-600">
                Join us today and start sharing your stories!
            </p>

            <!-- Full Name Field -->
            <div class="form-card">
                <label for="fullName" class="font-medium text-gray-700">Full Name</label>
                <input 
                    type="text"
                    id="fullName"
                    v-model="fullName"
                    placeholder="Enter your full name"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                    required
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute right-3 top-9 w-5 h-5 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>

            <!-- Username Field -->
            <div class="form-card">
                <label for="userName" class="font-medium text-gray-700">Username</label>
                <input 
                    type="text"
                    id="userName"
                    v-model="userName"
                    placeholder="Choose a username"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                    required
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute right-3 top-9 w-5 h-5 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
            </div>

            <!-- Email Field -->
            <div class="form-card">
                <label for="email" class="font-medium text-gray-700">Email Address</label>
                <input 
                    type="email" 
                    id="email"
                    v-model="email"
                    placeholder="Enter your email"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                    required
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

            <!-- Role Selection Field -->
            <div class="form-card">
                <label for="role" class="font-medium text-gray-700">Role</label>
                <select 
                    id="role"
                    v-model="role"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80 appearance-none"
                    required
                >
                    <option value="" disabled>Select your role</option>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute right-3 top-9 w-5 h-5 text-gray-400 pointer-events-none">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
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
                        Creating Account...
                    </span>
                    <span v-else>Register</span>
                </button>
            </div>

            <!-- Error Message -->
            <p v-if="error" class="text-center font-medium bg-red-100 border border-red-300 text-red-700 rounded-lg p-3 mt-4">
                {{ error }}   
            </p>

            <!-- Login Link -->
            <div class="text-center mt-6 text-gray-600">
                Already have an account? 
                <router-link to="/login" 
                    class="text-blue-600 hover:text-blue-800 underline font-medium transition-colors duration-200"
                > 
                    Login
                </router-link>
            </div>
        </form>

    </section>
</template>

<script>

import api from '../services/api'
import { setToken } from '../services/auth';

export default {
    name: 'RegistrationForm',
    data() {
        return {
            fullName: '',
            userName: '',
            email: '',
            password: '',
            role: '',
            loading: false,
            error: ''
        }
    },
    methods: {
        async submit() {
            this.loading = true;
            this.error = '';
            
            try {
                // Your form submission logic here
                await api.post('/auth/register',
                {
                    fullName: this.fullName,
                    userName: this.userName,
                    email: this.email,
                    password: this.password,
                    role: this.role
                });
                
                //Login right after registeration
                const res = await api.post('/auth/login',
                {
                    email: this.email,
                    password: this.password
                });
                
                // Simulate API call
                // await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Handle success
                setToken(res.data.token)
                this.$router.push({name: 'Courses'})
                
            } catch (error) {
                this.error = error.response?.data?.message || 'Registration failed. Please try again.';
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>
