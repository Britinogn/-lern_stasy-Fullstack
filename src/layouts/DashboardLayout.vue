<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar (always visible) -->
    <Sidebar />

    <!-- Main area -->
    <div class="flex-1 flex flex-col">
      <!-- Top navigation bar -->
      <Navbar />

      <!-- Page content -->
      <main class="p-6">
        <router-view /> 
        <!-- Whatever route is active will render here -->
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
</script>
