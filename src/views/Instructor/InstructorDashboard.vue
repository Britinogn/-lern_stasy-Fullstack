<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sticky Header for Mobile -->
    <header class="sticky top-0 bg-white shadow z-10 p-4 flex justify-between items-center sm:hidden">
      <h1 class="text-xl font-bold text-gray-900">Instructor Dashboard</h1>
      <router-link to="/instructor/course-create" class="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Create
      </router-link>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
          <p class="text-gray-600 mt-1 text-sm sm:text-base">Manage your courses and track analytics</p>
        </div>
        <router-link 
          to="/instructor/course-create"
          class="hidden sm:inline-flex items-center gap-2 mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold shadow-md focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Create New Course
        </router-link>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center h-64">
        <div class="text-center">
          <svg class="w-10 h-10 sm:w-12 sm:h-12 animate-spin text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600 text-sm sm:text-base">Loading dashboard data...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6">
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div>
            <h3 class="text-red-800 font-semibold text-base sm:text-lg">Error loading dashboard</h3>
            <p class="text-red-600 text-sm sm:text-base">{{ error }}</p>
          </div>
        </div>
        <button 
          @click="loadDashboard" 
          class="mt-4 w-full sm:w-auto px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500"
        >
          Retry
        </button>
      </div>

      <!-- Dashboard Content -->
      <div v-else>
        <!-- Stats Overview -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div class="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900">Total Courses</h3>
            <p class="text-2xl sm:text-3xl font-bold text-blue-600">{{ dashboardStats.totalCourses }}</p>
          </div>
          <div class="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900">Total Students</h3>
            <p class="text-2xl sm:text-3xl font-bold text-blue-600">{{ dashboardStats.totalStudents }}</p>
          </div>
          <div class="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900">Total Lessons</h3>
            <p class="text-2xl sm:text-3xl font-bold text-blue-600">{{ dashboardStats.totalLessons }}</p>
          </div>
        </div>

        <!-- Courses Grid -->
        <div v-if="courses.length === 0" class="text-center py-8 sm:py-12">
          <svg class="w-20 h-20 sm:w-24 sm:h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No courses yet</h3>
          <p class="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Start creating your first course to share your knowledge</p>
          <router-link 
            to="/instructor/course-create"
            class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold focus:ring-2 focus:ring-blue-500"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Create Your First Course
          </router-link>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div 
            v-for="course in courses" 
            :key="course._id"
            class="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-shadow"
          >
            <div class="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
              <img 
                v-if="course.image?.url" 
                :src="course.image.url" 
                :srcset="`${course.image.url}?w=300 300w, ${course.image.url}?w=600 600w`"
                sizes="(max-width: 640px) 100vw, 33vw"
                :alt="course.title"
                loading="lazy"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <svg class="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <div class="absolute top-3 right-3">
                <span 
                  :class="course.isPublished ? 'bg-green-500' : 'bg-yellow-500'"
                  class="px-3 py-1 text-white text-xs font-semibold rounded-full"
                >
                  {{ course.isPublished ? 'Published' : 'Draft' }}
                </span>
              </div>
            </div>
            <div class="p-4 sm:p-6">
              <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">{{ course.title }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ course.description }}</p>
              <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                  {{ course.category }}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                  {{ course.lessons?.length || 0 }} Lessons
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15"/>
                  </svg>
                  {{ course.students?.length || 0 }} Students
                </span>
              </div>
              <div class="space-y-2">
                <div class="flex flex-col sm:flex-row gap-2">
                  <router-link 
                    :to="`/instructor/course-editor/${course._id}`"
                    class="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white px-5 py-3 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Edit
                  </router-link>
                  <router-link 
                    :to="`/instructor/lesson-create?courseId=${course._id}`"
                    class="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white px-5 py-3 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-green-500 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    Add Lesson
                  </router-link>
                </div>
                <div class="flex flex-col sm:flex-row gap-2">
                  <router-link 
                    :to="`/courses/${course._id}`"
                    class="w-full sm:flex-1 inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 focus:bg-gray-50 text-gray-700 px-5 py-3 rounded-lg text-sm font-medium focus:ring-2 focus:ring-gray-500 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 0118 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    View
                  </router-link>
                  <button 
                    @click="confirmDelete(course)"
                    aria-label="Delete course"
                    class="w-full sm:flex-1 inline-flex items-center justify-center gap-2 border border-red-300 hover:bg-red-50 focus:bg-red-50 text-red-600 px-5 py-3 rounded-lg text-sm font-medium focus:ring-2 focus:ring-red-500 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Analytics Table (Mobile Card View) -->
        <div class="block md:hidden space-y-4 mb-6">
          <div v-for="item in analytics" :key="item.courseId" class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-medium text-gray-900 text-base sm:text-lg">{{ item.title }}</h3>
            <p class="text-sm text-gray-500">Lessons: {{ item.totalLessons }}</p>
            <p class="text-sm text-gray-500">Enrollments: {{ item.totalEnrollments }}</p>
          </div>
        </div>
        <div class="hidden md:block bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Course Analytics</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lessons</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollments</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in analytics" :key="item.courseId">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.title }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.totalLessons }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.totalEnrollments }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div 
          v-if="showDeleteModal" 
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          role="dialog" 
          aria-modal="true" 
          ref="deleteModal"
          @click.self="showDeleteModal = false"
        >
          <div class="bg-white rounded-xl shadow-2xl w-full max-w-md sm:max-w-lg p-4 sm:p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-900 mb-2">Delete Course</h3>
                <p class="text-gray-600 mb-1 text-sm sm:text-base">
                  Are you sure you want to delete <strong>"{{ courseToDelete?.title }}"</strong>?
                </p>
                <p class="text-sm text-red-600">
                  This action cannot be undone. All lessons will also be deleted.
                </p>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                @click="showDeleteModal = false"
                class="w-full sm:flex-1 px-5 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-gray-500 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                @click="deleteCourse"
                :disabled="deleting"
                class="w-full sm:flex-1 px-5 py-3 bg-red-600 hover:bg-red-700 focus:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-semibold focus:ring-2 focus:ring-red-500 transition-colors disabled:cursor-not-allowed"
              >
                {{ deleting ? 'Deleting...' : 'Delete' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div 
          v-if="successMessage"
          class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-green-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg z-50 animate-fade-in"
          style="bottom: calc(1rem + env(safe-area-inset-bottom)); right: calc(1rem + env(safe-area-inset-right));"
        >
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="font-medium text-sm sm:text-base">{{ successMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../services/api';
import { auth } from '../../services/auth';
import debounce from 'lodash.debounce';

export default {
  name: 'InstructorDashboard',
  
  data() {
    return {
      user: null,
      dashboardStats: {
        totalCourses: 0,
        totalStudents: 0,
        totalLessons: 0
      },
      courses: [],
      analytics: [],
      loading: true,
      error: null,
      showDeleteModal: false,
      courseToDelete: null,
      deleting: false,
      successMessage: ''
    };
  },

  methods: {
    loadDashboard: debounce(async function() {
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
          console.warn('No token found in auth object or localStorage');
          this.error = 'Please log in to view your dashboard';
          this.loading = false;
          return;
        }

        // Check cache
        const cachedData = localStorage.getItem('dashboardData');
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < 5 * 60 * 1000) { // Cache for 5 minutes
            this.setDashboardData(data);
            this.loading = false;
            return;
          }
        }

        // Fetch dashboard data
        const response = await api.get('instructor/dashboard');
        console.log('Dashboard data fetched:', response.data);

        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to load dashboard data');
        }

        // Set data and cache
        this.setDashboardData(response.data);
        localStorage.setItem('dashboardData', JSON.stringify({
          data: response.data,
          timestamp: Date.now(),
        }));

      } catch (err) {
        console.error('Error loading dashboard:', err);
        console.error('Error response:', err.response?.data);
        this.error = err.response?.data?.message || err.message || 'Failed to load dashboard';
        this.courses = [];
        this.analytics = [];
      } finally {
        this.loading = false;
      }
    }, 300),

    setDashboardData(data) {
      this.user = data.user;
      this.dashboardStats = data.dashboardStats;
      this.courses = data.courses;
      this.analytics = data.analytics;
    },

    confirmDelete(course) {
      this.courseToDelete = course;
      this.showDeleteModal = true;
      this.$nextTick(() => {
        const modal = this.$refs.deleteModal;
        if (modal) modal.focus();
      });
    },

    async deleteCourse() {
      if (!this.courseToDelete) return;

      this.deleting = true;

      try {
        await api.delete(`/courses/${this.courseToDelete._id}`);
        this.courses = this.courses.filter(c => c._id !== this.courseToDelete._id);
        this.analytics = this.analytics.filter(a => a.courseId !== this.courseToDelete._id);
        
        this.showDeleteModal = false;
        this.courseToDelete = null;
        
        this.successMessage = 'Course deleted successfully';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);

        // Refresh dashboard stats
        await this.loadDashboard();

      } catch (err) {
        console.error('Error deleting course:', err);
        console.error('Delete course error response:', err.response?.data);
        this.error = err.response?.data?.message || 'Failed to delete course';
        this.showDeleteModal = false;
      } finally {
        this.deleting = false;
      }
    }
  },

  mounted() {
    this.loadDashboard();
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