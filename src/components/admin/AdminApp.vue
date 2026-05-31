<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>管理后台</h2>
      </div>
      <nav class="sidebar-nav">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="nav-item"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <span class="nav-icon" v-html="tab.icon"></span>
          <span class="nav-label">{{ tab.label }}</span>
        </button>
      </nav>
      <div class="sidebar-footer">
        <button class="btn-publish" @click="publishChanges">
          发布更改
        </button>
        <a href="/" class="btn-back">返回前台</a>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <div class="content-header">
        <h1>{{ currentTab?.label }}</h1>
      </div>

      <div class="content-body">
        <KeepAlive>
          <component :is="currentComponent" />
        </KeepAlive>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { KeepAlive } from 'vue';
import ToolsManager from './ToolsManager.vue';
import SiteSettings from './SiteSettings.vue';
import MenuManager from './MenuManager.vue';
import MediaLibrary from './MediaLibrary.vue';

const activeTab = ref('tools');

const tabs = [
  {
    id: 'tools',
    label: '工具管理',
    icon: '<svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>',
    component: ToolsManager
  },
  {
    id: 'site',
    label: '站点设置',
    icon: '<svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>',
    component: SiteSettings
  },
  {
    id: 'menu',
    label: '菜单管理',
    icon: '<svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>',
    component: MenuManager
  },
  {
    id: 'media',
    label: '媒体库',
    icon: '<svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" /></svg>',
    component: MediaLibrary
  }
];

const currentTab = computed(() => tabs.find(t => t.id === activeTab.value));
const currentComponent = computed(() => currentTab.value?.component);

const publishChanges = async () => {
  try {
    const response = await fetch('/api/publish', { method: 'POST' });
    if (response.ok) {
      alert('发布成功！');
    } else {
      alert('发布失败');
    }
  } catch (error) {
    alert('发布失败: ' + error.message);
  }
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}

.sidebar {
  width: 240px;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.sidebar-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.nav-item:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.nav-item.active {
  background: #3b82f6;
  color: white;
}

.nav-icon {
  display: flex;
  align-items: center;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-publish {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-publish:hover {
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
}

.btn-back {
  display: block;
  width: 100%;
  padding: 12px;
  background: #f1f5f9;
  color: #475569;
  border: none;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-back:hover {
  background: #e2e8f0;
}

.main-content {
  flex: 1;
  margin-left: 240px;
  padding: 2rem;
}

.content-header {
  margin-bottom: 2rem;
}

.content-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}

.content-body {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
}
</style>
