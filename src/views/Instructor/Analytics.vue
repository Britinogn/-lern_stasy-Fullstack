<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-gray-100">
    <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">
      Course Analytics
    </h2>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
      <p class="text-gray-500 mt-4">Loading analytics data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12 text-red-600">
      <svg class="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <h3 class="text-lg font-semibold mb-2">Failed to load analytics</h3>
      <p class="text-gray-500">Please try refreshing the page.</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!analytics.length" class="text-center py-12">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-3-3v6m-9 3h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">No analytics data yet</h3>
      <p class="text-gray-500">Create or publish courses to start seeing analytics.</p>
    </div>

    <!-- Analytics Display -->
    <div v-else>
      <!-- Desktop Table View -->
      <div class="hidden md:block overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Course Title
              </th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Lessons
              </th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Enrollments
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="item in analytics"
              :key="item.courseId"
              class="hover:bg-blue-50 transition-colors duration-200"
            >
              <td class="px-6 py-5 whitespace-nowrap text-base font-medium text-gray-900">{{ item.title }}</td>
              <td class="px-6 py-5 whitespace-nowrap text-base text-gray-600">{{ item.totalLessons }}</td>
              <td class="px-6 py-5 whitespace-nowrap text-base text-gray-600">
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  {{ item.totalEnrollments }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Card View -->
      <div class="md:hidden space-y-4">
        <div
          v-for="item in analytics"
          :key="item.courseId"
          class="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div class="flex justify-between items-center mb-2">
            <h4 class="text-lg font-semibold text-gray-900">{{ item.title }}</h4>
          </div>
          <div class="space-y-1 text-sm text-gray-600">
            <div class="flex justify-between">
              <span class="font-medium text-gray-500">Lessons:</span>
              <span>{{ item.totalLessons }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-500">Enrollments:</span>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                {{ item.totalEnrollments }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../services/api'; // Assuming you have an API service configured

const analytics = ref([]);
const loading = ref(true);
const error = ref(null);

const loadAnalytics = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await api.get('instructor/dashboard');
    if (response.data.success) {
      analytics.value = response.data.analytics;
    }
  } catch (err) {
    console.error('Failed to fetch analytics:', err);
    error.value = err;
  } finally {
    loading.value = false;
  }
};

onMounted(loadAnalytics);
</script>

<style scoped>
/* Optional: Add subtle animation for fade-in effect on initial load */
.fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
