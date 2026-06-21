---
title: 图片自由ComfyUI安装
description: 实现无限制出图自由，8G显存FLUX方案极限部署ComfyUI指南
date: 2026-06-16
tags:
  - AI
  - ComfyUI
cover: https://cdn.jsdelivr.net/gh/cddldg/jst@main/img/20260621144339866.webp
pinned: false
draft: false
---
![image.png](https://cdn.jsdelivr.net/gh/cddldg/jst@main/img/20260621144339866.webp)

**本地、安全、无限制（发挥你的想象即可、你懂的）不啰嗦直接开始**

## ComfyUI 本体下载（Windows 独立便携版）

 官方直达下载链接：[点击这里直接下载官方便携版 7z 压缩包](https://github.com/comfyanonymous/ComfyUI/releases/latest/download/ComfyUI_windows_portable_nvidia.7z)

## 极限瘦身模型包（前往 Hugging Face 或 C站搜索）

| 组件类型            | 推荐下载版本（8G 显存必选）                                            | 存放路径 (以 ComfyUI 为例)                  |
| --------------- | ---------------------------------------------------------- | ------------------------------------ |
| 主绘图模型 (UNET)    | flux1-dev-Q4_0.gguf (约 7GB)或 flux1-schnell-Q4_0.gguf (更轻快) | /models/unet/(注意：千万不要错放进checkpoints) |
| 文本编码器 1 (CLIP)  | clip_l.safetensors (约 240MB)                               | /models/clip/                        |
| 文本编码器 2 (T5XXL) | t5xxl_fp8.safetensors (压缩版，约4.9GB)                         | /models/clip/                        |
| 编码/解码器 (VAE)    | ae.safetensors (FLUX 专用 VAE，约 330MB)                       | /models/vae/                         |


**`flux1-dev-Q4_0.gguf`** 
[点击下载 flux1-dev-Q4_0.gguf](https://www.google.com/search?q=https://huggingface.co/city96/FLUX.1-dev-gguf/resolve/main/flux1-dev-Q4_0.gguf%3Fdownload%3Dtrue)

**`clip_l.safetensors`**
- **Hugging Face 官方直链（推荐）：** [clip_l.safetensors](https://www.google.com/search?q=https://huggingface.co/openai/clip-vit-large-patch14/resolve/main/model.safetensors) _(此为 OpenAI 原始权重转成的 safetensors 格式)_
- **ComfyUI 官方推荐备用直链（适合 FLUX/SDXL）：** [clip_l.safetensors](https://www.google.com/search?q=https://huggingface.co/comfyanonymous/flux_text_encoders/resolve/main/clip_l.safetensors)

**`t5xxl_fp8.safetensors`**
- **Hugging Face 官方直链（ComfyUI 作者维护）：** [t5xxl_fp8_e4m3fn.safetensors](https://www.google.com/search?q=https://huggingface.co/comfyanonymous/flux_text_encoders/resolve/main/t5xxl_fp8_e4m3fn.safetensors)
- **Hugging Face 完整文本编码器仓库：** [comfyanonymous/flux_text_encoders](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main)
- **国内魔搭社区 (ModelScope) 镜像（适合国内无代理直连）：** [comfyui_clip 魔搭下载](https://www.google.com/search?q=https://modelscope.cn/models/SDT/comfyui_clip/files) _(进入后在文件列表中找到 `t5xxl_fp8_e4m3fn_scaled.safetensors` 或类似 fp8 文件下载即可)_

**`ae.safetensors`**
- **Hugging Face 官方直链（推荐）：** [ae.safetensors](https://www.google.com/search?q=https://huggingface.co/black-forest-labs/FLUX.1-dev/resolve/main/ae.safetensors) _(文件大小：约 335 MB，源自 Black Forest Labs 官方仓库)_
- **国内魔搭社区 (ModelScope) 镜像直链（国内极速直连）：** [ae.safetensors (魔搭镜像)](https://www.google.com/search?q=https://modelscope.cn/models/AI-ModelScope/FLUX.1-dev/resolve/master/ae.safetensors)

## 魔改启动参数（以 ComfyUI 为例）

用记事本打开 ComfyUI 根目录下的启动批处理文件（如 run_nvidia_gpu.bat ）。在启动命令末尾手动添加极限低显存参数： --lowvram 。

完整的启动命令看起来应该类似： .\python_embeded\python.exe -s ComfyUI\main.py --windowsstandalone-build --lowvram

保存并关闭文件。

## 一键安装 Manager 管理器

只要把管理器的文件放进对应文件夹，重启软件它就会自己长出来：

1. **下载管理器插件**：
    
    - 官方直达下载：[点击直接下载 ComfyUI-Manager 压缩包](https://github.com/ltdrdata/ComfyUI-Manager/archive/refs/heads/main.zip)
        
    - 开源主页：[GitHub - ltdrdata/ComfyUI-Manager](https://github.com/ltdrdata/ComfyUI-Manager)
        
2. **解压并放置**：
    
    - 把下载好的 `ComfyUI-Manager-main.zip` 解压。
        
    - 把解压得到的文件夹，改名为 `ComfyUI-Manager`。
        
    - 把这个文件夹整个复制到你的 ComfyUI 插件目录中： 路径：`\ComfyUI_windows_portable\ComfyUI\custom_nodes\`

## 最后

我安装的都是官方纯净版，有好处有坏处，喜欢的可以安装，有问题留言。
工作流json，下载下来拖进ComfyUI的界面就可以了。
[百度](https://pan.baidu.com/s/1deHNcekhbF5SXk_X44-Nrw?pwd=ymki)
[夸克](https://pan.quark.cn/s/0e455cabc915?pwd=P6uu)