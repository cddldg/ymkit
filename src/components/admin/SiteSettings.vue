<template>
  <div class="site-settings">
    <form @submit.prevent="saveSettings">
      <div class="form-section">
        <h3>基本信息</h3>
        <div class="form-group">
          <label>站点标题</label>
          <input v-model="form.title" type="text" placeholder="站点标题" />
        </div>
        <div class="form-group">
          <label>站点副标题</label>
          <input v-model="form.subtitle" type="text" placeholder="站点副标题" />
        </div>
        <div class="form-group">
          <label>站点描述</label>
          <textarea v-model="form.description" placeholder="站点描述"></textarea>
        </div>
        <div class="form-group">
          <label>站点URL</label>
          <input v-model="form.url" type="url" placeholder="https://..." />
        </div>
      </div>

      <div class="form-section">
        <h3>Logo设置</h3>
        <div class="form-group">
          <label>Logo文字</label>
          <input v-model="form.logo.text" type="text" placeholder="Logo文字" />
        </div>
        <div class="form-group">
          <label>Logo图标</label>
          <input v-model="form.logo.icon" type="url" placeholder="Logo图标URL" />
        </div>
      </div>

      <div class="form-section">
        <h3>联系方式</h3>
        <div class="form-group">
          <label>邮箱</label>
          <input v-model="form.contact.email" type="email" placeholder="contact@example.com" />
        </div>
        <div class="form-group">
          <label>微信公众号二维码</label>
          <input v-model="form.contact.wechat" type="url" placeholder="二维码图片URL" />
        </div>
      </div>

      <div class="form-section">
        <h3>版权信息</h3>
        <div class="form-group">
          <label>版权文字</label>
          <input v-model="form.copyright" type="text" placeholder="© 2024 ..." />
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="btn btn-ghost" @click="loadSettings">重置</button>
        <button type="submit" class="btn btn-primary">保存设置</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const form = ref({
  title: '',
  subtitle: '',
  description: '',
  url: '',
  logo: {
    text: '',
    icon: ''
  },
  contact: {
    email: '',
    wechat: ''
  },
  copyright: ''
});

const loadSettings = async () => {
  try {
    const response = await fetch('/api/site.json');
    const data = await response.json();
    form.value = {
      title: data.title || '',
      subtitle: data.subtitle || '',
      description: data.description || '',
      url: data.url || '',
      logo: {
        text: data.logo?.text || '',
        icon: data.logo?.icon || ''
      },
      contact: {
        email: data.contact?.email || '',
        wechat: data.contact?.wechat || ''
      },
      copyright: data.copyright || ''
    };
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
};

const saveSettings = async () => {
  try {
    const response = await fetch('/api/site.json', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    if (response.ok) {
      alert('设置已保存');
    } else {
      alert('保存失败');
    }
  } catch (error) {
    console.error('Failed to save settings:', error);
    alert('保存失败');
  }
};

onMounted(loadSettings);
</script>

<style scoped>
.form-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.form-section:last-of-type {
  border-bottom: none;
}

.form-section h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
  margin-bottom: 6px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 2rem;
}
</style>
