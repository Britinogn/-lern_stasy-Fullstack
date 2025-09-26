<template>
  <section>
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-indigo-600 to-purple-700 text-white min-h-screen flex items-center relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 grid md:grid-cols-2 gap-12 items-center">
        <!-- Left Content -->
        <div class="text-center md:text-left z-10">
          <h2 class="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Ignite Your <span class="text-yellow-300">Future</span>
          </h2>
          <p class="text-sm md:text-lg lg:text-xl mb-8 opacity-95 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Dive into a world of knowledge. Master new skills, shape your destiny, 
            and join a community passionate about <span class="font-semibold">limitless growth</span>.
          </p>
          <button 
            @click="currentView = 'courses'"
            class="bg-yellow-300 text-indigo-900 px-10 py-4 rounded-lg text-lg font-bold hover:bg-yellow-400 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Begin Your Adventure
          </button>
        </div>

        <!-- Right Image with Enhanced Styling Around It -->
        <div class="hidden md:block relative p-4 bg-white/5 rounded-xl ring-2 ring-white/20 shadow-xl">
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

    <!-- Features Section -->
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
</template>