---
layout: portfolio
title: Minimal Designed Hexo Theme
categories: portfolio
comments: true
date: 2018-09-16 10:46:27
updated: 2018-09-16 10:46:27
tags:
- HTML/CSS/JavaScript
- Hexo
- JQuery
- Web Animation
work_category: Web Development
cover_img: hexo-theme-cover.jpg
---

{% asset_img display-01.jpg 我的Hexo主题封面展示 %}

This is a minimal Hexo theme which was made for my own portfolio. It is responsive and fully supports mobile browsing.

I also treated it as my first interactive website exercise. Therefore, some web animation skills are implemented in it. Most of the animations are made with **original CSS3 properties**, instead of animation libraries. The viewport animation of the home page is also wrote in **original canvas**. At first I considered to do it with P5.js, but soon found out the performance was quite a problem. So I transplanted the animation codes to original JavaScript.

{% asset_img theme-animation.gif 主页部分动画 %}

As for technical part, it is completely built on [Hexo](https://hexo.io/docs/themes). I hacked the simple blog engine, which only contained blogs, into not only a web based journal but a portfolio gallery as well. During the development, I also discovered some **advanced usage** of Hexo as well, such as custom layouts, warehouse, etc.

Other techniques that are included:

- JQuery
- Disqus & Gitalk (a GitHub Issue based comment library)
- Slick.js (a simple carousel library)
- Highlight.js (a famous code syntax highlighting library)
- Google Analytics & Basic SEO stuffs