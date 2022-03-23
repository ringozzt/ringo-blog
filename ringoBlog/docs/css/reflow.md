# 重绘重排性能优化

## 渲染流水线

- 生成 dom 树->计算样式->生成布局树->建图层树->绘制列表

## 重绘 reflow、重排 repaint 是什么

### 重绘(回流)、重排定义

- 定义：重排必然引起重绘，反之不会

- 重绘：不改变位置，仅仅外观发生变化。计算样式->绘制列表

  - color
  - visibility
  - border-style
  - background
  - border-radius
  - border-shadow

- 重排：位置产生变动，伪类，dom 增减、移动。流程重走一遍

  - 页面首次渲染

  - table 布局
  - 查询某些属性
  - 激活伪类:hover
  - 元素字体大小变化
  - 添加或者删除 dom
  - 元素尺寸或者位置变化

### 引起重排的事件

1. 页面首次渲染
2. 浏览器窗口大小发生改变
3. 元素尺寸或位置发生改变
4. 元素内容变化（文字数量或图片大小等等）
5. 元素字体大小变化
6. 添加或者删除可见的 DOM 元素
7. 激活 CSS 伪类（例如：:hover）
8. 查询某些属性或调用某些方法

### 引起重排的属性和方法

- clientWidth、clientHeight、clientTop、clientLeft
- offsetWidth、offsetHeight、offsetTop、offsetLeft
- scrollWidth、scrollHeight、scrollTop、scrollLeft
- scrollIntoView()、scrollIntoViewIffNeeded()
- getComputedStyle()
- getBoundingClientRect()
- scrollTo()

### 如何优化

#### **css 层面**

1. 避免使用 table 布局;
2. 尽可能在 DOM 树的最末端改变 class;
3. 避免设置多层内联样式;
4. 将动画效果应用到 position 属性为 absolute 或 fixed 的元素上;
5. 避免使用 CSS 表达式，例如：calc(100vh-20px)

#### **JS 层面**

1. 避免频繁操作样式，最好一次性重写 style 属性，或者将样式列表定义为 class 并一次性更改 class 属性。
2. 避免频繁操作 DOM，创建一个 documentFragment，在它上面应用所有 DOM 操作，最后再把它添加到文档中。
3. 也可以先为元素设置 display: none，操作结束后再把它显示出来。因为在 display 属性为 none 的元素上进行的 DOM 操作不会引发回流和重绘。
4. 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
5. 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

#### 具体操作

**减少重排范围**

1. 样式操作尽可能降到低层级的 DOM 节点上
2. 设置 table-layout：auto/fixed 让 table 一行一行渲染

**分离读写操作**

多个读或者写放一起，不要穿插

```javascript
div.style.top = '10px';
div.style.width = '20px';
div.style.height = '20px';
div.style.height = '10px';

console.log(div.offsetLeft);
console.log(div.offsetTop);
console.log(div.offsetWidth);
console.log(div.offsetHeight);
// offset client scroll这些读取操作会强制刷新渲染队列
```

**样式集中改变**

更改类名而不是修改样式、cssText 将多个操作写在一行

```javascript
div.style.cssText = 'left:10px;top:10px;width:20px;height:20px;';
```

**缓存布局信息**

```javascript
var curLeft = div.offsetLeft;
var curTop = div.offsetTop;
div.style.left = curLeft + 1 + 'px';
div.style.top = curTop + 1 + 'px';
// 相当于分离读写操作，优化为一次重排
```

**元素批量操作**

- display none 元素脱离文档
- 在碎片上改变样式
- Clone 元素回归文档

```javascript
var ul = document.getElementById('demo');
ul.style.display = 'none';
for (var i = 0; i < 1e5; i++) {
  var li = document.createElement('li');
  var text = document.createTextNode(i);
  li.appendChild(text);
  ul.appendChild(li);
}
ul.style.display = 'block';
var ul = document.getElementById('demo');
var frg = document.createDocumentFragment();
for (var i = 0; i < 1e5; i++) {
  var li = document.createElement('li');
  var text = document.createTextNode(i);
  li.appendChild(text);
  frg.appendChild(li);
}

ul.appendChild(frg);
var ul = document.getElementById('demo');
var clone = ul.cloneNode(true);
for (var i = 0; i < 1e5; i++) {
  var li = document.createElement('li');
  var text = document.createTextNode(i);
  li.appendChild(text);
  clone.appendChild(li);
}
ul.parentNode.replaceChild(clone, ul);
```

**优化动画**

**单独开一个合成层，使用绝对定位脱离文档流**

- 牺牲一些平滑度，3 个像素为单位移动

- 开一个合成层，3d 强制开启 GPU 加速

  ```css
  div {
    transform: translate3d(10px, 10px, 0);
  }
  ```

- will-change: transform 和 translate3d 强制开启 GPU 不同，will-change 用于提前通知浏览器元素将要做什么动画，让浏览器提前准备合适的优化设置
  [will-change 介绍](https://juejin.cn/post/6844904111842787341)
