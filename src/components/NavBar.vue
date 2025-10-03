<template>
  <header
    :class="[
      'fixed w-full top-0 z-50 transition-all duration-300',
      scrolled ? 'dark:bg-gray-900 shadow border-b' : 'bg-transparent'
    ]"
    v-if="!$route.meta.hideNavbar"
  >
    <nav class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      
      <!-- Logo / Site name -->
      <div class="flex items-center space-x-2">
        <img src="/images/fav.ico" alt="Lern Stasy Logo" class="h-8 w-8">
        <router-link to="/" class="text-xl font-bold text-white/90">
          Lern Stasy
        </router-link>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-8">
        <router-link 
          to="/" 
          class="text-white hover:text-indigo-600" 
          active-class="text-indigo-600 font-semibold">
          Home
        </router-link>
        <router-link 
          to="/courses" 
          class="text-white hover:text-indigo-600" 
          active-class="text-indigo-600 font-semibold">
          Courses
        </router-link>
      </div>

      <!-- Profile / Auth -->
      <div class="hidden md:flex items-center space-x-4">
        <router-link 
          v-if="!isLoggedIn" 
          to="/login" 
          class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
          Login
        </router-link>
        <router-link 
          v-if="!isLoggedIn" 
          to="/register" 
          class="px-4 py-2 text-sm font-medium border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
          Register
        </router-link>

        <!-- Profile dropdown -->
        <div v-if="isLoggedIn" class="relative" @click="toggleProfile">
          <img 
            src="" 
            alt="Profile" 
            class="h-10 w-10 rounded-full cursor-pointer border"
          >
          <div 
            v-if="showProfile" 
            class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
            <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</router-link>
            <router-link to="/my-courses" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Courses</router-link>
            <button 
              @click="logout" 
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden text-gray-600 focus:outline-none">
        <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" 
             class="h-7 w-7" fill="none" viewBox="0 0 24 24" 
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" 
                stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" 
             class="h-7 w-7" fill="none" viewBox="0 0 24 24" 
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" 
                stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden bg-white border-t shadow-sm">
      <div class="px-6 py-4 space-y-4">
        <router-link 
          to="/" 
          class="block text-gray-700 hover:text-indigo-600" 
          @click="closeMenu">
          Home
        </router-link>
        <router-link 
          to="/courses" 
          class="block text-gray-700 hover:text-indigo-600" 
          @click="closeMenu">
          Courses
        </router-link>
        
        <div v-if="!isLoggedIn" class="space-y-2">
          <router-link 
            to="/login" 
            class="block px-4 py-2 text-center text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            @click="closeMenu">
            Login
          </router-link>
          <router-link 
            to="/register" 
            class="block px-4 py-2 text-center text-sm font-medium border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
            @click="closeMenu">
            Register
          </router-link>
        </div>

        <div v-if="isLoggedIn" class="space-y-2">
          <router-link to="/profile" class="block text-gray-700 hover:text-indigo-600" @click="closeMenu">Profile</router-link>
          <router-link to="/" class="block text-gray-700 hover:text-indigo-600" @click="closeMenu">My Courses</router-link>
          <button 
            @click="logout" 
            class="w-full text-left px-4 py-2 text-gray-700 hover:text-indigo-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isOpen: false,
      showProfile: false,
      isLoggedIn: false, // replace with real auth state
      scrolled: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    },
    toggleProfile() {
      this.showProfile = !this.showProfile;
    },
    logout() {
      this.isLoggedIn = false;
      this.showProfile = false;
    },
    handleScroll() {
      this.scrolled = window.scrollY > 20;
    },
  },
};
</script>
