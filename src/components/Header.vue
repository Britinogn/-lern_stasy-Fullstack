<template>
  <header class="bg-slate-800 text-white shadow-sm border-b border-slate-700">
    <div class="px-4 lg:px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-700 mr-4 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <h2 class="text-xl lg:text-2xl font-semibold">{{ getSectionTitle() }}</h2>
        </div>
        <div class="flex items-center space-x-4 relative">
          <span class="text-sm text-gray-300 hidden sm:block truncate max-w-xs">
            Welcome back, {{ course?.instructor?.fullName || 'Guest' }}
          </span>
          <button
            @click="toggleProfileDropdown"
            class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Profile menu"
          >
            {{ getInitial() }}
          </button>
          <div
            v-if="showProfileDropdown"
            class="absolute right-0 top-12 mt-2 w-48 bg-slate-700 rounded-lg shadow-xl py-2 z-50 ring-1 ring-slate-600"
            @click.stop
          >
            <router-link
              to="/profile"
              class="block px-4 py-2 text-sm text-gray-200 hover:bg-slate-600 hover:text-white transition-colors"
              @click="showProfileDropdown = false"
            >
              View Profile
            </router-link>
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-slate-600 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    course: Object,
    currentUserId: String,
    activeSection: String,
  },
  data() {
    return {
      showProfileDropdown: false,
    };
  },
  methods: {
    getSectionTitle() {
      const titles = {
        dashboard: 'Dashboard',
        courses: 'My Courses',
        'course-create': 'Course Create',
        'course-editor': 'Course Editor',
        'lesson-editor': 'Lesson Editor',
        students: 'Manage Students',
        analytics: 'Course Analytics',
        profile: 'My Profile',
      };
      return titles[this.activeSection] || 'Dashboard';
    },
    toggleMobileMenu() {
      this.$emit('toggle-mobile-menu');
    },
    toggleProfileDropdown() {
      this.showProfileDropdown = !this.showProfileDropdown;
    },
    getInitial() {
      const profile = this.course?.instructor?.profile;
      if (profile && typeof profile === 'string' && profile.length > 0) {
        return profile.charAt(0).toUpperCase();
      }
      return 'G';
    },
    logout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      this.$router.push('/');
      this.showProfileDropdown = false;
    },
    handleClickOutside(event) {
      if (this.showProfileDropdown && !this.$el.contains(event.target)) {
        this.showProfileDropdown = false;
      }
    },
  },
  computed: {
    isOwner() {
      if (!this.course?.instructor || !this.currentUserId) return false;
      const instructorId = this.course.instructor?._id || this.course.instructor;
      return instructorId === this.currentUserId;
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>