# 5 个 Observer

> 网页开发中我们经常要处理用户交互，我们会用 addEventListener 添加事件监听器来监听各种用户操作，比如 click、mousedown、mousemove、input 等，这些都是由用户直接触发的事件。
>
> 那么对于一些不是由用户直接触发的事件呢？
> 比如元素从不可见到可见、元素大小的改变、元素的属性和子节点的修改等，这类事件如何监听呢？

### 浏览器提供了 5 种 Observer 来监听这些变动：

**MutationObserver、IntersectionObserver、PerformanceObserver、ResizeObserver、ReportingObserver**。

[浏览器的 5 种 Observer，你用过几种](https://juejin.cn/post/7064557881492209678)
