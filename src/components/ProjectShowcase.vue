<template>
  <div class="space-y-6">
    <div
      v-for="project in projects"
      :key="project.title"
      class="card group cursor-pointer"
      @click="toggleProject(project.title)"
    >
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1 min-w-0">
          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
            <h3 class="text-xl font-semibold text-gray-900">{{ project.title }}</h3>
            <div class="flex gap-2 flex-wrap">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium whitespace-nowrap"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          <p class="text-gray-700 mb-3">{{ project.description }}</p>

          <!-- Expandable Details -->
          <div
            v-show="expandedProject === project.title"
            class="mt-4 pt-4 border-t border-gray-200 space-y-3"
          >
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Key Features:</h4>
              <ul class="space-y-1">
                <li
                  v-for="feature in project.features"
                  :key="feature"
                  class="text-sm text-gray-700 flex items-start"
                >
                  <span class="text-primary-600 mr-2">•</span>
                  {{ feature }}
                </li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Impact:</h4>
              <p class="text-sm text-gray-700">{{ project.impact }}</p>
            </div>
          </div>
        </div>

        <button class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
          <svg
            class="w-6 h-6 transition-transform duration-200"
            :class="{ 'rotate-180': expandedProject === project.title }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Open Source Note -->
    <div class="card bg-gray-50 border-2 border-dashed border-gray-300">
      <div class="flex items-start gap-4">
        <div class="text-gray-400">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 mb-2">Open Source & Side Projects</h3>
          <p class="text-gray-700 text-sm mb-3">
            While most of my professional work lives in private repositories, I'm passionate about
            developer tooling and continuously exploring new technologies.
          </p>
          <div class="flex gap-4">
            <a href="https://github.com/jordpo" target="_blank" rel="noopener noreferrer" class="link-primary text-sm">
              View GitHub Profile →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Project {
  title: string
  tech: string[]
  description: string
  features: string[]
  impact: string
}

const expandedProject = ref<string | null>(null)

const toggleProject = (title: string) => {
  expandedProject.value = expandedProject.value === title ? null : title
}

const projects: Project[] = [
  {
    title: 'Non-Repudiation & Compliance Platform',
    tech: ['Web Components', 'Phoenix WebSockets', 'Chromium'],
    description: 'Real-time audit and evidence system capturing every user interaction with compressed DOM states and batched screenshot generation.',
    features: [
      'Processes 1M+ snapshots per auction for $40B+ in regulated transactions',
      'Compressed DOM state capture for every user interaction',
      'Batched screenshot generation for regulatory evidence',
      'Verifiable compliance and instant dispute resolution',
      'Leveraged internally by QA and product teams for test validation'
    ],
    impact: 'Ensures verifiable compliance for $40B+ in regulated transactions with instant dispute resolution capabilities. Provides comprehensive audit trail for all user actions.'
  },
  {
    title: 'Configurator Platform & Distributed Architecture',
    tech: ['TypeScript', 'Elixir/Phoenix', 'Microservices', 'S3'],
    description: 'Configuration and translation management platform powering all auction configuration with 100K+ changes/year across 85K+ keys.',
    features: [
      'S3-backed release pipeline with live staging previews',
      'Integrated Manage application for release orchestration',
      'Dynamic S3 file loading via main API',
      'Git-style versioning for configuration management',
      'Empowers developers and QA to update keys/values directly'
    ],
    impact: 'Reduced configuration-related risk by 70% through git-style versioning. Enables safe testing in production-identical environments with 99.9% uptime.'
  },
  {
    title: 'Developer Productivity Platform',
    tech: ['TypeScript', 'Custom MCPs', 'GitLab', 'Sentry'],
    description: 'AI-augmented developer tooling with custom MCP servers for GitLab, Configurator, and Sentry integration.',
    features: [
      '3 custom MCP servers for seamless tool integration',
      'GitLab integration for merge request processing',
      'Configurator integration for configuration management',
      'Sentry integration for error tracking and debugging',
      'AI-enhanced workflows accelerating development velocity'
    ],
    impact: 'Enabled 10+ developers to process 800+ merge requests with 19% sustained velocity increase and 50% faster deployments.'
  }
]
</script>
