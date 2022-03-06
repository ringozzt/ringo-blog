# 跨域问题

## 浏览器同源策略

浏览器厂商设置的一个重要的安全策略，看一下 MDN 对浏览器同源策略的介绍：

> **同源策略**是一个重要的安全策略，它用于限制一个[origin](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FGlossary%2FOrigin)的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。

如果缺少同源策略，浏览器很容易受到`XSS`、`CSRF`等攻击。

只有协议、域名、端口都相同的情况下，才属于同源。反之，如果三者有一个不一致，就会产生跨域。

**都说是浏览器的策略，那么服务器当然是可以收到请求并正常响应的，只是浏览器拒绝接收了而已。**

一个原则：**同源策略只存在浏览器端**，服务器是没有跨域问题的，用`postman`等工具也不会出现跨域问题

## domain

### 单点登录的技术基础

domain 标识指定了哪些主机可以访问该 Cookie 的域名。如果设置为“.google.com”，则所有以“google.com”结尾的域名都可以访问该 Cookie。**注意第一个字符必须为“.”**

## 解决跨域

### CORS

虽说浏览器会默认拦截服务端返回的跨域请求数据，但是也是有办法让浏览器把这个拦截关掉的，那就是使用**CORS**。**CORS**是一个`W3C`标准，全称是"跨域资源共享"，它允许浏览器向跨域服务器，发出`XMLHttpRequest`请求，从而克服同源的限制。

