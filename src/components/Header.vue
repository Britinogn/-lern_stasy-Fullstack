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
          
          <div class="flex items-center gap-4">
            <!-- <span class="hidden sm:block text-gray-700 font-medium">{{ profile.fullName }}</span>
            <img
              v-if="profile.fullName"
              :alt="profile.fullName"
              class="w-10 h-10 rounded-full border object-cover"
              :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName)}&background=0D8ABC&color=fff`"
            /> -->
            <button
              @click="logout"
              class="px-3 py-2 bg-red-600 cursor-pointer text-white rounded-lg hover:bg-red-700 text-sm font-medium"
              aria-label="Log out"
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

    // logout() {
    //   localStorage.removeItem('authToken');
    //   localStorage.removeItem('userId');
    //   this.$router.push('/');
    //   this.showProfileDropdown = false;
    // },

    // validateProfile() {
    //   const errors = { fullName: '', email: '', bio: '', phone: '' };
    //   if (!this.profile.fullName.trim()) {
    //     errors.fullName = 'Full name is required';
    //   }
    //   if (!this.profile.email.trim()) {
    //     errors.email = 'Email is required';
    //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.profile.email)) {
    //     errors.email = 'Invalid email format';
    //   }
    //   if (this.profile.phone && !/^\+?[\d\s-]{7,15}$/.test(this.profile.phone)) {
    //     errors.phone = 'Invalid phone number';
    //   }
    //   if (this.profile.bio.length > 500) {
    //     errors.bio = 'Bio cannot exceed 500 characters';
    //   }
    //   this.profileErrors = errors;
    //   return Object.values(errors).every(error => !error);
    // },

    // async saveProfile() {
    //   if (!this.validateProfile()) return;
    //   this.savingProfile = true;
    //   try {
    //     const res = await api.put('/student/profile', this.profile);
    //     if (!res.data?.success) throw new Error(res.data?.message || 'Failed to save');
    //     this.error = null;
    //   } catch (err) {
    //     this.error = err.response?.data?.message || err.message || 'Failed to update profile';
    //   } finally {
    //     this.savingProfile = false;
    //   }
    // },

    async logout() {
      try {
        // Client-side logout; server endpoint may not exist
        auth.token = null;
        localStorage.removeItem('token');
        this.$router.push('/login');
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to log out';
      }
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