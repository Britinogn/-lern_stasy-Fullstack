<template>
  <section class="min-h-screen bg-gray-100 flex items-center justify-center relative overflow-hidden">
    <form @submit.prevent="submit" class="bg-white p-6 rounded-lg shadow max-w-md w-full">
      <h1 class="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
        Find Your Account
      </h1>
      <p class="text-sm text-gray-600 mb-4">
        No worries, we will send reset instructions to your email address.
      </p>
      <div v-if="error" class="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
        {{ error }}
      </div>

      <!-- Email Field -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter email address"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
          required
        >
      </div>

      <!-- Buttons -->
      <div class="flex justify-end gap-3">
        <router-link
          to="/login"
          class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Cancel
        </router-link>
        <button
          :disabled="loading"
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg
              class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Searching...
          </span>
          <span v-else>Search</span>
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import api from '../services/api';

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      loading: false,
      error: '',
      success: ''
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      this.error = '';
      this.success = '';
      try {

         const response = await api.post('/auth/forgot-password',{
           email: this.email
        })

        this.success = response.data.message || 'Password reset link sent to your email.';
        // Optionally redirect to login after a delay
        // setTimeout(() => {
        //   this.$router.push('/reset-password/:token');
        // }, 2000);


      } catch (error) {
        console.error('Forgot password error:', error.response?.data || error);
        this.error = error.response?.data?.message || 'Failed to process request. Please try again.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>