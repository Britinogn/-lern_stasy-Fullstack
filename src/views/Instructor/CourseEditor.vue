<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Loading State -->
            <div v-if="loadingCourse" class="flex items-center justify-center h-64">
                <div class="text-center">
                    <svg class="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p class="text-gray-600">Loading course...</p>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="loadError" class="bg-red-50 border border-red-200 rounded-xl p-6">
                <div class="flex items-center gap-3">
                    <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                        <h3 class="text-red-800 font-semibold">Failed to load course</h3>
                        <p class="text-red-600">{{ loadError }}</p>
                    </div>
                </div>
                <button 
                    @click="loadCourse" 
                    class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    Retry
                </button>
            </div>

            <!-- Editor Form -->
            <div v-else>
                <!-- Header -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900">Edit Course</h1>
                            <p class="text-gray-600 mt-1">Update your course details</p>
                        </div>
                        <router-link 
                            :to="`/courses/${courseId}`"
                            class="text-gray-600 hover:text-gray-900"
                        >
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </router-link>
                    </div>
                </div>

                <!-- Main Form -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-8">
                        <form @submit.prevent="updateCourse" class="space-y-6">
                            <!-- Current Image Preview -->
                            <div v-if="currentImage && !preview" class="space-y-3">
                                <label class="block text-sm font-semibold text-gray-900">Current Image</label>
                                <div class="relative inline-block">
                                    <img 
                                        :src="currentImage" 
                                        class="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200" 
                                        alt="Current course image"
                                    />
                                </div>
                            </div>

                            <!-- Title -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-gray-900">
                                    Course Title <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    v-model="form.title" 
                                    type="text"
                                    class="w-full text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-lg transition-all" 
                                    placeholder="Enter course title..."
                                    required 
                                />
                                <p class="text-sm text-gray-500">{{ form.title.length }}/100 characters</p>
                            </div>

                            <!-- Description -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-gray-900">
                                    Description <span class="text-red-500">*</span>
                                </label>
                                <textarea 
                                    v-model="form.description" 
                                    rows="8" 
                                    class="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-lg transition-all resize-none" 
                                    placeholder="Describe your course..."
                                    required
                                ></textarea>
                                <p class="text-sm text-gray-500">{{ form.description.length }} characters</p>
                            </div>

                            <!-- Category and Price -->
                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="block text-sm font-semibold text-gray-900">
                                        Category <span class="text-red-500">*</span>
                                    </label>
                                    <input 
                                        v-model="form.category" 
                                        type="text"
                                        class="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-lg transition-all" 
                                        placeholder="e.g., Web Development"
                                        required 
                                    />
                                </div>

                                <div class="space-y-2">
                                    <label class="block text-sm font-semibold text-gray-900">
                                        Price <span class="text-red-500">*</span>
                                    </label>
                                    <input 
                                        v-model.number="form.price" 
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        class="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-lg transition-all" 
                                        placeholder="0.00"
                                        required 
                                    />
                                </div>
                            </div>

                            <!-- Tags -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-gray-900">Tags</label>
                                <input 
                                    v-model="form.tags" 
                                    type="text"
                                    class="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-lg transition-all" 
                                    placeholder="vue, javascript, web-development"
                                />
                                <p class="text-sm text-gray-500">Separate tags with commas</p>
                                <div v-if="tagList.length > 0" class="flex flex-wrap gap-2 mt-2">
                                    <span 
                                        v-for="tag in tagList" 
                                        :key="tag"
                                        class="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                                    >
                                        {{ tag.trim() }}
                                    </span>
                                </div>
                            </div>

                            <!-- Image Upload -->
                            <div class="space-y-3">
                                <label class="block text-sm font-semibold text-gray-900">
                                    Update Course Image
                                </label>
                                
                                <div class="relative">
                                    <input 
                                        type="file" 
                                        @change="onFileChange" 
                                        accept="image/*" 
                                        class="hidden"
                                        ref="fileInput"
                                        id="image-upload"
                                    />
                                    <label 
                                        for="image-upload"
                                        class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg cursor-pointer bg-gray-50 hover:bg-blue-50 transition-all group"
                                    >
                                        <svg class="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                        </svg>
                                        <p class="text-gray-600 group-hover:text-blue-700 font-medium">Click to upload new image</p>
                                        <p class="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                    </label>
                                </div>

                                <div v-if="preview" class="relative inline-block">
                                    <img 
                                        :src="preview" 
                                        class="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200 shadow-lg" 
                                        alt="New image preview"
                                    />
                                    <button
                                        type="button"
                                        @click="removeImage"
                                        class="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Published Status -->
                            <div class="space-y-2">
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input 
                                        v-model="form.isPublished" 
                                        type="checkbox"
                                        class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span class="text-sm font-semibold text-gray-900">Publish course</span>
                                </label>
                                <p class="text-sm text-gray-500 ml-8">Make this course visible to students</p>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-200">
                                <button 
                                    type="submit"
                                    :disabled="loading || !isFormValid"
                                    class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed"
                                >
                                    <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                    </svg>
                                    {{ loading ? 'Saving...' : 'Save Changes' }}
                                </button>

                                <button
                                    type="button"
                                    @click="resetForm"
                                    class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                    </svg>
                                    Reset
                                </button>

                                <router-link 
                                    to="/courses" 
                                    class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                    Cancel
                                </router-link>
                            </div>

                            <!-- Messages -->
                            <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div class="flex items-center gap-2">
                                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <p class="text-red-700 font-medium">{{ error }}</p>
                                </div>
                            </div>

                            <div v-if="successMessage" class="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div class="flex items-center gap-2">
                                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <p class="text-green-700 font-medium">{{ successMessage }}</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../services/api'

