---
title: 使用 CSS 创作生成艺术
categories: blog
comments: true
date: 2018-12-30 21:38:48
updated: 2018-12-30 21:38:48
tags:
- CSS
- Creative Coding
- Generative Art
blog_category: Tech Note
summary: 做前端开发的童鞋们应该都知道，有这样的一些人在努力地使用 CSS 画画。但是使用 CSS 做生成艺术？听起来很奇葩，也似乎完全不可能。在进行了一些小小的探索后，我在这篇文章中总结出一些使用 CSS 创作生成艺术作品的技巧。
---

## 0x00 前言

做前端开发的童鞋们应该都知道，有这样的一些人在努力地使用 CSS 画画，例如：

{% asset_img css_art_example.png Rick and Morty CSS Cartoon by Thom Hill %}

以及：

{% asset_img css_art_example_02.png Pure CSS Isometric Towers by  Henry Desroches %}

但是使用 CSS 做生成艺术？听起来很奇葩，也似乎完全不可能。在我们的印象中，CSS 只是一门为网页上元素美化样式的样式表语言。

最近我在网上闲逛，突然发现有一小撮人在孜孜不倦地进行着这个有难度的挑战，让我感到十分惊奇。先给大家看看几幅他们的作品：

{% asset_img generative_art_yuanchuan_01.png generative art by yuanchuan %}

{% asset_img generative_art_yuanchuan_02.png generative art by yuanchuan %}

看起来很棒，对吧？

我立刻被这些看起来“不可能”实现的图画吸引了，于是就开始了本篇文章主题的探索——如何才能使用 CSS 制作生成艺术呢？



## 0x01 CSS 创作生成艺术的挑战

