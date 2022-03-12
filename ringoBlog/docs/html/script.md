# script、link 标签大整理

## 在收到服务端发来的 html 后

1. 浏览器会对这个 html 文件进行编译，转化成类似树形结构，html-head-script...

2. 对转化后的数据结构自上而下进行分析：

   - 首先开启**下载线程**，对所有的资源进行[优先级](https://juejin.cn/post/6844903562070196237#heading-9)排序下载（注意，仅仅是下载）。

   同时主线程会对文档进行解析:

   - 遇到 script 标签时，（无 async、defer 时）首先阻塞后续内容的解析，同时检查该 script 是否已经下载下来，如果已下载，便执行代码。

   - 遇到 link 标签时，不会阻塞后续内容的解析（比如 DOM 构建），检查 link 资源是否已下载(preload)，如果已下载，则构建 cssom。

   - 遇到 DOM 标签时，执行 DOM 构建，将该 DOM 元素添加到文档树中。

   - css 资源不会阻碍后面 DOM 的构建，但是会阻塞页面的首次渲染。换言之，页面会等 css 都下载完再开始渲染。

   > 有一点要注意的是，在 body 中第一个 script 资源下载完成之前，浏览器会进行首次渲染，将该 script 标签前面的 DOM 树和 CSSOM 合并成一棵 Render 树，渲染到页面中。**这是页面从白屏到首次渲染的时间节点，比较关键**。

3. 文档解析完毕，页面重新渲染。当页面引用的所有 js 同步代码执行完毕，触发 DOMContentLoaded 事件。

## 关键的概念**readyState**

我们在研究 web 优化时，会有两个重要的事件：

- **DOMContentLoaded**：dom 构建(文档结构)完毕，**并且 html 所引用的内联 js、以及外链 js 的同步代码都执行完毕后触发**。在 onload 前
- **onload/load**：页面(包括静态资源)全部载入完毕触发。如果有异步加载的资源会延迟 load 事件，video、audio、flash 不会影响 load 事件触发。

[MDN-readyState](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState)

document 的加载状态可能是：

一个文档的 **`readyState`** 可以是以下之一：

- `loading`（正在加载）

  [`document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 仍在加载。

- `interactive`（可交互）

  文档已被解析，"**正在加载**"状态结束，但是诸如图像，样式表和框架之类的子资源仍在加载。

- `complete`（完成）

  文档和所有子资源已完成加载。表示 `load ` 状态的事件即将被触发。

这里也在所有的示例 HTML 中增加了这两个事件的监听，方便查看执行时机

```javascript
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOMContentLoaded');
});
window.addEventListener('load', (event) => {
  console.log('loaded');
});
```

## script 标签

> `script`元素最简单用法就是通过直接在页面嵌入 JS 代码或者通过加载外部脚本文件。而且大家都知道浏览器解析文档时遇到`script`会依次等代码下载、执行完以后才会继续解析，因此现在 Web 应用程序一般都会把引用的 JS 代码放在`<body>`元素的后面。

所以在`HTML规范`中为了解决这个引入顺序问题，在`script`标签上提供了`async`和`defer`这两个属性，使得文档解析到`script`时不会发生阻塞。

不同类型 script 的执行顺序及其是否阻塞解析 HTML 总结如下：

| script 标签      | JS 执行顺序      | 是否阻塞解析 HTML      |
| ---------------- | ---------------- | ---------------------- |
| `<script>`       | 在 HTML 中的顺序 | 阻塞                   |
| `<script async>` | 网络请求返回顺序 | 可能阻塞，也可能不阻塞 |
| `<script defer>` | 在 HTML 中的顺序 | 不阻塞                 |

### src

如果没有 defer 或 async 属性，浏览器会立即下载并执行相应的脚本，阻塞了浏览器对 HTML 的解析，如果获取 JS 脚本的网络请求迟迟得不到响应，或者 JS 脚本执行时间过长，都会导致白屏，用户看不到页面内容。

- 绝对 URL - 指向另一个网站（比如 src="www.example.com/example.js"…
- 相对 URL - 指向本地的一个文件（比如 src="/scripts/example.js"）

### defer 延迟脚本

> - 解析完毕后，`DOMContentLoaded`调用前执行
> - 按顺序执行，无论下载完成先后

加入 defer 属性后，即使把`<script>`标签放入`<head>`也不会阻塞后面 DOM 的解析，而且脚本会延迟到整个 DOM 解析完后在去执行。也就是`<script>`标签加入 defer 属性会告诉`浏览器立即下载脚本，但是延迟执行脚本`。

1. 可以看到主进程的`Parse HTML`并不会受`<script>`标签影响，网络进程还是会立即去加载脚本资源。
2. 多个设置了`defer属性`的 script 标签，会按照文档中 script 放置顺序执行内容（`即使前置的script加载耗时更长`）。
3. 脚本内容会在 HTML 解析完毕后，`DOMContentLoaded`事件调用前执行。

### async 异步脚本

> - `<script>`标签加入 async 属性会告诉浏览器立即下载脚本，哪个脚本先加载完就先执行，而且是加载完就立马执行。
>
> - 如果有 DOM 正在解析，会阻塞解析。

1. DOMContentLoaded 事件的触发并不受`async`脚本加载的影响，`async`脚本会在 load 事件调用前执行。
2. `DOMContentLoaded`事件调用跟`async`脚本执行顺序是不定的。

### async、defer 同时存在

async

### charset

可选属性。使用 src 属性指定的代码字符集。如果存在，值必须和“utf-8”不区分大小写的匹配。当然声明 charset 是没有必要的，因为页面文档必须使用 UTF-8，而 script 元素会从页面文档中继承这个属性。

## link 标签

[更多属性](https://juejin.cn/post/6971640926389141518)

### 如何区分 preload 和 prefetch

- preload 是告诉浏览器页面**必定**需要的资源，浏览器**一定会**加载这些资源；
- prefetch 是告诉浏览器页面**可能**需要的资源，浏览器**不一定会**加载这些资源。

### preload 预加载

preload 提供了一种声明式的命令，让浏览器提前加载指定资源(加载后并不执行)，且不阻塞正常的 onload。

比如字体这种文件，可以用 preload，避免 dom 加载完出现短暂的普通字体，link 文件下载完又突变到特殊字体的尴尬情况。

提供的好处主要是:

- 将加载和执行分离开，可不阻塞渲染和 document 的 onload 事件
- 提前加载指定资源，不再出现依赖的 font 字体隔了一段时间才刷出

使用方式：

```html
<link rel="preload" href="xxx" as="xxx" />
```

⚠️ 注意：preload link 必须设置 as 属性来声明资源的类型（font/image/style/script 等)，否则浏览器可能无法正确加载资源。`对于字体文件或者可以加载的跨域资源需要加上crossorigin属性。`

Preload 支持 onload 事件，可以自定义资源加载完后的回调函数。

```html
<link
  rel="proload"
  href="test.js"
  as="script"
  onload="console.log('finish');"
