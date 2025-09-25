<template>
  <section class="min-h-screen bg-gradient-to-br from-slate-300 via-white to-blue-400">
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5 py-5">
        <!-- Courses Page v-if="currentView === 'courses'"   -->
        <div class="max-w-7xl mx-auto px-4 py-8">

            <h2 class="text-3xl font-bold mb-8">Browse Courses</h2>
            
            <!-- Filters -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <div class="flex flex-wrap gap-4 items-center">
                    <input v-model="searchQuery" 
                            placeholder="Search courses..." 
                            class="flex-1 min-w-64 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    
                    <select v-model="selectedCategory" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
                        <option value="">All Categories</option>
                        <option 
                            v-for="course in courses" :key="category" :value="category">{{course.category}}
                        </option>
                    </select>
                    
                    <button @click="filterCourses" 
                            class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
                        Search
                    </button>
                </div>
            </div>

            <!-- Course Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <article 
                    v-for="course in courses" 
                    :key="course.id" 
                    class="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    >
                    
                    <router-link :to="{name:'CourseDetails', params:{id: course._id }}" >

                        <!-- Image Section -->
                        <div class="relative overflow-hidden">
                            <img 
                            v-if="course.image?.url"
                            :src="course.image.url" 
                            :alt="course.title" 
                            class="w-full h-48 object-covergroup-hover:scale-105 transition-transform duration-500"
                            />

                            <div v-else
                                class="w-full h-56 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"
                                >
                                <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                            </div>

                        </div>

                        <!-- Content Section -->
                        <div class="p-6">

                            <div class="flex items-center gap-2 mb-3">
                                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <span>
                                        {{ course.instructor?.fullName.charAt(0)?.toUpperCase() || 'A' }}
                                    </span>
                                </div>
                                <div class="text-sm text-gray-500 mt-2">
                                    {{ course.instructor?.fullName || 'Anonymous' }} • 
                                    {{ formatDate(course.createdAt) }}
                                </div>
                            </div>

                            <div class="flex justify-between items-start mb-2">
                                <h3 class="font-semibold text-lg">{{ course.title }}</h3>
                                <span class="text-xs bg-gray-100 px-2 py-1 rounded">{{ course.category }}</span>
                            </div>

                            <p class="text-gray-600 text-sm mb-3">{{ course.description }}</p>
                            
                            <div class="flex justify-between items-center">
                                <span class="text-indigo-600 font-bold text-xl">${{ course.price }}</span>
                                <span class="text-sm text-gray-500">
                                    <i class="fas fa-users mr-1"></i>{{ course.enrollments }} 
                                </span>
                            </div>
                        
                            <!-- Action Buttons -->

                            <div class="flex items-center justify-between pt-4 border-t border-slate-100">
                                <router-link 
                                    :to="{name: 'CourseDetails',params:{id: course._id} }"
                                    class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm group/link"                             
                                    >

                                    <span>View More</span>
                                    <svg class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                    </svg>
                                </router-link>

                                <div>
                                    <router-link 
                                        v-if="isOwner(course)"
                                        :to="{name:'CourseEdit', params:{id: course._id}}"
                                        class="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                                    >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                    <span>
                                        Edit
                                    </span>
                                </router-link>
                                </div>
                            </div>
                        
                        
                        </div>

                        <!-- end here -->

                    </router-link>

                </article>
            </div>

        </div>

    </div>

  </section>
</template>

<script>
import api from '../services/api';
import { auth } from '../services/auth';

    export default{
        data(){
            return{
                courses: [],
                loading: false
            }
        },

        computed:{
            currentUser(){
                return auth.user
            }
        },

        methods:{
            async fetchCourses(){
                this.loading = true;

                try {
                    const res = await api.get('/courses?page=1&limit=20')
                    this.courses = res.data.courses;

                } catch (error) {
                    console.err('Error fetching posts', err);

                } finally{
                    this.loading = false;
                }
            },

            isOwner(course){
                return course.instructor && auth.user && course.instructor._id === user.id
            },

            formatDate(dateString){
                if (!dateString) return '' ;

                const date = new Date(dateString);
                return date.toLocaleDateString('en-US',{
                    month: 'short',
                    day: 'numeric',
                    year:'numeric'
                });
             }
        },

        mounted(){
            this.fetchCourses();
        }
    
    }

</script>
