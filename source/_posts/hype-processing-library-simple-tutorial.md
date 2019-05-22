---
title: Processing 框架 Hype 简易教程
comments: true
date: 2018-09-11 22:28:22
updated: 2018-09-11 22:28:22
categories: blog
tags:
- Processing
- Hype Framework
- Creative Coding
- 创意编程
blog_category: Tech Note
summary: Processing 还需要第三方框架？！是的，你没有听错。虽然 Processing 已经在绘制图形上比原生 Java 容易多了，但是依然有人开发了一个"框架"来让设计更简单
---

## 0x00 简介

什么是 Hype？[Hype](http://www.hypeframework.org) 是一个基于 Processing 的第三方框架。它可以帮助 Processing 的用户减少代码工作量，更专注于生成图像本身的逻辑中。

这里先看几个官网给的样例：

{% asset_img hype-package.png Downloaded Hype Framework Package %}

## 0x01 安装

1. 首先，需要将 Hype 库下载下来。可以 `git clone` 一下，也可以直接在 GitHub 网页上点击下载。下载的文件中有一个 distribution 文件夹，打开后有一个 Hype.zip 压缩包。解压这个压缩包，和安装其他 Processing 第三方库一样，将它整个放在你 Processing 目录下的 libraries 文件夹内。

    * Windows 系统在 `My Documents/Processing/libraries/`
    * Mac OSX / Linux 系统在 `~/Documents/Processing/libraries/`

    {% asset_img hype-package.png Downloaded Hype Framework Package %}

    安装后的目录结构应该是这样：


        Processing
          libraries
            HYPE
              examples
              library
                HYPE.jar
              reference
              src


## 0x01 使用方法

1. 引入 hype 库文件（基本的是hype.*，还有其他的功能相关库，需要用的时候可以自行引入）


    import hype.*;


2. 依然是 `setup` 和 `draw` 函数，首先还是使用 `size()` 方法创建画布

3. 新建一个


## 0x02 概念

个人觉得 Hype 种种设计都很像 JavaScript……比如……

1. 它之所以写起来简单，在于它的"方法链（method chain）"，它可以一口气为一个图形设置所有样式：


    HRect rect2 = new HRect(100);
    rect2
        .rounding(10)
        .strokeWeight(6)
        .stroke(#000000, 150)
        .fill(#FF9900)
        .anchorAt(H.CENTER)
        .rotation(45)
        .loc(247,height / 2)
    ;

2. 有一个相当于全局场景的 `H`


## 0x03 资料

* 完整的 API 文档在 Hype 文件夹下的 reference 文件夹，打开后里面是一串静态页面，用浏览器打开里面的 `index.html` 文件，可以看到是一个 Java Doc 形式的文档

    {% asset_img hype-api.png Hype API Page %}

*
