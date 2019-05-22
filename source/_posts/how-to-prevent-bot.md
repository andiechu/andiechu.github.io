---
title: 红包/优惠券防刷手段
comments: true
date: 2015-10-15 21:38
updated: 2015-10-15 21:38
categories: blog
tags:
- 营销
- 风控
- 营销活动
blog_category: Product Note
summary: 在做发券类营销活动时候经常遇到刷券的行为，虽然这类黑产防不胜防，但是我也稍微做了一个相关的防范性总结。
---

在红包/优惠券发放的流程中，有以下关键的几个流程点：**运营发送时、用户领用时、用户使用时**，以及有时候会有的过程：**现金的转账**或**优惠券的赠送**等。在每个过程点上面都可以进行防刷措施。

红包/优惠券又分为以下几种：**现金红包、付款时抵扣、使用后返现、使用后返券**等

## 防刷方法

1. 商业手段
    * 限制发放的库存
    * 改变使用的策略
    * 改变红包/优惠券的类型

2. 技术手段
    * 账户真实性验证（如实名制、验证码、手机校验码等）
    * 调用频率、时间段、IP/cookies等可疑性用户排除
    * 对于可获取的用户数据时，研究用户曾经的行为判定是否发放
    * 学习式防刷机制：学习刷单动作进行自动调整

3. 其他手段

    * 这里具体策略不会写出，另外算法应该实时跟随变换。虽然道高一尺魔高一丈，但是我相信防止这类行为，应用人工智能的方法将是最有效的途径。

最后，不但要注意防刷，还要防止误封了或防刷措施未起作用时对普通用户的补偿措施，以免用户产生怨念情绪。