/>
```

### prefetch 预提取

prefetch 是一种浏览器机制，利用浏览器空闲时间来下载后续可能需要使用的资源。`在浏览器完成当前页面的加载后开始静默地拉取指定的文档并将其存储在缓存中。`页面跳转时 prefetch 发起的请求不会中断。该方法的加载优先级很低，一般用来提高下一个页面的加载速度。

是一种提高用户体验的提前预判模式，比如用户大概率会打开的组件，加个 prefetch 就很棒

使用方式：

```html
<link rel="prefetch" href="xxx" />
```

## dns-prefetch

DNS Prefetch 是一种 DNS 预解析技术。当你浏览网页时，浏览器会在加载网页时对网页中的域名进行解析缓存，这样在你单击当前网页中的连接时就无需进行 DNS 的解析，减少用户等待时间，提高用户体验。

```html
<!-- off为关闭,ON为开启 -->
<meta http-equiv="X-dns-prefetch-control" content="on" />
<link rel="dns-prefetch" />
```

### 避免混用 preload 和 prefetch

preload 和 prefetch 混用的话，并不会复用资源，而是会重复加载。

### 避免错用 preload 加载跨域资源

对跨域的文件进行 preload 的时候，我们必须加上 crossorigin 属性：

```html
<link
  rel="preload"
  as="font"
  crossorigin
  href="https://at.alicdn.com/t/font_zck90zmlh7hf47vi.woff"
/>
```

---

## 感谢巨人：

1. [用 preload 预加载页面资源](https://juejin.cn/post/6844903562070196237)
2. [优化前端页面的资源加载](https://juejin.cn/post/6893681741240909832)
3. [图解 script 标签](