了解“生成艺术”这个名词的人都明白，这是一个历史相当悠久的主题。从计算机图像、甚至计算机还没有普及的时代，人们就开始提出“不使用人类的思维和绘画能力、而改用一个自动系统是否可以创作艺术”的疑问，从此后，随着科技的进步，艺术家们也更多的使用计算机代码实现生成艺术（更多历史见：[Generative Art - Wikipedia](https://en.wikipedia.org/wiki/Generative_art)）。目前，电子艺术家们最常使用的两个创作计算机生成艺术的工具是 [Processing](https://processing.org/) 和 [openFrameworks 库](https://openframeworks.cc/)。

当然了，使用 JavaScript 也可以轻松的创作生成艺术，因为 HTML 5 的 Canvas 和 WebGL 已经功能很强大了，在它们的基础上电子艺术家们还包装了很多专门用来创作艺术的库，例如 [P5.js](https://p5js.org/) 和 [three.js](https://threejs.org/)，让 web 上绘画更简单。

但是，使用 CSS，却在创作生成艺术中面临巨大的挑战。

经过我的小小探索，我总结下来这些挑战主要是以下几点：

### 1) CSS 并不是*动态*编程语言

正是因为生成艺术的“自动化”，**算法**是其中必不可缺少的部分。但是凡涉及算法，必然涉及**变量**和**方程**。普通的编程语言可以很容易地处理这些问题，但是 CSS 只是一门样式表语言，并没有编程语言的这些功能和内容，全部都是静态的。即使是在普通的前端开发中，我们在涉及到改变某个 HTML 元素的 CSS 属性时，还需要大量使用 JavaScript 操作 DOM；或者也可以写几个不同的类（class）名，不同样式分配给不同的类，再给这些 HTML 元素分配相应样式的类名。假如我们创作生成艺术作品，我们可能会有上百个、上千个、甚至更多的相同类型的图像，只是它们的样式或动作各有不同，难道我们要写几百个、几千个类吗？那简直不可想象。

### 2) CSS 属性要怎么用才能让作品的表现性更强

即使是最擅长使用 CSS 画图画的那些 doodler 们，最多也不过是巧妙地应用 CSS transition、3d transition、animation、border-radius、border-shadow、:before / :after 等这几个属性，画出的图像仅仅是线、圆、椭圆、矩形、弧、三角等等的基础二维几何图形，甚至最多不过三维长方体。善用这些基础几何图形当然也可以创作出很棒的作品，但是如果我们想要表现更多呢？CSS 可以满足我们吗？

## 0x02 解决这些问题的关键

解决以上问题的关键很简单——**努力学好 CSS，熟读 [W3C 标准](https://www.w3.org/)，包括所有最新的更新属性**。

可能你要崩溃了。阅读 [W3C 标准](https://www.w3.org/) 当然是想精进前端研发技能的根本，但是读完这些标准需要熬上几个星期甚至几个月的时间。不用担心，我尽量把解决以上两个问题的关键总结在下面供你参考。

### 1) CSS 的“动态”支持：灵活使用 CSS variable 和 HTML data-* 等新属性

如果你是一个拥抱变化（似乎这不是什么好词啊，咳咳）的前端开发者，你应该了解这两个新属性。

1. CSS variable 即自定义属性

   具体的使用方法这篇文章不作详述，可以参考 [Using CSS custom properties (variables) - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)，这里仅举些例子：

   a. 我们可以把 CSS 变量直接定义在 `:root` 中：

   ```html
   <!-- 绘制一个红色的正方形 -->
   <div class="rect"></div>
   ```

   ```css
   :root {
       --bgColor: #ff0000;
   }
   
   .rect {
       width: 100px;
       height: 100px;
       background-color: var(--bgColor);
   }
   ```

   b. 更棒的一个应用是，将 CSS 变量定义在每个元素上，而且他们都是各自独立的，如果有很多个同类的元素，通过 JS 只要改变每个元素的这个 CSS 变量，就可以轻松实现每个元素的不同了。并且还可以通过这种方法实现**改变 `:before`、`:after` 伪元素的 CSS 属性**（JS 操作比较难，需要通过改变整个样式表来改，个人感觉这种方法在结构上可读性不强，看上去让人作呕，所以我避免使用这种方法改伪元素的 CSS 属性）：

   ```html
   <!-- 绘制四个不同颜色的正方形 -->
   
   <div class="rect" id="1"></div>
   <div class="rect" id="2"></div>
   <div class="rect" id="3"></div>
   <div class="rect" id="4"></div>
   ```

   ```css
   .rect {
       --bgColor: #ff000;  // 这里给一个初始值
   }
   
   .rect:after {
       content: " ";
       width: 100px;
       height: 100px;
       background-color: var(--bgColor);  // 每个 --bgColor 变量是各自独立的，改变一个不会影响另一个
   }
   ```

   ```
   // 通过 JavaScript 改变这个值，画出四个不同颜色的正方形
   
   const rectElList = document.querySelectorAll('.rect');
   rectElList.forEach(rect => [
       const hue = random(0, 361);
       rect.style.setProperty('--bgColor', `hsl(${hue}, 100, 50)`);
   ]);
   
   function random(min, max) {
       return Math.floor(Math.ramdom() * max) - min;
   }
   ```



​	以下是我运用这个属性进行的尝试作品（地址：[https://codepen.io/cad0420/full/GPmqYv](https://codepen.io/cad0420/full/GPmqYv)）：

​	 {% codepen cad0420 GPmqYv %}		



1. HTML 的 `data-*`属性：

   这个属性目前应该在很多前端开发者中普及，使用方法参考[Using data attributes - MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)

## 0x03 创作生成艺术常用的技巧总结



## 0x04 更便捷的工具



## 0x05 总结



## 0x06 参考资料

* 讲座《Barak Chamo: Generative Art with CSS》：https://www.youtube.com/watch?v=09GaScnXXVc

* Learning CSS Through Creating Art：[Learning CSS Through Creating Art - DEV Community 👩‍💻👨‍💻](https://dev.to/aspittel/learning-css-through-creating-art-54c0)
* Unicode Patterns by yuanchuan：[Unicode Patterns](https://yuanchuan.name/2018/05/06/unicode-patterns.html)