---
title: iOS 开发学习笔记：Delegation 的理解
comments: true
date: 2015-01-16 16:23
updated: 2015-01-16 16:23
categories: blog
tags:
- iOS
- delegate
- 代理模式
- 客户端开发
blog_category: Tech Note
summary: iOS中的 delegation 对于我来说一直比较难以理解，这个代理模式按照字面看不难，但是深层次就比较难以理解了。在网上查了很多资料，理清了下思路
---

iOS中的 delegation 对于我来说一直比较难以理解，这个代理模式按照字面看不难，但是深层次就比较难以理解了。在网上查了很多资料，理清了下思路：

* [Apple 官方文档：Concepts in Objective-C 中的 Delegates and Data Source 章节](https://developer.apple.com/library/ios/documentation/General/Conceptual/CocoaEncyclopedia/DelegatesandDataSources/DelegatesandDataSources.html#//apple_ref/doc/uid/TP40010810-CH11-SW1)
* [What is Delegation and why is it important in iOS programming?](http://programmers.stackexchange.com/a/190400/80422)
* [Raywenderlich.com 的 iOS Design Pattern 教程](http://www.raywenderlich.com/46988/ios-design-patterns)

理解：

* 松耦合：使得 A 类（delegate）依赖于 B 类（delegating 类），而不让 B 类知晓 A 类的任何信息（B 类只知晓 A 类实现的 protocol 的信息）。实现**单向**的依赖关系，而不会形成依赖环。
*
* 当不适合进行方法的继承实现时，可以使用这样的方法，这种模式就像是一种另类的依赖注入
* 帮助维持 MVC 结构，将 Controller 和 View 分开来。比如有些方法逻辑上应该是 controller 负责的，就把这些责任从 view 上面代理给与 view 无关的这些 delegate 对象上实现。
* delegate 也适合帮助 view 应用那些大量的不同的数据并响应交互。
* 通过自己注册 protocol，也可以帮助实现类之间的信息传递。例如：一个父 view controller 和一个子 view controller，当子传递信息（例如想知道它中间的一个 button 是否被按下了）给父时，传统的 property 方式难以实现，这时可以注册一个protocol：

  ```
  @protocol MyChildDelegate
  - (void)bottonWasTappedInChild:(MyChildViewController *)childViewController
  @end

  @interface MyChildViewController : UIViewController

  @property (weak, nonatomic) id <MyChildDelegate> delegate;  // delegate 必须是 weak，否则会形成 retain cycle，哪个对象都不会被释放

  @end
  ```
  在 MyChildViewController 中，当按钮按下时，在这个动作中只要判断下是否你的 delegate 响应了这个 delegation 消息：

  ```
  - (IBAction)someButtonTapped:(id)sender {
      if ([self.delegate respondsToSelector:@selector(bottonWasTappedInChild:)]) {
          [self.delegate bottonrWasTappedInChild:self];
      }
  }
  ```
  将你的 MyChildViewController 的 delegate 设置为 self，并在 parent view controller 里面实现 `bottomWasTappedInChild:` 方法，你就可以实现将消息从子控制器传递到父控制器了。

