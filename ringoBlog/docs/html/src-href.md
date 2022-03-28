# src 和 href 的区别

## href

（常见于 link 标签）

遇到 href，页面会并行加载后续内容。

href 用于建立当前页面与引用资源之间的关系（链接两者）。

## src

（常见于 script、img 标签）

浏览器需要下载完 src 的内容才会继续往下解析。

通过 src 下载的内容会替换当前标签。

## data-\*自定义属性

使用 attribute 方法存取 data-\* 自定义属性的值非常方便：

```js
var div = document.getElementById('div1');

//设置自定义的值
div.setAttribute('data-id', 'myId');
div.setAttribute('data-class', 'myClass');
div.setAttribute('data-id-and-class', 'Hello');

//获取自定义的值
var myId = div.getAttribute('data-id');
var myClass = div.getAttribute('data-class');
var my = div.getAttribute('data-id-and-class');

console.log(myId); //myId
console.log(myClass); //myClass
console.log(my); //Hello
```

### dataset

通过访问一个元素的`dataset`属性来存取`data-*`自定义属性的值。

这个`dataset`属性是 [HTML5 JavaScript API](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/data-*) 的一部分，用来返回一个所有选择元素的`data-*`属性的`DOMStringMap`对象。

使用这种方法时，不是使用完整的属性名，如`data-id`来存取数据，应该去掉`data-`前缀。

```js
img.dataset.src = 'www.baidu.com';
img.dataset.id = 12138;
```

还有一点特别注意的是：`data-`属性名如果包含了连字符，例如 `data-id-and-class`，连字符将被去掉，并转换为驼峰式的命名，前面的属性应该写成`idAndClass`。

如果你想删掉一个`data-`属性，可以这么做：

```js
delete div.dataset.id;
```

## 总结

1. 浏览器识别 href 引用的文档并对该文档进行下载，同时不会停止当前文档的处理，**「这也是建议用 link 方式引入 css 而不用 import 的原因」**

2. 浏览器解析到 src 引用时，会暂停浏览器的渲染，直到该资源加载完毕，**「这也是建议将 javascript 脚本放在底部的原因」**

3. **「在 img、script、iframe 等元素上使用」**—src 是指向物件的来源地址，是引入。

   **「在 link 和 a 等元素上使用」**—href(Hypertext Reference)是超文本引用，指向需要连结的地方，是与该页面有关联的，是引用。

   **src 通常用作“拿取”（引入），href 用作 "连结前往"（引用）**。

4. 可替换的元素上使用 src，src 属性仅仅嵌入当前资源到当前文档元素定义的位置。href 用于在涉及的文档和外部资源之间建立一个关系。 href 指定网络资源的位置，从而在当前元素或者当前文档和由当前属性定义的需要的锚点或资源之间定义一个链接或者关系。

5. 在请求 src 资源时会将其指向的资源下载并应用到文档内，例如 js 脚本，img 图片和 frame 等元素。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。
