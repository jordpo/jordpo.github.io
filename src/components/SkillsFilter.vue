<template>
  <div class="space-y-6">
    <!-- Category Tabs -->
    <div class="flex gap-2 flex-wrap border-b border-gray-200 pb-4">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="activeCategory = cat"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        :class="activeCategory === cat
          ? 'bg-primary-600 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Skills Grid -->
    <div class="flex flex-wrap gap-2">
      <span
        v-for="skill in filteredSkills"
        :key="skill.name"
        class="tech-badge"
        :title="skill.description"
      >
        {{ skill.name }}
      </span>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
      <div class="card text-center">
        <div class="text-3xl font-bold text-primary-600">11+</div>
        <div class="text-sm text-gray-600 mt-1">Years Experience</div>
      </div>
      <div class="card text-center">
        <div class="text-3xl font-bold text-primary-600">$40B+</div>
        <div class="text-sm text-gray-600 mt-1">Platform Value</div>
      </div>
      <div class="card text-center">
        <div class="text-3xl font-bold text-primary-600">99.9%</div>
        <div class="text-sm text-gray-600 mt-1">Uptime Record</div>
      </div>
      <div class="card text-center">
        <div class="text-3xl font-bold text-primary-600">100K+</div>
        <div class="text-sm text-gray-600 mt-1">Config Changes/Year</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Skill {
  name: string
  category: string
  description: string
}

const activeCategory = ref('All')

const categories = ['All', 'Frontend', 'Backend', 'Infrastructure', 'AI/Tooling']

const skills: Skill[] = [
  // Frontend
  { name: 'TypeScript', category: 'Frontend', description: 'Expert-level TypeScript development' },
  { name: 'JavaScript (ESNext)', category: 'Frontend', description: 'Modern JavaScript patterns' },
  { name: 'React', category: 'Frontend', description: 'Advanced React patterns and optimization' },
  { name: 'Ember.js', category: 'Frontend', description: 'Large-scale Ember applications' },
  { name: 'Next.js', category: 'Frontend', description: 'Server-side rendering and static generation' },
  { name: 'Vite', category: 'Frontend', description: 'Modern build tooling' },
  { name: 'TurboRepo', category: 'Frontend', description: 'Monorepo architecture and management' },
  { name: 'Web Performance', category: 'Frontend', description: 'Core Web Vitals optimization' },

  // Backend
  { name: 'Node.js', category: 'Backend', description: 'Microservices and APIs' },
  { name: 'Ruby on Rails', category: 'Backend', description: 'Full-stack Rails applications' },
  { name: 'Elixir/Phoenix', category: 'Backend', description: 'Distributed systems with Phoenix' },
  { name: 'REST APIs', category: 'Backend', description: 'RESTful API design' },
  { name: 'GraphQL', category: 'Backend', description: 'GraphQL schema and resolvers' },
  { name: 'WebSockets', category: 'Backend', description: 'Real-time bidirectional communication' },
  { name: 'PostgreSQL', category: 'Backend', description: 'Database design and optimization' },
  { name: 'Redis', category: 'Backend', description: 'Caching and real-time features' },

  // Infrastructure
  { name: 'AWS', category: 'Infrastructure', description: 'Cloud infrastructure and services' },
  { name: 'Docker', category: 'Infrastructure', description: 'Containerization and deployment' },
  { name: 'Kubernetes', category: 'Infrastructure', description: 'Container orchestration' },
  { name: 'Distributed Systems', category: 'Infrastructure', description: 'Distributed architecture patterns' },
  { name: 'GitHub Actions', category: 'Infrastructure', description: 'CI/CD automation' },
  { name: 'GitLab CI', category: 'Infrastructure', description: 'Extensive pipeline development' },
  { name: 'CircleCI', category: 'Infrastructure', description: 'Continuous integration' },
  { name: 'Datadog', category: 'Infrastructure', description: 'Monitoring and observability' },
  { name: 'Sentry', category: 'Infrastructure', description: 'Error tracking and debugging' },

  // AI/Tooling
  { name: 'OpenAI APIs', category: 'AI/Tooling', description: 'AI integration and automation' },
  { name: 'Anthropic APIs', category: 'AI/Tooling', description: 'Claude API integration' },
  { name: 'MCP Servers', category: 'AI/Tooling', description: 'Custom Model Context Protocol servers' },
  { name: 'AI Workflows', category: 'AI/Tooling', description: 'AI-augmented development workflows' },
]

const filteredSkills = computed(() => {
  if (activeCategory.value === 'All') {
    return skills
  }
  return skills.filter(skill => skill.category === activeCategory.value)
})
</script>
