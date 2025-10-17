<template>
  <div class="card group">
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ title }}</h3>
        <p class="text-gray-700 mb-3">{{ description }}</p>
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-700 rounded-md text-sm font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          {{ impact }}
        </div>
      </div>
      <div class="text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  impact: string
}>()
</script>
