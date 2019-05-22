---
title: Redis学习笔记
comments: true
date: 2014-11-12 22:56
updated: 2014-11-12 22:56
categories: blog
tags:
- redis
- NoSQL
- 学习
- 后端开发
blog_category: Tech Note
summary:
---

## Redis 介绍

* Redis 是一种“key-value”的存储，通常被当做一个NoSQL数据库
* 原子操作：`INCR`

## 基本操作

* `SET` 负责**永久**存储一个数值在指定的键上；`SETNX` = set if key not exit：

  ```shell
    SET key some-value
  ```

* `GET` 负责读取一个键对应的值：

  ```shell
    GET key
  ```

* `DEL` 操作删除一个key；`INCR` 自增
* `EXPIRE` 定时过期：

  ```shell
    EXPIRE key second
  ```

  `TTL` 过期前的剩余时间，返回值是-2则表示key已不存在，-1表示永远不会过期。如果 `SET` 了key，它的 `TTL` 会被重置：

  ```shell
    TTL key
  ```

*