# WebView

为了让原生 APP 能够嵌套前端 h5，提高开发效率。

## 核心：用 WebView 控件实现加载 URL

> `WebView` 用来展示网页的 `view` 组件，该组件是你运行自己的浏览器或者在你的线程中展示线上内容的基础。使用 `Webkit` 渲染引擎来展示，并且支持前进后退等基于浏览历史，放大缩小，等更多功能。

> 简单来说 `WebView` 是手机中内置了一款高性能 `Webkit` 内核浏览器，在 SDK 中封装的一个组件。不过没有提供地址栏和导航栏，只是单纯的展示一个网页界面。

> `WebView` 可以简单理解为页面里的 `iframe` 。原生 `app` 与 `WebView` 的交互可以简单看作是页面与页面内 `iframe` 页面进行的交互。就如页面与页面内的 `iframe` 共用一个 `Window` 一样，原生与 `WebView` 也共用了一套原生的方法。

- IOS：

  UIWebView-jscore -> WKwebview-messageHandler

- Android：

  与手机自带的浏览器内核一致，多为 Chrome 内核

- RN：

  安卓调用原生浏览器，iOS 默认 WKWebView

* 在了解了 js 与客户端底层的通信原理后，我们可以将 IOS、安卓统一封装成 jsBridge 提供给业务层开发调用。

## JSBridge

web 和 native 交互的桥梁

构建**非 native**和**native**间双向通信的通道

hybrid 技术的核心之一

简单来说就是：为 JavaScript 提供调用 native 功能的接口，让 h5 页面能更好地调用摄像头、蓝牙、gps、指纹解锁等等的功能

## 通信原理

- js 调用 native 使用注入 api 的方式
- native 调用 js 直接执行拼接好的 js 代码

于是当通知进入 app 的时候，比如说在页面中创建一个新对象，相关信息就可以这样传递：

```js
window.webkit.messageHandlers.notification.postMessage({
  body: '发送给Native',
});
```

js 向 native 发送请求

` window.webkit.messageHandlers.{NAME}.postMessage()`

## 浏览器部分

- > 相信很多的朋友都听过前端界的一个著名定律，叫做 `Atwood’s Law`。2007 年，Jeff Atwood 提出 “所有可以用 JavaScript 编写的应用程序最终都会用 JavaScript 编写”

- webkit 的组成

  - Safari 浏览器内核，由苹果开源 ，谷歌的 blink 也是 fork 出来的

    - -ms IE trident
      - JScript，chakra(ie9+)
    - -moz Firefox gecko
      - SpiderMonkey
    - -webkit Safari、2013 年前的 Chrome、chromium webkit
      - Jscore
    - -o Opera Blink
      - V8
    - -webkit Chrome 、chromium
      - V8
    - -webkit Edge 2018 年 12 月由自家的 Chakra 切换到 chromium
    - 可以这样理解，Chrome 和 360、QQ 和 Edge 都是基于 Chromium 内核的浏览器。

  - 如何解析并执行 JS，成了各家引擎的核心技术

    - JScore 是 webkit 默认内嵌的 js 引擎

    - V8 也是一种 js 引擎，用于安卓浏览器和 Chrome

      - 高性能的 JavaScript 和 webassembly 引擎，支持 x64、arm 在内的 8 种处理器

      - 在浏览器端，支撑着 Chrome 和众多 chromium 内核的浏览器运行（360、QQ 浏览器、2018 年后 edge 浏览器由 chakracore 切换到了 chromium）
      - 在服务端他是 node 和 deno 的执行环境

    - spidermonkey 是 Firefox 的 js 引擎

    - chakra 2018 年前的 edge 浏览器

  - webcore

  - 渲染引擎：ios-coreGraphics、Android-skia
