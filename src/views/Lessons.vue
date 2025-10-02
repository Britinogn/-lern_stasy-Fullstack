<template>
  <section class="min-h-screen bg-gradient-to-br from-slate-300 via-white to-blue-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <!-- Course Lessons Header -->
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Lessons for {{ courseTitle }}</h1>
            <p v-if="courseDescription" class="text-gray-600 mt-2">{{ courseDescription }}</p>
          </div>
          <router-link 
            :to="{ name: 'CourseComments', params: { id: $route.params.id } }"
            class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Suggest Lesson Ideas
          </router-link>
        </div>
        
        <!-- Debug Info (Remove in Production) -->
        <div v-if="$route.query.debug" class="bg-yellow-100 border border-yellow-400 rounded p-4 mb-4 text-sm">
          <p>Current User ID: {{ currentUser?.id || 'Not logged in' }}</p>
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
            @click="fetchLessons" 
            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>

        <!-- Lessons List -->
        <div v-else-if="lessons.length > 0" class="space-y-6">
          <article 
            v-for="lesson in lessons" 
            :key="lesson._id" 
            class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            role="article"
            :aria-label="`Lesson: ${lesson.title}`"
          >
            <!-- Main Card Content (Links to Lesson Details if needed) -->
            <div class="p-6 cursor-pointer" @click="$router.push({ name: 'LessonDetails', params: { courseId: $route.params.id, lessonId: lesson._id } })">
              <!-- Lesson Icon -->
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-lg text-gray-900">{{ lesson.title }}</h3>
                  <p class="text-sm text-gray-600">{{ lesson.duration || 'N/A' }} • {{ formatDate(lesson.createdAt) }}</p>
                </div>
              </div>

              <!-- Description -->
              <p class="text-gray-600 text-sm line-clamp-3 mb-4">{{ lesson.description }}</p>
              
              <!-- Progress or Status -->
              <div class="flex items-center justify-between">
                <span v-if="lesson.status" class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                  {{ lesson.status }}
                </span>
                <span class="text-sm text-gray-500">
                  Lesson {{ lessons.indexOf(lesson) + 1 }} of {{ lessons.length }}
                </span>
              </div>
            </div>

            <!-- Action Bar -->
            <div class="flex items-center justify-end p-4 border-t border-gray-200 bg-gray-50">
              <button 
                @click="$router.push({ name: 'LessonDetails', params: { courseId: $route.params.id, lessonId: lesson._id } })"
                class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors group"
                :aria-label="`View ${lesson.title}`"
              >
                <span>Start Lesson</span>
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
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
      </div>
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
    currentUser() {
      return auth.user;
    },
  },

  async mounted() {
    await this.fetchCourseDetails();
    await this.fetchLessons();
  },

  methods: {
    async fetchCourseDetails() {
      try {
        const response = await api.get(`/courses/${this.$route.params.id}`);
        this.courseTitle = response.data.title;
        this.courseDescription = response.data.description;
      } catch (error) {
        console.error('Error fetching course details:', error);
        this.error = 'Failed to load course details.';
      }
    },

    async fetchLessons() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get(`/courses/${this.$route.params.id}/lessons`);
        this.lessons = response.data.lessons || [];
      } catch (error) {
        console.error('Error fetching lessons:', error);
        this.error = 'Failed to load lessons. Please try again.';
      } finally {
        this.loading = false;
      }
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
  },
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>