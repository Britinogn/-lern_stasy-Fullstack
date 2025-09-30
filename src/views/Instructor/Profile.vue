<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h3 class="text-2xl font-semibold text-gray-800 mb-6">{{ user?.role === 'instructor' ? 'Instructor' : 'Student' }} Profile</h3>
    <div v-if="user" class="bg-white shadow-md rounded-lg p-6">
      <div class="flex items-center mb-4">
        <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg font-medium mr-4">
          {{ user.profile?.charAt(0) || 'G' }}
        </div>
        <div>
          <h4 class="text-lg font-medium">{{ user.fullName }}</h4>
          <p class="text-sm text-gray-500">ID: {{ user._id }}</p>
          <p class="text-sm text-gray-500">Role: {{ user.role }}</p>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">Loading profile...</div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
};
</script>