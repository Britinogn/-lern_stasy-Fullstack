<template>
    <div class="min-h-screen bg-gray-50 pt">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Header -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">Create New Lesson</h1>
                        <p class="text-gray-600 mt-1">Add a lesson to your course</p>
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

            <!-- Form -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="p-8">
                    <form @submit.prevent="createLesson" class="space-y-6">
                        <!-- Title -->
                        <div class="space-y-2">
                            <label class="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                </svg>
                                Lesson Title
                                <span class="text-red-500">*</span>
                            </label>
                            <input 
                                v-model="form.title" 
                                type="text"
                                class="w-full text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-lg transition-all" 
                                placeholder="e.g., Introduction to Vue Components"
                                required 
                            />
                            <p class="text-sm text-gray-500">{{ form.title.length }}/100 characters</p>
                        </div>

                        <!-- Content -->
                        <div class="space-y-2">
                            <label class="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                                Lesson Content
                                <span class="text-red-500">*</span>
                            </label>
                            <textarea 
                                v-model="form.content" 
                                rows="10" 
                                class="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-lg transition-all resize-none" 
                                placeholder="Write the lesson content here. Include key concepts, explanations, and examples..."
                                required
                            ></textarea>
                            <p class="text-sm text-gray-500">{{ form.content.length }} characters</p>
                        </div>

                        <!-- Video Upload -->
                        <div class="space-y-3">
                            <label class="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                </svg>
                                Lesson Video
                            </label>

                            <div class="relative">
                                <input 
                                    type="file" 
                                    @change="onVideoChange" 
                                    accept="video/*" 
                                    class="hidden"
                                    ref="videoInput"
                                    id="video-upload"
                                />
                                <label 
                                    for="video-upload"
                                    class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg cursor-pointer bg-gray-50 hover:bg-blue-50 transition-all group"
                                >
                                    <svg class="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                    </svg>
                                    <p class="text-gray-600 group-hover:text-blue-700 font-medium">Click to upload video</p>
                                    <p class="text-sm text-gray-400">MP4, MOV, AVI up to 500MB</p>
                                </label>
                            </div>

                            <div v-if="videoPreview" class="relative">
                                <video 
                                    :src="videoPreview" 
                                    controls
                                    class="w-full max-w-2xl h-64 rounded-lg border-2 border-gray-200 shadow-lg bg-black" 
                                ></video>
                                <button
                                    type="button"
                                    @click="removeVideo"
                                    class="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                                <p class="text-sm text-gray-600 mt-2">Video size: {{ formatFileSize(videoFile.size) }}</p>
                            </div>
                        </div>

                        <!-- Video Link (Alternative) -->
                        <div class="space-y-2">
                            <label class="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                                </svg>
                                Video Link (YouTube, Vimeo, etc.)
                            </label>
                            <input 
                                v-model="form.videoLink" 
                                type="url"
                                class="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-lg transition-all" 
                                placeholder="https://www.youtube.com/watch?v=..."
                            />
                            <p class="text-sm text-gray-500">Or provide a link to an external video</p>
                        </div>

                        <!-- Duration -->
                        <div class="space-y-2">
                            <label class="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                Duration (minutes)
                                <span class="text-red-500">*</span>
                            </label>
                            <input 
                                v-model.number="form.duration" 
                                type="number"
                                min="1"
                                step="1"
                                class="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-lg transition-all" 
                                placeholder="e.g., 15"
                                required 
                            />
                            <p class="text-sm text-gray-500">Estimated lesson duration in minutes</p>
                        </div>

                        <!-- Comments Enabled -->
                        <div class="space-y-2">
                            <label class="flex items-center gap-3 cursor-pointer">
                                <input 
                                    v-model="form.commentsEnabled" 
                                    type="checkbox"
                                    class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <span class="text-sm font-semibold text-gray-900">Enable comments for this lesson</span>
                            </label>
                            <p class="text-sm text-gray-500 ml-8">Allow students to ask questions and discuss</p>
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
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                                </svg>
                                {{ loading ? 'Creating...' : 'Create Lesson' }}
                            </button>

                            <button
                                type="button"
                                @click="saveDraft"
                                class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"/>
                                </svg>
                                Save Draft
                            </button>

                            <router-link 
                                :to="`/courses/${courseId}`"
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
</template>

