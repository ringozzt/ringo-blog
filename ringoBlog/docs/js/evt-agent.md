# 事件委托

## 事件流

事件流指的是从页面中接受事件的顺序。IE 和 Netscape 开发团队居然提出了两个截然相反的事件流概念。

<img src="https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/evt-agent.png" alt="事件委托-冒泡" style="zoom:100%;" />

- IE 的事件流是 事件冒泡流，从具体元素一层一层传播到 document，现代浏览器都支持事件冒泡
- 标准的浏览器事件流是 事件捕获流，从 document 一层一层找到事件发生的元素，老版本 IE 不支持事件捕获

在 W3C 2 级 DOM 事件中规范了事件模型。

**DOM2 级事件**中规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。

addEventLister 给出了第三个参数用来支持冒泡与捕获:

- false：默认，代表冒泡时绑定
- true：代表捕获时绑定

## addEventListener 的第三个参数

`addEventListener`同时支持了**事件捕获阶段**和**事件冒泡阶段**，而作为开发者，我们可以选择事件处理函数在哪一个阶段被调用。

`addEventListener`方法用来为一个特定的元素绑定一个事件处理函数，是 JavaScript 中的常用方法。`addEventListener`有三个参数：

```javascript
 element.addEventListener(event, function, useCapture)
```

| 参数       | 描述                                                                                                                                                                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| event      | 必须。字符串，指定事件名。 **注意:** 不要使用 "on" 前缀。 例如，使用 "click" ,而不是使用 "onclick"。 **提示：** 所有 HTML DOM 事件，可以查看我们完整的 [HTML DOM Event 对象参考手册](https://www.runoob.com/jsref/dom-obj-event.html)。 |
| function   | 必须。指定要事件触发时执行的函数。 当事件对象会作为第一个参数传入函数。 事件对象的类型取决于特定的事件。例如， "click" 事件属于 MouseEvent(鼠标事件) 对象。                                                                             |
| useCapture | 可选。布尔值，指定事件是否在捕获或冒泡阶段执行。 可能值:true - 事件句柄在捕获阶段执行（即在事件捕获阶段调用处理函数）false - 默认，事件句柄在冒泡阶段执行（即表示在事件冒泡的阶段调用事件处理函数）                                     |

## e.target 和 e.currentTarget

- `e.target`：**触发**事件的元素
- `e.currentTarget`：**绑定**事件的元素

## 事件委托（事件代理）

在实际的开发当中，利用事件流的特性，我们可以使用一种叫做事件委托的方法提高性能。

通俗的说就是将元素的事件委托给它的父级或者更外级的元素处理，它的实现机制就是事件冒泡。

#### 假设有一个列表，要求点击列表项弹出对应的字段：

```html
<ul id="myLink">
  <li id="1">aaa</li>
  <li id="2">bbb</li>
  <li id="3">ccc</li>
</ul>
```

### 不使用事件委托

```js
var myLink = document.getElementById('myLink');
var li = myLink.getElementsByTagName('li');

for (var i = 0; i < li.length; i++) {
  li[i].onclick = function (e) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    alert(e.target.id + ':' + e.target.innerText);
  };
}
```

存在问题：

- 给每一个列表都绑定事件，消耗内存
- 当有动态添加的元素时，需要重新给元素绑定事件

### 丐版事件委托

```js
ul.addEventListener('click', function (e) {
  if (e.target.tagName.toLowerCase() === 'li') {
    fn(); // 执行某个函数
  }
});
```

### 高级的事件委托

错误版事件委托的`bug` 在于，如果用户点击的是 `li`里面的 `span`，就没法触发 `fn`，这显然不对。

那下面我们来看一下正确的事件委托应该怎么写：

```js
function delegate(element, eventType, selector, fn) {
     element.addEventListener(eventType, e => {
       let el = e.target
       // 递归查询事件元素的委托元素
       while (!el.matches(selector)) {
         if (element === el) {
           el = null
           break
         }
         el = el.parentNode
       }
       el && fn.call(el, e, el)
     }，false)
     return element
   }
```

核心代码是 while 循环部分，实际上就是一个递归调用，从里往外冒泡，冒到 currentTarget 为止。比如点击 `span`后，递归遍历 `span` 的祖先元素看其中有没有 `ul` 里面的 `li`。

**事件委托的优点**

- 只需要将同类元素的事件委托给父级或者更外级的元素，不需要给所有的元素都绑定事件，减少内存占用空间，提升性能。
- 动态新增的元素无需重新绑定事件

**需要注意的点**

- 事件委托的实现依靠的冒泡，因此不支持事件冒泡的事件就不适合使用事件委托。
- 不是所有的事件绑定都适合使用事件委托，不恰当使用反而可能导致不需要绑定事件的元素也被绑定上了事件。

### 如何理解事件委托

有三个同事预计会在周一收到快递。为了签收快递，有两种办法：

1. 三个人在公司门口等快递；
2. 委托给前台 MM 代为签收。

现实当中，我们大都采用委托的方案（公司也不会容忍那么多员工站在门口就为了等快递）。前台 MM 收到快递后，她会判断收件人是谁，然后按照收件人的要求签收，甚至代为付款。这种方案还有一个优势，那就是即使公司里来了新员工（不管多少），前台 MM 也会在收到寄给新员工的快递后核实并代为签收。

其实对照我们的事件模型也是一样的：

第一，现在委托前台的同事是可以代为签收的，即程序中的现有的 dom 节点是有事件的；

第二，新员工也是可以被前台 MM 代为签收的，即程序中新添加的 dom 节点也是有事件的。
