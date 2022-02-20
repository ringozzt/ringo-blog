---
title: 前端缓存
author: ringo
date: '2021-12-12'
---

<!-- # 前端缓存 -->

### 浏览器缓存策略

先查强缓存，超时了会去协商缓存

- 强缓存

  - 请求 url 前，先读缓存，命中返回 200

  - Expires(http1) :设置过期时间

    如果服务器时间和浏览器时间不一致，就不准了

  - cache-control(http1.1)：max-age=3600(s)

    没有使用具体时间点，而是时长

    优先级高于 expires

    private：只有浏览器能缓存，中间代理不行

    no-cache：跳过强缓存，发送 http 请求，直接进入协商缓存

    no-store：不进行缓存

    s-maxage:代理服务器的缓存时间

  - pragma: no-cache，和 cache-control 一样

- 协商缓存

  各有优势：

> etag 更加精准：
>
> - last-modified 编辑了但是没改，也会造成缓存失效
>
> - 一秒内改了多次，last-modified 以秒为单位，体现不出来
> - 性能上 last-modified 优于 etag，hash 比较耗时

- `Last-modified`：最后修改时间

  浏览器第一次发送请求后，resp 中返回

  之后的请求头带上`If-modified-since`，服务器收到后就可以对比判断是否需要返回新的资源

  - `If-modified-since`小于`Last-modified`说明更新了，返回新的资源
  - 否则返回 304，走浏览器的缓存

- Etag

  - 服务器根据文件内容，hash 出唯一标识，只要内容改变就重新生成，resp 中返回给客户端
  - 浏览器下次请求时，带上 If-None-match,发送给服务器，服务器会和该资源的 Etag 对比
    - 不一样了，说明要更新了，返回新的资源
    - 一样，返回 304，走浏览器缓存

- 目前大部分项目中的方案
  - html 协商缓存
  - css js 图片 强缓存，文件名带上 hash

当 ctrl+f5 强制刷新时，跳过强缓存和协商缓存，从服务器取

f5 刷新网页时，跳过强缓存，但会检查协商缓存

浏览器地址栏写入，走缓存拿

###### 浏览器缓存的位置

- service worker

  web worker 线程可以分解耗时的任务

  PWA: service worker 增加了离线缓存的能力，可以拦截页面所有网络请求，使用 cache indexDB 的 api 主动管理缓存内容，为弱网环境下运行 web 提供了可能，让 web 在体验上更接近原生

- memory cache

  使用率高的文件，存活时间短，效率高

  preload：首屏关键资源，类似字体

  prefetch：异步加载的模块、大概率被访问的模块

  如果存在 cache-control 和 max-age 会被存储在 disk 中，否则存在 memory 中

- disk cache

  大的 js css 文件

- push cache

### 浏览器的本地存储

cookie localstorage sessionstrorage

###### Cookie

- 为了弥补 http 在状态管理上的不足
- 容量缺陷：上限 4kb
- 性能缺陷：域名下的任何地址请求都会带上 cookie
- 安全缺陷：以纯文本的形式传递，httponly 为 flase，js 脚本能直接读取 cookie

###### LocalStorage

- 容量：上限 5M，相比于 cookie 大大增加
- 只存在于客户端，不参与和服务端的通信
- 适合存储搜索历史、主题风格官网 logo、vuex、redux 的持久化、部分用户信息
- setItem,getItem,removeItem

SessionStorage

- 会话级别，页面刷新还在，页面关闭就消失了
- 可以存储本次浏览记录、表单信息刷新了还在

###### IndexDB

- 支持事务，二进制数据(arraybuffer,blob 对象)，键值对存储

### DNS 缓存

DNS 是域名和 IP 地址的映射，浏览器也提供了 DNS 的数据缓存，如果一个地址已经解析过，会把解析的结果缓存下来，下次输入直接找到了 ip 地址。另外如果不指定端口，默认 IP80 端口

### 输入 url 到页面渲染发生了什么

- 浏览器构建请求，get http1.1
- 查找强缓存，未命中
- 本地 hosts 文件

  > 下面两步是递归
  >
  > - DNS 域名解析器
  >
  >   电脑里配置的

      以下过程为迭代查询

  - 本地的 DNS 服务器有没有缓存

    一般是电信、联通

  - 如果没有设置转发模式，根域名服务器(返回 com 地址)

  - 顶级域名服务器.com/.cn/.edu(返回 baidu.com 地址)

  - 权威域名服务器.qq/.baidu(返回www.baidu.com)
