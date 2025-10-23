<template>
  <div class="min-h-screen">
    <!-- Navigation -->
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div class="max-w-5xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="text-lg font-bold text-gray-900">JM</div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex gap-6">
            <a href="#about" class="nav-link">About</a>
            <a href="#consultancy" class="nav-link">Consultancy</a>
            <a href="#recommendations" class="nav-link">Recommendations</a>
            <a href="#contact" class="nav-link">Contact</a>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Mobile Navigation Menu -->
        <div
          v-show="mobileMenuOpen"
          class="md:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col gap-3"
        >
          <a href="#about" class="nav-link" @click="mobileMenuOpen = false">About</a>
          <a href="#consultancy" class="nav-link" @click="mobileMenuOpen = false">Consultancy</a>
          <a href="#recommendations" class="nav-link" @click="mobileMenuOpen = false">Recommendations</a>
          <a href="#contact" class="nav-link" @click="mobileMenuOpen = false">Contact</a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="max-w-5xl mx-auto px-6 pt-20 pb-16">
      <div class="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <!-- Profile Image -->
        <div class="flex-shrink-0">
          <img
            src="/profile.jpg"
            alt="Jordan Morano"
            class="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-lg border-4 border-white ring-2 ring-gray-200"
          />
        </div>

        <!-- Hero Content -->
        <div class="space-y-4 flex-1 text-center md:text-left">
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Jordan Morano
          </h1>
          <p class="text-2xl md:text-3xl text-gray-600 font-light">
            Staff Software Engineer | Full-Stack TypeScript/JavaScript | Distributed Systems
          </p>
          <div class="flex items-center justify-center md:justify-start gap-2 text-gray-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-lg">Vermont</span>
          </div>
          <p class="text-lg text-gray-500 max-w-2xl pt-2">
            11+ years building high-performance, distributed systems at scale. Delivered mission-critical platforms ($40B+ value) with 99.9% uptime while driving 50% team velocity improvements through AI-augmented tooling and performance optimization.
          </p>
          <div class="flex gap-4 pt-6 justify-center md:justify-start flex-wrap">
            <button
              @click="openChat"
              class="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold text-lg
                     hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl
                     flex items-center gap-3 transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Ask About My Experience
            </button>
            <a
              href="mailto:jordan.morano@gmail.com"
              class="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium
                     hover:bg-primary-700 transition-colors duration-200 flex items-center"
            >
              Get in Touch
            </a>
            <a
              href="/Jordan Morano Resume.pdf"
              download
              class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium
                     hover:bg-gray-200 transition-colors duration-200 flex items-center"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="bg-white py-16">
      <div class="max-w-5xl mx-auto px-6">
        <h2 class="section-heading">About</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="space-y-4">
            <p class="text-gray-700 leading-relaxed">
              I'm a Staff Software Engineer with 11+ years of experience building high-performance,
              distributed systems at scale. Expert in TypeScript/web components and backend architecture,
              with proven success leading frontend modernization and developer productivity initiatives.
            </p>
            <p class="text-gray-700 leading-relaxed">
              Currently at PowerAuctions, I lead frontend architecture for platforms handling $40B+ in
              regulated transactions with 99.9% uptime. My background as a Financial Operations Analyst
              at hedge funds managing $6B+ portfolios gives me unique insight into building reliable,
              high-stakes systems.
            </p>
          </div>
          <div class="space-y-4">
            <div class="card">
              <h3 class="font-semibold text-gray-900 mb-3">Current Focus</h3>
              <ul class="space-y-2 text-sm text-gray-700">
                <li class="flex items-start">
                  <span class="text-primary-600 mr-2">▸</span>
                  <span>Modernizing distributed frontend ecosystem (5 Ember apps, 3 npm packages)</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary-600 mr-2">▸</span>
                  <span>Architecting core auction microservices (Configurator, Screenshot Service, Manage Control Plane)</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary-600 mr-2">▸</span>
                  <span>Leading AI collaboration sessions with MCP-based developer workflows</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary-600 mr-2">▸</span>
                  <span>Driving 60% build time reductions and Core Web Vitals improvements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Highlights Section -->
    <section class="py-16 bg-gradient-to-br from-primary-50 to-white">
      <div class="max-w-5xl mx-auto px-6">
        <h2 class="section-heading">Highlights</h2>
        <p class="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Want to know more? Ask me about my leadership experience, projects, or technical achievements using the chat below!
        </p>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="card text-center">
            <div class="flex justify-center mb-3">
              <svg class="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Performance Expert</h3>
            <p class="text-sm text-gray-600">Cut build times 60%, improved Core Web Vitals, and drove 50% team velocity improvements through AI-augmented tooling</p>
          </div>
          <div class="card text-center">
            <div class="flex justify-center mb-3">
              <svg class="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Mission-Critical Systems</h3>
            <p class="text-sm text-gray-600">$40B+ in regulated transactions with 99.9% uptime and comprehensive compliance/non-repudiation</p>
          </div>
          <div class="card text-center">
            <div class="flex justify-center mb-3">
              <svg class="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">AI & Innovation</h3>
            <p class="text-sm text-gray-600">Leading internal AI adoption with custom MCP servers, 19% sustained velocity increase, 50% faster deployments</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="py-16 bg-white">
      <div class="max-w-5xl mx-auto px-6">
        <h2 class="section-heading">Technical Expertise</h2>
        <SkillsFilter />
      </div>
    </section>

    <!-- Personal Interests Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-5xl mx-auto px-6">
        <h2 class="section-heading">Beyond the Code</h2>
        <div class="card max-w-3xl mx-auto">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 text-gray-400">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-700 leading-relaxed mb-4">
                When I'm not building software, I'm spending quality time with my family on parenting adventures,
                exploring Vermont's hiking trails and running routes, enjoying Nintendo games, and diving into
                AI innovation projects.
              </p>
              <p class="text-gray-700 leading-relaxed">
                Living in Vermont provides the perfect balance of outdoor adventure, family time, and opportunities
                to work on cutting-edge technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Consultancy Section -->
    <section id="consultancy" class="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div class="max-w-5xl mx-auto px-6">
        <div class="max-w-3xl mx-auto text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
            <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Turnstone Tech Software</h2>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            Need expert guidance on frontend architecture, distributed systems, or technical leadership?
            I offer consulting and advisory services for teams looking to level up their engineering practices.
          </p>
          <a
            href="mailto:info@turnstonetechsoftware.com"
            class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold text-lg
                   hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Get in Touch
          </a>
        </div>
      </div>
    </section>

    <!-- Recommendations Section -->
    <section id="recommendations" class="py-16 bg-white">
      <div class="max-w-5xl mx-auto px-6">
        <h2 class="section-heading">Recommendations</h2>
        <p class="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Testimonials from colleagues, teammates, and collaborators I've had the pleasure of working with.
        </p>
        <RecommendationsSection @openForm="showRecommendationForm = true" />
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="bg-white py-16">
      <div class="max-w-5xl mx-auto px-6 text-center">
        <h2 class="section-heading">Let's Connect</h2>
        <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
          I'm always interested in hearing about new opportunities, challenging projects,
          or just connecting with fellow engineers.
        </p>
        <div class="flex justify-center gap-6 flex-wrap">
          <a href="mailto:jordan.morano@gmail.com" class="link-primary">Email</a>
          <a href="https://github.com/jordpo" target="_blank" rel="noopener noreferrer" class="link-primary">GitHub</a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-200 py-8">
      <div class="max-w-5xl mx-auto px-6 text-center text-sm text-gray-500">
        <p>Built with Vue 3, TypeScript, and Tailwind CSS</p>
        <p class="mt-2">Burlington Area, Vermont · {{ new Date().getFullYear() }}</p>
      </div>
    </footer>

    <!-- Recommendation Form Modal -->
    <RecommendationForm
      :isOpen="showRecommendationForm"
      @close="showRecommendationForm = false"
    />

    <!-- AI Chat Widget -->
    <ChatWidget ref="chatWidgetRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SkillsFilter from './components/SkillsFilter.vue'
import RecommendationsSection from './components/RecommendationsSection.vue'
import RecommendationForm from './components/RecommendationForm.vue'
import ChatWidget from './components/ChatWidget.vue'

const showRecommendationForm = ref(false)
const chatWidgetRef = ref<InstanceType<typeof ChatWidget> | null>(null)
const mobileMenuOpen = ref(false)

const openChat = () => {
  chatWidgetRef.value?.openChat()
}
</script>
