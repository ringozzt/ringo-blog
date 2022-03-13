# CSS 常见问题盘点

## '+'和'~'有什么不同

- `+` 选择器匹配紧邻的兄弟元素
- `~` 选择器匹配随后的所有兄弟元素

## 选择器权重

内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器

ID 选择器， 如 #id{}

类选择器， 如 .class{}

属性选择器， 如 a[href][title] {color:red;}

伪类选择器， 如 :hover{}

伪元素选择器， 如 ::before{}

标签选择器， 如 span{}

通配选择器， 如 \*{}

以下三种类型的选择器依次下降

1. `id` 选择器，如 `#app`
2. `class`、`attribute` 与 `pseudo-classes` 选择器，如 `.header`、`[type="radio"]` 与 `:hover`
3. `type` 标签选择器和伪元素选择器，如 `h1`、`p` 和 `::before`

其中通配符选择器 `*`，组合选择器 `+ ~ >`，否定伪类选择器 `:not()` 对优先级无影响

另有内联样式 `<div class="foo" style="color: red;"></div>` 及 `!important`(最高) 具有更高的权重

> [`:not` 的优先级影响 - codepen ](https://codepen.io/shanyue/pen/dyGQqBe)可以看出 `:not` 对选择器的优先级无任何影响

> [CSS Specificity - codepen ](https://codepen.io/shanyue/pen/XWMRQOw)可以看出十几个 class 选择器也没有一个 id 选择器权重高

## 清除浮动

- overflow:hidden 元素有阴影或存在下来菜单时会被截断，比较局限

- clear:both 原理 clear:both 左右两边不允许出现浮动

  ```css
  .clearfix {
    zoom: 1; // zoom可以缩放元素，设置1为了兼容ie
  }
  .clearfix::after {
    content: '';
    display: block;
    clear: both;
  }
  // https://codepen.io/bulandent/pen/LYbOvOa
  ```

## BFC

### 触发条件

- 根元素，即`HTML`标签
- 浮动元素：`float`值为`left、right`
- `overflow`值不为 visible，为 `auto、scroll、hidden`
- `display`值为` inline-block、table-cell、table-caption、table、inline-table、flex、inline-flex、- - grid、inline-grid`
- 定位元素：`position`值为 `absolute、fixed`

### 怎么理解

1. 内部的 Box 会在垂直方向上一个接一个的放置

2. 内部的 Box 垂直方向上的距离由 margin 决定。（完整的说法是：属于同一个 BFC 的两个相邻 Box 的 margin 会发生折叠，不同 BFC 不会发生折叠。）

3. 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明 BFC 中子元素不会超出他的包含块，而 position 为 absolute 的元素可以超出他的包含块边界）

4. BFC 的区域不会与 float 的元素区域重叠

5. 计算 BFC 的高度时，浮动子元素也参与计算

## 长文本处理

- 字符超出部分换行

  word-wrap: break-word;

- 字符超出位置使用连字符

  hyphens: auto;

- 单行超出省略

  white-space: nowrap;

  overflow:hidden;

  text-overflow: ellipsis;

- 多行超出省略

  overflow:hidden;

  text-overflow: ellipsis;

## display: inline-block 间隙

> display:inline-block 相比于与浮动、定位最大的不同就是其没有父元素的匿名包裹特性，这使得 display:inline-block 属性的使用非常自由，可与文字，图片混排，可内嵌 block 属性元素，可以置身于 inline 水平的元素中。
>
> 在 CSS 布局中，如果我们想要将一些元素在同一行显示，其中的一种方法就是把要同行显示的元素设置 display 属性为 inline-block。但是你会发现这些同行显示的 inline-block 元素之间经常会出现一定的空隙，这就是“换行符/空格间隙问题”。

### 空隙产生的原因

元素被当成行内元素排版的时候，元素之间的`空白符（空格、回车换行等）`都会被浏览器处理，根据 white-space 的处理方式（默认是 normal，合并多余空白），**原来 HTML 代码中的回车换行被转成一个空白符，在字体不为 0 的情况下，空白符占据一定宽度，所以 inline-block 的元素之间就出现了空隙**。这些元素之间的间距会随着字体的大小而变化，当行内元素 font-size:16px 时，间距为 8px。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>display:inline-block元素之间空隙的产生原因和解决办法</title>
    <style type="text/css">
      .parent .child {
        display: inline-block;
        background-color: #fdfd04;
        width: 100px;
        height: 100px;
      }
    </style>
  </head>
  <body>
    <div class="parent">
      <div class="child">child1</div>
      <div class="child">child2</div>
    </div>
  </body>
</html>
```

### 方案一：避免标签之间的换行

```html
<!-- 将前一个标签结束符和后一个标签开始符写在同一行 -->
<div class="parent">
  <div class="child">child1</div>
  <div class="child">child2</div>
</div>
<!-- 将所有子元素写在同一行 -->
<div class="parent">
  <div class="child">child1</div>
  <div class="child">child2</div>
</div>
```

### 方法二：为父元素中设置 font-size: 0，在子元素上重置正确的 font-size

```html
<div class="parent" style="font-size: 0px">
  <div class="child" style="font-size: 16px">child1</div>
  <div class="child" style="font-size: 16px">child2</div>
</div>
```

缺点：**inline-block 元素必须设定字体**，不然行内元素中的字体不会显示。 增加了代码量。

### 方法三：为 inline-block 元素添加样式 float:left

缺点：**float 布局会有高度塌陷**问题

### 方法四：设置子元素 margin 值为负数

```css
.parent .child + .child {
  margin-left: -2px;
}
```

缺点：元素之间间距的大小与上下文字体大小相关；并且同一大小的字体，元素之间的间距在不同浏览器下是不一样的，如：font-size:16px 时，Chrome 下元素之间的间距为 8px,而 Firefox 下元素之间的间距为 4px。所以不同浏览器下 margin-right 的负值是不一样的，因此这个方法不通用。

注意：当 marigin-right 使用相对单位 em 来表示时，Chrome 下可以正常去除间距,而 Firefox 下元素之间有重叠。

### 方法五：最优解在这，设置父元素，display:table 和 word-spacing

```css
.parent {
  display: table;
  word-spacing: -1em; /*注意兼容性*/
}
```

# display: inline 的元素设置 margin 和 padding

inline 元素的 margin 与 padding 左右生效，上下生效，**准确说在上下方向不会使其它元素受到挤压，仿佛不生效**，其实设置一个边框还是能看见效果的。

# HTML 标签有哪些行内元素

常见的标签有以下几种，可参考 [inline element](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements)

- a
- img
- picture
- span
- input
- textarea
- select
- label

# flex 布局中 align-content 与 align-items

`align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

`align-items`属性定义项目在单行轴线上如何对齐。

# rem、em、vw、vh

- `rem`: 根据根元素(即 `html`)的 `font-size`
- `em`: 根据**自身元素**的 `font-size`
- `vw`: viewport width
- `vh`: viewport height

# normalize.css 与 reset.css

- [normalize.css ](https://github.com/necolas/normalize.css/blob/master/normalize.css): 会保留有用的样式，比如 h1 的字体大小
- [reset.css](https://github.com/jgthms/minireset.css/blob/master/minireset.css): 把所有样式都重置，比如 h1、h2、h3 的字体大小都进行了重置，保持了无样式

# css 加载会阻塞 DOM 树的解析和渲染

css 加载会直接影响网页的渲染，因为只有 css 加载完毕，构建完 CSSOM 后，渲染树(Render Tree)才会构建，然后渲染成位图

如果 html 中有加载 script 的话，还会间接影响 DOM 树的解析，因为 javascript 的下载、解析和执行和阻塞 DOM 树的解析，而 javascript 中有可能访问 CSSOM，比如 Element.getBoundingClientRect，因此 CSSOM 构建完毕以后才会开始 javascript 的执行，间接阻塞 dom 树的解析

---

##### 材料来源

1. [BFC](https://juejin.cn/post/6982179919597928485)
2. [大海哥 CSS 补充](https://juejin.cn/post/6941206439624966152)
