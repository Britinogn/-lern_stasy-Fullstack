<template>
  <section class="min-h-screen bg-gradient-to-br from-slate-300 via-white to-blue-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <!-- Course Lessons Header -->
      <header class="max-w-7xl mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Lessons for {{ courseTitle }}</h1>
            <p v-if="courseDescription" class="text-gray-600 mt-2">{{ courseDescription }}</p>
          </div>
        </div>
        
        <!-- Debug Info (Remove in Production) -->
        <div v-if="$route.query.debug" class="bg-yellow-100 border border-yellow-400 rounded p-4 mb-4 text-sm">
          <p>Current User ID: {{ currentUserId }}</p>
          <p>Total Lessons: {{ lessons.length }}</p>
        </div>
        
        <!-- Loading Indicator -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <span class="ml-3 text-lg text-gray-600">Loading lessons...</span>
        </div>

        <!-- Error Message -->
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-600 text-lg mb-4">{{ error }}</p>
          <button 
            @click="handleErrorAction" 
            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            aria-label="Redirect to login"
          >
            Go to Login
          </button>
        </div>

        <!-- Lessons Grid -->
        <div v-else-if="lessons.length > 0" class="space-y-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <article 
            v-for="(lesson, index) in lessons" 
            :key="lesson._id" 
            class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            role="article"
            :aria-label="`Lesson ${index + 1}: ${lesson.title}`"
          >
            <!-- Main Card Content -->
            <div 
              class="p-6 cursor-pointer group" 
              @click="$router.push({ name: 'LessonDetails', params: { id: lesson._id } })"
              role="button"
              tabindex="0"
              @keydown.enter.prevent="$router.push({ name: 'LessonDetails', params: { id: lesson._id } })"
              @keydown.space.prevent="$router.push({ name: 'LessonDetails', params: { id: lesson._id } })"
            >
              <!-- Image Section -->
              <div class="relative overflow-hidden mb-4">
                <img 
                  v-if="lesson.video?.url"
                  :src="lesson.video.url" 
                  :alt="`Thumbnail for ${lesson.title}`"
                  class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div v-else class="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </div>
              </div>
              
              <!-- Lesson Icon & Meta -->
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-lg text-gray-900 truncate">{{ lesson.title }}</h3>
                  <div class="text-sm text-gray-500">
                    by {{ lesson.instructor?.fullName || 'Anonymous' }} • 
                    {{ formatDate(lesson.createdAt) }}
                  </div>
                  <p v-if="lesson.duration" class="text-sm text-gray-600">{{ lesson.duration }}</p>
                </div>
              </div>

              <!-- Description -->
              <p class="text-gray-600 text-sm line-clamp-3 mb-4">{{ lesson.content || 'No description available.' }}</p>
              
              <!-- Status & Position -->
              <div class="flex items-center justify-between">
                <span v-if="lesson.status" class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                  {{ lesson.status }}
                </span>
                <span class="text-sm text-gray-500">
                  Lesson {{ index + 1 }} of {{ lessons.length }}
                </span>
              </div>
            </div>

            <!-- Action Bar -->
            <div class="flex items-center justify-end p-4 border-t border-gray-200 bg-gray-50">
              <router-link 
                :to="{ name: 'LessonDetails', params: { id: lesson._id } }"
                class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors group"
                :aria-label="`View details for ${lesson.title}`"
              >
                <span>Start Lesson</span>
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </router-link>

              <router-link 
                v-if="isOwner(lesson)"
                :to="{ name: 'LessonEdit', params: { id: lesson._id } }"
                class="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
                :aria-label="`Edit ${lesson.title}`"
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No lessons available</h3>
          <p class="text-gray-500 mb-4">Check back later for updates.</p>
        </div>
      </header>
    </div>
  </section>
</template>

<script>
import api from '../services/api';
import { auth } from '../services/auth';

export default {
  name: 'CourseLessons',
  data() {
    return {
      lessons: [],
      courseTitle: '',
      courseDescription: '',
      loading: false,
      error: null,
    };
  },
  computed: {
    currentUserId() {
      return auth.user?.id || auth.user?._id || 'Not logged in';
    },

    
  },
  methods: {
    isOwner(lesson) {
      //return this.currentUserId === lesson.instructor?._id;
      return lesson.instructor && auth.user && lesson.instructor._id === auth.user._id; 
    },
    async fetchCourseDetails() {
      try {
        const response = await api.get(`/courses/${this.$route.params.id}`);
        this.courseTitle = response.data.title || '';
        this.courseDescription = response.data.description || '';
        this.error = null;
      } catch (err) {
        console.error('Error fetching course details:', err);
        this.error = 'Failed to load course details.';
      }
    },
    async fetchLessons() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get(`/courses/${this.$route.params.id}/lessons`);
        this.lessons = response.data.lessons || [];
      } catch (err) {
        console.error('Error fetching lessons:', err);
        this.error = 'Failed to load lessons. Please log in to access lessons.';
      } finally {
        this.loading = false;
      }
    },
    handleErrorAction() {
      // Redirect to login as per your pasted method (using $router.push)
      this.$router.push({ name: 'Login' });
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return isNaN(date.getTime()) 
        ? 'N/A' 
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },
  },
  async mounted() {
    await this.fetchCourseDetails();
    await this.fetchLessons();
    window.addEventListener('focus', this.fetchLessons);
  },
  beforeUnmount() {
    window.removeEventListener('focus', this.fetchLessons);
  },
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>