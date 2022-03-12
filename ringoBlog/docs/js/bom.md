# 原生 JS 之 BOM(浏览器对象模型)

JavaScript 运行环境为浏览器时，依靠 BOM 提供的 API 来完成各种功能。

## window 对象

#### BOM 核心对象

有两个身份：ES 中的全局作用域 和 浏览器窗口的 JavaScript 接口

在 ECMAScript 中，window 对象扮演着 Global 对象的角色，也就是说，所有在全局作用域声明的变量，函数都会变成 window 的属性和方法，都可以通过 `window.属性名（或方法名）` 直接调用

**以下几点需要注意**

- 使用 `window.attr` 声明的变量和 `var` 声明的变量有个区别，使用 `var` 声明的变量，不能使用 `delete` 删除，使用 `window.` 声明的变量可以被删除
- 在 JavaScript 中，尝试使用未声明的变量会抛出错误，但是通过 `window` 对象查询未声明的变量，只会返回 `undefined`

## Location

**每次修改 `location` 的 `hash`　以外的任何属性，页面都会以新 URL 重新加载**

```js
window.location = 'http://www.maxiaofei.com';

location.search = '?name=mafei&age=18';

location.hostname = 'www.baidu.com';

location.pathname = 'web/html/a.html';

location.port = '1234';
```

除了 `hash` 值以外的任何修改，都会在浏览器的历史记录中生成一条新的记录，可以通过浏览器的回退按钮导航到前一个页面，可以通过 `replace()` 方法禁止这种行为，使用 `replace` 打开的页面，不能返回到前一个页面。

`location.replace()`，该方法可以覆盖当前页面并重新加载，同时不会在 history 中生成历史记录。

**通过 `location.reload()` 方法可以重新加载页面**

- `location.reload()` : 重新加载（有可能会从缓存中加载）
- `location.reload(true)`： 重新加载（从服务器重新加载）

### navigator 对象

客服端标识浏览器的标准，主要用来记录和检测浏览器与设备的主要信息，也可以让脚本注册和查询自己的一些活动（插件）

### screen 对象

单纯的保存客服端能力的对象。包含以下属性：

| 属性          | 说明                                       |
| ------------- | ------------------------------------------ |
| `availHeight` | 屏幕像素高度减去系统组件高度，只读         |
| `availLeft`   | 没有被系统组件占用的屏幕的最左侧像素，只读 |
| availTop      | 没有被系统组件占用的屏幕的最顶端像素，只读 |
| availWidth    | 屏幕像素宽度减去系统组件宽度，只读         |
| colorDepth    | 表示屏幕颜色的位数，只读                   |
| height        | 屏幕像素高度                               |
| left          | 当前屏幕左边的像素距离                     |
| pixelDepth    | 屏幕的位深，只读                           |
| top           | 当前屏幕顶端的像素距离                     |
| width         | 屏幕像素宽度                               |
| orientation   | 返回 Screen Orientation API 中屏幕的朝向   |

### history 对象

记录浏览器导航历史及相关操作的对象。

`hashchange` 事件：页面 URL 的散列变化时被触发

`history.pushState()` 方法：接收 3 个参数：一个 state 对象、一个新状态的标题和一个（可选的）相对 URL

`popstate` 事件（在 `window` 对象上）：后退时触发

`history.state` 属性：当前的历史记录状态

`history.replaceState()` 方法：接收与 `pushState()` 一样的前两个参数来更新状态

`history.go()`

- 接收一个整数数字或者字符串参数：向最近的一个记录中包含指定字符串的页面跳转

```js
history.go('maixaofei.com'); //向前或者向后寻找指定字符串页面，没有找到则无响应
```

- 当参数为整数数字的时候，正数表示向前跳转指定的页面，负数为向后跳转指定的页面

```js
history.go(3); //向前跳转三个记录
history.go(-1); //向后跳转一个记录
```

`history.forward()`

- 向前跳转一个页面

`history.back()`

- 向后跳转一个页面

`history.length`

- 获取历史记录数，如果是打开的第一个页面，则 `history.length == 0`
- 可以用该属性来判断当前打开的网页是不是该窗口打开的首个网页

## 总结：

**window**既是 JavaScript 的全局对象，也是 BOM 的一个实例，所有的全局方法，属性，BOM 中的属性，都可以通过 `window.` 来调用

**window**作为 BOM 的实例，最常用的几个方法分别是：`window.open()`，`window.close()`，分别用来打开和关闭浏览器窗口页面，这里需要注意的是，通过 open 方法打开的页面，才能通过 close 方法关闭

**location**对象也是用的比较多的一个 BOM 对象，主要用来操作 URL 相关的一些信息，除了修改 Hash 之外的任何属性，页面都会重新加载，历史记录会多加一条历史记录

**location**对象还有一个 `reload()` 方法用于手动重新加载页面，该方法接收一个可选参数，为 `true` 的时候表示从服务器重新加载，否则可能从浏览器缓存中重新加载页面

**location 对象** 还有一个比较特殊的方法，`location.replace()`，该方法可以覆盖当前页面并重新加载，同时不会在 history 中生成历史记录

**navigator 对象**主要用来获取浏览器相关的一些信息，使用的时候需要注意兼容性。可以用来获取浏览器类（Chrome,safrai,FireFox,Edge,IE）等等

**history 对象**主要用来操作浏览器 URL 的历史记录，可以通过参数向前，向后，或者向指定 URL 跳转。可以通过 `length` 属性获取记录数，判断当前页面是否是打开的首个页面

## 感谢巨人

1. [不许不懂 BOM](https://juejin.cn/post/6863995537063215112)
2. [红宝书笔记](https://juejin.cn/post/6923112227012608014)
3. 红宝书
