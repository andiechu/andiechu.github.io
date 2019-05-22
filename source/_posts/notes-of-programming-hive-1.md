---
title: Programming Hive 笔记 (I)
comments: true
date: 2014-11-03 22:41
updated: 2014-11-03 22:41
categories: blog
tags:
- Hive
- 学习
blog_category: Tech Note
summary: 在学习《Programming Hive》时的笔记记录
---

I. Hive介绍
-------
* Hadoop中，有一个计算系统MapReduce，将计算任务分解到集群中的服务器上计算，这样可以更有效率的处理大数据的计算；计算系统下面有一个分布式文件系统（HDFS）。那么问题来了：

  > 怎样把已有的建立在关系型数据库上面的、使用SQL的数据结构，迁移到Hadoop上面呢？

  答案：

  > HIVE!

* Hive使用大家都熟悉的类SQL语言从Hadoop集群中查询数据，让使用者把注意力都放在查询上，而不是其他方面
* 适合使用Hive的场景：数据仓储应用中——相对静态的数据被分析，不要求快速回应，数据没有频繁的变化
* Hive不是完整的数据库。Hive的功能被Hadoop和HDFS的限制所限制。
  + Hive不提供一条纪录水平上的update、insert、delete。可以通过查询生成新的表，或者导出查询结果到文件
  + 因为Hadoop是面向批处理的系统，Hive查询延迟更高（因为MapReduce的开销），再小的数据集，Hive查询相比传统DB也要花费更长的时间
  + Hive不提供事务
