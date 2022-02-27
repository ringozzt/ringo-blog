# 重绘重排性能优化

## 渲染流水线：

- 生成 dom 树->计算样式->生成布局树->建图层树->绘制列表

## 重绘(reflow)、重排(repaint)定义

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
