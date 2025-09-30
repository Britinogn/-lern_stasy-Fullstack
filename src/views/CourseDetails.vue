<template>
  <section class="min-h-screen bg-gradient-to-br from-slate-300 via-white to-blue-400">
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5 py-10">
      
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <!-- Course Details -->
      <div v-else-if="course" class="max-w-7xl mx-auto px-4 py-8">
        
        <!-- Back Button -->
        <div class="mb-6">
          <router-link 
            to="/courses" 
            class="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            <span>Back to Courses</span>
          </router-link>
        </div>

        <!-- Course Header -->     <!-- Main Course Article -->
        <article class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div class="md:flex">
            
            <!-- Course Image -->
            <div class="md:w-1/2">
              <img 
                v-if="course.image?.url"
                :src="course.image.url" 
                :alt="course.title" 
                class="w-full h-64 md:h-full object-cover"
              />
              <div v-else class="w-full h-64 md:h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <svg class="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>

            <!-- Course Info -->
            <div class="md:w-1/2 p-8">

              <!-- Instructor Info -->
              <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span class="text-white font-semibold">
                    {{ course.instructor?.fullName.charAt(0)?.toUpperCase() || 'A' }}
                  </span>
                </div>
                <div>
                  <div class="font-semibold text-gray-900">{{ course.instructor?.fullName || 'Anonymous' }}</div>
                  <div class="text-sm text-gray-500">Instructor • {{ formatDate(course.createdAt) }}</div>
                </div>
              </div>

              <div class="flex items-center justify-between mb-6">
                <!-- Title -->
                <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ course.title }}</h1>
                
                <!-- Category Badge -->
                <span class="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full mb-4">
                  {{ course.category }}
                </span>

              </div>

              <!-- Price and Enrollment -->
              <div class="flex items-center justify-between mb-6">
                <div class="text-3xl font-bold text-indigo-600">${{ course.price }}</div>
                <div class="text-sm text-gray-500">
                  <i class="fas fa-users mr-1"></i>{{ course.enrollments }} students enrolled
                </div>
              </div>

              <!-- Action Buttons -->
              <div  v-if=" isOwner" class="flex gap-4">

                <router-link :to="{name:'Enrollment', params:{id: enroll._id}}">
                  <button 
                    @click="enrollCourse"
                    class="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold"
                    >
                    Enroll Now
                  </button>
                </router-link>
                
                <button 
                  v-if="isEnrolled"
                  class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold cursor-default"
                >
                  Already Enrolled
                </button>

                <!-- <router-link 
                  v-if="isOwner(course)"
                  :to="{name:'CourseEdit', params:{id: course._id}}"
                  class="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 font-semibold text-center"
                >
                  Edit Course
                </router-link> -->

                <button class="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </article>

        <!-- Course Content Tabs -->
        <div class="bg-white rounded-lg shadow-md">
          
          <!-- Tab Headers -->
          <div class="border-b border-gray-200">
            <nav class="flex space-x-8 px-6">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'py-4 px-1 border-b-2 cursor-pointer font-medium text-sm transition transform duration-1000 ease-in-out',
                  activeTab === tab.id 
                    ? 'border-indigo-500  text-indigo-600 ' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                {{ tab.label }}
              </button>
            </nav>
          </div>


          <!-- Tab Content -->
          <div class="p-6">
            
            <!-- Overview Tab -->
            <div v-if="activeTab === 'overview'">
              <h3 class="text-lg font-semibold mb-4">Course Description</h3>
              <p class="text-gray-700 leading-relaxed mb-6">{{ course.description }}</p>
            </div>

            <!-- Lessons Tab -->
            <div v-if="activeTab === 'lessons'">
              <h3 class="text-lg font-semibold mb-4">Course Lessons</h3>
              <p class="text-gray-700 mb-4">
                Explore all the lessons available in this course. Click the button below to view details.
              </p>

              <router-link 
                :to="`/courses/${course._id}/lessons`" 
                class="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold"
              >
                View Lessons
              </router-link>

              
            </div>

            <!-- Enroll Tab -->
          <div v-if="activeTab === 'enroll'">
            <h3 class="text-lg font-semibold mb-4">Enroll in this Course</h3>
            <p class="text-gray-700 leading-relaxed mb-6"> Get full access to all course and resources by enrolling now.</p>

            <router-link 
              :to="`/courses/${course._id}/enroll`" 
              class="inline-block bg-green-600/90 text-white px-6 py-3 rounded-lg hover:bg-green-700/90 font-semibold"
            >
              Enroll Now
            </router-link>
          </div>



          </div>

        </div>

      </div>

      <!-- Error State -->
      <div v-else class="text-center py-12">
        <div class="text-gray-500">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="text-lg font-semibold mb-2">Course Not Found</h3>
          <p class="mb-4">The course you're looking for doesn't exist or has been removed.</p>
          <router-link to="/courses" class="text-indigo-600 hover:text-indigo-700 font-medium">
            Browse Other Courses
          </router-link>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import api from '../services/api';
import { auth } from '../services/auth';

export default {
  name: 'CourseDetails',
  props: ['id'],

  data() {
    return {
      course: null,
      loading: false,
      isEnrolled: false,
      currentUserId: auth.user?.id || null,
      error: '',
      activeTab: 'overview',
      tabs: [
        { id: 'overview', label: 'Overview' },
        { id: 'enroll', label: 'Enroll in this Course' },
        { id: 'lessons', label: '  View Lessons' }
        
      ],
    }
  },

  computed: {
    isOwner(){
      if (!this.course) {
        return false
      }
      if (!this.currentUserId && auth.token) {
        return false;
      }

      const instructor = this.course.instructor;
      const instructorId = instructor?._id || instructor;
      return !! (instructorId && this.currentUserId && instructorId ===this.currentUserId )
    },
    courseId(){
      return this.id || this.$route.params.id;
    }
  },

  methods: {
    async fetchCourse() {
      this.loading = true;
      
      try {
        //const courseId = this.$route.params.id;
        const res = await api.get(`/courses/${this.courseId}`);
        this.course = res.data;
        
        // Check if user is enrolled
        if (auth.user) {
          await this.checkEnrollmentStatus();
        }

      } catch (error) {
        console.error('Error fetching course', error);
        // this.course = null;

      } finally {
        this.loading = false;
      }
    },

    async checkEnrollmentStatus() {
      try {
        const res = await api.get(`/courses/${this.course._id}/enrollment-status`);
        this.isEnrolled = res.data.isEnrolled;
      } catch (error) {
        console.error('Error checking enrollment status', error);
      }
    },

    async enrollCourse() {
      if (!auth.user) {
        this.$router.push('/login');
        return;
      }

      try {
        await api.post(`/courses/${this.course._id}/enroll`);
        this.isEnrolled = true;
        this.course.enrollments = (this.course.enrollments || 0) + 1;
        
        // Show success message (you can implement toast/notification)
        alert('Successfully enrolled in the course!');

      } catch (error) {
        console.error('Error enrolling in course', error);
        alert('Failed to enroll. Please try again.');
      }
    },

    // isOwner(course) {
    //   return course.instructor && auth.user && course.instructor._id === auth.user.id
    // },

    formatDate(dateString) {
      if (!dateString) return '';

      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  },

  async mounted() {
    this.fetchCourse();
  },

  watch: {
    '$route'() {
      this.fetchCourse();
    }
  }
}
</script>