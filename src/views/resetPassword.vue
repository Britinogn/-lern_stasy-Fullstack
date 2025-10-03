<template>
  <section class="min-h-screen bg-gray-100 flex items-center justify-center relative overflow-hidden">
    <form @submit.prevent="submit" class="bg-white p-6 rounded-lg shadow max-w-md w-full">
      <h1 class="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
        Email has been sent
      </h1>
      <p class="text-sm text-gray-600 mb-4">
        Please check your email inbox for a password recovery link. Don't forget to check your spam folder.
      </p>
      <div v-if="error" class="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
        {{ error }}
      </div>

      
      <!-- Buttons -->
      <div class="flex justify-end gap-3 mt-3">
        Back to
        <router-link
          to="/login"
          class="font-medium  text-blue-600  hover:text-blue-700 transition-all hover:underline  duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Log In
        </router-link>
     
      </div>
    </form>
  </section>
</template>

<script>
import api from '../services/api';

// export default {
//   name: 'ForgotPassword',
//   data() {
//     return {
//       email: '',
//       loading: false,
//       error: '',
//       success: ''
//     };
//   },
//   methods: {
//     async submit() {
//       this.loading = true;
//       this.error = '';
//       this.success = '';
//       try {

//          const response = await api.post('/auth/forgot-password',{
//            email: this.email
//         })

//         this.success = response.data.message || 'Password reset link sent to your email.';
//         // Optionally redirect to login after a delay
//         setTimeout(() => {
//           this.$router.push('/reset-password/:token');
//         }, 2000);


//       } catch (error) {
//         console.error('Forgot password error:', error.response?.data || error);
//         this.error = error.response?.data?.message || 'Failed to process request. Please try again.';
//       } finally {
//         this.loading = false;
//       }
//     }
//   }
// };
</script>