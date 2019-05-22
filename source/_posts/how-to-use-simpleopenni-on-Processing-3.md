---
title: 如何在 Processing 3 上使用 SimpleOpenNI 库
date: 2018-03-23 10:45
updated: 2018-03-23 10:45
categories: blog
tags:
- Processing
- Kinect
- SimpleOpenNI
- OpenNI
- 创意编程
- Creative Coding
comments: true
blog_category: Tech Note
summary: SimpleOpenNI 已经很久没有更新了，原来的开发者也不再提供 SimpleOpenNI 对 Processing 3.x 的支持。但是业界始终有人在使用 Kinect 探测人体骨骼。今天来聊聊如何（非常勉强地）在 Processing 3 上使用 SimpleOpenNI 库进行开发。
---

由于 OpenNI 被万恶的 Apple 公司收购，做了一个 iPhone X 出来，其他人再也无法把玩 OpenNI，所以基于 OpenNI 库开发的 Processing 库 SimpleOpenNI 也无法再继续更新，因此也就无法再支持新版 Processing 开发。我们这些仰赖开源库的 Creative Coders 如果想要使用 Kinect 进行人体骨骼的探测就比较蛋疼了。我觉得有必要写一篇文章来讨论一下 2018 年的今天，如何在 Processing 上使用 SimpleOpenNI 库。

这里有两种方法：

## 0x00 使用低版本的 Processing 和 旧版 SimpleOpenNI 库

具体配置如下：

`Processing 2.2.1` + `SimpleOpenNI-0.27` + `Kinect 一代` + `OpenNI_NITE_Installer-win64-0.27（假如你使用 Windows 系统）`

SimpleOpenNI-0.27 和 OpenNI_NITE_Installer 的官方下载地址：[SimpleOpenNI 的 Google Code 下载列表（需翻墙）](https://code.google.com/archive/p/simple-openni/downloads)

{% asset_img google-code.png Google Code 下载列表 %}

具体的安装和使用方法，很多市面上的书（例如《格物致知》）里面已经写的很清楚，这里不再多重复。


## 0x01 使用目前最新版的 Processing 3.3.6/3.3.7 和其他开发者专门适配的 SimpleOpenNI for Processing 3 库

网上有其他开发者为适配 Processing 3 在原来开源的 SimpleOpenNI 基础上开发了一套 SimpleOpenNI for Processing 3. 项目页面见此处：[totovr/SimpleOpenni](https://totovr.github.io/SimpleOpenni/)

使用方法：

1. 下载库：

    * 方法一：在 Github 项目页面中下载对应你 Processing 版本的分支上的内容（如果你用 Processing 3.3.6/3.3.7，选择 `Processing_3.3.6` 分支；如果你用 Processing 2.2.1，选择 `Processing_2.2.1` 分支）；

        {% asset_img branch.png Google 选择对应分支下载 %}

    * 如果你访问 Github 有问题或者还是不清楚怎么下载，也可以**使用我共享的文件：[SimpleOpenNI 百度网盘下载地址](https://pan.baidu.com/s/1hOp4iyyIvOpBZRIAZSTWdw)，密码:ur33**

2. 下载以后解压，你可以看到里面有一个 `SimpleOpenNI` 的文件夹。将这个文件夹拷贝到你系统中 Processing 第三方库的文件夹内。

    * Windows系统: `C:\Users\你的用户名\Documents\Processing\libraries`
    * Linux: `~/sketchbook/libraries`
    * OSX: `/Users/你的用户名/Documents/Processing/libraries`

    {% asset_img library.png 选择对应分支下载 %}

3. 然后就可以使用了。下载的压缩包里面还有使用的示例程序供学习和参考，可以直接在 Processing 菜单里的 `文件` --> `范例程序` 中找到。

    {% asset_img examples.png 范例程序 %}

最终效果：

{% asset_img final.png 效果图 %}