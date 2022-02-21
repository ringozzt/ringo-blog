# CSS

### 重绘重排性能优化

##### 渲染流水线：

生成 dom 树->计算样式->生成布局树->建图层树->绘制列表

### 重绘(reflow)、重排(repaint)定义

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

### 如何优化

- 减少重排范围

  - 样式操作尽可能降到低层级的 DOM 节点上
  - 设置 table-layout：auto/fixed 让 table 一行一行渲染

- 分离读写操作

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

- 样式集中改变

  更改类名而不是修改样式、cssText 将多个操作写在一行

  ```javascript
  div.style.cssText = 'left:10px;top:10px;width:20px;height:20px;';
  ```

- 缓存布局信息

  ```javascript
  var curLeft = div.offsetLeft;
  var curTop = div.offsetTop;
  div.style.left = curLeft + 1 + 'px';
  div.style.top = curTop + 1 + 'px';
  // 相当于分离读写操作，优化为一次重排
  ```

- 元素批量操作

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

- 单独开一个合成层，使用绝对定位脱离文档流

- 优化动画

  - 牺牲一些平滑度，3 个像素为单位移动

  - 单独开一个合成层，3d 强制开启 GPU 加速

    ```css
    div {
      transform: translate3d(10px, 10px, 0);
    }
    ```

# 伪类和伪元素

#### 伪元素在 css3 之前就存在，之后才分为伪类和伪元素

**1. 伪类表示被选择元素的某种状态，例如`:hover`**

**2. 伪元素表示的是被选择元素的某个部分，这个部分看起来像一个独立的元素，但是"假元素"，只存在于 css 中，所以叫"伪"的元素，例如`::before`和`::after`**

核心区别在于，是否创造了“新的元素”

### 伪类

#### 状态类

- :link 链接原始状态

- :visited 被激活时和访问过之后

- :hover 悬停时

- :focus 聚焦时(上一个点过的地方)

- :active 被激活时

#### 结构性类

- :not(xxx)
- :first-child
- :nth-child(n)第 n 个

#### 表单伪类

- :required 必填
- :read-only 只读
- :invalid 验证失败
- :valid 验证成功
- :disabled 禁用

#### 其他伪类

- :fullscreen 全屏模式下的

### 伪元素

- ::section 光标选中的部分
- ::placeholder 输入框里占位符的颜色
- ::before 前缀
- ::after 后缀

# CSS

### 清除浮动

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

### 长文本处理

- 字符超出部分换行

  overflow-wrap: break

- 字符超出位置使用连字符

  hyphens: auto

- 单行超出省略

  white-space: nowrap;

  overflow:hidden;

  text-overflow: ellipsis;

- 多行超出省略

  overflow:hidden;

  text-overflow: ellipsis;

### 垂直居中

单行文本、inline、inline-block

- text-align:center;

  padding: 10px 0;

- text-align:center;

  height: 100px;

  line-height:100px;

### 定宽高

- absolute+负 margin
- absolute+0 位移+margin auto
- absolute+calc(50%-50px)

### 不定宽高

- absolute+transform:translate(-50%,-50%)

- 父 flex

  justify-content: center

  align-items:center

- 父 display:grid

  子 justify-self：center

  align-self：center

- 父 display:table-cell

  vertical-align:middle

  text-align:center

  子 display:inline-block

### 两栏布局

- aside:

  float:left

  width:200px

  main:

  overflow:hidden

- float+margin

- flex+flex:1 原理 flex-grow1flex-shrink1flex-basis0

- grid grid-template-columns:200px 1fr

### 三栏布局

- 圣杯布局

  - 三浮动，侧边栏相对定位移回来

- 双飞翼

  - 三浮动，侧边栏 margin 回来

- float+overflow（BFC）

  - main：overflow：hidden
  - aside width+float

- flex+flex1(flex:1 1 0% 后两位固定，赋值也是给第一位)
- grid+grid-template-columns：200px 1fr 200px

### CSS 权重

### CSS 盒模型
