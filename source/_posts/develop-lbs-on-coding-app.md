---
title: 为Coding iOS 客户端添加 LBS 定位功能
comments: true
date: 2015-03-06 13:35
updated: 2015-03-06 13:35
categories: blog
tags:
- iOS
- Core Location
- 客户端开发
blog_category: Tech Note
summary:
---

## I 准备工作

### 项目中的需要考虑的问题与难点

1. 地点信息怎样获取？怎样显示在地图上？

    Core Location Framework : 如何获得权限？以及向前（< iOS 8）兼容的代码如何实现？

2. 周边情况如何获取？大众点评或者其他的SDK吗？

    难点：如果用了别人的SDK，自己创建一个地点，怎么保存？只是保存在自己手机中，还是怎样？

3. 搜索用什么方法实现？

4. 储存的格式？怎样实现的？

5. 界面的实现：统一自定义的 View 的设计——刷新时候的插件？搜索框？还有其他的……都如何实现？

### 分析结构

* “冒泡”页面中，每个 cell 都加一个显示地点的 UIButton，点击该地点 button 打开一个新视图，显示该地点的具体信息（或打开地图显示信息）
* “发布新冒泡”页面，加入一个“添加一个地点”的 UIButton，点击该 button 打开地点搜索页面。
* “搜索位置”的页面，经过测试，在微信中实现为：
  + 下拉刷新，每次多20条；
  + 一旦此页面中加载过一次位置信息，关上GPS的权限，此时刷新周边商户的信息仍然可以刷新出、并且搜索时也可以搜索此位置周边的商户信息——分析此 location 信息已经储存在这个页面中了。但是在下一次从“发送信息”页面进入位置页面时，如果没有GPS的权限时不可以读出任何商户的（包括XX市这个信息也不可以）
  + 当已经选择了一个位置时，再进入此页面（例如想要修改时），无论有没有GPS权限，都会显示搜索框、“不显示位置”、已经选择的位置这三个cell。当有GPS权限，加载附近商户信息，所在的市的信息会插入在“不显示位置”与已经选择的两个之间（indexPath.row == 2）
  +



## II 开始着手

### 源码分析

* 界面上，没有使用 Cocoa 原有的 UITabView，而是使用了开源的 [RDVTabBarController](https://github.com/robbdimitrov/RDVTabBarController)
* 在页面的响应交互中（如：发布冒泡时没有输入文字或图片，“发布”按钮就 disabled），Coding iOS 客户端没有过多使用 delegate，而是使用了第三方依赖 [ReactiveCocoa](https://github.com/ReactiveCocoa/ReactiveCocoa)
* 有关布局中：内容比较复杂的 cell 一般是直接写死了长宽和坐标，根据内容变化。而需要用到 AutoLayout 的地方，用了第三方的 NSLayoutConstraints 的 wrapper：[Masonry](https://github.com/Masonry/Masonry)
* 关于 URL 资源的获取，Coding 客户端使用了 AFNetworking 框架。在源代码中，新建了一个 Coding_NetAPIManager 类，把所有请求都写成一个方法［也是蛮拼的］供其他 controller 调用
* 搜索地点的页面，有一个搜索框，可以复用项目页面的搜索框格式

### 框架学习

#### Core Location
* 搜集地点数据是一个高能源消耗的动作，所以要选择适当的地点服务，小心使用，防止资源的耗尽
* 收集用户当前的地点信息有两种服务：
  1. the standard location service：可以追踪的、特定精准度的、可配置的系统的
  2. the significant-change location service：只在仪器有很大变化（如 500 米或更甚）情况下进行更新
* 地点服务不可用的情况：在系统设置或 app 设置中用户禁用了地点服务；某个 app 用户拒绝了地点服务；仪器在飞行模式或特定的硬件无法开启使用
* 当未关闭 significant-change location service 时，iOS app 会因此 suspended 或 terminated，地点服务在收到新地点信息时会唤醒你的 iOS app，唤醒时，app 会被放在后台，你将有很短的时间手动重启位置服务并处理地点信息（你必须在任何待处理的地点信息递送到之前手动重启后台的 location service）。 并且注意让 app 做一些小动作来防止被终止。

#### AFNetworking
*

#### 大众点评 API
* 流程：注册应用 --> 在自己开发的应用中：请求声称签名（sign）来认证 --> 在后续请求中加入 appKey 与 sign
* 认证过程：根据[官方网站上的文档](http://developer.dianping.com/app/documentation/signature)，
  1. 首先将不包括 appKey 与 secret 的所有要求的参数的 key 根据字符串，从 a 到 z 排序，连接成为一个字符串。然后将 appKey 的 value 值放在最前面作为前缀，secret 的 value 值放在最后面作为后缀。
  2. 将这个字符串进行 SHA-1 加密
  3. 将加密后的字符串进行 16 进制转码，转为大写
  4.


#### iOS 中的单例模式
*


> 未完待续ing……