# CSS3 动画

## 2D

`transform` 是用来实现元素坐标空间的变化， `translate` 用来移动元素， `transition` 给元素的变化加上动画效果。

### transform

字面意思是：使…变形

属性的作用是对给定的元素旋转，缩放，平移或扭曲，通过修改元素的坐标空间实现。

使用方式：`transform: rotate | scale | skew | translate |matrix;`

所以当我们需要对元素做这些操作时，就需要使用 transform 属性。

### translate

大伙在 `transform` 的值中应该发现了 `translate` ， `translate` 的意思就是平移，将元素按照坐标轴上下左右移动

使用方式： `transform: translate(200px,50px);` 元素较原先的位置，往右移动 200px，往下移动 50px

注意， `translate` 属性需要在 `transform` 中才能使用， `translate` 其实也是属于修改元素的空间位置。

### transition

字面翻译是过渡的意思，这个属性可以让元素的变化以动画的形式呈现，比如说过高度从 100 变到 200 `height:100px -> 200px` ，没有其他属性的情况下，这个就是一瞬间的事，为了让页面交互友好些，希望高度的变化能有个过渡效果，那么 `transition` 就派上用场了。

官方介绍： `transition` 提供了一种在更改 CSS 属性时控制动画速度的方法，其可以让属性变化成为一个持续一段时间的过程。

`transition` 用来做动画效果非常的方便，但缺点也很明显，动画不支持循环，复杂的动画就难为它了，所以适用于一些简单的过渡效果。

它有四个值：

- transition-property：指定属性用于生成过渡动画，如宽、高、颜色等等，包括上面介绍的 `transform` ，只要这个属性的值是可以变化就行，且起始状态都是明确的。
- transition-duration：动画执行时间
- transition-timing-function：缓动函数， 内置了这些 ease | linear | ease-in | ease-out | ease-in-out ，也可以上 [easings.net](https://easings.net/) 挑选自己喜欢的效果
- transition-delay：延迟执行的时间

### animation

#### 常用语法

| 值                          | 描述                                                                                         |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| _@keyframes_                | 定义一个动画,@keyframes 定义的动画名称用来被 animation-name 所使用                           |
| _animation-name_            | 检索或设置对象所应用的动画名称 ,必须与规则@keyframes 配合使用，因为动画名称由@keyframes 定义 |
| _animation-duration_        | 检索或设置对象动画的持续时间                                                                 |
| _animation-timing-function_ | 检索或设置对象动画的过渡类型                                                                 |
| _animation-delay_           | 检索或设置对象动画的延迟时间                                                                 |
| _animation-iteration-count_ | 检索或设置对象动画的循环次数                                                                 |
| _animation-direction_       | 检索或设置对象动画在循环中是否反向运动                                                       |
| _animation-play-state_      | 检索或设置对象动画的状态                                                                     |

> animation 翻译成中文是动画的意思，熟练运用之后你可以用它来做各种各样炫酷的动画。

[按钮呼吸态](https://juejin.cn/post/6896487557497323534)

---

[CSS 动画简介](https://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)

[javascript.info css 动画](https://zh.javascript.info/css-animations)

[CSS3 中 translate、transform、translation 和 animation 的区别](https://juejin.cn/post/6844903783676248072)

[CSS3 transform 属性及应用](https://juejin.cn/post/6844903464980447245)

[高性能动画（为什么使用 translate() 比 pos: abs top/left 移动元素更好）](https://juejin.cn/post/6844904077394984968)

[CSS3 Transition 过渡动画用法介绍](https://juejin.cn/post/6844904020729921543)

[掌握 css 动画【animation】](https://juejin.cn/post/6844903974408028167)

## 3D

### 使用 transform-style 启用 3D 模式

要利用 CSS3 实现 3D 的效果，最主要的就是借助 `transform-style` 属性。`transform-style` 只有两个值可以选择：

```CSS
// 语法：
transform-style: flat|preserve-3d;

transform-style: flat; // 默认，子元素将不保留其 3D 位置
transform-style: preserve-3d; // 子元素将保留其 3D 位置

```

当我们指定一个容器的 transform-style 的属性值为 preserve-3d 时，容器的后代元素便会具有 3D 效果，这样说有点抽象，也就是当前父容器设置了 preserve-3d 值后，它的子元素就可以相对于父元素所在的平面，进行 3D 变形操作。

---

[奇思妙想 CSS 3D 动画](https://juejin.cn/post/6999801808637919239)

[css 动画实现旋转的小球](https://juejin.cn/post/7059015996484354079)

[CSS3-转换之 rotate](https://juejin.cn/post/6844903919001272328)
