---
title: 浅谈 Max/MSP 中 message 的用途
date: 2018-05-05 15:16
updated: 2018-05-08 18:37
categories: blog
tags:
- Max/MSP/Jitter
- Max
- 创意编程
- Creative Coding
comments: true
blog_category: Tech Note
summary: MAX/MSP 中的 message（信息）是最让人迷惑的一个对象（或者不应该称为对象），我们经常能够看到它扮演着不同角色出现在各种操作中。是时候总结一下它的用法了。
---

* message box 的功能和用途：

1. 点击时生成信息
2. 当一个信息被收到时，生成新的信息
3. 储存并创建混合类型（文本、数字和列表型）的数据
4. 展示输入的信息
5. 用在其他对象上的指令（比如 open message、reset message）

* 变量的占位符：`$1`、`$2` 等

* 参数的用法：

	+ `append` 和 `prepend`，在输入的信息后面或者前面加上特定的信息段

* 使用 message 作为指令：

    + 改变下一个对象的外观，例如：`bgcolor 0.1 0. 0. 1.`
    + `set` 改变 message box 的值重置，并且**改变时不输出结果**。因此，使用 `set` 可以达到输出不影响对后续对象的效果，如下个例子所示（另外，这个例子如果想要 output，可以在第二个 number box 上加一个 bang）：

        {% asset_img use-set-in-message.png 两个 number box 后面的 message box 值不变 %}

    + 如果想要知道某个对象的输入端口可以接收什么指令或 message，按住 `Control + 鼠标右击`，即可弹出这个端口接收的指令。

        {% asset_img see-inlet-message-list.png 查看接收指令 %}



