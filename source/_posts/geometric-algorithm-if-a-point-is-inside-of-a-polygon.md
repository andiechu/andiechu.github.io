---
title: 几何算法之判断点是否在多边形内
date: 2018-03-12 17:19
updated: 2018-03-12 17:19
categories: blog
tags:
- 算法
- 几何
- 数学
comments: true
blog_category: Tech Note
summary: 几何算法系列文章，总结一下判断某个点是否在多边形内的算法
---

这是一道经典的算法题。以前我没有用到过，但是在做创意编程甚至是图像处理的时候，我就经常会遇到这个问题。

# 0x00 相交数方法（Crossing Number - CN）

总体来说，就是从该点上发射一个射线，如果射线和多边形的边有奇数条相交，那么就是在多边形内部；偶数则为内部。

{% asset_img point-to-polygon.png 算法示意图 %}

具体的算法步骤如下：

1. 从该点向右水平（或者任何一个你喜欢的方向）画一条无限延长的线（即射线）
2. 数一数这条射线和多边形边的相交数量
3. 如果是奇数，说明点在多边形内部；如果是偶数，说明点在多边形外部
4. **这里还需要判断一下特例情况，就是假如这条射线与多边形某个边在同一条直线上的情况：**
    1. 首先，判断出他们共线
    2. 其次，判断这个点是否在这条边的线段中，如果在线段外，则返回否（至于点如果在边上算不算在多边形内，则需要根据你的需要来判断了，具体请见参考 3）

这个算法的复杂度是 `O(n)`，n 为多边形的顶点数。

使用 Processing 实现这个算法，代码如下：

```Java
  void setup() {
    //稍后补充
  }

  void draw() {

  }

```


> 另：判断两条线段是否相交的方法，一般判断方向是否相同。后续文章我会再做出解释。

# 0x01 环绕数方法（Winding Number - WN）

总体来说，就是计算多边形环绕该点的次数。当环绕数（wn）为 0 时，该点在多边形之外；否则就在内部。

{% asset_img point-to-polygon-wn.png 复杂多边形使用环绕数方法更精确 %}

这个方法在面对非简单多边形、以及距离多边形极近的点时更精确。但是一般说来，时间复杂度更高。


# 0x02 不是算法的算法（强硬地 hack 一下）

这个方法我暂时还没有在 Processing 中尝试过，但是算是一种思路，先放在这里。

1. 新建一个在屏幕之外的画布（Processing 中可以使用 `pushMatrix()`, `translate()`, `popMatrix()` 这一组方法来将其和现实坐标对应起来）
2. 在这个画布上，先给背景画上一种颜色（比如黑色），然后用另一种颜色（比如白色）画多边形
3. 取该点在这个画布上的颜色，根据颜色判断是在内部还是外部

😂😂😂 是不是很巧妙……嗯？🤪🤪🤪

> 这个方法让我突然觉得，其实在做创意编程的时候，很多时候没必要循规蹈矩非要用传统算法去做。这大概就是设计师和程序员思路的不同吧

注：这个方法在画布不大的时候以及可以使用 GPU 加速的时候好用

# 0x03 参考资料

1. [GEOMETRIC ALGORITHMS](http://www.dcs.gla.ac.uk/~pat/52233/slides/Geometry1x1.pdf)
2. [How can I determine whether a 2D Point is within a Polygon?](https://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon)
3. [Inclusion of a Point in a Polygon](http://geomalgorithms.com/a03-_inclusion.html)
