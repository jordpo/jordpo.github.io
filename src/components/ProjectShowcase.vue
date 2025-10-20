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
    title: 'Configurator Platform',
    tech: ['Elixir', 'Phoenix LiveView', 'Ruby on Rails', 'S3'],
    description: 'Real-time configuration and translation management platform with git-like branching and release management.',
    features: [
      'Live-preview configuration changes across multiple auction systems',
      'Git-like branching, change review, and release management workflows',
      'Processing 10K+ configuration changes annually',
      'Real-time collaboration features for product and QA teams',
      'Comprehensive audit trail and rollback capabilities'
    ],
    impact: '50% reduction in developer iteration time, enabling product/QA teams to manage 100% of feature flags and content updates autonomously. Reduced production incidents related to misconfiguration by 75%.'
  },
  {
    title: 'Snapshot Microservice',
    tech: ['Node.js', 'DOM Serialization', 'Distributed Pipeline'],
    description: 'Distributed microservice for capturing and rendering user-action snapshots at scale during high-value auctions.',
    features: [
      'Processed 1M+ screenshots during high-value auctions',
      'Horizontal scaling to handle 1K+ concurrent users',
      'On-demand replay capability for admin and compliance audits',
      'Optimized DOM serialization for performance',
      'Integration with distributed rendering pipeline'
    ],
    impact: 'Enabled comprehensive compliance audits and user action tracking for multi-billion dollar auctions with zero performance impact on live auction systems.'
  },
  {
    title: 'Frontend System Architecture',
    tech: ['TypeScript', 'TurboRepo', 'Asset Pipeline'],
    description: 'Scoped asset delivery system with monorepo architecture for shared functionality and seamless navigation.',
    features: [
      'Optimized JS class loading pre-tree shaking',
      'Monorepo architecture for shared component libraries',
      'Scoped asset bundling by user permissions',
      'Seamless cross-product navigation',
      'Performance monitoring and Core Web Vitals optimization'
    ],
    impact: 'Unified user experience across multiple products, reduced bundle sizes by 40%, and improved first-paint latency by seconds.'
  },
  {
    title: 'Non-Repudiation Framework',
    tech: ['Ruby on Rails', 'PostgreSQL', 'Microservices'],
    description: 'Enterprise-grade user tracking and compliance system across distributed microservices.',
    features: [
      'Captures 2M+ user actions monthly',
      'Distributed event tracking across multiple services',
      'Cryptographic verification of user actions',
      'Comprehensive audit trail for compliance',
      'Real-time analytics and reporting dashboard'
    ],
    impact: 'Enabled full compliance with regulatory requirements for high-stakes auctions, providing immutable audit trails for all user interactions.'
  }
]
</script>
