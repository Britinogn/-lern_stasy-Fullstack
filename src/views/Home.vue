<template>
  <section>
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-indigo-600 to-purple-700 text-white min-h-screen p-7.5 py-15 items-center relative overflow-hidden">
    
      <div class="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 grid md:grid-cols-2 gap-12 items-center">
        <!-- Left Content (second on mobile, first on desktop) -->
        <div class="order-2 md:order-none text-center md:text-left z-10">
          <h2 class="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Ignite Your <span class="text-yellow-300">Future</span>
          </h2>
          <p class="text-sm md:text-lg lg:text-xl mb-8 opacity-95 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Dive into a world of knowledge. Master new skills, shape your destiny, 
            and join a community passionate about <span class="font-semibold">limitless growth</span>.
          </p>


          <router-link :to = "{name: 'Register'}" >
            <button 
              @click="currentView = 'courses'"
              class="bg-yellow-400 text-indigo-900 cursor-pointer  px-10 py-4 rounded-lg text-lg font-bold hover:bg-yellow-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Begin Your Adventure
            </button>
          </router-link>
          
        </div>

        <!-- Right Image (first on mobile, second on desktop) -->
        <div class="order-1 md:order-none md:block relative p-4 bg-white/5 rounded-xl ring-2 ring-white/20 shadow-xl">
          <!-- Decorative Frame/Backdrop -->
          <div class="absolute inset-0 bg-gradient-to-br from-transparent to-white/10 backdrop-blur-md rounded-xl -z-10 transform -rotate-2 scale-105"></div>
          <div class="absolute -top-6 -left-6 w-10 h-10 bg-yellow-300 rounded-full opacity-50 blur-sm"></div>
          <div class="absolute -bottom-6 -right-6 w-10 h-10 bg-purple-300 rounded-full opacity-50 blur-sm"></div>
          <div class="absolute top-4 right-4 w-6 h-6 bg-green-300 rounded-full opacity-40"></div>
          <img 
            src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="A woman engaged in online learning on her laptop" 
            class="rounded-lg max-w-full h-auto shadow-2xl hover:scale-105 transition-transform duration-300 relative z-10"
          />
        </div>
      </div>
      <!-- Decorative Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 z-0"></div>
    </div>

    <!-- Credibility Section -->
    <div class="bg-white py-6 border-b">
      <div class="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <p class="text-gray-600 text-sm md:text-lg font-medium">
          Trusted by <span class="font-bold text-indigo-600">10,000+</span> learners worldwide 🌍
        </p>
      </div>
    </div>

  </section>
  
  <!-- Features Section -->
  <section class="p-7.5">
    <div class="max-w-7xl mx-auto px-6 lg:px-12 py-16 bg-gray-50">
      <div class="text-center mb-12">
        <h3 class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">Why Learn with Lern Stasy?</h3>
        <p class="text-gray-600 text-lg">Your gateway to seamless online learning</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-play-circle text-2xl text-indigo-600"></i>
          </div>
          <h4 class="text-xl font-semibold mb-2 text-gray-800">On-Demand Videos</h4>
          <p class="text-gray-600">Engaging video lessons available anytime, anywhere</p>
        </div>

        <div class="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-users text-2xl text-green-600"></i>
          </div>
          <h4 class="text-xl font-semibold mb-2 text-gray-800">Top-Tier Mentors</h4>
          <p class="text-gray-600">Gain insights from leading industry experts</p>
        </div>

        <div class="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-chart-line text-2xl text-purple-600"></i>
          </div>
          <h4 class="text-xl font-semibold mb-2 text-gray-800">Progress Tracking</h4>
          <p class="text-gray-600">Chart your learning journey with ease</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Filters / Search-->
  <div class="bg-white/50 rounded-lg shadow-md mx-4 md:mx-auto p-7.5 mb-8 text-black relative max-w-xl ">
    <div class="flex flex-wrap gap-3 items-center justify-center">
      <input 
        type="text"
        v-model="searchQuery" 
        @keyup.enter="searchCourses"
        placeholder="Search courses..." 
        class="flex-1 min-w-48 px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      >
      
      <button 
        @click="searchCourses" 
        class="bg-indigo-600 text-white cursor-pointer px-4 py-1.5 rounded-lg hover:bg-indigo-700 flex items-center gap-1.5 text-sm"
      >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>

        Filter
      </button>

      <button 
          v-if="searchQuery"
          @click="clearSearch"
          class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors duration-200"
      >
          Clear
      </button>

      <!-- Search Results Info -->
      <div v-if="searchQuery" class="mt-3 text-sm text-slate-600">
          {{ filteredCourses.length }} result(s) found for "{{ searchQuery }}"
      </div>
    </div>
  </div>

  <!-- Courses section -->
  <section class="min-h-screen p-7.5 bg-gradient-to-br from-slate-900 via-blue-50 to-purple-900">
    <div class="md:flex w-full ">

      <div class="basis-[70%]">
        <!-- Courses -->
        <div class="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-5 ">

          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>

          <!-- Courses Page v-if="currentView === 'courses'"   -->
          <div v-else class="max-w-7xl mx-auto px-4 py-8">

            <h2 class="text-2xl sm:text-3xl font-bold mb-5 text-gray-100">Browse Courses</h2>     
              
              <!-- Course Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <article 
                  v-for="course in filteredCourses" 
                  :key="course.id" 
                  class="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  >
                  
                <router-link :to="{name:'CourseDetails', params:{id: course._id }}" >

                  <!-- Image Section -->
                  <div class="relative overflow-hidden">
                      <img 
                      v-if="course.image?.url"
                      :src="course.image.url" 
                      :alt="course.title" 
                      class="w-full h-48 object-covergroup-hover:scale-105 transition-transform duration-500"
                      />

                      <div v-else
                          class="w-full h-56 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"
                          >
                          <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                      </div>

                  </div>

                  <!-- Content Section -->
                  <div class="p-6">

                    <div class="flex items-center gap-2 mb-3">
                        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span>
                                {{ course.instructor?.fullName.charAt(0)?.toUpperCase() || 'A' }}
                            </span>
                        </div>
                        <div class="text-sm text-gray-500 mt-2">
                            {{ course.instructor?.fullName || 'Anonymous' }} • 
                            {{ formatDate(course.createdAt) }}
                        </div>
                    </div>

                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-semibold text-lg">{{ course.title }}</h3>
                        <span class="text-xs bg-gray-100 px-2 py-1 rounded">{{ course.category }}</span>
                    </div>

                    <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ course.description }}</p>
                    
                    <div class="flex justify-between items-center">
                        <span class="text-indigo-600 font-bold text-xl">${{ course.price }}</span>
                        <span class="text-sm text-gray-500">
                            <i class="fas fa-users mr-1"></i>{{ course.enrollments }} 
                        </span>
                    </div>
                  
                    <!-- Action Buttons -->

                    <div class="flex items-center justify-between pt-4 border-t border-slate-100">
                        <router-link 
                            :to="{name: 'CourseDetails',params:{id: course._id} }"
                            class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm group/link"                             
                            >

                            <span>View More</span>
                            <svg class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                            </svg>
                        </router-link>

                        <div>
                            <router-link 
                                v-if="isOwner(course)"
                                :to="{name:'CourseEdit', params:{id: course._id}}"
                                class="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                            >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                            <span>
                                Edit
                            </span>
                        </router-link>
                        </div>
                    </div>
                
                  
                  </div>

                  <!-- end here -->

                </router-link>

              </article>
            
              <div class="space-x-2 items-end sticky flex justify-center ">
                <button
                    @click="fetchCourses(currentPage - 1)"
                    :disabled=" currentPage === 1"
                    class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span class="px-4 py-2">Page {{ currentPage }} of  {{ totalPages }}</span>

                <button
                    @click="fetchCourses(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
              </div>
            
            </div>

          </div>

        </div>
      </div>
     
      <!-- Right Side Bar -->
      <div class="basis-[25%]">
        <div class="sticky top-2 space-y-6 p-4">
          <!-- Recent Courses -->
          <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 ">
            <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Recent Courses
            </h3>
            <div class="space-y-3">
                <div 
                    v-for="course in recentCourses"
                    :key="course._id"
                    class="group cursor-pointer"
                >
                    <div class="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <img 
                            v-if="course.image?.url" 
                            :src="course.image.url" 
                            class="w-12 h-12 rounded-lg object-cover"
                            :alt="course.title"
                        />
                        <div v-else class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <router-link :to=" {name: 'CourseDetails' , params:{id: course._id } }" class="flex-1 min-w-0">
                            <h4 class="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                            {{ course.title }}
                            </h4>
                            <p class="text-xs text-gray-500 mt-1">
                                {{ formatDate(course.createdAt) }}
                            </p>
                        </router-link>
                    </div>
                </div>
            </div>
          </div>

          <!-- FAQs -->
           <div class="max-w-2xl bg-gray-600 text-white mx-auto p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div 
                v-for="(faq, index) in faqs" 
                :key="index" 
                class="mb-4 border-b border-white/70 pb-4 last:border-b-0"
                >
                <button 
                @click="toggleFaq(index)" 
                class="flex justify-between items-center w-full text-left font-medium text-lg focus:outline-none hover:text-blue-200 transition-colors duration-200"
                :aria-expanded="faq.open"
                :aria-controls="'faq-answer-' + index"
                >
                <span>{{ faq.question }}</span>
                <span class="text-xl font-bold ml-4 flex-shrink-0">
                    {{ faq.open ? '−' : '+' }}
                </span>
                </button>
                
                <transition name="fade">
                    <div v-if="faq.open" :id="'faq-answer-' + index" class="mt-3">
                        <p class="text-blue-100 leading-relaxed">
                        {{ faq.answer }}
                        </p>
                    </div>
                </transition>
            </div>
        </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      <div class="text-center mb-12">
        <h3 class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">What Our Learners Say</h3>
        <p class="text-gray-600 text-lg">Join thousands of students transforming their careers</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
          <div class="flex items-center mb-4">
            <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="Sarah Johnson" class="w-12 h-12 rounded-full mr-4 object-cover">
            <div>
              <h4 class="font-semibold text-gray-800">Sarah Johnson</h4>
              <p class="text-sm text-gray-500">Software Developer</p>
            </div>
          </div>
          <p class="text-gray-600 italic mb-4">"Lern Stasy changed my life! The courses are practical and the mentors are amazing. I landed my dream job in just 3 months."</p>
          <div class="flex items-center">
            <svg class="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg class="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg class="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg class="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
          <div class="flex items-center mb-4">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Mike Chen" class="w-12 h-12 rounded-full mr-4 object-cover">
            <div>
              <h4 class="font-semibold text-gray-800">Mike Chen</h4>
              <p class="text-sm text-gray-500">Data Analyst</p>
            </div>
          </div>
          <p class="text-gray-600 italic mb-4">"The progress tracking feature is a game-changer. I love how easy it is to stay motivated and see real results."</p>
          <div class="flex items-center">
            <svg class="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg class="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg class="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg class="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
          <div class="flex items-center mb-4">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" alt="Emily Rodriguez" class="w-12 h-12 rounded-full mr-4 object-cover">
            <div>
              <h4 class="font-semibold text-gray-800">Emily Rodriguez</h4>
              <p class="text-sm text-gray-500">Marketing Specialist</p>
            </div>
          </div>
          <p class="text-gray-600 italic mb-4">"Incredible community and resources. The on-demand videos fit perfectly into my busy schedule. Highly recommend!"</p>
          <div class="flex items-center">
            <svg class="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg class="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg class="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg class="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>

 <!-- Newsletter Section -->
  <section class="py-16 bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative overflow-hidden">
    <!-- Decorative Background Elements -->
    <div class="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 z-0"></div>
    <div class="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 blur-xl animate-pulse"></div>
    <div class="absolute bottom-10 right-10 w-20 h-20 bg-purple-300 rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
    
    <div class="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
      <div class="mb-8">
        <h3 class="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
          Stay Updated with New Courses
        </h3>
        <p class="text-indigo-100 text-lg max-w-2xl mx-auto leading-relaxed">
          Join our vibrant community of lifelong learners. Subscribe to our newsletter for the latest courses, expert tips, exclusive offers, and inspiring stories delivered straight to your inbox.
        </p>
      </div>
      
      <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-6">
        <input 
          v-model="email" 
          type="email" 
          required
          placeholder="Enter your email address" 
          class="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-yellow-300 focus:outline-none bg-white/90 backdrop-blur-sm border border-white/20 transition-all duration-300"
        >
        <button 
          type="submit"
          :disabled="submitting"
          class="bg-yellow-400 text-indigo-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span v-if="submitting">Subscribing...</span>
          <span v-else>Subscribe Now</span>
          <svg v-if="!submitting" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </button>
      </form>
      
      <!-- Success/Error Messages -->
      <transition name="fade">
        <div v-if="message" :class="['text-sm px-4 py-2 rounded-lg mb-4', success ? 'bg-green-500/20 border border-green-400' : 'bg-red-500/20 border border-red-400']">
          {{ message }}
        </div>
      </transition>
      
      <p class="text-sm text-indigo-200">No spam, ever. We respect your privacy. Unsubscribe at any time with one click.</p>
    </div>
  </section>

