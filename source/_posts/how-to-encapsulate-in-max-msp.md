---
title: Max/MSP 中的打包操作
date: 2018-05-05 23:34
updated: 2018-08-05 22:58
categories: blog
tags:
- Max/MSP/Jitter
- Max
- 创意编程
- Creative Coding
comments: true
blog_category: Tech Note
summary: 最害怕庞大的 Max 文件了。要是有个哆啦A梦的口袋就好了。
permalink_rule: /:category/:title
---

## 0x00 随手打包：使用 patcher 对象进行打包

* 使用对象：`patcher`（简称 `p`）
* 其他使用的对象：`inlet` 和 `outlet`
* 具体使用方法：新建 patcher 对象，并且在新弹出的窗口中创建自己的模块化逻辑。使用 inlet 作为输入的代替；outlet 作为输出的代替。或者选中要打包的对象，按 `CMD/Control` + `SHIFT` + `E` 快捷键，快速新建并打包好一个 patcher.

## 0x01 多次复用：抽象操作（Abstraction）

上述 subpatcher 方法虽然简单，但是不太方便复用。Max/MSP 中还有另一个方法可以重新实现这一点，这个方法叫做——抽象操作（abstraction）。

创建一个 abstraction 其实酒是新建一个 patcher 并保存在另一个独立的文件中（须要在 Max 定义的文件路径中）。然后你就可以像新建一个对象一样，可以直接写它的名字进行使用。

在 abstraction 的 patcher 中加入 `#1`、`#2` 这类占位符，代表它的参数，如下图所示：

{% asset_img create-abstraction.png Abstraction 的用法及参数的使用 %}

## 0x02 白盒打包：`bpatcher`

以上两种方法在使用时，在不打开包文件的时候是看不到包内各种数据的变化，只能看到输入对输出结果的影响——所谓的“黑盒”操作。但是如果我们想要看到包内的各种对象是怎么变化的呢？这时我们就需要 `bpatcher` 对象。


使用方法：

1. 新建一个文件，把你想要的对象、inlet、outlet 全放进去，然后保存为一个 abstraction

    {% asset_img create-bpatcher-1.png 新建一个abstraction %}

2. 在主文件中，新建一个 bpatcher 对象。

3. 选择这个 bpatcher 对象，并打开检视器，在监视器中的 `Fatcher File` 中选择刚才你保存的 abstraction

    {% asset_img create-bpatcher-2.png 新建 bpatcher %}

4. 搞掂！随心所欲的用吧。

    {% asset_img create-bpatcher-3.png 可以看到 UI 的哦 %}

## 0x03 快速创建：小片段 `Snippet`

其实这个并不是打包（encapsulation）操作！只是一种快速创建和复用的操作。如果你创建了一些对象的组合，你觉得还不错，以后会经常用到，你可以把他们保存成为“`snippet`”，见 Max 界面最右边的曲别针型按钮。

{% asset_img snippets.png Snippets %}

使用方法：

1. 选中你需要保存的组合
2. 鼠标右键单击，在弹出的菜单中选择“`Save Snippet`”，在下方出现的文本框中为片段命名
3. 以后你想使用这个片段时，点击软件右边的 Snippets 按钮并选择你之前创建的片段，就可以快速创建了

