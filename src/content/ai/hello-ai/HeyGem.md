---
title: HeyGem本地、稳定、效果好的数字人
description: 这是一个示例 AI 资源文档，展示 AI 页面的内容格式。
date: 2026-05-31
tags: [AI]
cover: https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601005013578.gif
pinned: false
draft: false
---
## 简介
HeyGem数字人已经火过一段时间了，我也是用了一段时间才来分享给需要的同学。 （效果视频滑到文章底部有展示）  

对于自己不愿意出镜或者口播效果不好的人确实是福音，再加上AI写稿、改稿就更是提升效率了！   
  

![图片](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601005013578.gif)

  
使用他主要是：效果好、稳定、免费、本地无限制部署，而且还可以自己扩展功能。   
  
比如可以自己扩展批处理、声音克隆、AI改写文章生成音频等等，需要这些功能还是自己扩展比较好，市面好多改了以后，效果变差、内存硬盘用量增长变快等等。   
  
今天主要分享的是轻量版的安装使用教程，我自己也是用的这本版本，因为可以节约很多空间，希望使用完整功能的到官网看文档安装完整版（https://github.com/duixcom/Duix.Heygem）。  
  
## 安装教程
  
为了网络不方便的同学，我已经**打包好了镜像、wsl、Docker和客户端程序**，大家就不用自己下载和担忧网络问题，**下载这一个就够了**，后续官方有更新也会持续发布。任意打赏获取下载地址。

里面也有官方安装说明

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/3VGpuIoWCjpE1aTicqYJShYWkc2TSaVbC3zpm4JicfPOZ0OEls6SmlEqlTkkB9wDicdCpYsicqsV7H6SrqkdEtPNQA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)


### 1、下载镜像包以后解压到一个非中文的文件夹下

![图片](<data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate\(-249.000000, -126.000000\)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E>)
![image_03.png](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601115022824.webp)


### 2、安装WSL

双击wsl.2.4.12.0.x64.msi 按提示安装即可。
![image_04.png](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601115114355.webp)

![图片](<data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate\(-249.000000, -126.000000\)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E>)

### 3、安装docker

双击Docker Desktop Installer.exe直接安装。

![图片](<data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate\(-249.000000, -126.000000\)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E>)
![image_05.png](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601115123610.webp)

  

配置docker国内镜像（为以后使用docker方便）：

```
{  "builder": {    "gc": {      "defaultKeepStorage": "20GB",      "enabled": true    }  },  "experimental": false,  "registry-mirrors": [    "https://docker-0.unsee.tech",    "https://docker-cf.registry.cyou",    "https://docker.1panel.live"  ]}
```

![image_06.jpeg](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601115211434.webp)

![图片](<data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate\(-249.000000, -126.000000\)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E>)

### 4、安装核心镜像到docker

使用我打包好的镜像直接加载，不用下载，会快很多：

本文件夹目录下，打开命令行（一定要定位到本文件夹目录 PS：直接在上方文件夹路径处输入“cmd”然后回车确认即可打开）

![图片](<data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate\(-249.000000, -126.000000\)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E>)

  ![image_07.jpeg](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601115245184.webp)

输入docker load -i HeygemLite.tar 完成镜像导入；

![图片](<data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate\(-249.000000, -126.000000\)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E>)
![image_08.jpeg](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601115253586.webp)
  

然后输入docker-compose -f docker-compose.yml up -d 配置和启动镜像。

**这一步可以直接双击运行 “启动配置Docker（只需首次安装运行一次）.bat” 自动运行**

![image_09.png](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601115453119.webp)
![图片](<data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate\(-249.000000, -126.000000\)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E>)

### 5、安装客户端

直接双击HeyGem.exe运行，然后开始制作数字人。

![图片](<data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate\(-249.000000, -126.000000\)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E>)

  ![image_10.png](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601115525635.webp)


  

## 使用教程

### 1、添加形象

![图片](<data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate\(-249.000000, -126.000000\)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E>)
![image_11.jpeg](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601115620619.webp)
![image_12.jpeg](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601115710015.webp)
![图片](<data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate\(-249.000000, -126.000000\)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E>)

![图片](<data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate\(-249.000000, -126.000000\)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E>)



![image_13.jpeg](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601115752074.webp)

![image_14.jpeg](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601115800678.webp)



### 2、制作视频
![image_15.jpeg](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601115810206.webp)

![图片](<data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate\(-249.000000, -126.000000\)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E>)
![image_16.jpeg](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601115833600.webp)
![image_17.jpeg](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601115840445.webp)



制作过程可以到Docker里面看日志查看进度

![图片](<data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate\(-249.000000, -126.000000\)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E>)
![image_18.jpeg](https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/img/20260601115846419.webp)

  

### 3、成品效果

特意加了侧脸，效果还是很好的

<video controls  preload="metadata" playsinline>
  <source src="https://ymkit-1307887579.cos.ap-chengdu.myqcloud.com/aud/video_19.mp4" type="video/mp4">
  您的浏览器不支持视频播放
</video>


## 下载地址


百度： https://pan.baidu.com/s/17X9QMXSJxvwJMqtkVN88AQ?pwd=ymgj 

夸克： https://pan.quark.cn/s/d6a409a963a5?pwd=7HSs