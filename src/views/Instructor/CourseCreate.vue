<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-400 via-white to-blue-500">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Header Section -->
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
                Create New Course
                </h1>
                <p class="text-slate-600 text-lg">Fill in the details below to publish your course</p>
            </div>

            <!-- Main Form -->
            <div class="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <div class="p-8 md:p-12">
                    <form @submit.prevent="submit" class="space-y-8">
                        <!-- Title Input -->
                        <div class="space-y-3">
                            <label class="flex items-center gap-2 text-lg font-semibold text-slate-900">
                                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                </svg>
                                Course Title
                                <span class="text-red-500">*</span>
                            </label>
                            <input 
                                v-model="title" 
                                type="text"
                                class="w-full text-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-6 py-4 rounded-xl transition-all duration-200 placeholder-slate-400" 
                                placeholder="Enter an engaging title for your course..."
                                required 
                            />
                            <p class="text-sm text-slate-500">{{ title.length }}/100 characters</p>
                        </div>

                        <!-- Description Textarea -->
                        <div class="space-y-3">
                            <label class="flex items-center gap-2 text-lg font-semibold text-slate-900">
                                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                                Description
                                <span class="text-red-500">*</span>
                            </label>
                            <textarea 
                                v-model="description" 
                                rows="12" 
                                class="w-full text-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-6 py-4 rounded-xl transition-all duration-200 placeholder-slate-400 resize-none" 
                                placeholder="Describe what students will learn in this course..."
                                required
                            ></textarea>
                            <div class="flex justify-between items-center">
                                <p class="text-sm text-slate-500">{{ description.length }} characters</p>
                            </div>
                        </div>

                        <!-- Category and Price -->
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="space-y-3">
                                <label class="flex items-center gap-2 text-lg font-semibold text-slate-900">
                                    <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                                    </svg>
                                    Category
                                    <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    v-model="category" 
                                    type="text"
                                    class="w-full border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-6 py-4 rounded-xl transition-all duration-200 placeholder-slate-400" 
                                    placeholder="e.g., Web Development"
                                    required 
                                />  
                            </div>

                            <div class="space-y-3">
                                <label class="flex items-center gap-2 text-lg font-semibold text-slate-900">
                                    <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    Price
                                    <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    v-model.number="price" 
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    class="w-full border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-6 py-4 rounded-xl transition-all duration-200 placeholder-slate-400" 
                                    placeholder="0.00"
                                    required 
                                />
                            </div>
                        </div>

                        <!-- Tags Input -->
                        <div class="space-y-3">
                            <label class="flex items-center gap-2 text-lg font-semibold text-slate-900">
                                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                                </svg>
                                Tags
                            </label>
                            <input 
                                v-model="tags" 
                                type="text"
                                class="w-full border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-6 py-4 rounded-xl transition-all duration-200 placeholder-slate-400" 
                                placeholder="vue, javascript, tutorial, web-development"
                            />
                            <p class="text-sm text-slate-500">Separate tags with commas to help students discover your course</p>
                            <div v-if="tagList.length > 0" class="flex flex-wrap gap-2">
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
                        <div class="space-y-4">
                            <label class="flex items-center gap-2 text-lg font-semibold text-slate-900">
                                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                Course Image
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
                                class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50 transition-all duration-200 group"
                                >
                                <svg class="w-8 h-8 text-slate-400 group-hover:text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                </svg>
                                <p class="text-slate-600 group-hover:text-blue-700 font-medium">Click to upload an image</p>
                                <p class="text-sm text-slate-400">PNG, JPG, GIF up to 10MB</p>
                                </label>
                            </div>

                            <div v-if="preview" class="relative inline-block">
                                <img 
                                :src="preview" 
                                class="w-full max-w-md h-48 object-cover rounded-xl border-2 border-slate-200 shadow-lg" 
                                alt="Preview"
                                />
                                <button
                                type="button"
                                @click="removeImage"
                                class="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                                >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Published Status -->
                        <div class="space-y-3">
                            <label class="flex items-center gap-3 cursor-pointer">
                                <input 
                                    v-model="isPublished" 
                                    type="checkbox"
                                    class="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <span class="text-lg font-semibold text-slate-900">Publish course immediately</span>
                            </label>
                            <p class="text-sm text-slate-500 ml-8">If unchecked, course will be saved as draft</p>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-slate-200">
                            <button 
                                type="submit"
                                :disabled="loading || !isFormValid"
                                class="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed"
                            >
                                <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                                </svg>
                                {{ loading ? 'Creating...' : 'Create Course' }}
                            </button>

                            <div class="flex items-center gap-4">
                                <button
                                type="button"
                                @click="saveDraft"
                                class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-all duration-200"
                                >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"/>
                                </svg>
                                Save Draft
                                </button>

                                <router-link 
                                to="/dashboard" 
                                class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-all duration-200"
                                >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                                Cancel
                                </router-link>
                            </div>
                        </div>

                        <!-- Error Message -->
                        <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-xl">
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <p class="text-red-700 font-medium">{{ error }}</p>
                            </div>
                        </div>

                        <!-- Success Message -->
                        <div v-if="successMessage" class="p-4 bg-green-50 border border-green-200 rounded-xl">
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
</template>