export default {
    name: 'CourseEditor',
    
    data() {
        return {
            courseId: null,
            loadingCourse: true,
            loadError: null,
            originalCourse: null,
            currentImage: null,
            form: {
                title: '',
                description: '',
                category: '',
                price: 0,
                tags: '',
                isPublished: false
            },
            file: null,
            preview: null,
            loading: false,
            error: '',
            successMessage: ''
        }
    },

    computed: {
        isFormValid() {
            return this.form.title.trim().length > 0 && 
                   this.form.description.trim().length > 0 &&
                   this.form.category.trim().length > 0 &&
                   this.form.price >= 0;
        },
        tagList() {
            return this.form.tags ? this.form.tags.split(',').filter(tag => tag.trim()) : [];
        }
    },

    methods: {
        async loadCourse() {
            this.loadingCourse = true;
            this.loadError = null;

            try {
                const response = await api.get(`/api/courses/${this.courseId}`);
                const course = response.data;
                
                this.originalCourse = { ...course };
                this.currentImage = course.image;
                
                this.form = {
                    title: course.title || '',
                    description: course.description || '',
                    category: course.category || '',
                    price: course.price || 0,
                    tags: Array.isArray(course.tags) ? course.tags.join(', ') : (course.tags || ''),
                    isPublished: course.isPublished || false
                };

            } catch (err) {
                console.error('Error loading course:', err);
                this.loadError = err.response?.data?.message || 'Failed to load course';
            } finally {
                this.loadingCourse = false;
            }
        },

        onFileChange(e) {
            const f = e.target.files[0];
            if (!f) {
                this.removeImage();
                return;
            }

            if (f.size > 10 * 1024 * 1024) {
                this.error = 'Image file size must be less than 10MB';
                e.target.value = '';
                return;
            }
            
            if (!f.type.startsWith('image/')) {
                this.error = 'Please select a valid image file';
                e.target.value = '';
                return;
            }

            this.file = f;
            this.preview = URL.createObjectURL(f);
            this.error = '';
        },

        removeImage() {
            if (this.preview) {
                URL.revokeObjectURL(this.preview);
            }
            this.file = null;
            this.preview = null;
            if (this.$refs.fileInput) {
                this.$refs.fileInput.value = '';
            }
        },

        resetForm() {
            if (this.originalCourse) {
                this.form = {
                    title: this.originalCourse.title || '',
                    description: this.originalCourse.description || '',
                    category: this.originalCourse.category || '',
                    price: this.originalCourse.price || 0,
                    tags: Array.isArray(this.originalCourse.tags) ? this.originalCourse.tags.join(', ') : (this.originalCourse.tags || ''),
                    isPublished: this.originalCourse.isPublished || false
                };
            }
            this.removeImage();
            this.error = '';
            this.successMessage = '';
        },

        async updateCourse() {
            this.error = '';
            this.successMessage = '';
            
            if (!this.isFormValid) {
                this.error = 'Please fill in all required fields';
                return;
            }

            if (this.form.title.length > 100) {
                this.error = 'Title must be 100 characters or less';
                return;
            }

            const fd = new FormData();
            fd.append('title', this.form.title.trim());
            fd.append('description', this.form.description.trim());
            fd.append('category', this.form.category.trim());
            fd.append('price', this.form.price);
            fd.append('tags', this.form.tags.trim());
            fd.append('isPublished', this.form.isPublished);

            if (this.file) {
                fd.append('image', this.file);
            }

            this.loading = true;
            
            try {
                const response = await api.put(`/api/courses/${this.courseId}`, fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                this.successMessage = 'Course updated successfully!';
                this.originalCourse = response.data;
                
                if (response.data.image) {
                    this.currentImage = response.data.image;
                }
                
                this.removeImage();

                setTimeout(() => {
                    this.successMessage = '';
                }, 3000);

            } catch (err) {
                console.error('Error updating course:', err);
                console.error('Error response:', err.response);
                this.error = err.response?.data?.message || err.message || 'Failed to update course';
            } finally {
                this.loading = false;
            }
        }
    },

    async mounted() {
        this.courseId = this.$route.params.id;
        if (!this.courseId) {
            this.loadError = 'No course ID provided';
            this.loadingCourse = false;
            return;
        }
        await this.loadCourse();
    },

    beforeUnmount() {
        if (this.preview) {
            URL.revokeObjectURL(this.preview);
        }
    }
}
</script>

<style scoped>
textarea:focus,
input:focus {
  outline: none;
}
</style>