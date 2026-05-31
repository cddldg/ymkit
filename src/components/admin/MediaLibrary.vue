<template>
  <div class="media-library">
    <div class="upload-section">
      <div class="upload-area" @dragover.prevent @drop.prevent="handleDrop">
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          multiple
          @change="handleFileSelect"
          style="display: none"
        />
        <button class="btn btn-primary" @click="$refs.fileInput.click()">
          选择图片
        </button>
        <p class="upload-hint">或拖拽图片到此处</p>
      </div>
    </div>

    <div class="media-grid">
      <div v-for="media in mediaFiles" :key="media.url" class="media-item" @click="selectMedia(media)">
        <div class="media-preview">
          <img :src="media.url" :alt="media.name" loading="lazy" />
        </div>
        <div class="media-info">
          <span class="media-name">{{ media.name }}</span>
        </div>
      </div>
    </div>

    <!-- Selected Media Preview -->
    <div v-if="selectedMedia" class="selected-preview">
      <div class="preview-header">
        <h3>已选择</h3>
        <button class="btn-close" @click="selectedMedia = null">&times;</button>
      </div>
      <div class="preview-content">
        <img :src="selectedMedia.url" :alt="selectedMedia.name" />
        <div class="preview-actions">
          <button class="btn btn-primary" @click="copyUrl">复制链接</button>
          <button class="btn btn-ghost" @click="insertToEditor">插入到编辑器</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fileInput = ref(null);
const selectedMedia = ref(null);

const mediaFiles = ref([
  { name: 'logo.webp', url: 'https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/logo.webp' },
  { name: 'banner1.webp', url: 'https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/banner1.webp' },
  { name: 'banner2.webp', url: 'https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/banner2.webp' },
  { name: 'banner3.webp', url: 'https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/banner3.webp' },
  { name: 'wx.webp', url: 'https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/wx.webp' },
  { name: 'zfb.webp', url: 'https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/zfb.webp' },
  { name: 'gzh.webp', url: 'https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/gzh.webp' }
]);

const handleFileSelect = (event) => {
  const files = event.target.files;
  uploadFiles(files);
};

const handleDrop = (event) => {
  const files = event.dataTransfer.files;
  uploadFiles(files);
};

const uploadFiles = async (files) => {
  for (const file of files) {
    try {
      // In a real implementation, this would upload to COS
      // For now, we'll just create a local URL
      const url = URL.createObjectURL(file);
      mediaFiles.value.unshift({
        name: file.name,
        url: url
      });
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }
};

const selectMedia = (media) => {
  selectedMedia.value = media;
};

const copyUrl = () => {
  if (selectedMedia.value) {
    navigator.clipboard.writeText(selectedMedia.value.url);
    alert('链接已复制');
  }
};

const insertToEditor = () => {
  // This would integrate with the markdown editor
  if (selectedMedia.value) {
    const markdown = `![${selectedMedia.value.name}](${selectedMedia.value.url})`;
    navigator.clipboard.writeText(markdown);
    alert('Markdown 已复制');
  }
};
</script>

<style scoped>
.upload-section {
  margin-bottom: 2rem;
}

.upload-area {
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s ease;
}

.upload-area:hover {
  border-color: #3b82f6;
  background: #f8fafc;
}

.upload-hint {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #64748b;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.media-item {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.media-item:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.media-preview {
  aspect-ratio: 1;
  overflow: hidden;
  background: #f1f5f9;
}

.media-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-info {
  padding: 8px 12px;
}

.media-name {
  font-size: 0.75rem;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.selected-preview {
  margin-top: 2rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.preview-header h3 {
  font-size: 1rem;
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

.preview-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.preview-content img {
  max-width: 300px;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
}

.preview-actions {
  display: flex;
  gap: 12px;
}
</style>
