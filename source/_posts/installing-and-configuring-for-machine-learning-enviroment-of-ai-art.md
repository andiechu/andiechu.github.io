---
title: 艺术展上机器学习环境的搭建与配置记录
date: 2018-05-15 14:46
updated: 2018-05-19 10:58
categories: blog
tags:
- 机器学习
- Machine Learning
- 人工智能
comments: true
blog_category: Tech Note
summary: 最近公司要办一个艺术展，主要都是通过人工智能生成的互动作品。为了运行这些作品，我帮助公司配置了5台计算机作为开发环境。Linux 系统上坑比较多，这里记录一下碰到的问题，给以后其他人做一个参考。
---


最近公司要办一个艺术展，主要都是通过人工智能生成的互动作品。为了运行这些作品，我帮助公司配置了5台计算机作为开发环境。Linux 系统上坑比较多，这里记录一下碰到的问题，给以后其他人做一个参考。

## 0x00 硬件准备

* 一台安装了 Linux 的 PC（具体安装方法如下文所示）
* 最关键的是显卡的性能：至少 4 GB VRAM 的 NVIDIA 显卡（推荐 GTX 1080 ti 或 Titan X, GTX 1070 或 1060 也可以。GTX 1050 或许也可以，但是可能帧数会比较低、会出现卡顿）
* CPU：虽然没有显卡的参数重要，但是对最小处理速度仍然有要求，推荐是 Intel i5 及以上的配置。内存 16 GB 以上性能会比较好。

## 0x01 安装 Ubuntu 16.04 LTS

目前推荐的系统是 Ubuntu 16.04 LTS 发行版，但是 17.x（稳定版本的）也可以。Debian 理论上也可以，喜欢折腾的同学可以试着安装看看。

#### 1. 制作 U 盘安装盘

#### 2. 安装

分区是朋友推荐的最简化的分区方案：

* / ext4 主分区 100GB （放在硬盘扇区的头上）
* swap 16GB
* /home ext4 主分区 剩下的硬盘空间全部放这个，不分 /usr 等其他分区了


## 0x02 安装相关支持软件和 GPU 驱动

#### 1. 支持性软件的安装

##### a. ShadowSocks 安装和配置

