<template>
  <section class="min-h-screen bg-gradient-to-br from-slate-300 via-white to-blue-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <!-- Courses Page Header -->
      <div class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8 text-gray-900">Browse Courses</h1>
        
        <!-- Debug Info (Remove in Production) -->
        <div v-if="$route.query.debug" class="bg-yellow-100 border border-yellow-400 rounded p-4 mb-4 text-sm">
          <p>Current User ID: {{ currentUser?.id || 'Not logged in' }}</p>
          <p>Total Courses: {{ courses.length }}</p>
          <p>Owner Matches: {{ courses.filter(isOwner).length }}</p>
        </div>
        
        <!-- Filters Section -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <form @submit.prevent="applyFilters" class="flex flex-wrap gap-4 items-end">
            <div class="flex-1 min-w-64">
              <label for="searchQuery" class="sr-only">Search courses</label>
              <input 
                id="searchQuery"
                v-model="searchQuery" 
                placeholder="Search courses by title or description..." 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
            </div>
            
            <div>
              <label for="selectedCategory" class="sr-only">Filter by category</label>
              <select 
                id="selectedCategory"
                v-model="selectedCategory" 
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Categories</option>
                <option 
                  v-for="category in uniqueCategories" 
                  :key="category" 
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </div>
            
            <button 
              type="submit"
              :disabled="loading"
              class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              :aria-label="loading ? 'Searching...' : 'Apply filters'"
            >
              {{ loading ? 'Searching...' : 'Search' }}
            </button>
          </form>
        </div>

        <!-- Loading Indicator -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <span class="ml-3 text-lg text-gray-600">Loading courses...</span>
        </div>

        <!-- Error Message -->
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-600 text-lg mb-4">{{ error }}</p>
          <button 
            @click="fetchCourses" 
            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>

        <!-- Course Grid -->
        <div v-else-if="filteredCourses.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <article 
            v-for="course in filteredCourses" 
            :key="course._id" 
            class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            role="article"
            :aria-label="`Course: ${course.title}`"
          >
            <!-- Main Card Content (Links to Details) -->
            <div class="cursor-pointer" @click="$router.push({ name: 'CourseDetails', params: { id: course._id } })">
              <!-- Image Section -->
              <div class="relative overflow-hidden">
                <img 
                  v-if="course.image?.url"
                  :src="course.image.url" 
                  :alt="course.title"
                  class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div v-else class="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>

              <!-- Content Section -->
              <div class="p-6">
                <!-- Instructor Info -->
                <div class="flex items-center gap-2 mb-3">
                  <div 
                    class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium"
                    :aria-label="`Instructor: ${course.instructor?.fullName || 'Anonymous'}`"
                  >
                    <span>
                      {{ course.instructor?.fullName?.charAt(0)?.toUpperCase() || 'A' }}
                    </span>
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ course.instructor?.fullName || 'Anonymous' }} • 
                    {{ formatDate(course.createdAt) }}
                  </div>
                </div>

                <!-- Title and Category -->
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-semibold text-lg text-gray-900 line-clamp-2">{{ course.title }}</h3>
                  <span 
                    class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded whitespace-nowrap"
                    :aria-label="`Category: ${course.category}`"
                  >
                    {{ course.category }}
                  </span>
                </div>

                <!-- Description -->
                <p class="text-gray-600 text-sm line-clamp-3 mb-3">{{ course.description }}</p>
                
                <!-- Price and Enrollments -->
                <div class="flex justify-between items-center mb-4">
                  <span class="text-indigo-600 font-bold text-xl">${{ formatPrice(course.price) }}</span>
                  <span class="text-sm text-gray-500 flex items-center" aria-label="{`${course.enrollments} enrollments`}">
                    <i class="fas fa-users mr-1" aria-hidden="true"></i>
                    {{ formatNumber(course.enrollments) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Action Bar -->
            <div class="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
              <!-- View More Button -->
              <button 
                @click="$router.push({ name: 'CourseDetails', params: { id: course._id } })"
                class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors group"
                :aria-label="`View details for ${course.title}`"
              >
                <span>View More</span>
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </button>

              <!-- Edit Button (for owners only) -->
              <router-link 
                v-if="isOwner(course)"
                :to="{ name: 'CourseEdit', params: { id: course._id } }"
                class="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
                :aria-label="`Edit ${course.title}`"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                <span>Edit</span>
              </router-link>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div class="text-gray-400 mb-4">
            <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p class="text-gray-500 mb-4">Try adjusting your search or filters.</p>
          <button 
            @click="resetFilters" 
            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '../services/api';
import { auth } from '../services/auth';

export default {
  name: 'CoursesList',
  data() {
    return {
      courses: [],
      loading: false,
      error: null,
      searchQuery: '',
      selectedCategory: '',
      debounceTimer: null,
    };
  },

  computed: {
    currentUser() {
      return auth.user;
    },

    uniqueCategories() {
      const categories = [...new Set(this.courses.map(course => course.category).filter(Boolean))];
      return categories.sort();
    },

    filteredCourses() {
      return this.courses.filter(course => {
        const matchesSearch = !this.searchQuery || 
          course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = !this.selectedCategory || course.category === this.selectedCategory;
        return matchesSearch && matchesCategory;
      });
    },
  },

  watch: {
    searchQuery() {
      this.debounceApplyFilters();
    },
    selectedCategory() {
      this.debounceApplyFilters();
    },
  },

  methods: {
    async fetchCourses() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get('/courses?page=1&limit=20');
        this.courses = response.data.courses || [];
        // Debug: Log first course's instructor for inspection
        if (this.$route.query.debug && this.courses.length > 0) {
          console.log('Sample Course Instructor:', this.courses[0].instructor);
          console.log('Current User:', this.currentUser);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        this.error = 'Failed to load courses. Please try again.';
      } finally {
        this.loading = false;
      }
    },

   isOwner(course) {
     return course.instructor && auth.user && course.instructor._id === auth.userId; // ✅ Correct
    },

    applyFilters() {
      // Filters are reactive; this is a no-op for now
    },

    resetFilters() {
      this.searchQuery = '';
      this.selectedCategory = '';
    },

    debounceApplyFilters() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.applyFilters();
      }, 200);
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    },

    formatPrice(price) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(price);
    },

    formatNumber(num) {
      return new Intl.NumberFormat('en-US').format(num);
    },
  },

  mounted() {
    this.fetchCourses();
  },

  beforeUnmount() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  },
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>