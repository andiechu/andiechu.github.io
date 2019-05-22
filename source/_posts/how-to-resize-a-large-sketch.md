---
title: 如何缩放比屏幕尺寸大的 Processing 草图
date: 2018-03-26 14:50
updated: 2018-03-26 14:50
categories: blog
tags:
- Processing
- 分辨率
- 创意编程
- Creative Coding
comments: true
blog_category: Tech Note
summary: 常遇到的一个问题：如果我们的 sketch 尺寸比自己电脑屏幕的尺寸还大，如何才能让草图完整地显示在屏幕上呢？
---

## Q：

如果 size() 方法设置的尺寸比电脑分辨率大，怎么才能看到屏幕以外的部分呢？

## A：

Processing 虽然有一个 Presentation Mode，但是实际上它没有自己缩放的功能。所以说，我们只能靠自己在绘图过程中进行缩放。

目前可以想到的方法有以下两种：

### 0x00 一种方法是使用 `scale()` 函数

需要在 draw() 函数里面第一行就加上 `scale()` 方法。

*具体使用方法见 [scale() reference](https://www.processing.org/reference/scale_.html)*

### 0x01 另一种方法是使用 `PGraphics`

1. 绘图时，新建一个 `PGraphics` 图层
2. 将所有图形按照你需要的原始尺寸绘制在这个图层上（使用方法：[PGraphics reference](https://www.processing.org/reference/PGraphics.html)）
3. 最后使用 `PGraphics` 对象的 `image(pgraphic, 0, 0, your_width, your_height)` 方法把图像缩放为你屏幕的大小。


**一个示例**

* 没有缩放的代码：

        void setup() {
            size(2000, 1000); // 创建一个2000x1000的草图
        }

        void draw() {
            fill(255);
            noStroke();
            rect(500, 100, 1000, 500);
            fill(0);
            rect(0, 200, width, 100);
            noFill();
            strokeWeight(2);
            stroke(255,0,0);
            rect(0, 0, width, height);
        }

    由于我的屏幕分辨率是1280x800，运行后显示不全：

    {% asset_img broken.png 显示不全的草图 %}


* 按照第一种方法修改：

        void setup() {
          size(2000, 1000); // 创建一个2000x1000的草图
        }

        void draw() {
          scale(1280/2000.0); // 因为我的屏幕分辨率是1280x800，所以除一下得到比例数值

          fill(255);
          noStroke();
          rect(500, 100, 1000, 500);
          fill(0);
          rect(0, 200, width, 100);
          noFill();
          strokeWeight(2);
          stroke(255,0,0);
          rect(0, 0, width, height);
        }

    窗口依然是2000x1000，但是图像缩小到1280宽度了：

    {% asset_img scale.png scale 函数效果 %}

* 按照第二种方法修改：

        PGraphics graphic;  // 新建一个PG图层

        void setup() {
          fullScreen(); // 创建一个全屏的草图，相当于：size(你屏幕宽度, 你屏幕高度)
          graphic = createGraphics(2000, 1000); // 你需要的尺寸的图层
        }

        void draw() {
          graphic.beginDraw();

          graphic.fill(255);
          graphic.noStroke();
          graphic.rect(500, 100, 1000, 500);
          graphic.fill(0);
          graphic.rect(0, 200, graphic.width, 100);
          graphic.noFill();
          graphic.strokeWeight(2);
          graphic.stroke(255,0,0);
          graphic.rect(0, 0, graphic.width, graphic.height);

          graphic.endDraw();

          image(graphic, 0, 0, 1280, 640);  // 我的屏幕分辨率是1280x800，所以将2000x1000的草图等比例缩放到1280x640，你可以根据你的需要更改这两个参数

    效果如下：

    {% asset_img pg.png PGraphics 效果 %}

------

最后总结：这两种方法都是直接把图像缩小，而不只是缩放预览效果，只能用来临时看图像的效果，无论哪种都比较低效，所以建议还是尽量避免这种情况的发生。