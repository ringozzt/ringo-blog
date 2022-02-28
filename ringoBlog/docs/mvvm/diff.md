# 数据驱动视图

当今最火热的两个 Js 框架，Vue 和 React，大大提高了前端开发者的效率

## 理解 SPA 框架

### **利用虚拟 dom 实现数据和 UI 的绑定**

核心还是 Virtual DOM，`为什么Vue和React都选择Virtual DOM`（React 首创 VDOM，Vue2.0 开始引入 VDOM）？，

1. **减少直接操作 DOM**。框架给我们提供了屏蔽底层 dom 书写的方式，减少频繁的整更新 dom，同时也使得**数据驱动视图**
2. 为**函数式**UI 编程提供可能（React 核心思想）
3. 可以**跨平台**，渲染到 DOM（web）之外的平台。比如 ReactNative，Weex

### 核心思想不同

Vue 早期定位是尽可能的`降低前端开发的门槛`（这跟 Vue 作者是独立开发者也有关系）。所以 Vue `推崇`灵活易用（渐进式开发体验），数据可变，双向数据绑定（依赖收集）。

React 早期口号是 `Rethinking Best Practices`(重新思考最佳实践)。背靠大公司 Facebook 的 React，从开始起就不缺关注和用户，而且 React 想要做的是用更好的方式去颠覆前端开发方式（事实上跟早期 jquery 称霸前端，的确是颠覆了）。所以 React `推崇`函数式编程（纯组件），数据不可变以及单向数据流。函数式编程最大的好处是其稳定性（无副作用）和可测试性（输入相同，输出一定相同），所以通常大家说的 React 适合大型应用，根本原因还是在于其函数式编程。

由于两者核心思想的不同，所以导致 Vue 和 React 许多外在表现不同（从开发层面看）。

### 核心思想不同导致写法差异

`Vue推崇template（简单易懂，从传统前端转过来易于理解）、单文件vue`。而且虽然 Vue2.0 以后使用了 Virtual DOM，使得 Vue 也可以使用 JSX（bebel 工具转换支持），但 Vue 官方依然首先推荐 template，这跟 Vue 的核心思想和定位有一定关系。

`React推崇JSX、HOC、all in js`。

### 核心思想不同导致 api 差异

`Vue定位简单易上手，基于template模板 + options API`，所以不可避免的有较多的概念和 api。比如 template 模板中需要理解 slot、filter、指令等概念和 api，options API 中需要理解 watch、computed（依赖收集）等概念和 api。

`React本质上核心只有一个Virtual DOM + Diff算法`，所以 API 非常少，知道几个 hooks 就能开始开发了。

### 核心思想不同导致社区差异

`由于Vue定义简单易上手，能快速解决问题，所以很多常见的解决方案，是Vue官方主导开发和维护`。比如状态管理库 Vuex、路由库 Vue-Router、脚手架 Vue-CLI、Vutur 工具等。属于那种大包大揽，遇到某类通用问题，只需要使用官方给出的解决方案即可。

