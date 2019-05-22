---
title: iOS 开发学习笔记：界面的自定义
comments: true
date: 2015-01-08 17:31
updated: 2015-01-08 17:31
categories: blog
tags:
- iOS
- UI
- 客户端开发
blog_category: Tech Note
summary:
---

前几天已经实现了豆瓣的登陆授权，用的比较简单的 UIWebView 中网页方式，没有自己使用界面模拟授权。

今天开始做豆瓣的首页——即关注的人的广播页面。设计是用自定义的 UITableView  展示。今天学习下 Table View 的自定义。暂时没有用代码实现，继续用 storyboard。

参考材料：

* _官方文档：[Table View Programming Guide for iOS](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/TableView_iPhone/AboutTableViewsiPhone/AboutTableViewsiPhone.html)_
* _iOS Programming The Big Nerd Ranch Guide 4th Edition_
* _官方文档：[iOS Human Interface Guidelines](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/index.html#//apple_ref/doc/uid/TP40006556)_

## I 基础知识

两种基本的形式：`plain` 和 `grouped`，前者是不可分割的列表，后者有分离的 sections。

使用 cell 画出，即 `UITableViewCell` 类：

  * 默认的四个 cell 的 style：

    ```
    typedef enum {
    	UITableViewCellStyleDefault,
    	UITableViewCellStyleValue1,
    	UITableViewCellStyleValue2,
    	UITableViewCellStyleSubtitle
    } UITableViewCellStyle;
    ```
  * 两个需要 data source 的方法：列表的数量、某个 index 处的 cell（`tableView:cellForRowAtIndexPath:`）
  * 配置 cell 的内容，在 `tableView:cellForRowAtIndex:` 里面。
  * 复用某个 cell，可以用方法 `dequeueReusableCellWithIdentifier:`
  * 修改某个 cell 的外观和动作，用代理。在代理方法 `tableView:willDisplayCell:forRowAtIndexPath:` 中设置背景等属性，这个方法可以进行 cell 显示出前最后的更改，这个方法中只能进行被 table view 之前就设置好的与状态相关的属性，内容不应该在这里设置。

### 自定义 cell 内容

  * 两种方法：
    1. 为 cell 的内容 view 加 subviews
    2. 自定义一个 `UITableViewCell` 的子类

> 待续……