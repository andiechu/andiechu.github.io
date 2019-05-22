---
title: MySQL中NULL与空值的区别
comments: true
date: 2014-11-07 18:57
updated: 2014-11-07 18:57
categories: blog
tags:
- MySQL
- 数据库
- Database
blog_category: Tech Note
summary: 昨天在工作时，出现一个问题：数据库中建表某个字段规定为`NOT NULL`的，但是插入的相应字段的字符串为`""`时候，直接插入数据库中，而没有禁止插入
---

昨天在工作时，出现一个问题：数据库中建表某个字段规定为`NOT NULL`的，但是插入的相应字段的字符串为`""`时候，直接插入数据库中，而没有禁止插入。

在网上查了一下，发现在MySQL中，`NULL`（空）与 `""`意义并不相同：

* StackOverFlow.com上相关问题 ["MySQL, better to insert NULL or empty string?"](http://stackoverflow.com/questions/1267999/mysql-better-to-insert-null-or-empty-string) 高票答案：

  使用`NULL`可以区分“没有输入数据”和“输入空数据”， 差异在于：
  + `NULL`的长度就是`NULL`，空字符串的长度为`0`
  + 一串`NULL`数据比空字符串优先排序
  + `COUNT(message)`会将空字符串计数进去，但是不会将`NULL`数据们计入
  + 可以使用绑定变量搜索某个空字符串，但是不可以这样搜索`NULL`，例如：
    ```SQL
        SELECT *
        FROM mytable
        WHERE mytext = ?
    ```
    mytext永远不可能匹配`NULL`值，无论你从客户端如何传值。匹配`NULL`的方法只能这样查询：
    ```SQL
        SELECT *
        FROM mytable
        WHERE mytext IS NULL
    ```

* [MySQL Manual (5.0版本)](http://dev.mysql.com/doc/refman/5.0/en/working-with-null.html)
  + 测试`NULL`需要用`IS NULL`或者`IS NOT NULL`；`=`, `<>`, `<`, `>`等与`NULL`的计算比较，结果仍然为`NULL`
  + MySQL中，`0`或`NULL`表示假，任何其他的值表示真。默认布尔操作的真值为`1`
  + 在`GROUP BY`操作中，两个`NULL`被认为是相等的；并且`NULL`值在`ORDER BY ... ASC`中第一个显示，而在`DESC`中则是最后一个
  +