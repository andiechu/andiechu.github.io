---
title: 个人博客的初尝试
comments: true
date: 2014-2-27 01:47
updated: 2014-2-27 01:47
categories: blog
tags:
- Java
- 折腾
blog_category: Tech Note
summary: 从上周周末开始搭建自己的blog。选用国人使用Java开发的B3log开源博客系统，因为这样学习成本会小很多。到了昨天终于把它在本地tomcat+mysql环境上、以及GAE上搭建起来
---

从上周周末开始搭建自己的blog。选用国人使用Java开发的B3log开源博客系统，因为这样学习成本会小很多。到了昨天终于把它在本地tomcat+mysql环境上、以及GAE上搭建起来。

![B3log](http://m1.img.srcdd.com/farm4/d/2014/0227/12/061434D52774A2BBAD4DD2DEBC332710_B500_900_153_56.png)

搭建本地tomcat环境时可参考他们给出的[官方文档](https://docs.google.com/file/d/0BydqZRqXE5TUdF9nVlg4YjhsUVE/edit)，因为从github上面扒下来的项目的目录结构和平常的不太一样。

本地GAE环境还没有搭建起来，因为GAE被墙了，一直在考虑要不要用它，不过BAE最近限制注册，也是个麻烦。服务器上面架设比较简单，直接把b3log的GAE文件夹下面web的文件夹下面的所有文件全部上传（或者打成war包上传）到GAE上自己的application下面（之前要改一下设置，见他们的[官方wiki](https://github.com/andiechu/b3log-solo/wiki)）。

接下来一周的计划：

* 利用周末两天看完GAE的相关知识，搭建好本地的GAE环境；
* 熟悉工程，以及他们自己开发的latke框架。
* 如果时间够，改进一下或者直接重写一个MarkDown编辑器。前端很丑，但是编辑器好不好用还是很重要的呀。