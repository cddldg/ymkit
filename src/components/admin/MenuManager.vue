<template>
  <div class="menu-manager">
    <div class="menu-section">
      <h3>主导航菜单</h3>
      <div class="menu-items">
        <div v-for="(item, index) in mainMenu" :key="index" class="menu-item">
          <div class="item-header">
            <input v-model="item.label" type="text" placeholder="菜单名称" />
            <input v-model="item.path" type="text" placeholder="链接路径" />
            <button class="btn-remove" @click="removeMainItem(index)">&times;</button>
          </div>
          <div v-if="item.children" class="sub-items">
            <div v-for="(child, childIndex) in item.children" :key="childIndex" class="sub-item">
              <input v-model="child.label" type="text" placeholder="子菜单名称" />
              <input v-model="child.path" type="text" placeholder="子菜单链接" />
              <button class="btn-remove" @click="removeSubItem(index, childIndex)">&times;</button>
            </div>
            <button class="btn-add-sub" @click="addSubItem(index)">添加子菜单</button>
          </div>
        </div>
        <button class="btn-add" @click="addMainItem">添加主菜单</button>
      </div>
    </div>

    <div class="menu-section">
      <h3>页脚菜单</h3>
      <div v-for="(section, sectionIndex) in footerMenu" :key="sectionIndex" class="footer-section">
        <div class="section-header">
          <input v-model="section.title" type="text" placeholder="分组标题" />
          <button class="btn-remove" @click="removeFooterSection(sectionIndex)">&times;</button>
        </div>
        <div class="footer-links">
          <div v-for="(link, linkIndex) in section.links" :key="linkIndex" class="footer-link">
            <input v-model="link.label" type="text" placeholder="链接文字" />
            <input v-model="link.path" type="text" placeholder="链接路径" />
            <button class="btn-remove" @click="removeFooterLink(sectionIndex, linkIndex)">&times;</button>
          </div>
          <button class="btn-add-sub" @click="addFooterLink(sectionIndex)">添加链接</button>
        </div>
      </div>
      <button class="btn-add" @click="addFooterSection">添加页脚分组</button>
    </div>

    <div class="form-actions">
      <button class="btn btn-ghost" @click="loadMenu">重置</button>
      <button class="btn btn-primary" @click="saveMenu">保存菜单</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const mainMenu = ref([]);
const footerMenu = ref([]);

const loadMenu = async () => {
  try {
    const response = await fetch('/api/menu.json');
    const data = await response.json();
    mainMenu.value = data.main || [];
    footerMenu.value = data.footer || [];
  } catch (error) {
    console.error('Failed to load menu:', error);
  }
};

const addMainItem = () => {
  mainMenu.value.push({ label: '', path: '', children: [] });
};

const removeMainItem = (index) => {
  mainMenu.value.splice(index, 1);
};

const addSubItem = (parentIndex) => {
  if (!mainMenu.value[parentIndex].children) {
    mainMenu.value[parentIndex].children = [];
  }
  mainMenu.value[parentIndex].children.push({ label: '', path: '' });
};

const removeSubItem = (parentIndex, childIndex) => {
  mainMenu.value[parentIndex].children.splice(childIndex, 1);
};

const addFooterSection = () => {
  footerMenu.value.push({ title: '', links: [] });
};

const removeFooterSection = (index) => {
  footerMenu.value.splice(index, 1);
};

const addFooterLink = (sectionIndex) => {
  footerMenu.value[sectionIndex].links.push({ label: '', path: '' });
};

const removeFooterLink = (sectionIndex, linkIndex) => {
  footerMenu.value[sectionIndex].links.splice(linkIndex, 1);
};

const saveMenu = async () => {
  try {
    const response = await fetch('/api/menu.json', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ main: mainMenu.value, footer: footerMenu.value })
    });

    if (response.ok) {
      alert('菜单已保存');
    } else {
      alert('保存失败');
    }
  } catch (error) {
    console.error('Failed to save menu:', error);
    alert('保存失败');
  }
};

onMounted(loadMenu);
</script>

<style scoped>
.menu-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.menu-section h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menu-item {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid #e2e8f0;
}

.item-header {
  display: flex;
  gap: 12px;
  margin-bottom: 0.5rem;
}

.item-header input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
}

.item-header input:focus {
  outline: none;
  border-color: #3b82f6;
}

.sub-items {
  margin-top: 1rem;
  padding-left: 1.5rem;
  border-left: 2px solid #e2e8f0;
}

.sub-item {
  display: flex;
  gap: 12px;
  margin-bottom: 0.5rem;
}

.sub-item input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
}

.sub-item input:focus {
  outline: none;
  border-color: #3b82f6;
}

.btn-remove {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: #fee2e2;
  color: #991b1b;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-remove:hover {
  background: #fecaca;
}

.btn-add, .btn-add-sub {
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px dashed #cbd5e1;
  background: none;
  color: #64748b;
  transition: all 0.2s ease;
}

.btn-add:hover, .btn-add-sub:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  background: #eff6ff;
}

.footer-section {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  margin-bottom: 1rem;
}

.section-header {
  display: flex;
  gap: 12px;
  margin-bottom: 1rem;
}

.section-header input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
}

.section-header input:focus {
  outline: none;
  border-color: #3b82f6;
}

.footer-links {
  padding-left: 1.5rem;
  border-left: 2px solid #e2e8f0;
}

.footer-link {
  display: flex;
  gap: 12px;
  margin-bottom: 0.5rem;
}

.footer-link input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
}

.footer-link input:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 2rem;
}
</style>
