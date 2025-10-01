<template>
  <div>
    <!-- Student Dashboard - No Header/Sidebar/Navbar -->
    <div v-if="$route.path === '/student/dashboard'" class="min-h-screen">
      <router-view />
    </div>
    <!-- Public pages with Navbar -->
    <div v-else-if="$route.meta.hideLayout">
      <NavBar />
      <router-view />
    </div>
    <!-- Instructor Dashboard pages with Header + Sidebar -->
    <div v-else class="flex min-h-screen">
      <!-- Sidebar -->
      <Sidebar 
        :mobileMenuOpen="mobileMenuOpen" 
        :userRole="user?.role || 'instructor'"
        :activeSection="activeSection"
        @update:mobileMenuOpen="mobileMenuOpen = $event" 
        @update:activeSection="activeSection = $event" 
      />
      <!-- Main Content -->
      <div class="flex-1 flex flex-col lg:ml-64">
        <!-- Header -->
        <Header 
          :course="{ instructor: user }" 
          :currentUserId="currentUserId"
          :activeSection="activeSection"
          :profileError="!!error"
          @toggle-mobile-menu="mobileMenuOpen = !mobileMenuOpen" 
        />
        <!-- Content Area -->
        <main class="">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import NavBar from './components/NavBar.vue';
import api from '../src/services/api';
import { setToken } from '../src/services/auth';
export default {
  components: { 
    Header, 
    Sidebar,
    NavBar 
  },
  
  data() {
    return {
      mobileMenuOpen: false,
      activeSection: 'dashboard',
      currentUserId: null,
      user: null,
      loading: false,
      error: null,
    };
  },
  
  computed: {
    course() {
      // Transform user data into course.instructor structure
      if (this.user) {
        return {
          instructor: this.user
        };
      }
      return { instructor: null };
    }
  },
  
  async created() {
    this.currentUserId = this.getCurrentUserId();
    
    // Only fetch user data if not on public pages
    if (!this.$route.meta.hideLayout) {
      await this.fetchUserData();
    }
    
    this.syncActiveSectionWithRoute();
  },
  
  watch: {
    '$route.path': {
      handler(newPath) {
        // Fetch user data when navigating to dashboard pages
        if (!this.$route.meta.hideLayout && !this.user) {
          this.fetchUserData();
        }
        this.syncActiveSectionWithRoute();
      },
      immediate: true,
    },
  },
  
  methods: {
    async fetchUserData() {
      try {
        this.loading = true;
        this.error = null;
        const response = await api.get('/auth/profile');
        this.user = response.data; // { _id, fullName, profile, role }
        console.log('User fetched:', this.user);
        
        if (response.data.token) {
          setToken(response.data.token);
        }
      } catch (err) {
        this.error = 'Unable to load profile data';
        console.error('Fetch error:', err);
        // Set default user to prevent layout breaks
        this.user = {
          _id: this.currentUserId,
          fullName: 'User',
          profile: 'U',
          role: 'instructor'
        };
      } finally {
        this.loading = false;
      }
    },
    
    getCurrentUserId() {
      return localStorage.getItem('userId') || null;
    },
    
    syncActiveSectionWithRoute() {
      const routeToSection = {
        '/dashboard': 'dashboard',
        '/instructor/students': 'students',
        '/instructor/analytics': 'analytics',
        '/instructor/course-create': 'course-create',
        '/instructor/course-editor': 'course-editor',
        '/instructor/lesson-editor': 'lesson-editor',
        '/profile': 'profile',
      };
      this.activeSection = routeToSection[this.$route.path] || 'dashboard';
    },
  },
};
</script>