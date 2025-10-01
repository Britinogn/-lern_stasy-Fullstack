<template>
  <section>
    <!-- Mobile menu overlay -->
    <div v-show="mobileMenuOpen" class="fixed inset-0 z-50 lg:hidden">
      <div class="fixed inset-0 bg-black bg-opacity-50" @click="closeMobileMenu"></div>
      <div class="fixed top-0 left-0 bottom-0 w-64 bg-slate-800 text-white z-50">
        <div class="p-6 flex items-center justify-between">
          <h1 class="text-xl font-bold">Dashboard</h1>
          <button @click="closeMobileMenu" class="text-white hover:text-gray-300 text-xl">
            ✕
          </button>
        </div>
        <nav class="mt-6">
          <div class="px-6 py-2">
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</p>
          </div>
          <ul class="mt-2">
            <li v-for="section in mainSections" :key="section.id">
              <router-link
                v-if="section.allowedRoles.includes(userRole)"
                :to="section.to"
                @click="setActiveSection(section.id)"
                :class="activeSection === section.id ? 'bg-slate-700 text-white' : 'text-gray-300 hover:bg-slate-700 hover:text-white'"
                class="w-full text-left group flex items-center px-6 py-2 text-sm font-medium transition-colors"
              >
                <span class="mr-3"></span>
                {{ section.label }}
              </router-link>
            </li>
          </ul>
          <div v-if="userRole === 'instructor'" class="px-6 py-2 mt-8">
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Course Management</p>
          </div>
          <ul v-if="userRole === 'instructor'" class="mt-2">
            <li v-for="section in courseSections" :key="section.id">
              <router-link
                :to="section.to"
                @click="setActiveSection(section.id)"
                :class="activeSection === section.id ? 'bg-slate-700 text-white' : 'text-gray-300 hover:bg-slate-700 hover:text-white'"
                class="w-full text-left group flex items-center px-6 py-2 text-sm font-medium transition-colors"
              >
                <span class="mr-3"></span>
                {{ section.label }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Desktop Sidebar -->
    <aside class="hidden lg:block w-64 bg-slate-800 text-white flex-shrink-0 fixed h-screen">
      <div class="p-6">
        <h1 class="text-xl font-bold">Dashboard</h1>
      </div>
      <nav class="mt-6">
        <div class="px-6 py-2">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</p>
        </div>
        <ul class="mt-2">
          <li v-for="section in mainSections" :key="section.id">
            <router-link
              v-if="section.allowedRoles.includes(userRole)"
              :to="section.to"
              @click="setActiveSection(section.id)"
              :class="activeSection === section.id ? 'bg-slate-700 text-white' : 'text-gray-300 hover:bg-slate-700 hover:text-white'"
              class="w-full text-left group flex items-center px-6 py-2 text-sm font-medium transition-colors"
            >
              <span class="mr-3"></span>
              {{ section.label }}
            </router-link>
          </li>
        </ul>
        <div v-if="userRole === 'instructor'" class="px-6 py-2 mt-8">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Course Management</p>
        </div>
        <ul v-if="userRole === 'instructor'" class="mt-2">
          <li v-for="section in courseSections" :key="section.id">
            <router-link
              :to="section.to"
              @click="setActiveSection(section.id)"
              :class="activeSection === section.id ? 'bg-slate-700 text-white' : 'text-gray-300 hover:bg-slate-700 hover:text-white'"
              class="w-full text-left group flex items-center px-6 py-2 text-sm font-medium transition-colors"
            >
              <span class="mr-3"></span>
              {{ section.label }}
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </section>
</template>

<script>
export default {
  props: {
    mobileMenuOpen: Boolean,
    userRole: String,
  },
  data() {
    return {
      activeSection: 'dashboard',
      mainSections: [
        { id: 'dashboard', label: 'Dashboard', to: '/instructor/dashboard', allowedRoles: ['student', 'instructor'] },
        { id: 'students', label: 'Students', to: '/instructor/students', allowedRoles: ['instructor'] },
        { id: 'analytics', label: 'Analytics', to: '/instructor/analytics', allowedRoles: ['instructor'] },
        { id: 'profile', label: 'Profile', to: '/profile', allowedRoles: ['student', 'instructor'] },
      ],
      courseSections: [
        { id: 'course-create', label: 'Course Create', to: '/instructor/course-create', allowedRoles: ['instructor'] },
        { id: 'course-editor', label: 'Course Editor', to: '/instructor/course-editor', allowedRoles: ['instructor'] },
        { id: 'lesson-editor', label: 'Lesson Editor', to: '/instructor/lesson-editor', allowedRoles: ['instructor'] },
      ],
      loading: {
        dashboard: false,
        courses: false,
        students: false,
        analytics: false,
        profile: false,
        courseEditor: false,
        lessonEditor: false,
      },
    };
  },
  created() {
    console.log('Sidebar userRole:', this.userRole); // Debug userRole
  },
  methods: {
    setActiveSection(section) {
      this.activeSection = section;
      this.$emit('update:mobileMenuOpen', false);
      this.$emit('update:activeSection', section);
      switch (section) {
        case 'dashboard':
          this.loadDashboardData();
          break;
        case 'courses':
          this.loadCourses();
          break;
        case 'students':
          this.loadStudents();
          break;
        case 'analytics':
          this.loadAnalytics();
          break;
        case 'profile':
          this.loadProfileData();
          break;
        case 'course-create':
          this.loadCourseCreateData();
          break;
        case 'course-editor':
          this.loadCourseEditorData();
          break;
        case 'lesson-editor':
          this.loadLessonEditorData();
          break;
      }
    },
    closeMobileMenu() {
      this.$emit('update:mobileMenuOpen', false);
    },
    loadDashboardData() {
      this.loading.dashboard = true;
      this.loading.dashboard = false;
    },
    loadCourses() {
      this.loading.courses = true;
      this.loading.courses = false;
    },
    loadStudents() {
      this.loading.students = true;
      this.loading.students = false;
    },
    loadAnalytics() {
      this.loading.analytics = true;
      this.loading.analytics = false;
    },
    loadProfileData() {
      this.loading.profile = true;
      this.loading.profile = false;
    },
    loadCourseCreate() {
      this.loading.courseCreate = true;
      this.loading.courseCreate = false;
    },
    loadCourseEditorData() {
      this.loading.courseEditor = true;
      this.loading.courseEditor = false;
    },
    loadLessonEditorData() {
      this.loading.lessonEditor = true;
      this.loading.lessonEditor = false;
    },
  },
};
</script>