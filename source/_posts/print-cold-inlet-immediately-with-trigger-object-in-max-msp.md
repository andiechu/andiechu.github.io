---
title: 巧用 Max/MSP 的 trigger 对象，让 cold inlet 实现立即输出
date: 2018-04-13 17:08
updated: 2018-04-13 17:08
categories: blog
tags:
- Max/MSP/Jitter
- Max
- 创意编程
- 技巧
- tips
comments: true
blog_category: Tech Note
summary: MAX/MSP 中的 cold inlet 输入端仅可以改变对象中存储的参数值，而不会立刻输出。使用 trigger 对象可以实现让 cold inlet 改变后立即输出。
---

Max/MSP 中，一个对象通常拥有两种不同的输入端—— hot inlet（鼠标悬浮时红色的输入端口）和 cold inlet（鼠标悬浮时蓝色的输入端口）. 在 hot inlet 不改变的情况下，cold inlet 不论如何改变参数，都只是保存在这个对象中而不会输出结果，等到 hot inlet 改变时，cold inlet 的改动才会一并输出。

典型的例子就是加减乘除的运算符对象：

{% asset_img cold-inlet-01.png 案例1 %}

此例子中，不管右边的 number box 中数值如何变化，左边的数值不变，最后的结果仍然不变。只有当左边的变化时，整个结果的才会变化：

{% asset_img cold-inlet-02.png 案例1-结果 %}

这时，有的人会产生这样的问题——**如果我想改变右边 cold inlet 的输入并立刻让它输出结果，这时需要怎么做？**

这时，**我们可以使用 `trigger` 对象来解决这个问题**。用上文中的案例来说明用法，我们将 `trigger` 对象这样加入到 cold inlet 输入之前：

{% asset_img cold-inlet-03.png 案例1-使用trigger改进 %}

这里我们在 trigger 中同时激发了两个数值：bang 和整形数值 i。效果相当于在改变右边的 number box 时，为右边的 cold inlet 输入了一个整形数值（i）、之后马上为左边的 hot inlet 输入了一个bang，因此右边 number box 的改动可以立刻输出。

要注意：这里的 bang 不要加在 i 右边，因为 Max/MSP 中执行顺序是从右至左，所以我们一定要让 bang 在 cold inlet 输入完之后再触发 hot inlet。