1. Linux 下使用 qt5 版本，[去 Github 下载](https://github.com/shadowsocks/shadowsocks-qt5/realeases)，可以选择 .AppImage 版本
2. 进入下载所在的文件夹后，首先给它添加可执行权限：`chmod a+x Shadowsocks-Qt5-VERSION-PLATFORM.AppImage`
3. 可以直接执行这个文件了
4. 给浏览器增加代理插件，比如 SwitchyOmega 等。各种配置都不再详细阐述

##### b. 安装 git

按照[官网的安装指示](https://git-scm.com/download/linux)安装。由于我的系统用的是 LTS 版本，所以按照稳定版的 Git 安装。

如果你的系统在用 apt-get 安装 Git 时显示缺少一些依赖，可能是因为你的系统中的 apt-get 版本太老了，首先需要升级 apt-get：`sudo apt-get update`。然后升级系统的包并修正坏掉的包：`sudo apt-get -f dist-upgrade`。仅修补坏掉的包：`sudo apt-get -f install`

##### c. 编辑器安装（atom）

1. 官网下载 .deb 的安装包
2. 到下载的目录下，执行：`sudo dpkg -i atom-VERSION.deb`

##### d. 安装 CUDA Toolkit 9.0

按照[这个英文教程](https://gist.github.com/zhanwenchen/e520767a409325d9961072f666815bb8)安装

需要注意的是，我们需要安装的是 9.0 版本，而不是最新的 9.1 版本（也许 9.1 版本也可以用，但是安装 9.1 时，不应该再按照上述英文教程安装 384 的驱动，而应该安装 9.1 适配的 387 版本。这个有兴趣的同学可以自行探索，我之后有时间也会折腾一下试试。）

这里有几个问题：

1. 勘误：文中安装驱动时的指令 `sudo apt-get nvidia-384 nvidia-modprobe` 应为 `sudo apt-get install nvidia-384 nvidia-modprobe`
2. CUDA Toolkit 9.0 的下载地址是 [https://developer.nvidia.com/cuda-90-download-archive?target_os=Linux](https://developer.nvidia.com/cuda-90-download-archive?target_os=Linux)。安装按照 NVIDIA 官网上的安装指令操作。安装时，在询问是否要安装 driver 的时候，选择否（n）。其他安装问题和路径问题都选择是（y）即可。

##### e. 安装 NVIDIA 的 cuDNN

cuDNN 下载地址是：[http://developer.nvidia.com/rdp/cudnn-download](http://developer.nvidia.com/rdp/cudnn-download)

首选需要注册一个 NVIDIA developer membership，登录以后，在下载时选择适配 CUDA Toolkit 版本的 cuDNN 版本，安装即可


## 0x03 安装 Python 和相关的机器学习库

#### 1. 我们使用 Python3

Ubuntu 16.04 LTS 自带的 Python3 版本是 Python3.5.x，我之前安装了python 3.6，反而会让系统很多依赖 Python 的指令直接崩溃（特别是 Terminal 啊啊啊啊啊啊啊好坑）。所以我们暂时不要动，保持 Python 3.5 版本。当然如果喜欢折腾，完全可以一点点攻克这个问题，但是我们的目标是快速地搭建出展出需要的稳定环境（或者学习）所以就暂时先不管了。

#### 2. 安装 pip

1. 首先安装 curl：`sudo apt-get install curl`
2. 然后就可以按照官方参考说明上的安装指导进行安装了：[https://pip.pypa.io/en/stable/installing/](https://pip.pypa.io/en/stable/installing/)
3. 注意，如果你的系统默认 Python 是 2.x版本的，执行命令时候要用 Python3，而且记得执行时候的系统权限

#### 3. 安装机器学习艺术相关的各种 Python 库

我们这次安装了以下几个库：

* [Gene Kogan](http://genekogan.com) 的“风格转移”作品

    {% asset_img ml_cubist_expressionist_impressionist.jpg Style Transfer %}

    + Opencv-Python: `pip install opencv-python`
    + Chainer: `pip install chainer`
    + Cupy: 如果 pip 版本比较老了，首先升级一下 `pip install -U setuptools pip` 然后再安装**与 CUDA Toolkit 对应版本**的 cupy 库（我的CUDA Toolkit 是 9.0，所以是 cuda-90）：`pip install cupy-cuda90`

* [Gene Kogan](http://genekogan.com) 的“肉木偶”作品

    {% asset_img meat-puppet.jpg Meat Puppet %}

    + Opencv-Python: `pip install opencv-python`
    + Tensorflow: `pip install tensorflow-gpu`
    + dlib: 首先要安装 cmake：`pip install cmake`，然后安装 dlib 库：`pip install dlib`（如果失败了，可以去 [dlib 的 Github 库](https://github.com/davisking/dlib)上面 clone，然后按照它的说明 build 安装）
    + Pyqtgraph: `pip install pyqtgraph`

## 0x04 测试

#### 1. 环境测试

运行一下 Python3，导入几个库试试，如果出现任何问题就 OK：

* [Gene Kogan](http://genekogan.com) 的“风格转移”作品

    + `import chainer`
    + `from chainer import cuda, Variable, serializers`
    + `import cv2`

* [Gene Kogan](http://genekogan.com) 的“肉木偶”作品

    + `import tensorflow`
    + `import cv2`
    + `import dlib`

#### 2. 运行代码

一般上面安装测试通过了，你的环境就已经搭建成功了！如果你有代码，也可以运行试试。


## 0x05 其他安装

### 摄像头

一般直接插上就可以用了。如果没有，可以用 `lsusb` 指令看一下 USB 上的情况


## 0x06 安装中遇到的各种坑爹问题

一口气配了 5 台电脑，中间各个电脑遇到的问题层出不穷，同样的配置和硬件竟然还遇到不同的问题（当然我觉得完全可能是电脑店装机的人装了什么蜜汁盗版 Windows 的原因【微笑】）

但是这些问题完全可以靠 Google 解决！这里记录一下可能遇到的问题，以及解决办法。

* 由于安装了 CUDA Toolkit 9.1 导致的一些问题，需要卸载删除 9.1 版本，再按照指示重新安装 9.0 版本。
* 安装 dlib 库之前，必须要有 cmake，否则会安装失败。
* dlib 安装可以[到这里](https://github.com/davisking/dlib)，安装完 C++ 库以后，还要接着按照 Readme.md 上面的“Compiling dlib Python API”继续。
* 已经安装好了 cmake，但是在 dlib 安装时仍然出现了 “Python.h: no such file or directory” 的话，需要先安装 python-dev。如果使用的是 Python 3.5，就执行 `sudo apt-get install python3-dev`；如果使用的是 Python 3.6，则需要执行 `sudo apt-get install python3.6-dev`
* cupy 库需要指定 CUDA 的版本安装，否则会安装失败。
* pyqtgraph 库运行，还需要 PyQt 的库。我们选择装 PyQt5 即可：`pip install PyQt5`

## 0x07 补充资料

1. [如何在 UBUNTU 16.04 LTS 上安装 NVIDIA 驱动和 CUDA 9.0](https://gist.github.com/zhanwenchen/e520767a409325d9961072f666815bb8)

