<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
      <h1 class="text-2xl font-bold mb-4 text-gray-900">Course Enrollment</h1>
      <div v-if="loading" class="flex items-center justify-center h-32">
        <svg class="w-8 h-8 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <div v-else>
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">
          {{ error }}
        </div>
        <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4">
          {{ success }}
        </div>
        <form v-if="!success" @submit.prevent="enroll">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Course ID</label>
            <input
              v-model="courseId"
              type="text"
              class="w-full border rounded-lg px-3 py-2"
              placeholder="Enter Course ID"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
            :disabled="loading"
          >
            {{ loading ? 'Enrolling...' : 'Enroll' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'Enrollment',
  data() {
    return {
      courseId: '',
      loading: false,
      error: null,
      success: null,
    };
  },
  methods: {
    async enroll() {
      this.loading = true;
      this.error = null;
      this.success = null;
      try {
        const res = await api.post('/student/enroll', { courseId: this.courseId });
        if (res.data?.success) {
          this.success = 'You have been successfully enrolled!';
          this.courseId = '';
        } else {
          this.error = res.data?.message || 'Enrollment failed.';
        }
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Enrollment failed.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>