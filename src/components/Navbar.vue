<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container">
      <div class="navbar-content">
        <!-- Logo -->
        <a href="/" class="logo">
          <img :src="site.logo.icon" :alt="site.logo.text" class="logo-icon" />
          <span class="logo-text">{{ site.logo.text }}</span>
        </a>

        <!-- Desktop Menu -->
        <div class="desktop-menu">
          <div v-for="item in menu" :key="item.label" class="menu-item">
            <a
              :href="item.path"
              class="menu-link"
              :class="{ active: isActive(item.path) }"
              @mouseenter="item.children && (activeDropdown = item.label)"
              @mouseleave="activeDropdown = null"
            >
              {{ item.label }}
              <svg v-if="item.children" class="dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
            <!-- Dropdown -->
            <div
              v-if="item.children && activeDropdown === item.label"
              class="dropdown"
              @mouseenter="activeDropdown = item.label"
              @mouseleave="activeDropdown = null"
            >
              <a
                v-for="child in item.children"
                :key="child.label"
                :href="child.path"
                class="dropdown-item"
              >
                {{ child.label }}
              </a>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="!mobileMenuOpen" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <div v-for="item in menu" :key="item.label" class="mobile-menu-item">
          <a :href="item.path" class="mobile-menu-link" @click="mobileMenuOpen = false">
            {{ item.label }}
          </a>
          <div v-if="item.children" class="mobile-submenu">
            <a
              v-for="child in item.children"
              :key="child.label"
              :href="child.path"
              class="mobile-submenu-link"
              @click="mobileMenuOpen = false"
            >
              {{ child.label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import siteData from '../data/site.json';
import menuData from '../data/menu.json';

const site = ref(siteData);
const menu = ref(menuData.main);
const isScrolled = ref(false);
const activeDropdown = ref(null);
const mobileMenuOpen = ref(false);

const currentPath = ref('');

const isActive = (path) => {
  if (path === '/') return currentPath.value === '/';
  return currentPath.value.startsWith(path);
};

onMounted(() => {
  currentPath.value = window.location.pathname;
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.95);
  border-bottom-color: #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.25rem;
  color: #0f172a;
}

.logo-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}

.desktop-menu {
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-item {
  position: relative;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  transition: all 0.2s ease;
}

.menu-link:hover,
.menu-link.active {
  color: #0f172a;
  background: #f1f5f9;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  padding: 8px;
  animation: dropdownFadeIn 0.2s ease;
}

.dropdown-item {
  display: block;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #64748b;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.mobile-menu-btn {
  display: none;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
}

.mobile-menu-btn svg {
  width: 24px;
  height: 24px;
  color: #64748b;
}

.mobile-menu {
  display: none;
  padding: 16px 0;
  border-top: 1px solid #e2e8f0;
}

.mobile-menu-item {
  margin-bottom: 8px;
}

.mobile-menu-link {
  display: block;
  padding: 12px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #0f172a;
  border-radius: 8px;
}

.mobile-menu-link:hover {
  background: #f1f5f9;
}

.mobile-submenu {
  padding-left: 24px;
}

.mobile-submenu-link {
  display: block;
  padding: 10px 16px;
  font-size: 0.875rem;
  color: #64748b;
  border-radius: 8px;
}

.mobile-submenu-link:hover {
  background: #f1f5f9;
  color: #0f172a;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-menu {
    display: block;
  }
}
</style>
