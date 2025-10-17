<template>
  <!-- Modal Overlay -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="close"
      >
        <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
            <h2 class="text-2xl font-bold text-gray-900">Recommend Jordan</h2>
            <button
              @click="close"
              class="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Your Name <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Jane Smith"
              />
            </div>

            <!-- Title/Company -->
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
                  Your Title
                </label>
                <input
                  id="title"
                  v-model="formData.title"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Senior Engineer"
                />
              </div>
              <div>
                <label for="company" class="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  id="company"
                  v-model="formData.company"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Acme Corp"
                />
              </div>
            </div>

            <!-- Relationship -->
            <div>
              <label for="relationship" class="block text-sm font-medium text-gray-700 mb-2">
                Your Relationship
              </label>
              <input
                id="relationship"
                v-model="formData.relationship"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Colleague at PowerAuctions, Former Manager"
              />
            </div>

            <!-- GitHub Username -->
            <div>
              <label for="github" class="block text-sm font-medium text-gray-700 mb-2">
                GitHub Username
              </label>
              <div class="flex items-center gap-2">
                <span class="text-gray-500">@</span>
                <input
                  id="github"
                  v-model="formData.githubUsername"
                  type="text"
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="username"
                />
              </div>
            </div>

            <!-- Skills -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Skills to Recommend
              </label>
              <p class="text-sm text-gray-500 mb-3">Select skills you'd like to endorse Jordan for</p>
              <div class="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 border border-gray-200 rounded-lg">
                <button
                  v-for="skill in availableSkills"
                  :key="skill"
                  type="button"
                  @click="toggleSkill(skill)"
                  class="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                  :class="formData.skillRecommendations.includes(skill)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                >
                  {{ skill }}
                </button>
              </div>
            </div>

            <!-- Testimonial -->
            <div>
              <label for="testimonial" class="block text-sm font-medium text-gray-700 mb-2">
                Your Recommendation <span class="text-red-500">*</span>
              </label>
              <p class="text-sm text-gray-500 mb-2">
                Share your experience working with Jordan or what makes them a great engineer
              </p>
              <textarea
                id="testimonial"
                v-model="formData.testimonial"
                required
                rows="5"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Jordan is an exceptional engineer who..."
              ></textarea>
              <div class="text-sm text-gray-500 mt-1 text-right">
                {{ formData.testimonial.length }} characters
              </div>
            </div>

            <!-- Photo Upload -->
            <div>
              <label for="photo" class="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo (Optional)
              </label>
              <p class="text-sm text-gray-500 mb-2">
                Add a photo to make your recommendation more personal (max 500KB recommended)
              </p>
              <input
                id="photo"
                type="file"
                accept="image/*"
                @change="handlePhotoUpload"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              <div v-if="photoPreview" class="mt-3">
                <img :src="photoPreview" alt="Preview" class="w-20 h-20 rounded-full object-cover border-2 border-gray-200" />
              </div>
            </div>

            <!-- Info Note -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex gap-3">
                <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="text-sm text-blue-800">
                  <p class="font-medium mb-1">How it works:</p>
                  <p>Your recommendation will be submitted as a GitHub issue for Jordan to review. Once approved, it will automatically be added to this page. No GitHub account required!</p>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex gap-3">
                <svg class="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm text-red-800">{{ error }}</p>
              </div>
            </div>

            <!-- Success Message -->
            <div v-if="success" class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex gap-3">
                <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="text-sm text-green-800">
                  <p class="font-medium mb-1">Recommendation submitted successfully!</p>
                  <p>Your recommendation has been created as a GitHub issue. Jordan will review it and approve it for publication. You can track the status via the issue that just opened.</p>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-4 pt-4">
              <button
                type="submit"
                :disabled="isSubmitting || success"
                class="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium
                       hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
              >
                <svg v-if="isSubmitting" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isSubmitting ? 'Submitting...' : 'Submit Recommendation' }}</span>
              </button>
              <button
                type="button"
                @click="close"
                :disabled="isSubmitting"
                class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium
                       hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

// Available skills from SkillsFilter
const availableSkills = [
  'TypeScript', 'React', 'Next.js', 'Vue.js', 'Ember.js', 'Performance Optimization',
  'Ruby on Rails', 'Elixir/Phoenix', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets',
  'Docker', 'AWS', 'GitLab CI/CD', 'Microservices',
  'MCP Development', 'OpenAI/Anthropic APIs', 'Developer Tooling',
  'Frontend Architecture', 'Mentorship', 'Technical Leadership'
]

const formData = ref({
  name: '',
  title: '',
  company: '',
  relationship: '',
  githubUsername: '',
  skillRecommendations: [] as string[],
  testimonial: '',
  photo: '',
  photoFileName: ''
})

const photoPreview = ref<string | null>(null)
const isSubmitting = ref(false)
const error = ref('')
const success = ref(false)

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    resetForm()
  }
})

function toggleSkill(skill: string) {
  const index = formData.value.skillRecommendations.indexOf(skill)
  if (index > -1) {
    formData.value.skillRecommendations.splice(index, 1)
  } else {
    formData.value.skillRecommendations.push(skill)
  }
}

async function handlePhotoUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  // File size limits
  const MAX_SIZE = 500 * 1024 // 500KB max recommended
  const WARN_SIZE = 200 * 1024 // 200KB warning threshold

  // Check file size
  if (file.size > MAX_SIZE) {
    error.value = `Photo is too large (${(file.size / 1024).toFixed(0)}KB). Maximum size is 500KB. Please resize or compress your image.`
    target.value = ''
    photoPreview.value = null
    return
  }

  // Warning for larger files
  if (file.size > WARN_SIZE) {
    error.value = `Photo size: ${(file.size / 1024).toFixed(0)}KB. Larger images (>200KB) will be added as comments instead of inline.`
  } else {
    error.value = ''
  }

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    photoPreview.value = e.target?.result as string
    formData.value.photo = e.target?.result as string
    formData.value.photoFileName = file.name
  }
  reader.readAsDataURL(file)
}

async function handleSubmit() {
  error.value = ''
  isSubmitting.value = true

  try {
    // Call the Netlify serverless function to create the GitHub issue
    const response = await fetch('/.netlify/functions/create-recommendation-issue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.value.name,
        title: formData.value.title || undefined,
        company: formData.value.company || undefined,
        relationship: formData.value.relationship || undefined,
        githubUsername: formData.value.githubUsername || undefined,
        skillRecommendations: formData.value.skillRecommendations.length > 0
          ? formData.value.skillRecommendations
          : undefined,
        testimonial: formData.value.testimonial,
        photo: formData.value.photo || undefined,
        photoFileName: formData.value.photoFileName || undefined
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to submit recommendation: ${response.statusText}`)
    }

    const result = await response.json()

    // Show success and open the issue
    success.value = true

    // Open the created issue in a new tab
    if (result.issueUrl) {
      window.open(result.issueUrl, '_blank')
    }

    // Close modal after 3 seconds
    setTimeout(() => {
      close()
    }, 3000)

  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to submit recommendation. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  formData.value = {
    name: '',
    title: '',
    company: '',
    relationship: '',
    githubUsername: '',
    skillRecommendations: [],
    testimonial: '',
    photo: '',
    photoFileName: ''
  }
  photoPreview.value = null
  error.value = ''
  success.value = false
  isSubmitting.value = false
}

function close() {
  emit('close')
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
}
</style>
