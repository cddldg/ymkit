<template>
  <div class="tools-manager">
    <div class="toolbar">
      <button class="btn btn-primary" @click="showAddModal = true">
        添加工具
      </button>
    </div>

    <div class="tools-table">
      <table>
        <thead>
          <tr>
            <th>图标</th>
            <th>名称</th>
            <th>分类</th>
            <th>评分</th>
            <th>精选</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tool in tools" :key="tool.id">
            <td>
              <div class="tool-icon-small">
                <img :src="tool.icon" :alt="tool.name" />
              </div>
            </td>
            <td>{{ tool.name }}</td>
            <td>{{ getCategoryLabel(tool.category) }}</td>
            <td>{{ tool.rating?.toFixed(1) || '-' }}</td>
            <td>
              <span :class="['status', tool.featured ? 'active' : 'inactive']">
                {{ tool.featured ? '是' : '否' }}
              </span>
            </td>
            <td>
              <div class="actions">
                <button class="btn-edit" @click="editTool(tool)">编辑</button>
                <button class="btn-delete" @click="deleteTool(tool.id)">删除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || editingTool" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ editingTool ? '编辑工具' : '添加工具' }}</h3>
          <button class="btn-close" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>名称</label>
            <input v-model="form.name" type="text" placeholder="工具名称" />
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea v-model="form.description" placeholder="工具描述"></textarea>
          </div>
          <div class="form-group">
            <label>链接</label>
            <input v-model="form.url" type="url" placeholder="https://..." />
          </div>
          <div class="form-group">
            <label>图标</label>
            <input v-model="form.icon" type="url" placeholder="图标URL" />
          </div>
          <div class="form-group">
            <label>分类</label>
            <select v-model="form.category">
              <option v-for="cat in categories" :key="cat.value" :value="cat.value">
                {{ cat.label }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>标签（逗号分隔）</label>
            <input v-model="form.tags" type="text" placeholder="标签1, 标签2" />
          </div>
          <div class="form-group">
            <label>
              <input v-model="form.featured" type="checkbox" />
              精选工具
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" @click="closeModal">取消</button>
          <button class="btn btn-primary" @click="saveTool">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const tools = ref([]);
const showAddModal = ref(false);
const editingTool = ref(null);

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

const form = ref({
  name: '',
  description: '',
  url: '',
  icon: '',
  category: 'chat',
  tags: '',
  featured: false
});

const getCategoryLabel = (value) => {
  const cat = categories.find(c => c.value === value);
  return cat ? cat.label : value;
};

const loadTools = async () => {
  try {
    const response = await fetch('/api/tools.json');
    tools.value = await response.json();
  } catch (error) {
    console.error('Failed to load tools:', error);
  }
};

const editTool = (tool) => {
  editingTool.value = tool;
  form.value = {
    name: tool.name,
    description: tool.description,
    url: tool.url,
    icon: tool.icon,
    category: tool.category,
    tags: tool.tags.join(', '),
    featured: tool.featured
  };
};

const deleteTool = async (id) => {
  if (!confirm('确定要删除这个工具吗？')) return;

  try {
    const response = await fetch('/api/tools.json', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });

    if (response.ok) {
      tools.value = tools.value.filter(t => t.id !== id);
    }
  } catch (error) {
    console.error('Failed to delete tool:', error);
  }
};

const saveTool = async () => {
  const toolData = {
    ...form.value,
    tags: form.value.tags.split(',').map(t => t.trim()).filter(Boolean)
  };

  try {
    if (editingTool.value) {
      const response = await fetch('/api/tools.json', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...toolData, id: editingTool.value.id })
      });

      if (response.ok) {
        const updated = await response.json();
        const index = tools.value.findIndex(t => t.id === updated.id);
        if (index !== -1) tools.value[index] = updated;
      }
    } else {
      const response = await fetch('/api/tools.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toolData)
      });

      if (response.ok) {
        const newTool = await response.json();
        tools.value.push(newTool);
      }
    }

    closeModal();
  } catch (error) {
    console.error('Failed to save tool:', error);
  }
};

const closeModal = () => {
  showAddModal.value = false;
  editingTool.value = null;
  form.value = {
    name: '',
    description: '',
    url: '',
    icon: '',
    category: 'chat',
    tags: '',
    featured: false
  };
};

onMounted(loadTools);
</script>

<style scoped>
.toolbar {
  margin-bottom: 1.5rem;
}

.tools-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

th {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

td {
  font-size: 0.875rem;
  color: #334155;
}

.tool-icon-small {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  overflow: hidden;
  background: #f1f5f9;
}

.tool-icon-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status {
  display: inline-flex;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status.active {
  background: #d1fae5;
  color: #065f46;
}

.status.inactive {
  background: #f1f5f9;
  color: #64748b;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-edit, .btn-delete {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-edit {
  background: #3b82f6;
  color: white;
}

.btn-edit:hover {
  background: #2563eb;
}

.btn-delete {
  background: #fee2e2;
  color: #991b1b;
}

.btn-delete:hover {
  background: #fecaca;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #64748b;
  cursor: pointer;
}

.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-group input[type="checkbox"] {
  width: auto;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
}
</style>
