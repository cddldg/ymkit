<template>
  <section class="banner">
    <div class="banner-slider" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div v-for="slide in slides" :key="slide.id" class="slide">
        <div class="slide-bg" :style="{ backgroundImage: `url(${slide.image})` }"></div>
        <div class="slide-overlay"></div>
        <div class="container">
          <div class="slide-content">
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p class="slide-subtitle">{{ slide.subtitle }}</p>
            <a :href="slide.link" class="btn btn-primary">
              立即探索
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Indicators -->
    <div class="indicators">
      <button
        v-for="(_, index) in slides"
        :key="index"
        class="indicator"
        :class="{ active: currentSlide === index }"
        @click="goToSlide(index)"
      ></button>
    </div>

    <!-- Arrows -->
    <button class="arrow prev" @click="prevSlide">
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
    <button class="arrow next" @click="nextSlide">
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import siteData from '../data/site.json';

const slides = ref(siteData.banner);
const currentSlide = ref(0);
let autoplayTimer = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
  resetAutoplay();
};

const startAutoplay = () => {
  autoplayTimer = setInterval(nextSlide, 5000);
};

const resetAutoplay = () => {
  if (autoplayTimer) clearInterval(autoplayTimer);
  startAutoplay();
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  if (autoplayTimer) clearInterval(autoplayTimer);
});
</script>

<style scoped>
.banner {
  position: relative;
  height: 500px;
  overflow: hidden;
  margin-top: 64px;
}

.banner-slider {
  display: flex;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide {
  min-width: 100%;
  height: 100%;
  position: relative;
}

.slide-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.4) 100%);
}

.slide-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  max-width: 600px;
}

.slide-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.slide-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.indicator {
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: white;
  width: 48px;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.arrow:hover {
  background: rgba(255, 255, 255, 0.2);
}

.arrow svg {
  width: 20px;
  height: 20px;
}

.prev { left: 2rem; }
.next { right: 2rem; }

@media (max-width: 768px) {
  .banner { height: 400px; }
  .slide-title { font-size: 2rem; }
  .slide-subtitle { font-size: 1rem; }
  .arrow { display: none; }
}
</style>
