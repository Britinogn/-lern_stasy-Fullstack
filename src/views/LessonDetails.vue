<template>
  <section class="min-h-screen bg-gradient-to-br from-slate-300 via-white to-blue-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <!-- Course Comments Header -->
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Lesson Ideas for {{ courseTitle }}</h1>
            <p v-if="courseDescription" class="text-gray-600 mt-2">{{ courseDescription }}</p>
          </div>
          <router-link 
            :to="{ name: 'CourseLessons', params: { id: $route.params.id } }"
            class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Lessons
          </router-link>
        </div>
        
        <!-- Debug Info (Remove in Production) -->
        <div v-if="$route.query.debug" class="bg-yellow-100 border border-yellow-400 rounded p-4 mb-4 text-sm">
          <p>Current User ID: {{ currentUser?.id || 'Not logged in' }}</p>
          <p>Total Ideas: {{ comments.length }}</p>
          <p>Enrolled: {{ isEnrolled ? 'Yes' : 'No' }}</p>
        </div>

        <!-- Enrollment Check -->
        <div v-if="!isEnrolled" class="bg-amber-100 border border-amber-400 rounded-lg p-4 mb-8 text-center">
          <p class="text-amber-800 mb-4">You need to enroll in the course to suggest lesson ideas.</p>
          <button 
            @click="enrollCourse"
            class="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
          >
            Enroll Now
          </button>
        </div>

        <!-- Add Comment Form (if enrolled) -->
        <div v-else-if="isEnrolled" class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-xl font-semibold mb-4">Suggest a New Lesson Idea</h2>
          <form @submit.prevent="addComment" class="space-y-4">
            <div>
              <label for="commentText" class="block text-sm font-medium text-gray-700 mb-2">Your Idea</label>
              <textarea 
                id="commentText"
                v-model="newComment"
                placeholder="Share your lesson idea for this course..."
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                :disabled="submitting"
              ></textarea>
            </div>
            <button 
              type="submit"
              :disabled="submitting || !newComment.trim()"
              class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ submitting ? 'Submitting...' : 'Submit Idea' }}
            </button>
          </form>
        </div>

        <!-- Loading Indicator -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <span class="ml-3 text-lg text-gray-600">Loading ideas...</span>
        </div>

        <!-- Error Message -->
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-600 text-lg mb-4">{{ error }}</p>
          <button 
            @click="fetchComments" 
            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>

        <!-- Comments List -->
        <div v-else-if="comments.length > 0" class="space-y-6">
          <div 
            v-for="comment in comments" 
            :key="comment._id" 
            class="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div class="flex items-start gap-4 mb-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-medium">
                <span>{{ comment.author?.fullName?.charAt(0)?.toUpperCase() || 'A' }}</span>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h4 class="font-semibold text-gray-900">{{ comment.author?.fullName || 'Anonymous' }}</h4>
                  <span class="text-sm text-gray-500">{{ formatDate(comment.createdAt) }}</span>
                </div>
                <p class="text-gray-700">{{ comment.text }}</p>
              </div>
            </div>
            <div v-if="comment.likes" class="flex items-center text-sm text-gray-500">
              <span>{{ formatNumber(comment.likes) }} likes</span>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div class="text-gray-400 mb-4">
            <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No lesson ideas yet</h3>
          <p class="text-gray-500 mb-4" v-if="isEnrolled">Be the first to suggest one!</p>
          <p class="text-gray-500 mb-4" v-else>Enroll to start suggesting ideas.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '../services/api';
import { auth } from '../services/auth';

export default {
  name: 'CourseComments',
  data() {
    return {
      comments: [],
      courseTitle: '',
      courseDescription: '',
      newComment: '',
      loading: false,
      submitting: false,
      error: null,
    };
  },

  computed: {
    currentUser() {
      return auth.user;
    },

    isEnrolled() {
      // Assume enrollment check via API or local state; simplify here
      return this.currentUser && this.currentUser.enrollments?.includes(this.$route.params.id);
    },
  },

  async mounted() {
    await this.fetchCourseDetails();
    if (this.isEnrolled) {
      await this.fetchComments();
    }
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

    async fetchComments() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get(`/courses/${this.$route.params.id}/comments`);
        this.comments = response.data.comments || [];
      } catch (error) {
        console.error('Error fetching comments:', error);
        this.error = 'Failed to load lesson ideas. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    async enrollCourse() {
      try {
        await api.post(`/courses/${this.$route.params.id}/enroll`);
        // Refresh user state or emit event
        this.$emit('enrolled'); // Or use store
        await this.fetchComments();
      } catch (error) {
        console.error('Error enrolling:', error);
        this.error = 'Failed to enroll. Please try again.';
      }
    },

    async addComment() {
      if (!this.newComment.trim()) return;
      this.submitting = true;
      try {
        const response = await api.post(`/courses/${this.$route.params.id}/comments`, {
          text: this.newComment,
        });
        this.comments.unshift(response.data.comment);
        this.newComment = '';
      } catch (error) {
        console.error('Error adding comment:', error);
        this.error = 'Failed to submit idea. Please try again.';
      } finally {
        this.submitting = false;
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

    formatNumber(num) {
      return new Intl.NumberFormat('en-US').format(num);
    },
  },
};
</script>