</template>

<script>
import api from '../services/api';
import { auth } from '../services/auth';
import { reactive } from "vue";

    export default{
        data(){
            return{
                courses: [],
                loading: false,
                searchQuery: '',

                currentPage: 1,   // which page user is on
                totalPages: 10,    // total number of pages from backend
                limit: 8  ,

                // subcribe

                email: '',
                submitting: false,
                message: '',
                success: false 
            }
        },

        computed:{
            currentUser(){
                return auth.user
            },
             // filterCoures
            filteredCourses(){
                if (!this.searchQuery.trim()) {
                    return this.courses
                }
                const query = this.searchQuery.toLowerCase();
                return this.courses.filter(course => 
                    course.title?.toLowerCase().includes(query) ||
                    course.description?.toLowerCase().includes(query) ||
                    course.instructor?.userName?.toLowerCase().includes(query) ||
                    course.category?.toLowerCase().includes(query) ||
                    course.tags?.some(tag => tag.toLowerCase().includes(query))
                );
            },

            recentCourses(){
              return [...this.courses]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5);
            }

        },

        methods:{
            async fetchCourses(page = 1){
                this.loading = true;

                try {
                  
                  const res = await api.get(`/courses?page=${page}&limit=${this.limit}`)
                  this.courses = res.data.courses;
                  this.totalPages = res.data.pages
                  this.currentPage = res.data.page

                } catch (err) {
                    console.error('Error fetching courses', err);

                } finally{
                    this.loading = false;
                }
            },

            isOwner(course){
                return course.instructor && auth.user && course.instructor._id === user.id
            },

            searchCourses(){
              console.log('Searching for:', this.searchQuery);
            },

            clearSearch() {
                this.searchQuery = '';
            },

            searchByTag(tagName) {
                this.searchQuery = tagName;
            },

            formatDate(dateString){
                if (!dateString) return '' ;

                const date = new Date(dateString);
                return date.toLocaleDateString('en-US',{
                    month: 'short',
                    day: 'numeric',
                    year:'numeric'
                });
             }
        },

        mounted(){
          this.fetchCourses();
        },

        setup(){
            const faqs = reactive ([
                {
                  question: "What is Lern Stasy?",
                  answer: "Lern Stasy is an online learning platform offering high-quality courses to help you master new skills and advance your career.",
                  open: false,
                },
                {
                  question: "How often are new courses published?",
                  answer: "We regularly add new courses to keep our library fresh and relevant to emerging trends and learner needs.",
                  open: false,
                },
                {
                  question: "Can I become an instructor?",
                  answer: "Yes! If you have expertise to share, apply to become an instructor and start creating courses today.",
                  open: false,
                },

            ])

            
            function toggleFaq(index) {
                faqs[index].open = !faqs[index].open
            }

            return {
                faqs,
                toggleFaq
            }
        }
    
    }

</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>