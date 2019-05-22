---
title: Processing IDE (PDE) 使用技巧
comments: true
date: 2018-03-11 11:57
updated: 2018-03-11 11:57
categories: blog
tags:
- Processing
- PDE
- Creative Coding
- 创意编程
- 技巧
blog_category: Tech Note
summary: 总结 Processing 官方编辑器（PDE）的一些使用技巧（持续更新中）
---

*本文将持续更新*

最近一直在写 Processing 的程序，并且给别人做教学答疑。用了 Processing 官方的 IDE（官方叫 PDE）感觉非常难用，虽然也可以导入 Eclipse 或者 IntelliJ IDEA 进行开发，但是想快速的画出一个 sketch 还是官方的方法最简便。于是抽时间总结各方资料，统计一下目前 PDE 的一些使用技巧作为参考。

# 0x00 快捷键

本文将以 OSX 平台为示例，Windows 系统可以尝试将 `CMD` 换成 `Ctrl`。

* 运行程序：`CMD + R`
* 展示模式运行程序（全屏运行程序，草图在屏幕正中央）：`CMD + shift + R`
* 快速把一行代码变为注释：`CMD + /`

    {% asset_img shortcut-comment.png comment keyboard shortcut %}

* 代码自动补全：在偏好设置中将代码补全功能打开，然后用 `Control + 空格` 就可以了。(*假如使用 Mac 的话，一般这个快捷键会被绑定在 Spotlight 上，这时在系统设置里面把 Spotlight 的快捷键换一个就可以了。*)

    {% asset_img shortcut-completion.png completion keyboard shortcut %}
    {% asset_img shortcut-completion-2.png completion keyboard shortcut %}

* 快速格式化：`CMD + T`
* 快速查找一个函数的参考文档（使用方法）：选中函数名后，按 `CMD + shift + F`

    {% asset_img shortcut-ref.png look up reference %}


# 0x01 调试技巧

* Tweak模式：`CMD + SHIFT + T` (这是一个非常有用的调试模式，可以在运行中可视化的改变颜色、变量大小等参数，这样你可以即时看到自己草图的效果，不需要每次都费时地调整代码、重新运行)

    {% asset_img shortcut-tweak01.png tweak 01 %}
    {% asset_img shortcut-tweak02.png tweak 02 %}
    {% asset_img shortcut-tweak03.png tweak 03 %}


# 0x02 拓展工具

打开菜单中的“工具”，可以看到很多工具，并且可以通过最后一项的“添加工具…“来添加更多实用工具。

 {% asset_img tool-menu.png comment keyboard shortcut %}

* 添加中文支持
    * 先在 `Processing` -> `偏好设置…` 里，重新选择一个支持中文的字体
    * 并勾选偏好设置的“启用复杂字体输入”
    * 重启 PDE
    * 可以看到已经可以支持中文了

    {% asset_img support-chinese.png support Chinese %}
