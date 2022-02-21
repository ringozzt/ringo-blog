# WebView

为了原生APP能够嵌套前端h5，提高开发效率。

> 核心：用WebView控件实现加载URL

> `WebView` 用来展示网页的 `view` 组件，该组件是你运行自己的浏览器或者在你的线程中展示线上内容的基础。使用 `Webkit` 渲染引擎来展示，并且支持前进后退等基于浏览历史，放大缩小，等更多功能。

> 简单来说 `WebView` 是手机中内置了一款高性能 `Webkit` 内核浏览器，在 SDK 中封装的一个组件。不过没有提供地址栏和导航栏，只是单纯的展示一个网页界面。

> `WebView` 可以简单理解为页面里的 `iframe` 。原生 `app` 与 `WebView` 的交互可以简单看作是页面与页面内 `iframe` 页面进行的交互。就如页面与页面内的 `iframe` 共用一个 `Window`  一样，原生与 `WebView` 也共用了一套原生的方法。

- IOS：

  UIWebView-jscore

  ->WKwebview-messageHandler

- Android：

  与手机自带的浏览器内核一致，多为Chrome内核

- RN：

  安卓调用原生浏览器，iOS默认WKWebView

  

* 在了解了js与客户端底层的通信原理后，我们可以将IOS、安卓统一封装成jsBridge提供给业务层开发调用。

# JSBridge

web和native交互的桥梁

构建**非native**和**native**间双向通信的通道

hybrid技术的核心之一

简单来说就是：为JavaScript提供调用native功能的接口，让h5页面能更好地调用摄像头、蓝牙、gps、指纹解锁等等的功能

## 通信原理

- js调用native使用注入api的方式
- native调用js直接执行拼接好的js代码

于是当通知进入 app 的时候，比如说在页面中创建一个新对象，相关信息就可以这样传递：

```js
window.webkit.messageHandlers.notification.postMessage({body: '发送给Native'});
```

js向native发送请求

``` window.webkit.messageHandlers.{NAME}.postMessage()```  



# 浏览器部分

- > 相信很多的朋友都听过前端界的一个著名定律，叫做 `Atwood’s Law`。2007 年，Jeff Atwood 提出 “所有可以用 JavaScript 编写的应用程序最终都会用 JavaScript 编写”

- webkit的组成

  - Safari浏览器内核，由苹果开源 ，谷歌的blink也是fork出来的

    - -ms IE trident
      - JScript，chakra(ie9+)
    - -moz Firefox gecko
      - SpiderMonkey
    - -webkit Safari、2013年前的Chrome、chromium webkit 
      - Jscore
    - -o Opera   Blink
      - V8
    - -webkit Chrome 、chromium
      - V8
    - -webkit Edge  2018年12月由自家的Chakra切换到chromium
    - 可以这样理解，Chrome 和360、QQ 和 Edge都是基于Chromium内核的浏览器。

  - 如何解析并执行JS，成了各家引擎的核心技术

    - JScore是webkit默认内嵌的js引擎

    - V8也是一种js引擎，用于安卓浏览器和Chrome

      - 高性能的JavaScript和webassembly引擎，支持x64、arm在内的8种处理器

      - 在浏览器端，支撑着Chrome和众多chromium内核的浏览器运行（360、QQ浏览器、2018年后edge浏览器由chakracore切换到了chromium）
      - 在服务端他是node和deno的执行环境

    - spidermonkey是Firefox的js引擎

    - chakra 2018年前的edge浏览器

  - webcore

  - 渲染引擎：ios-coreGraphics、Android-skia