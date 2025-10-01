<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Course Editor</h1>

    <div v-if="loading" class="text-gray-500">Loading course...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <div v-else>
      <form @submit.prevent="updateCourse" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Title</label>
          <input v-model="course.title" class="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div>
          <label class="block text-sm font-medium">Description</label>
          <textarea v-model="course.description" class="w-full px-3 py-2 border rounded-lg"></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium">Category</label>
          <input v-model="course.category" class="w-full px-3 py-2 border rounded-lg" />
        </div>

        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Save Changes
        </button>
      </form>

      <!-- Link to add lessons -->
      <div class="mt-6">
        <router-link 
          :to="{ name: 'InstructorLessonEditor', query: { courseId: course._id } }"
          class="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          ➕ Add Lesson
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../services/api'

export default {
  data() {
    return {
      course: null,
      loading: true,
      error: null
    }
  },
  async created() {
    const courseId = this.$route.params.id
    try {
      const res = await api.get(`/courses/${courseId}`)
      this.course = res.data
    } catch (err) {
      this.error = "Failed to load course"
    } finally {
      this.loading = false
    }
  },
  methods: {
    async updateCourse() {
      try {
        await api.put(`/courses/${this.course._id}`, this.course)
        alert("Course updated successfully")
      } catch (err) {
        this.error = "Failed to update course"
      }
    }
  }
}
</script>
