<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sticky Header for Mobile -->
    <header class="sticky top-0 bg-white shadow z-10 p-4 flex justify-between items-center sm:hidden">
      <h1 class="text-xl font-bold text-gray-900">Course Enrollment</h1>
      <router-link to="/student/dashboard" class="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Back
      </router-link>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Header -->
      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Course Enrollment</h1>
        <p class="text-gray-600 mt-1 text-sm sm:text-base">View the number of students enrolled in this course</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center h-64">
        <div class="text-center">
          <svg class="w-10 h-10 sm:w-12 sm:h-12 animate-spin text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600 text-sm sm:text-base">Loading enrollment data...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6">
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div>
            <h3 class="text-red-800 font-semibold text-base sm:text-lg">Error loading enrollment</h3>
            <p class="text-red-600 text-sm sm:text-base">{{ error }}</p>
          </div>
        </div>
        <button 
          @click="fetchEnrollmentData" 
          class="mt-4 w-full sm:w-auto px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500"
        >
          Retry
        </button>
      </div>

      <!-- Enrollment Data -->
      <div v-else class="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{{ course.title || 'Course' }}</h2>
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15"/>
          </svg>
          <p class="text-lg sm:text-xl font-semibold text-blue-600">{{ studentsEnrolled }} Students Enrolled</p>
        </div>
        <p class="text-gray-600 text-sm sm:text-base mt-2">Join {{ studentsEnrolled }} other learners in this course!</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../services/api';
import { auth } from '../../services/auth';
import debounce from 'lodash.debounce';

export default {
  name: 'StudentCourseEnrollments',
  
  props: {
    courseId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      course: {},
      studentsEnrolled: 0,
      loading: true,
      error: null
    };
  },

  methods: {
    fetchEnrollmentData: debounce(async function() {
      this.loading = true;
      this.error = null;

      try {
        // Check for offline status
        if (!navigator.onLine) {
          this.error = 'You are offline. Please check your internet connection and try again.';
          this.loading = false;
          return;
        }

        // Check if token exists
        const token = auth.token || localStorage.getItem('token');
        if (!token) {
          this.error = 'Please log in to view enrollment data';
          this.loading = false;
          return;
        }

        // Fetch course data
        const response = await api.get(`/student/course/${this.courseId}`);
        console.log('Course data fetched:', response.data);

        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to load course data');
        }

        this.course = response.data.course || {};
        this.studentsEnrolled = response.data.course?.students?.length || response.data.course?.totalEnrollments || 0;

      } catch (err) {
        console.error('Error fetching enrollment data:', err);
        console.error('Error response:', err.response?.data);
        this.error = err.response?.data?.message || err.message || 'Failed to load enrollment data';
        this.course = {};
        this.studentsEnrolled = 0;
      } finally {
        this.loading = false;
      }
    }, 300)
  },

  mounted() {
    this.fetchEnrollmentData();
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>