<script>
import api from '../../services/api'

export default {
    name: 'CourseCreate',
    data() {
        return {
            title: '',
            description: '',
            category: '',
            price: 0,
            tags: '',
            isPublished: false,
            file: null,
            preview: null,
            loading: false,
            error: '',
            successMessage: ''
        }
    },

    computed: {
        isFormValid() {
            return this.title.trim().length > 0 && 
                   this.description.trim().length > 0 &&
                   this.category.trim().length > 0 &&
                   this.price >= 0;
        },
        tagList() {
            return this.tags ? this.tags.split(',').filter(tag => tag.trim()) : [];
        }
    },

    methods: {
        onFileChange(e) {
            const f = e.target.files[0];
            if (!f) {
                this.removeImage();
                return;
            }

            // Validate file size (10mb limit)
            if (f.size > 10 * 1024 * 1024) {
                this.error = 'Image file size must be less than 10MB';
                e.target.value = '';
                return;
            }
            
            // Validate file type 
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
            this.$refs.fileInput.value = '';
        },

        async saveDraft() {
            this.successMessage = 'Draft saved locally';
            setTimeout(() => {
                this.successMessage = '';
            }, 3000);

            // Save draft locally to localStorage
            localStorage.setItem('courseDraft', JSON.stringify({
                title: this.title,
                description: this.description,
                category: this.category,
                price: this.price,
                tags: this.tags,
                isPublished: this.isPublished,
                timestamp: new Date().toISOString()
            }));
        },

        async submit() {
            this.error = '';
            this.successMessage = '';
            
            if (!this.isFormValid) {
                this.error = 'Please fill in all required fields';
                return;
            }

            if (this.title.length > 100) {
                this.error = 'Title must be 100 characters or less';
                return;
            }

            const fd = new FormData();
            fd.append('title', this.title.trim());
            fd.append('description', this.description.trim());
            fd.append('category', this.category.trim());
            fd.append('price', this.price);
            fd.append('tags', this.tags.trim());
            fd.append('isPublished', this.isPublished);

            if (this.file) {
                fd.append('image', this.file);
            }

            this.loading = true;
            
            try {
                const res = await api.post('/courses', fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // Clear draft from localStorage
                localStorage.removeItem('courseDraft');

                // Show success and redirect
                this.successMessage = 'Course created successfully!';

                setTimeout(() => {
                    this.$router.push({
                        name: 'CourseDetails',
                        params: { id: res.data._id }
                    });
                }, 1500);

            } catch (err) {
                console.error('Error creating course:', err);
                this.error = err.response?.data?.message || 'Failed to create course. Please try again.';
            } finally {
                this.loading = false;
            }
        },

        loadDraft() {
            const draft = localStorage.getItem('courseDraft');
            if (draft) {
                try {
                    const parsed = JSON.parse(draft);
                    if (confirm('Load saved draft?')) {
                        this.title = parsed.title || '';
                        this.description = parsed.description || '';
                        this.category = parsed.category || '';
                        this.price = parsed.price || 0;
                        this.tags = parsed.tags || '';
                        this.isPublished = parsed.isPublished || false;
                    }
                } catch (e) {
                    console.error('Error loading draft:', e);
                }
            }
        },
    },

    mounted() {
        this.loadDraft();
    },

    beforeUnmount() {
        if (this.preview) {
            URL.revokeObjectURL(this.preview);
        }
    },
}
</script>

<style scoped>
textarea:focus,
input:focus {
  outline: none;
}
</style>