<template>
  <div class="min-h-screen bg-gray-50/45 flex">
    <!-- Sidebar -->
    <aside class="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 shadow-lg">
      <div class="flex items-center h-16 px-6 border-b border-gray-100">
        <span class="text-xl font-bold text-blue-700">LernStasy</span>
      </div>
      <nav class="flex-1 py-6 px-4 space-y-2" role="navigation" aria-label="Main navigation">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition',
            activeTab === tab.id
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
          ]"
          :aria-current="activeTab === tab.id ? 'page' : undefined"
          :aria-label="'Navigate to ' + tab.label"
        >
          <span v-if="tab.icon" v-html="tab.icon"></span>
          {{ tab.label }}
        </button>
      </nav>
      <div class="px-6 py-4 border-t border-gray-100">
        <div class="text-xs text-gray-400">Student Panel</div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow-sm px-4 sm:px-8 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p class="text-gray-600 mt-1 text-sm sm:text-base">Track your learning and manage your profile</p>
        </div>

        <div class="flex items-center gap-4">
          <span class="hidden sm:block text-gray-700 font-medium">{{ profile.fullName }}</span>
          <img
            v-if="profile.fullName"
            :alt="profile.fullName"
            class="w-10 h-10 rounded-full border object-cover"
            :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName)}&background=0D8ABC&color=fff`"
          />
          <button
            @click="logout"
            class="px-3 py-2 bg-red-600 cursor-pointer text-white rounded-lg hover:bg-red-700 text-sm font-medium"
            aria-label="Log out"
          >
            Logout
          </button>
        </div>

      </header>

      <!-- Content Area -->
      <main class="flex-1 overflow-y-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <!-- Loading State -->
          <div v-if="loading" class="flex items-center justify-center h-64">
            <div class="text-center">
              <svg class="w-10 h-10 sm:w-12 sm:h-12 animate-spin text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-gray-600 text-sm sm:text-base">Loading your dashboard...</p>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6">
            <div class="flex items-center gap-3">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <h3 class="text-red-800 font-semibold text-base sm:text-lg">Error loading dashboard</h3>
                <p class="text-red-600 text-sm sm:text-base">{{ error }}</p>
              </div>
            </div>
            <button
              @click="loadDashboard"
              class="mt-4 w-full sm:w-auto px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500"
            >
              Retry
            </button>
          </div>

          <!-- Main Tabs Content -->
          <div v-else>
            <div class="bg-white rounded-xl shadow-md">
              <!-- Mobile Tabs -->
              <div class="md:hidden border-b border-gray-200 px-4 sm:px-6">
                <nav class="flex flex-wrap gap-4" role="tablist">
                  <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    :class="[
                      'py-4 px-1 border-b-2 cursor-pointer font-medium text-sm',
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    ]"
                    :aria-selected="activeTab === tab.id"
                    :aria-controls="`panel-${tab.id}`"
                    role="tab"
                  >
                    {{ tab.label }}
                  </button>
                </nav>
              </div>

              <div class="p-4 sm:p-6">
                <!-- Enrolled Courses -->
                <div v-if="activeTab === 'enrolled'" id="panel-enrolled" role="tabpanel">
                  <div v-if="coursesLoading" class="flex items-center justify-center h-64">
                    <div class="text-center">
                      <svg class="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p class="text-gray-600 text-sm">Loading courses...</p>
                    </div>
                  </div>
                  <div v-else>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      <div v-for="course in paginatedCourses" :key="course.courseId" class="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                        <div class="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-end justify-between p-3">
                          <span class="bg-white/90 text-gray-800 text-xs font-semibold px-2 py-1 rounded">{{ course.status === 'completed' ? 'Completed' : 'In Progress' }}</span>
                          <span class="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">{{ Math.round(course.progress) }}%</span>
                        </div>
                        <div class="p-4">
                          <h3 class="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{{ course.title }}</h3>
                          <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ course.description }}</p>
                          <div class="flex gap-2">
                            <button
                              @click="openPlayer(course.courseId)"
                              class="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                              :disabled="coursesLoading"
                            >
                              Continue
                            </button>
                            <router-link :to="`/courses/${course.courseId}`" class="flex-1 inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
                              View
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="courses.length === 0" class="text-center py-10 text-gray-600">
                      You have no enrolled courses yet.
                    </div>
                    <!-- Pagination -->
                    <div v-if="courses.length > coursesPerPage" class="mt-6 flex justify-center gap-2">
                      <button
                        @click="currentPage -= 1"
                        :disabled="currentPage === 1"
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
                        aria-label="Previous page"
                      >
                        Previous
                      </button>
                      <span class="px-4 py-2 text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
                      <button
                        @click="currentPage += 1"
                        :disabled="currentPage === totalPages"
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
                        aria-label="Next page"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Course Player / Lessons list -->
<div v-else-if="activeTab === 'player'" id="panel-player" role="tabpanel">
  <div v-if="playerLoading" class="flex items-center justify-center h-64">
    <div class="text-center">
      <svg class="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-gray-600 text-sm">Loading course player...</p>
    </div>
  </div>
  <div v-else-if="selectedCourse" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2">
      <h2 class="text-xl font-bold text-gray-900 mb-4">{{ selectedCourse.course.title }} ({{ Math.round(selectedCourse.enrollment.progress) }}%)</h2>
      <div class="bg-black rounded-lg overflow-hidden min-h-[240px]">
        <div v-if="currentLessonVideo" class="aspect-video bg-black">
          <iframe
            v-if="isEmbed(currentLessonVideo)"
            :src="currentLessonVideo"
            class="w-full h-full"
            frameborder="0"
            allowfullscreen
            aria-label="Course video player"
          ></iframe>
          <video v-else class="w-full h-full" controls :src="currentLessonVideo" aria-label="Course video player"></video>
        </div>
        <div v-else class="flex items-center justify-center h-48 text-gray-300">No video available for this lesson</div>
      </div>
    </div>
    <div class="lg:col-span-1">
      <h3 class="font-semibold mb-3">Lessons ({{ selectedCourse.enrollment.completedLessons.length }}/{{ selectedCourse.course.lessons.length }} completed)</h3>
      <ul class="space-y-2">
        <li
          v-for="lesson in selectedCourse.course.lessons"
          :key="lesson._id"
          class="flex items-center justify-between p-3 bg-white rounded-lg border"
          :class="{ 'bg-green-50': isCompleted(lesson._id) }"
        >
          <button
            class="text-left flex-1 pr-3"
            @click="selectLesson(lesson)"
            :aria-label="'Select lesson: ' + lesson.title"
          >
            <div class="font-medium text-gray-900">{{ lesson.title }}</div>
            <div class="text-xs text-gray-500">{{ formatDuration(lesson.duration) }}</div>
          </button>
          <label class="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              class="rounded"
              :checked="isCompleted(lesson._id)"
              @change="toggleComplete(lesson)"
              :aria-label="'Mark lesson ' + lesson.title + ' as completed'"
            />
            <span>Done</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="text-center py-10">
    <p class="text-gray-600 mb-4">
      {{ courses.length ? 'Select a course from Enrolled to start the player.' : 'You have no enrolled courses yet.' }}
    </p>
    <button
      v-if="courses.length"
      @click="activeTab = 'enrolled'"
      class="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      aria-label="Go to Enrolled Courses"
    >
      View Enrolled Courses
    </button>
    <router-link
      v-else
      to="/courses"
      class="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      aria-label="Browse available courses"
    >
      Browse Courses
    </router-link>
  </div>
</div>

<!-- Lesson page (video, resources, comments) -->
<div v-else-if="activeTab === 'lesson'" id="panel-lesson" role="tabpanel">
  <div v-if="selectedLesson" class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-900">{{ selectedLesson.title }}</h2>
      <p class="text-gray-500 text-sm">{{ formatDuration(selectedLesson.duration) }} • {{ isCompleted(selectedLesson._id) ? 'Completed' : 'In Progress' }}</p>
    </div>
    <div class="bg-black rounded-lg overflow-hidden">
      <div v-if="currentLessonVideo" class="aspect-video bg-black">
        <iframe
          v-if="isEmbed(currentLessonVideo)"
          :src="currentLessonVideo"
          class="w-full h-full"
          frameborder="0"
          allowfullscreen
          aria-label="Lesson video player"
        ></iframe>
        <video v-else class="w-full h-full" controls :src="currentLessonVideo" aria-label="Lesson video player"></video>
      </div>
      <div v-else class="flex items-center justify-center h-48 text-gray-300">No video available for this lesson</div>
    </div>
    <div>
      <h3 class="font-semibold text-gray-900 mb-2">Description</h3>
      <p class="text-gray-700">{{ selectedLesson.content || 'No description available.' }}</p>
    </div>
    <div class="bg-white rounded-lg border p-4">
      <h3 class="font-semibold mb-3">Resources</h3>
      <p v-if="!selectedLesson.resources?.length" class="text-sm text-gray-600">No resources available for this lesson.</p>
      <ul v-else class="space-y-2">
        <li v-for="(resource, index) in selectedLesson.resources" :key="index" class="text-sm">
          <a :href="resource.url" target="_blank" class="text-blue-600 hover:underline">{{ resource.name || `Resource ${index + 1}` }}</a>
        </li>
      </ul>
    </div>
    <div class="bg-white rounded-lg border p-4">
      <h3 class="font-semibold mb-3">Comments</h3>
      <ErrorBoundary>
        <CommentBox :lesson-id="selectedLesson._id" />
      </ErrorBoundary>
    </div>
    <button
      @click="activeTab = 'player'"
      class="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      aria-label="Back to course player"
    >
      Back to Course Player
    </button>
  </div>
  <div v-else class="text-center py-10">
    <p class="text-gray-600 mb-4">Pick a lesson from the Player tab.</p>
    <button
      @click="activeTab = 'player'"
      class="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      aria-label="Go to Course Player"
    >
      Go to Course Player
    </button>
  </div>
</div>

                <!-- Profile -->
                <div v-else-if="activeTab === 'profile'" id="panel-profile" role="tabpanel" class="max-w-2xl">
                  <form @submit.prevent="saveProfile" class="space-y-4">
                    <div>
                      <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        id="fullName"
                        v-model="profile.fullName"
                        type="text"
                        class="mt-1 w-full border rounded-lg px-3 py-2"
                        :class="{ 'border-red-500': profileErrors.fullName }"
                        required
                        aria-describedby="fullName-error"
                      />
                      <p v-if="profileErrors.fullName" id="fullName-error" class="text-red-500 text-sm mt-1">{{ profileErrors.fullName }}</p>
                    </div>
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        id="email"
                        v-model="profile.email"
                        type="email"
                        class="mt-1 w-full border rounded-lg px-3 py-2"
                        :class="{ 'border-red-500': profileErrors.email }"
                        required
                        aria-describedby="email-error"
                      />
                      <p v-if="profileErrors.email" id="email-error" class="text-red-500 text-sm mt-1">{{ profileErrors.email }}</p>
                    </div>
                    <div>
                      <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        id="phone"
                        v-model="profile.phone"
                        type="tel"
                        class="mt-1 w-full border rounded-lg px-3 py-2"
                        :class="{ 'border-red-500': profileErrors.phone }"
                        aria-describedby="phone-error"
                      />
                      <p v-if="profileErrors.phone" id="phone-error" class="text-red-500 text-sm mt-1">{{ profileErrors.phone }}</p>
                    </div>
                    <div>
                      <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
                      <textarea
                        id="bio"
                        v-model="profile.bio"
                        rows="4"
                        class="mt-1 w-full border rounded-lg px-3 py-2"
                        aria-describedby="bio-error"
                      ></textarea>
                      <p v-if="profileErrors.bio" id="bio-error" class="text-red-500 text-sm mt-1">{{ profileErrors.bio }}</p>
                    </div>
                    <div class="flex gap-3">
                      <button
                        type="submit"
                        :disabled="savingProfile || Object.keys(profileErrors).length > 0"
                        class="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold"
                        aria-label="Save profile changes"
                      >
                        {{ savingProfile ? 'Saving...' : 'Save Changes' }}
                      </button>
                      <button
                        type="button"
                        class="px-5 py-3 border border-gray-300 rounded-lg"
                        @click="loadProfile"
                        aria-label="Reload profile"
                      >
                        Reload
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Stats Overview -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6">
              <div class="bg-white rounded-xl shadow p-4 sm:p-6">
                <h3 class="text-base sm:text-lg font-semibold text-gray-900">Enrolled</h3>
                <p class="text-2xl sm:text-3xl font-bold text-blue-600">{{ stats.totalEnrolledCourses }}</p>
              </div>
              <div class="bg-white rounded-xl shadow p-4 sm:p-6">
                <h3 class="text-base sm:text-lg font-semibold text-gray-900">Completed</h3>
                <p class="text-2xl sm:text-3xl font-bold text-blue-600">{{ stats.completedCourses }}</p>
              </div>
              <div class="bg-white rounded-xl shadow p-4 sm:p-6">
                <h3 class="text-base sm:text-lg font-semibold text-gray-900">In Progress</h3>
                <p class="text-2xl sm:text-3xl font-bold text-blue-600">{{ stats.inProgressCourses }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { h } from 'vue';
import api from '../../services/api';
import { auth } from '../../services/auth';
import CommentBox from '../../components/CommentBox.vue';

const ErrorBoundary = {
  name: 'ErrorBoundary',
  data() {
    return { hasError: false };
  },
  errorCaptured() {
    this.hasError = true;
    return false;
  },
  render() {
    if (this.hasError) {
      return h('div', { class: 'text-red-600 p-4' }, 'An error occurred while rendering comments.');
    }
    const slot = this.$slots.default ? this.$slots.default() : [];
    return slot[0] || null;
  }
};

export default {
  name: 'StudentDashboard',
  components: { CommentBox, ErrorBoundary },
  data() {
    return {
      loading: true,
      error: null,
      coursesLoading: false,
      playerLoading: false,
      tabs: [
        {
          id: 'enrolled',
          label: 'Enrolled Courses',
          icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 20l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 12V4l9 5-9 5-9-5 9-5z"/></svg>`
        },
        {
          id: 'player',
          label: 'Course Player',
          icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-6.518-3.759A1 1 0 007 8.118v7.764a1 1 0 001.234.97l6.518-1.757A1 1 0 0016 14.882V7.118a1 1 0 00-1.248-.95z"/></svg>`
        },
        {
          id: 'lesson',
          label: 'Lesson',
          icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 20h9" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m0 0H3" /></svg>`
        },
        {
          id: 'profile',
          label: 'Profile',
          icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`
        }
      ],
      activeTab: 'enrolled',
      courses: [],
      stats: { totalEnrolledCourses: 0, completedCourses: 0, inProgressCourses: 0, totalCompletedLessons: 0 },
      selectedCourse: null,
      selectedLesson: null,
      profile: { fullName: '', email: '', bio: '', phone: '' },
      profileErrors: { fullName: '', email: '', bio: '', phone: '' },
      savingProfile: false,
      currentPage: 1,
      coursesPerPage: 6
    };
  },
  computed: {
    currentLessonVideo() {
      return this.selectedLesson?.video?.url || this.selectedLesson?.videoLink || '';
    },
    totalPages() {
      return Math.ceil(this.courses.length / this.coursesPerPage);
    },
    paginatedCourses() {
      const start = (this.currentPage - 1) * this.coursesPerPage;
      return this.courses.slice(start, start + this.coursesPerPage);
    }
  },
  methods: {
    async loadDashboard() {
      this.loading = true;
      this.error = null;
      try {
        const token = auth.token || localStorage.getItem('token');
        if (!token) throw new Error('Please log in to view your dashboard');

        const res = await api.get('/student/dashboard');
        if (!res.data?.success) throw new Error(res.data?.message || 'Failed to load');
        this.courses = res.data.courses || [];
        this.stats = res.data.stats || this.stats;
        this.currentPage = 1;
        if (this.selectedCourse && !this.courses.some(c => c.courseId === this.selectedCourse.course._id)) {
          this.selectedCourse = null;
          this.selectedLesson = null;
          if (this.activeTab === 'player' || this.activeTab === 'lesson') {
            this.activeTab = 'enrolled';
          }
        }
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to load dashboard';
        this.selectedCourse = null;
        this.selectedLesson = null;
        if (this.activeTab === 'player' || this.activeTab === 'lesson') {
          this.activeTab = 'enrolled';
        }
      } finally {
        this.loading = false;
      }
    },

    async setActiveTab(tabId) {
      if (tabId === 'player' && this.courses.length && !this.selectedCourse) {
        const firstCourse = this.courses[0];
        if (firstCourse) {
          await this.openPlayer(firstCourse.courseId);
        }
      }
      if (tabId === 'player' && (!this.courses.length || !this.selectedCourse)) {
        return;
      }
      if (tabId === 'lesson' && (!this.selectedCourse || !this.selectedLesson)) {
        this.activeTab = this.selectedCourse ? 'player' : 'enrolled';
        return;
      }
      this.activeTab = tabId;
    },

    async openPlayer(courseId) {
      this.playerLoading = true;
      this.error = null;
      try {
        const res = await api.get(`/student/courses/${courseId}`);
        if (res.data?.success) {
          this.selectedCourse = res.data;
          this.activeTab = 'player';
          const first = res.data.course?.lessons?.[0];
          if (first) this.selectLesson(first);
        } else {
          throw new Error(res.data?.message || 'Failed to load course');
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to load course details';
        this.selectedCourse = null;
        this.selectedLesson = null;
        this.activeTab = 'enrolled';
      } finally {
        this.playerLoading = false;
      }
    },

    selectLesson(lesson) {
      this.selectedLesson = lesson;
      this.activeTab = 'lesson';
    },

    isCompleted(lessonId) {
      return this.selectedCourse?.enrollment?.completedLessons?.some(id => id.toString() === lessonId.toString()) || false;
    },

    async toggleComplete(lesson) {
      if (!this.selectedCourse) return;
      const courseId = this.selectedCourse.course._id;
      const lessonId = lesson._id;
      const completed = !this.isCompleted(lessonId);

      const previousCompletedLessons = [...(this.selectedCourse.enrollment.completedLessons || [])];
      const previousProgress = this.selectedCourse.enrollment.progress;
      if (completed) {
        this.selectedCourse.enrollment.completedLessons = [...previousCompletedLessons, lessonId];
      } else {
        this.selectedCourse.enrollment.completedLessons = previousCompletedLessons.filter(id => id.toString() !== lessonId.toString());
      }
      const totalLessons = this.selectedCourse.course.lessons.length;
      this.selectedCourse.enrollment.progress = totalLessons > 0 ? (this.selectedCourse.enrollment.completedLessons.length / totalLessons) * 100 : 0;

      try {
        const res = await api.put(`/student/courses/${courseId}/lessons/${lessonId}/progress`, { completed });
        if (res.data?.success) {
          this.selectedCourse.enrollment.completedLessons = res.data.completedLessons;
          this.selectedCourse.enrollment.progress = res.data.progress;
          this.loadDashboard();
        } else {
          throw new Error(res.data?.message || 'Failed to update progress');
        }
      } catch (err) {
        this.selectedCourse.enrollment.completedLessons = previousCompletedLessons;
        this.selectedCourse.enrollment.progress = previousProgress;
        this.error = err.response?.data?.message || 'Failed to update lesson progress';
        await this.openPlayer(courseId);
      }
    },

    isEmbed(url) {
      if (!url) return false;
      return /youtube|vimeo|embed/.test(url);
    },

    formatDuration(totalSeconds) {
      if (!totalSeconds && totalSeconds !== 0) return '0m 0s';
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}m ${seconds}s`;
    },

    async loadProfile() {
      try {
        const res = await api.get('/student/profile');
        if (res.data?.success) {
          this.profile = {
            fullName: res.data.user.fullName || '',
            email: res.data.user.email || '',
            bio: res.data.user.bio || '',
            phone: res.data.user.phone || ''
          };
          this.profileErrors = { fullName: '', email: '', bio: '', phone: '' };
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to load profile';
      }
    },

    validateProfile() {
      const errors = { fullName: '', email: '', bio: '', phone: '' };
      if (!this.profile.fullName.trim()) {
        errors.fullName = 'Full name is required';
      }
      if (!this.profile.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.profile.email)) {
        errors.email = 'Invalid email format';
      }
      if (this.profile.phone && !/^\+?[\d\s-]{7,15}$/.test(this.profile.phone)) {
        errors.phone = 'Invalid phone number';
      }
      if (this.profile.bio.length > 500) {
        errors.bio = 'Bio cannot exceed 500 characters';
      }
      this.profileErrors = errors;
      return Object.values(errors).every(error => !error);
    },

    async saveProfile() {
      if (!this.validateProfile()) return;
      this.savingProfile = true;
      try {
        const res = await api.put('/student/profile', this.profile);
        if (!res.data?.success) throw new Error(res.data?.message || 'Failed to save');
        this.error = null;
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to update profile';
      } finally {
        this.savingProfile = false;
      }
    },

    async logout() {
      try {
        // Client-side logout; server endpoint may not exist
        auth.token = null;
        localStorage.removeItem('token');
        this.$router.push('/login');
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to log out';
      }
    }
  },
  mounted() {
    this.loadDashboard();
    this.loadProfile();
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>