# 长列表问题

不通过分页，怎么处理长列表呢？



## 无限滚动：分片渲染思路

### 基础版：

**时间分片+DocumentFragment**

关键的API有：requestAnimationFrame，document.createDocumentFragment、Intersection Observer

> DocumentFragment，文档片段接口，表示一个没有父级文件的最小文档对象。它被作为一个轻量版的Document使用，用于存储已排好版的或尚未打理好格式的XML片段。最大的区别是因为DocumentFragment不是真实DOM树的一部分，它的变化不会触发DOM树的（重新渲染) ，且不会导致性能等问题。
> 可以使用document.createDocumentFragment方法或者构造函数来创建一个空的DocumentFragment
>
> [MDN-window.requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)
>
> [MDN-DocumentFragment](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)


- [时间分片渲染长列表](https://juejin.cn/post/6844903938894872589)

### 升级版：

**使用webWorker接收数据，避免阻塞JS主线程；indexedDB存放大量数据**

- [webworker+indexedDB实现长列表](https://juejin.cn/post/6990596611189506062)
- [webWorker怎么使用](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)


------



## 固定区域：监听滚动、动态切换内容

### 基础版：

关键的API有：slice、translate3d(0,${this.startOffset}px,0)、@scroll="scrollEvent($event)"

- [监听滚动、偏移量实现虚拟列表](https://juejin.cn/post/6844903982742110216)

### 升级版：

Intersection Observer这种异步查询替代scrollTop减少dom查询开销

> 这个长列表优化渲染方案优先是基于 `intersectionObserver` + `padding`进行异步加载数据，以及润滑剂基于`scroll` + `padding`进行同步加载数据来完成的，具体步骤除了一开始获取首项item的方式不同，其它的步骤一致，均为取消监听 旧的首末项， 绑定监听新的首末项，然后对容器添加`padding`。在实现正常的滑动的基础上，能够让用户的一些大幅度的举动也能满足要求

- [值得学一波-小书包酱](https://juejin.cn/post/6844904185830473736)



------

参考文章

1. [长列表优化](https://juejin.cn/post/6844904008667103240)
2. [一个简洁、有趣的无限下拉方案](https://juejin.cn/post/6844904009568878600)
3. [前端长列表渲染优化实战](https://juejin.cn/post/6995334008603148295)

