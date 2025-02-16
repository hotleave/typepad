# 玫枫跟打器
> Roseo Maple Type Pad

<img width="150" src="img/logo.png"/>

## 线上地址
[https://kylebing.cn/tools/typepad/](https://kylebing.cn/tools/typepad/)


### 截图

<img width="1552" alt="Screen Shot 2020-12-09 at 12 10 30" src="https://user-images.githubusercontent.com/12215982/101584048-b4635680-3a17-11eb-8e2a-0a655aa15e3e.png">

<img width="1552" alt="Screen Shot 2020-12-09 at 12 10 26" src="https://user-images.githubusercontent.com/12215982/101584063-bcbb9180-3a17-11eb-86ea-22e00d71483a.png">


## 前言
自己是个五笔爱好者，也一直在使用五笔，从 `Windows` 转到 `Mac` 之后，也没有有可用的跟打器，每回想练练打字了都需要打开 `Windows` 模拟器来打字。
一直一直想有个能在 `macOS` 上运行的跟打器。
最初是想自己用 `swift` 开发一个原生的 `app`，搭了个框架，准备写的时候发现好多东西不太熟。后来突然的一个周末，突然又想用本行开发一个试试，于是就有了这个。

从最初的打字功能，越写越多：

`自定义发文内容`《`无网络的时候也能使用`《`重复时乱序当前段`《`实现重复发文`《`实现自动发文功能`《`v2.0 拆分 js 文件到模块，采用 require.js AMD 形式加载` 
《`汉字时打字时不显示输入的编码`《`添加 CET 英文单词输入，并显示释义`《`记录添加文章种类`《`添加文章`《`长文本时自动滚动`《`添加暗黑模式` 
《`能记录已打的记录，删除`《`能记录用户发文配置`《`能乱序当前段，乱序整篇文章`《`选择发文字数`《`能切换常用文章`《`能显示实时的码长、速度、击键速度`
《`能对照显示已打的字的对错`《`能统计按键`《`能打字`


## 使用说明

__推荐在 Chrome 谷歌浏览器中使用__

__目前不支持不在编辑区输入编码的输入法__


## 开发说明

出于个人挑战的目的，想使该项目的文件大小越小越好。

 - 使用 `require.js` AMD 形式加载模块文件
 - `css` 使用 `scss` 编写。
 - 历史记录使用 `indexedDB` 存储
 - 配置使用 `localStorage` 存储
 - 使用 `service-worker` 处理离线请求