<template>
  <div class="tools-page">
    <!-- Search and Filters -->
    <div class="filters-section">
      <div class="search-box">
        <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索AI工具..."
          class="search-input"
        />
      </div>

      <div class="filter-groups">
        <div class="filter-group">
          <label class="filter-label">分类</label>
          <div class="filter-options">
            <button
              class="filter-btn"
              :class="{ active: !selectedCategory }"
              @click="selectedCategory = null"
            >
              全部
            </button>
            <button
              v-for="cat in categories"
              :key="cat.value"
              class="filter-btn"
              :class="{ active: selectedCategory === cat.value }"
              @click="selectedCategory = cat.value"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>

        <div class="filter-group">
          <label class="filter-label">排序</label>
          <div class="filter-options">
            <button
              class="filter-btn"
              :class="{ active: sortBy === 'rating' }"
              @click="sortBy = 'rating'"
            >
              评分最高
            </button>
            <button
              class="filter-btn"
              :class="{ active: sortBy === 'name' }"
              @click="sortBy = 'name'"
            >
              名称排序
            </button>
            <button
              class="filter-btn"
              :class="{ active: sortBy === 'featured' }"
              @click="sortBy = 'featured'"
            >
              精选优先
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Count -->
    <div class="results-info">
      <span class="results-count">找到 {{ filteredTools.length }} 个工具</span>
    </div>

    <!-- Tools Grid -->
    <div class="tools-grid">
      <a
        v-for="tool in filteredTools"
        :key="tool.id"
        :href="`/tools/${tool.id}`"
        class="tool-card"
      >
        <div class="card-header">
          <div class="tool-icon">
            <img :src="tool.icon" :alt="tool.name" loading="lazy" />
          </div>
          <div class="tool-info">
            <h3 class="tool-name">{{ tool.name }}</h3>
            <span class="tool-category">{{ getCategoryLabel(tool.category) }}</span>
          </div>
          <div v-if="tool.rating" class="tool-rating">
            <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{{ tool.rating.toFixed(1) }}</span>
          </div>
        </div>

        <p class="tool-desc">{{ tool.description }}</p>

        <div class="card-footer">
          <div class="tool-tags">
            <span v-for="tag in tool.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div class="visit-btn">
            访问
            <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </a>
    </div>

    <!-- Empty State -->
    <div v-if="filteredTools.length === 0" class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="48" height="48">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <h3>未找到匹配的工具</h3>
      <p>尝试调整搜索条件或筛选器</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import toolsData from '../data/tools.json';

const searchQuery = ref('');
const selectedCategory = ref(null);
const sortBy = ref('rating');

const categories = [
  { value: 'chat', label: 'AI对话' },
  { value: 'image', label: 'AI绘画' },
  { value: 'code', label: 'AI编程' },
  { value: 'video', label: 'AI视频' },
  { value: 'writing', label: 'AI写作' },
  { value: 'audio', label: 'AI语音' },
  { value: 'productivity', label: '效率工具' },
  { value: 'search', label: 'AI搜索' },
  { value: 'design', label: 'AI设计' }
];

const getCategoryLabel = (value) => {
  const cat = categories.find(c => c.value === value);
  return cat ? cat.label : value;
};

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  if (category) {
    selectedCategory.value = category;
  }
});

const filteredTools = computed(() => {
  let tools = [...toolsData];

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    tools = tools.filter(tool =>
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Filter by category
  if (selectedCategory.value) {
    tools = tools.filter(tool => tool.category === selectedCategory.value);
  }

  // Sort
  switch (sortBy.value) {
    case 'rating':
      tools.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case 'name':
      tools.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'featured':
      tools.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
  }

  return tools;
});
</script>

<style scoped>
.tools-page {
  max-width: 1200px;
  margin: 0 auto;
}

.filters-section {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.search-box:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-box svg {
  color: #94a3b8;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  background: none;
  font-size: 0.875rem;
  outline: none;
  color: #0f172a;
}

.search-input::placeholder {
  color: #94a3b8;
}

.filter-groups {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-group {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  min-width: 60px;
  padding-top: 8px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  background: #f1f5f9;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: #e2e8f0;
  color: #334155;
}

.filter-btn.active {
  background: #3b82f6;
  color: white;
}

.results-info {
  margin-bottom: 1.5rem;
}

.results-count {
  font-size: 0.875rem;
  color: #64748b;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.tool-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.tool-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1);
  transform: translateY(-4px);
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 1rem;
}

.tool-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: #f1f5f9;
}

.tool-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tool-info {
  flex: 1;
  min-width: 0;
}

.tool-name {
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tool-category {
  font-size: 0.75rem;
  color: #64748b;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 4px;
}

.tool-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #f59e0b;
  font-size: 0.875rem;
  font-weight: 600;
  flex-shrink: 0;
}

.tool-desc {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.tool-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.75rem;
  color: #64748b;
  background: #f1f5f9;
  padding: 4px 8px;
  border-radius: 6px;
}

.visit-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #3b82f6;
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;
}

.tool-card:hover .visit-btn {
  opacity: 1;
  transform: translateX(0);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
}

.empty-state svg {
  margin-bottom: 1rem;
  color: #94a3b8;
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.5rem;
}

.empty-state p {
  font-size: 0.875rem;
}

@media (max-width: 1024px) {
  .tools-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .filter-group {
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter-label {
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