<script>
import api from '../services/api'

export default {
    name: 'LessonCreate',
    
    data() {
        return {
            courseId: null,
            form: {
                title: '',
                content: '',
                videoLink: '',
                duration: null,
                commentsEnabled: true
            },
            videoFile: null,
            videoPreview: null,
            loading: false,
            error: '',
            successMessage: ''
        }
    },

    computed: {
        isFormValid() {
            return this.form.title.trim().length > 0 && 
                   this.form.content.trim().length > 0 &&
                   this.form.duration > 0;
        }
    },

    methods: {
        onVideoChange(e) {
            const file = e.target.files[0];
            if (!file) {
                this.removeVideo();
                return;
            }

            // Validate file size (500MB limit)
            if (file.size > 500 * 1024 * 1024) {
                this.error = 'Video file size must be less than 500MB';
                e.target.value = '';
                return;
            }
            
            // Validate file type 
            if (!file.type.startsWith('video/')) {
                this.error = 'Please select a valid video file';
                e.target.value = '';
                return;
            }

            this.videoFile = file;
            this.videoPreview = URL.createObjectURL(file);
            this.error = '';
        },

        removeVideo() {
            if (this.videoPreview) {
                URL.revokeObjectURL(this.videoPreview);
            }
            this.videoFile = null;
            this.videoPreview = null;
            if (this.$refs.videoInput) {
                this.$refs.videoInput.value = '';
            }
        },

        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
        },

        saveDraft() {
            this.successMessage = 'Draft saved locally';
            setTimeout(() => {
                this.successMessage = '';
            }, 3000);

            localStorage.setItem(`lessonDraft_${this.courseId}`, JSON.stringify({
                title: this.form.title,
                content: this.form.content,
                videoLink: this.form.videoLink,
                duration: this.form.duration,
                commentsEnabled: this.form.commentsEnabled,
                timestamp: new Date().toISOString()
            }));
        },

        loadDraft() {
            const draft = localStorage.getItem(`lessonDraft_${this.courseId}`);
            if (draft) {
                try {
                    const parsed = JSON.parse(draft);
                    if (confirm('Load saved draft?')) {
                        this.form.title = parsed.title || '';
                        this.form.content = parsed.content || '';
                        this.form.videoLink = parsed.videoLink || '';
                        this.form.duration = parsed.duration || null;
                        this.form.commentsEnabled = parsed.commentsEnabled !== undefined ? parsed.commentsEnabled : true;
                    }
                } catch (e) {
                    console.error('Error loading draft:', e);
                }
            }
        },

        async createLesson() {
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
            fd.append('courseId', this.courseId);
            fd.append('title', this.form.title.trim());
            fd.append('content', this.form.content.trim());
            fd.append('videoLink', this.form.videoLink.trim());
            fd.append('duration', this.form.duration);
            fd.append('commentsEnabled', this.form.commentsEnabled);

            if (this.videoFile) {
                fd.append('video', this.videoFile);
            }

            this.loading = true;
            
            try {
                const res = await api.post(`/courses/${this.courseId}/lessons`, fd);

                // Clear draft
                localStorage.removeItem(`lessonDraft_${this.courseId}`);

                this.successMessage = 'Lesson created successfully!';

                setTimeout(() => {
                    this.$router.push({
                        name: 'CourseDetails',
                        params: { id: res.data._id }
                    });
                }, 1500);

            } catch (err) {
                console.error('Error creating lesson:', err);
                console.error('Error response:', err.response);
                this.error = err.response?.data?.message || err.message || 'Failed to create lesson. Please try again.';
            } finally {
                this.loading = false;
            }
        }
    },

    mounted() {
        this.courseId = this.$route.params.id || this.$route.query.courseId;
        if (!this.courseId) {
            this.error = 'No course ID provided';
            return;
        }
        this.loadDraft();
    },

    beforeUnmount() {
        if (this.videoPreview) {
            URL.revokeObjectURL(this.videoPreview);
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