`CORS`需要浏览器和服务器同时支持，目前所有最新浏览器都支持该功能，但是不能低于 IE10。[查看浏览器兼容 CORS 情况](https://caniuse.com/?search=cors)

`CORS`实现的本质，就是在浏览器请求中，自动添加一些附加的头信息。整个`CORS`通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，`CORS`通信与同源的`Ajax`通信没有差别，代码完全一样，对于用户来说，也是无感知的。

首先需要清楚两个概念: **简单请求**和**非简单请求**。

凡是满足下面条件的属于**简单请求**:

- 请求方法为 GET、POST 或者 HEAD

- 请求头的取值范围:

  Accept、Accept-Language、

  Content-Language、

  Content-Type(只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`)

浏览器画了这样一个圈，在这个圈里面的就是**简单请求**, 圈外面的就是**非简单请求**，然后针对这两种不同的请求进行不同的处理。

#### 简单请求

请求发出去之前，浏览器做了什么？

##### Access-Control-Allow-Origin

它会自动在请求头当中，添加一个`Origin`字段，用来说明请求来自哪个`源`。服务器拿到请求之后，在回应时对应地添加`Access-Control-Allow-Origin`字段，如果`Origin`不在这个字段的范围中，那么浏览器就会将响应拦截(\*为所有)。

因此，`Access-Control-Allow-Origin`字段是服务器用来决定浏览器是否拦截这个响应，这是必需的字段。与此同时，其它一些可选的功能性的字段，用来描述如果不会拦截，这些字段将会发挥各自的作用。

##### **Access-Control-Allow-Credentials**

这个字段是一个布尔值，表示是否允许发送 Cookie，对于跨域请求，浏览器对这个字段默认值设为 false，而如果需要拿到浏览器的 Cookie，需要添加这个响应头并设为`true`, 并且在前端也需要设置`withCredentials`属性:

```
let xhr = new XMLHttpRequest();
xhr.withCredentials = true;

```

##### **Access-Control-Expose-Headers**

这个字段是给 XMLHttpRequest 对象**赋能**，让它不仅可以拿到基本的 6 个响应头字段（包括`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`和`Pragma`）, 还能拿到这个字段声明的**响应头字段**。比如这样设置:

```
Access-Control-Expose-Headers: aaa
```

那么在前端可以通过 `XMLHttpRequest.getResponseHeader('aaa')` 拿到 `aaa` 这个字段的值。

#### 非简单请求

那么**PUT 请求**或者**请求头包含其他字段**，就属于非简单请求

非简单请求的特殊体现在两个方面: **预检请求**和**响应字段**。

非简单请求的`CORS`请求是会在正式通信之前进行一次**预检请求**

浏览器先询问服务器,当前网页所在的域名是否可以请求您的服务器,以及可以使用那些`HTTP`动词和头信息,只有得到正确的答复,才会进行正式的请求

我们以 PUT 方法为例。

```js
var url = 'http://xxx.com';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'xxx');
xhr.send();
```

当这段代码执行后，首先会发送**预检请求**。这个预检请求的请求行和请求体是下面这个格式:

```js
OPTIONS /cors HTTP/1.1
Origin: 当前地址
Host: xxx.com
Access-Control-Request-Method: PUT // 表示请求方法
Access-Control-Request-Headers: X-Custom-Header // 表示浏览器发送的自定义字段
```

预检请求的方法是`OPTIONS`，同时会加上`Origin`源地址和`Host`目标地址，这很简单。同时也会加上两个关键的字段:

- Access-Control-Request-Method，列出 CORS 请求用到哪个 HTTP 方法
- Access-Control-Request-Headers，指定 CORS 请求将要加上什么请求头

这是`预检请求`。这时服务器响应有两种可能：

##### 服务器否定了`"预检"`请求

会返回一个正常的`HTTP`回应，但是没有任何`CORS`的头相关信息，这时浏览器就认定，服务器不允许此次访问，从而抛出错误。

##### **服务器允许这次非简单请求**

接下来是**响应字段**，响应字段也分为两部分，一部分是对于**预检请求**的响应，一部分是对于 **CORS 请求**的响应。

如下面的格式:

```js
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
```

其中有这样几个关键的**响应头字段**:

- Access-Control-Allow-Origin: 表示可以允许请求的源，可以填具体的源名，也可以填`*`表示允许任意源请求。
- Access-Control-Allow-Methods: 表示允许的请求方法列表。
- Access-Control-Allow-Credentials: 简单请求中已经介绍。
- Access-Control-Allow-Headers: 表示允许发送的请求头字段
- Access-Control-Max-Age: 预检请求的有效期，在此期间，不用发出另外一条预检请求。

在预检请求的响应返回后，如果请求不满足响应头的条件，则触发`XMLHttpRequest`的`onerror`方法，当然后面真正的**CORS 请求**也不会发出去了。

##### **CORS 请求的响应**

浏览器自动加上`Origin`字段，服务端响应头返回**Access-Control-Allow-Origin**。可以参考以上简单请求部分的内容。

---

### JSONP

虽然`XMLHttpRequest`对象遵循同源政策，但是`script`标签不一样，它可以通过 src 填上目标地址从而发出 GET 请求，实现跨域请求并拿到响应。

- 客户端事先在 script 标签里准备一个接收数据的全局函数
- 客户端构造一个 script 标签，url 中拼接：请求地址+`callback=上一步声明的函数名`其中键名 callback 与后端确定，参数以 get 形式拼接
- 客户端解析到 script 脚本，发出请求
- 服务端响应一个 JSON 对象
- 自定义函数接收到 res，执行函数体

#### 封装一个 JSONP:

```js
const jsonp = ({ url, params, callbackName }) => {
  const generateURL = () => {
    let dataStr = '';
    for (let key in params) {
      dataStr += `${key}=${params[key]}&`;
    }
    dataStr += `callback=${callbackName}`;
    return `${url}?${dataStr}`;
  };
  return new Promise((resolve, reject) => {
    // 初始化回调函数名称
    callbackName = callbackName || Math.random().toString.replace(',', '');
    // 创建 script 元素并加入到当前文档中
    let scriptEle = document.createElement('script');
    scriptEle.src = generateURL();
    document.body.appendChild(scriptEle);
    // 绑定到 window 上，为了后面调用
    window[callbackName] = (data) => {
      resolve(data);
      // script 执行完了，成为无用元素，需要清除
      document.body.removeChild(scriptEle);
    };
  });
};
```

#### 服务端 JSONP

当然在服务端也会有响应的操作, 以 express 为例:

```js
let express = require('express');
let app = express();
app.get('/', function (req, res) {
  let { a, b, callback } = req.query;
  console.log(a); // 1
  console.log(b); // 2
  // 注意哦，返回给script标签，浏览器直接把这部分字符串执行
  res.end(`${callback}('数据包')`);
});
app.listen(3000);
```

前端这样简单地调用一下就好了:

```js
jsonp({
  url: 'http://localhost:3000',
  params: {
    a: 1,
    b: 2,
  },
}).then((data) => {
  // 拿到数据进行处理
  console.log(data); // 数据包
});
```

和`CORS`相比，JSONP 最大的优势在于兼容性好，IE 低版本不能使用 CORS 但可以使用 JSONP，缺点也很明显，请求方法单一，只支持 GET 请求。

### Ajax 和 JSONP

#### 相同点：

- 使用的目的一致，都是客户端向服务端请求数据，将数据拿回客户端进行处理。

#### 不同点：

- ajax 请求是一种官方推出的请求方式，通过 xhr 对象去实现，jsonp 是民间发明，script 标签实现的请求。
- ajax 是一个异步请求，jsonp 是一个同步请求
- ajax 存在同源检查，jsonp 不存在同源检查，后端无需做解决跨域的响应头。
- ajax 支持各种请求的方式，而 jsonp 只支持 get 请求
- ajax 的使用更加简便，而 jsonp 的使用较为麻烦。

### **既然Jsonp可以跨域,那为什么还要使用CORS呢**

- `jsonp`只可以使用 `GET` 方式提交
- 不好调试,在调用失败的时候不会返回任何状态码
- 安全性,万一假如提供`jsonp`的服务存在页面注入漏洞，即它返回的`javascript`的内容被人控制的。那么结果是什么？所有调用这个`jsonp`的网站都会存在漏洞。于是无法把危险控制在一个域名下…所以在使用`jsonp`的时候必须要保证使用的`jsonp`服务必须是安全可信的。

---

### Nginx

Nginx 是一种高性能的`反向代理`服务器，可以用来轻松解决跨域问题。

**Nginx**相较于**CORS**，没有浏览器版本的限制，同时不会影响服务器的性能。

正向代理帮助客户端**访问**客户端自己访问不到的服务器，然后将结果返回给客户端。

反向代理拿到客户端的请求，将请求转发给其他的服务器，主要的场景是维持服务器集群的**负载均衡**，换句话说，反向代理帮**其它的服务器**拿到请求，然后选择一个合适的服务器，将请求转交给它。

因此，两者的区别就很明显了，正向代理服务器是帮**客户端**做事情，而反向代理服务器是帮其它的**服务器**做事情。

那 Nginx 是如何来解决跨域的呢？

比如说现在客户端的域名为**client.com**，服务器的域名为**server.com**，客户端向服务器发送 Ajax 请求，当然会跨域了，那这个时候让 Nginx 登场了，通过下面这个配置:

```js
server {  listen  80;  server_name  client.com;  location /api {    proxy_pass server.com;  }}
```

Nginx 相当于起了一个跳板机，这个跳板机的域名也是`client.com`，让客户端首先访问 `client.com/api`，这当然没有跨域，然后 Nginx 服务器作为反向代理，将请求转发给`server.com`，当响应返回时又将响应给到客户端，这就完成整个跨域请求的过程。

### window.postMessage

以下是[MDN](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FWindow%2FpostMessage)对于`postMessage`介绍：

> **window.postMessage()** 方法可以安全地实现跨源通信。通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为 https），端口号（443 为 https 的默认值），以及主机 (两个页面的模数 [`Document.domain`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FDocument%2Fdomain)设置为相同的值) 时，这两个脚本才能相互通信。**window.postMessage()** 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。

举例来说，父窗口`http://aaa.com`向子窗口`http://bbb.com`发消息，调用`postMessage`方法就可以了。

```
const popup = window.open('http://bbb.com', 'title')popup.postMessage('你好，bbb!', 'http://bbb.com')
```

`postMessage`方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（`origin`），即"协议 + 域名 + 端口"。也可以设为`*`，表示不限制域名，向所有窗口发送。

子窗口向父窗口发送消息的写法类似

```
window.opener.postMessage('你好，aaa!', 'http://aaa.com')
```

父窗口和子窗口都可以通过`message`事件，监听对方的消息

```
window.addEventListener('message', function(e) {  console.log(e.data) //消息内容  console.log(e.origin) //消息发向的网址  console.log(e.source) //发送消息的窗口},false)
```

### Websocket

`WebSocket`是一种通信协议，使用`ws://`（非加密）和`wss://`（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

它可以在网络浏览器和服务器之间建立“套接字”连接。简单地说：客户端和服务器之间存在持久的连接，而且双方都可以随时开始发送数据。详细教程可以看：

[WebSocket 简介：将套接字引入网络](https://link.juejin.cn?target=https%3A%2F%2Fwww.html5rocks.com%2Fzh%2Ftutorials%2Fwebsockets%2Fbasics%2F)

这个没什么过多解释，直接上代码吧：

前端：

```
const socket = new WebSocket('ws://www.abc.com')socket.onopen = () => {    socket.send('发送信息...')}socket.onmessage = (e) => {    console.log(e.data) //获取数据}
```

服务端：

```
const WebSocket = require("ws");const server = new WebSocket.Server({ port: 80 });server.on("connection", socket => {    socket.on("message", data => {        socket.send(data);    });});
```

### webpack、Vue-CLI 等脚手架中开启 dev-server

**原理是：将域名发送给本地的服务器（启动 vue 项目的服务,loclahost:8080），再由本地的服务器去请求真正的服务器。**

```js
//vue.config.jsmodule.exports = {  devServer: {    proxy: {      '/api': {        target: 'http://www.example.com',        changeOrigin: true,        pathRewrite: {          '^/api': '',        },      },    },  },};
```

```js
//webpack.config.jsmodule.exports = {    ....    devServer: {        port: 80,        proxy: {          "/api": {            target: "http://www.example.com"          }        }    }}
```

### 参考文章

1. [跨域细节大盘点](https://juejin.cn/post/7063047193359286280)
2. [HTTP 精讲](https://juejin.cn/post/6844904100035821575)
3. [CORS 解密](https://juejin.cn/post/6983852288091619342)