`React只关注底层，上层应用解决方案基本不插手`，连最基础的状态管理早期也只是给出 flow 单向数据流思想，大部分都丢给社区去解决。比如状态管理库方面，有 redux、mobx、redux-sage、dva 等一大堆（选择困难症犯了），所以这也造就了 React 社区非常繁荣。同时由于有社区做上层应用解决方案，所以 React 团队有更多时间专注于底层升级，比如花了近 2 年时间把底层架构改为 Fiber 架构，以及创造出 React Hooks 来替换 HOC，Suspense 等。 更多框架设计思想可看 [尤雨溪 - 在框架设计中寻求平衡](https://www.bilibili.com/video/av80042358?from=search&seid=17425026665332701435)。

### 响应式原理不同

这个问题网上已经有许多优秀文章都详细讲解过，这里就不具体展开讲，对 Vue3 响应式原理有兴趣可以看笔者 [Vue3 响应式原理 ](https://lq782655835.github.io/blogs/vue/vue3-reactive.html)(Vue2 和 Vue3 响应式原理基本一致，都是基于依赖收集，不同的是 Vue3 使用 Proxy)。

Vue

- `Vue依赖收集，自动优化`，数据可变。
- Vue 递归监听 data 的所有属性,直接修改。
- 当数据改变时，自动找到引用组件重新渲染。

React

- `React基于状态机，手动优化`，数据不可变，需要 setState 驱动新的 State 替换老的 State。
- 当数据改变时，以组件为根目录，默认全部重新渲染

我下面着重讲一下对于 React 设计的学习心得。

## React 的设计理念

我们可以从[官方文档](https://zh-hans.reactjs.org/docs/thinking-in-react.html)看到`React`的理念：

> 我们认为，React 是用 JavaScript 构建**快速响应**的大型 Web 应用程序的首选方式。它在 Facebook 和 Instagram 上表现优秀。

可见，关键是实现`快速响应`。那么制约`快速响应`的因素是什么呢？

我们日常使用 App，浏览网页时，有两类场景会制约`快速响应`：

- 当遇到大计算量的操作或者设备性能不足使页面掉帧，导致卡顿。
- 发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应。

这两类场景可以概括为：

- CPU 的瓶颈
- IO 的瓶颈

### 提高 CPU 的利用率

主流浏览器刷新频率为 60Hz，即每（1000ms / 60Hz）16.6ms 浏览器刷新一次。

我们知道，JS 可以操作 DOM，`GUI渲染线程`与`JS线程`是互斥的。所以**JS 脚本执行**和**浏览器布局、绘制**不能同时执行。

在每 16.6ms 时间内，需要完成如下工作：

```text
JS脚本执行 -----  样式布局 ----- 样式绘制
```

当 JS 执行时间过长，超出了 16.6ms，这次刷新就没有时间执行**样式布局**和**样式绘制**了。

如何解决这个问题呢？

答案是：在浏览器每一帧的时间中，预留一些时间给 JS 线程，`React`利用这部分时间更新组件（可以看到，在[源码 ](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L119)中，预留的初始时间是 5ms）。

当预留的时间不够用时，`React`将线程控制权交还给浏览器使其有时间渲染 UI，`React`则等待下一帧时间到来继续被中断的工作。

> 这种将长任务分拆到每一帧中，像蚂蚁搬家一样一次执行一小段任务的操作，被称为`时间切片`（time slice）

### 减少 IO 次数

`网络延迟`是前端开发者无法解决的。如何在`网络延迟`客观存在的情况下，减少用户对`网络延迟`的感知？

比如说：点击一个按钮跳转页面，可以先在当前页面停留一小段时间，这段时间用来请求数据。如果超过这个时间范围，再显示`loading`。这样可以避免点击触发事件后，请求数据立即返回导致`loading`一闪而过的效果，提升用户体验。

#### Suspense

`React16.6`于 2018 年 10 月份发布，该版本带来了许多新的特性同时赋予给 React 更强大的功能。其中最为显著的两个特性是 `React.Suspense` 和 `React.lazy` 。

可以查看这个 [demo](https://juejin.cn/post/7062188906464149518)

实际上，`Suspense`的作用是**划分页面中需要并发渲染的部分**。

当明确了`Suspense`的意义后，你会发现，`React`接下来在做的事，就是不断扩充`Suspense`的场景（也就是说将更多场景纳入并发渲染的范畴）。

比如，当前已有的：

- `React.lazy`
- 通过`React`提供的`fetch`库改造后的异步请求
- `useTransition`
- `useDeferredvalue`

未来会加入的 (React18)：

- `Server Component`
- `Selective Hydration`

详细可以看这篇，传送门：[React18 流式渲染](https://juejin.cn/post/7064759195710521381)

---

## 从发展历史看

`React`的发展历程是：从**同步**到**异步**，再到**并发**。

当实现**并发**后，接下来的发展方向将是：不断扩展可以使用**并发**的场景。

`Suspense`的作用是**划分页面中需要并发渲染的部分**。

这套发展路径从`React`诞生伊始就决定了，因为从架构上来说，`React`重度依赖运行时，为了优化性能，**并发**是这套架构下的最优发展方向。

### 参考文章

1. [Suspense 对 React 意味着什么](https://juejin.cn/post/7062188906464149518)
2. [Streaming SSR](https://juejin.cn/post/7064759195710521381)
3. [vue-react-diff](https://lq782655835.github.io/blogs/vue/diff-vue-vs-react.html)
