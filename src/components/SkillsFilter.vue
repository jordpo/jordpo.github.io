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
        <div class="text-3xl font-bold text-primary-600">10+</div>
        <div class="text-sm text-gray-600 mt-1">Years Experience</div>
      </div>
      <div class="card text-center">
        <div class="text-3xl font-bold text-primary-600">$40B+</div>
        <div class="text-sm text-gray-600 mt-1">Platform Value</div>
      </div>
      <div class="card text-center">
        <div class="text-3xl font-bold text-primary-600">100%</div>
        <div class="text-sm text-gray-600 mt-1">Uptime Record</div>
      </div>
      <div class="card text-center">
        <div class="text-3xl font-bold text-primary-600">2M+</div>
        <div class="text-sm text-gray-600 mt-1">Monthly Operations</div>
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
  { name: 'React', category: 'Frontend', description: 'Advanced React patterns and optimization' },
  { name: 'Next.js', category: 'Frontend', description: 'Server-side rendering and static generation' },
  { name: 'Vue.js', category: 'Frontend', description: 'Vue 3 Composition API' },
  { name: 'Ember.js', category: 'Frontend', description: 'Large-scale Ember applications' },
  { name: 'Performance Optimization', category: 'Frontend', description: 'Core Web Vitals, loading optimization' },

  // Backend
  { name: 'Ruby on Rails', category: 'Backend', description: 'Full-stack Rails applications' },
  { name: 'Elixir/Phoenix', category: 'Backend', description: 'Distributed systems with Phoenix LiveView' },
  { name: 'Node.js', category: 'Backend', description: 'Microservices and APIs' },
  { name: 'PostgreSQL', category: 'Backend', description: 'Database design and optimization' },
  { name: 'Redis', category: 'Backend', description: 'Caching and real-time features' },
  { name: 'WebSockets', category: 'Backend', description: 'Real-time bidirectional communication' },

  // Infrastructure
  { name: 'Docker', category: 'Infrastructure', description: 'Containerization and deployment' },
  { name: 'AWS', category: 'Infrastructure', description: 'Cloud infrastructure and services' },
  { name: 'GitLab CI/CD', category: 'Infrastructure', description: 'Extensive pipeline development' },
  { name: 'Microservices', category: 'Infrastructure', description: 'Distributed architecture patterns' },

  // AI/Tooling
  { name: 'MCP Development', category: 'AI/Tooling', description: 'Custom Model Context Protocol servers' },
  { name: 'OpenAI/Anthropic APIs', category: 'AI/Tooling', description: 'AI-enhanced workflows' },
  { name: 'Developer Tooling', category: 'AI/Tooling', description: 'Custom tools and automation' },
]

const filteredSkills = computed(() => {
  if (activeCategory.value === 'All') {
    return skills
  }
  return skills.filter(skill => skill.category === activeCategory.value)
})
</script>
