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
            <a href="#leadership" class="nav-link">Leadership</a>
            <a href="#experience" class="nav-link">Experience</a>
            <a href="#projects" class="nav-link">Projects</a>
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
          <a href="#leadership" class="nav-link" @click="mobileMenuOpen = false">Leadership</a>
          <a href="#experience" class="nav-link" @click="mobileMenuOpen = false">Experience</a>
          <a href="#projects" class="nav-link" @click="mobileMenuOpen = false">Projects</a>
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
            Staff Software Engineer (Front End Lead)
          </p>
          <div class="flex items-center justify-center md:justify-start gap-2 text-gray-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-lg">Burlington Area, Vermont</span>
          </div>
          <p class="text-lg text-gray-500 max-w-2xl pt-2">
            Building mission-critical systems that handle billions in transactions.
            Expert in distributed systems, frontend architecture, and performance optimization.
          </p>
          <div class="flex gap-4 pt-6 justify-center md:justify-start flex-wrap">
            <a
              href="mailto:jordan.morano@gmail.com"
              class="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium
                     hover:bg-primary-700 transition-colors duration-200"
            >
              Get in Touch
            </a>
            <button
              @click="openChat"
              class="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium
                     hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg
                     flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Chat with Me
            </button>
            <a
              href="/Jordan Morano Resume.pdf"
              download
              class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium
                     hover:bg-gray-200 transition-colors duration-200"
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
              I'm a Staff Software Engineer with over 10 years of experience building high-stakes,
              mission-critical systems. Currently at PowerAuctions, I lead frontend architecture and
              development for platforms handling $40B+ in auction values with 100% uptime.
            </p>
            <p class="text-gray-700 leading-relaxed">
              My background in hedge fund operations at Capital Fund Management and Ospraie Management
              gives me unique insight into building reliable, high-stakes systems. I'm passionate about
              performance optimization, distributed systems, and mentoring engineers.
            </p>
          </div>
          <div class="space-y-4">
            <div class="card">
              <h3 class="font-semibold text-gray-900 mb-3">Current Focus</h3>
              <ul class="space-y-2 text-sm text-gray-700">
                <li class="flex items-start">
                  <span class="text-primary-600 mr-2">▸</span>
                  <span>Leading TypeScript/React modernization initiatives</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary-600 mr-2">▸</span>
                  <span>Building distributed systems handling 2M+ operations monthly</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary-600 mr-2">▸</span>
                  <span>Developing AI-enhanced developer tooling (MCP servers)</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary-600 mr-2">▸</span>
                  <span>Performance optimization and Core Web Vitals improvements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Frontend Leadership Section -->
    <section id="leadership" class="py-16 bg-gradient-to-br from-primary-50 to-white">
      <div class="max-w-5xl mx-auto px-6">
        <h2 class="section-heading">Frontend Leadership</h2>
        <div class="card border-2 border-primary-200">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 text-primary-600">
              <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                Leading Frontend Team & Development Roadmap
              </h3>
              <p class="text-gray-700 leading-relaxed mb-4">
                Lead frontend team and development roadmap, defining technical direction and sprint priorities
                across 10+ concurrent projects while mentoring engineers in TypeScript, React patterns, and
                performance optimization.
              </p>
              <div class="grid md:grid-cols-2 gap-4 mt-6">
                <div class="bg-white rounded-lg p-4 shadow-sm">
                  <h4 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Technical Direction
                  </h4>
                  <ul class="space-y-1 text-sm text-gray-700">
                    <li>• Architecting modern TypeScript/React systems</li>
                    <li>• Performance & Core Web Vitals optimization</li>
                    <li>• Frontend system architecture & patterns</li>
                  </ul>
                </div>
                <div class="bg-white rounded-lg p-4 shadow-sm">
                  <h4 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Team Development
                  </h4>
                  <ul class="space-y-1 text-sm text-gray-700">
                    <li>• Mentoring engineers across skill levels</li>
                    <li>• Sprint planning & prioritization</li>
                    <li>• Code review & best practices</li>
                  </ul>
                </div>
              </div>
            </div>
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

    <!-- Experience Highlights -->
    <section id="experience" class="py-16">
      <div class="max-w-5xl mx-auto px-6">
        <h2 class="section-heading">Key Achievements</h2>
        <div class="space-y-4">
          <ExperienceCard
            v-for="achievement in achievements"
            :key="achievement.title"
            :title="achievement.title"
            :description="achievement.description"
            :impact="achievement.impact"
          />
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="bg-white py-16">
      <div class="max-w-5xl mx-auto px-6">
        <h2 class="section-heading">Notable Projects</h2>
        <ProjectShowcase />
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
                When I'm not building software, you'll find me exploring Vermont's beautiful trails with my family,
                diving into a good book, or challenging myself with a run through the Burlington area. I'm also an
                avid Nintendo gamer—there's something special about the creativity and polish that goes into those games.
              </p>
              <p class="text-gray-700 leading-relaxed">
                Living in Vermont provides the perfect balance of outdoor adventure and tech community, and I wouldn't
                have it any other way.
              </p>
            </div>
          </div>
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
import ExperienceCard from './components/ExperienceCard.vue'
import ProjectShowcase from './components/ProjectShowcase.vue'
import RecommendationsSection from './components/RecommendationsSection.vue'
import RecommendationForm from './components/RecommendationForm.vue'
import ChatWidget from './components/ChatWidget.vue'

const showRecommendationForm = ref(false)
const chatWidgetRef = ref<InstanceType<typeof ChatWidget> | null>(null)
const mobileMenuOpen = ref(false)

const openChat = () => {
  chatWidgetRef.value?.openChat()
}

interface Achievement {
  title: string
  description: string
  impact: string
}

const achievements: Achievement[] = [
  {
    title: 'High-Stakes Auction Platforms',
    description: 'Led delivery of 10+ auction platforms valued at $40B+ with zero downtime during live auctions',
    impact: '100% on-time deployment, 500ms latency reduction'
  },
  {
    title: 'AI-Enhanced Development',
    description: 'Spearheaded AI adoption initiatives, building custom MCP servers and internal analytics tools',
    impact: '25% increase in team velocity'
  },
  {
    title: 'Frontend Performance',
    description: 'Modernized frontend architecture through TypeScript migration and optimization',
    impact: 'Seconds reduction in first-paint latency, improved Core Web Vitals'
  },
  {
    title: 'Distributed Systems Architecture',
    description: 'Architected real-time messaging, non-repudiation framework, and configuration management platform',
    impact: '2M+ user actions tracked monthly, 50% reduction in developer iteration time'
  }
]
</script>
