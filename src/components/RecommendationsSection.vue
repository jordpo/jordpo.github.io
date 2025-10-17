<template>
  <div class="space-y-6">
    <!-- Recommendations Grid -->
    <div v-if="recommendations.length > 0" class="grid md:grid-cols-2 gap-6">
      <div
        v-for="(rec, index) in recommendations"
        :key="index"
        class="card hover:shadow-lg transition-shadow duration-200"
      >
        <!-- Recommender Info -->
        <div class="flex items-start gap-4 mb-4">
          <div class="flex-shrink-0">
            <img
              v-if="rec.photo"
              :src="`/images/recommendations/${rec.photo}`"
              :alt="rec.name"
              class="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
            <div
              v-else
              class="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold text-xl"
            >
              {{ getInitials(rec.name) }}
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 text-lg">{{ rec.name }}</h3>
            <p v-if="rec.title || rec.company" class="text-sm text-gray-600">
              {{ [rec.title, rec.company].filter(Boolean).join(' at ') }}
            </p>
            <p v-if="rec.relationship" class="text-sm text-gray-500 italic">
              {{ rec.relationship }}
            </p>
          </div>
        </div>

        <!-- Skills Recommended -->
        <div v-if="rec.skillRecommendations && rec.skillRecommendations.length > 0" class="mb-3">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in rec.skillRecommendations"
              :key="skill"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <!-- Testimonial -->
        <blockquote class="text-gray-700 leading-relaxed border-l-4 border-primary-200 pl-4 italic">
          "{{ rec.testimonial }}"
        </blockquote>

        <!-- Date and GitHub Link -->
        <div class="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>{{ formatDate(rec.date) }}</span>
          <a
            v-if="rec.githubUsername"
            :href="`https://github.com/${rec.githubUsername}`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
            @{{ rec.githubUsername }}
          </a>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      </div>
      <p class="text-gray-600">No recommendations yet. Be the first to recommend Jordan!</p>
    </div>

    <!-- Add Recommendation Button -->
    <div class="text-center pt-6">
      <button
        @click="$emit('openForm')"
        class="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium
               hover:bg-primary-700 transition-colors duration-200 shadow-sm hover:shadow-md"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add a Recommendation
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Recommendation {
  name: string
  title?: string
  company?: string
  relationship?: string
  githubUsername?: string
  skillRecommendations?: string[]
  testimonial: string
  photo?: string
  date: string
}

defineEmits<{
  openForm: []
}>()

const recommendations = ref<Recommendation[]>([])

onMounted(async () => {
  try {
    const response = await fetch('/data/recommendations.json')
    if (response.ok) {
      recommendations.value = await response.json()
    }
  } catch (error) {
    console.error('Failed to load recommendations:', error)
  }
})

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}
</script>
