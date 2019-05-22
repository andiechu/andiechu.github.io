---
title: iOS 开发学习日记 20141209
comments: true
date: 2014-12-09 13:15
updated: 2014-12-09 13:15
categories: blog
tags:
- iOS
- 笔记
- 学习
blog_category: Tech Note
summary:
---

I.《马上着手开发 iOS 应用程序 (Start Developing iOS Apps Today)》
=============
使用系统 OS X 10.10，Xcode 6.1.1 进行开发学习，教程中有遗漏的点：

* `Introduction` —> `Tutorial: Basics` 中，Xcode 6.1.1 缺少的 `Empty Application` 模版可以在这里进行下载：[the Missing Templates](https://github.com/cDigger/AddMissingTemplates)
* `串联图（Storyboard）`步骤中，Xcode 6 中会出现按照教程中步骤创建完 Storyboard 无法启动模拟器、程序 crash 掉的现象，新创建的这个串联图也并没有教程中所说的“箭头”产生。这是因为默认新创建的 storyboard 没有将其设置为初始的视图控制器。解决方法是：在右侧的工具窗中选择 `Show the Attributes inspector`，勾选窗体中 `View Controller` 栏目下的 `Is Initial View Controller`，此时可以看到控制器右侧可以出现箭头。
* iPhone 6 发布后，iOS 应用出现了更多不同的屏幕大小、分辨率。此时 Xcode 已经不再单纯的仅仅默认添加一个长方形的 View Controller 在串联图中。按照教程上面的步骤将 `View Controller` 组件拖入串联图界面中，发现我们创建的 View 是正方形的，运行模拟器后发现 iPhone 6 的模拟器只能勉强显示图的左半边。原因是新的 iOS 系统使用更加复杂的 `Size classes` 类来设置应用 View 的大小。解决方法：在 `Show the Size inspector` 中自行调整 View Controller 的大小。如果你仅仅想按照此教程简单的过一遍，用回原来的长方形组件，那么可以在 `Show the File inspector` 中，取消勾选 `Interface Builder Document` 栏目下 `Use Size Classes` 选项，此时组件变回长方形。但是由于 `View as` 选项中可以看到它是基于 iOS 7 的，在 iPhone 6 设备/模拟器上面依然无法符合屏幕的尺寸，我们可以选择 iPhone 5s 的模拟器来运行此项目，此时我们的app就可以显示的比较完美了。更多适配尺寸的介绍，参考以下苹果官方文档：

  * [iOS Human Interface Guidelines -- Adaptivity and Layout](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/LayoutandAppearance.html)
  * [Size Classes Design Help](https://developer.apple.com/library/ios/recipes/xcode_help-IB_adaptive_sizes/_index.html)