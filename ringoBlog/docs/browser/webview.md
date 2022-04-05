# WebView

为了让原生 APP 能够内嵌前端 h5 页面，功能迭代只需替换 url 对应的页面，不需要频繁地更新 APP。

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

> 相信很多的朋友都听过前端界的一个著名定律，叫做 `Atwood's Law`。
>
> 2007 年，Jeff Atwood 提出 “所有可以用 JavaScript 编写的应用程序最终都会用 JavaScript 编写”

### 浏览器内核

| 内核    | 浏览器                                                                                                                               | 出生年份 | JS 引擎               | 开源协议 |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------- | --------------------- | -------- |
| Trident | IE4 - IE11，主要包含在 window 操作系统的 IE 浏览器中                                                                                 | 1997     | JScript，chakra(ie9+) | 闭源     |
| Gecko   | Firefox，Gecko 的特点是代码完全公开，因此，其可开发程度很高                                                                          | 2004     | SpiderMonkey          | MPL      |
| WebKit  | Safari,Chromium,Chrome(-2013) ,Android 浏览器,ChromeOS,WebOS 等，苹果公司自己的内核，包含 WebCore 排版引擎及 JavaScriptCore 解析引擎 | 2005     | JavascriptCore        | BSD      |
| Blink   | Chrome, Opera，Blink 是开源引擎 WebKit 中 WebCore 组件的一个分支                                                                     | 2013     | V8                    | GPL      |
| Edge    | Edge，2018 年 12 月由自家的 Chakra 切换到 chromium                                                                                   | 2015     | Chakra                | MIT      |

可以这样理解，Chrome 和 360、QQ 和 Edge 都是基于 Chromium 内核的浏览器。

如何解析并执行 JS，成了各家引擎的核心技术。

### V8: 重新定义 JS

高性能的 V8 也是一种 js 引擎，用于安卓浏览器和 Chrome

> 伴随着浏览器大战，浏览器内核技术在向前发展（有兴趣的同学可以在网上自助看看浏览器的内核发展史，比如《全面了解浏览器（内核）发展史》），IE 逐渐跟不上 Firefox 、Safari 和 Chrome 的节奏。
>
> 后起之秀 Chrome 非常关注 JavaScript 的引擎性能，觉得可以再提升 10 倍，所以自研一款高性能 JavaScript 引擎，名叫 V8，以 BSD 许可证开源，Chrome 在浏览器家族内的地位如日中天。
>
> 给前端配套的 debug 工具链更加完善，通过控制台可以完成代码调试、性能检测、资源检测、网络检测、DOM 结构检测等等诸多工作， Chrome 在前端的眼里简直可以说是一款浏览器走天下，IDE 什么的完全通通不用。

- 高性能的 JavaScript 和 webassembly 引擎，支持 x64、arm 在内的 8 种处理器

- 在浏览器端，支撑着 Chrome 和众多 chromium 内核的浏览器运行（360、QQ 浏览器、2018 年后 edge 浏览器由 chakracore 切换到了 chromium）
- 在服务端他是 node 和 deno 的执行环境（运行时）

## WebKit 组件

### WebCore

WebCore 是一个由 WebKit 项目所开发的布局（Layout）、渲染（Rendering）及 HTML 和[SVG](https://zh.wikipedia.org/wiki/SVG)的[DOM](https://zh.wikipedia.org/wiki/文档对象模型)库，完整的代码皆由[GNU 宽通用公共许可证](https://zh.wikipedia.org/wiki/GNU宽通用公共许可证)所授权，WebKit 框架包装了 WebCore 及 JavaScriptCore，并提供一个 Objective-C[应用程序接口](https://zh.wikipedia.org/wiki/应用程序接口)来接介由 C++所开发的 WebCore 渲染引擎及 JavaScriptCore 脚本引擎，透过[Cocoa API](https://zh.wikipedia.org/w/index.php?title=Cocoa_API&action=edit&redlink=1)就可以在应用程序中很简单的使用这些组件。之后的版本同时包含了一个[跨平台](https://zh.wikipedia.org/wiki/跨平台)的 C++抽象平台，并且提供各种 API 使用。

WebKit 通过[Acid2](https://zh.wikipedia.org/wiki/Acid2)及[Acid3](https://zh.wikipedia.org/wiki/Acid3)的测试，包含完美像素的渲染（pixel-perfect rendering）以及没有任何时间及不顺的问题。

### JavaScriptCore

JavaScriptCore 是一个在 WebKit 中提供[JavaScript 引擎](https://zh.wikipedia.org/wiki/JavaScript引擎)的框架，而且在 OS X 作为其他内容的脚本引擎。JavaScriptCore 最初是为[KDE](https://zh.wikipedia.org/wiki/KDE)的 JavaScript 引擎（[KJS](https://zh.wikipedia.org/wiki/KJS)）库及[PCRE](https://zh.wikipedia.org/w/index.php?title=PCRE&action=edit&redlink=1)[正则表达式](https://zh.wikipedia.org/wiki/正则表达式)库，JavaScriptCore 从 KJS 及 PCRE 复刻之后，已比原先进步了许多，有了新的特色以及极大的性能改进。

在 2008 年 6 月 2 日，WebKit 项目宣布，将被重写为"SquirrelFish"，它是一个[字节码](https://zh.wikipedia.org/wiki/字节码)[解释器](https://zh.wikipedia.org/wiki/直譯器)，这个项目演变成 SquirrelFish Extreme（简称为 SFX，市场称之为 Nitro），首次公开于 2008 年 9 月 18 日，它会将 Javascript 编译为本地的[机器语言](https://zh.wikipedia.org/wiki/机器语言)，不再需要[字节码](https://zh.wikipedia.org/wiki/字节码)[解释器](https://zh.wikipedia.org/wiki/直譯器)，同时加速了 JavaScript 的执行效率。

### Drosera

Drosera 是一个 JavaScript[调试工具](https://zh.wikipedia.org/wiki/调试工具)，它被包含在每日编译的 WebKit 版本内。

Drosera 目前已经被 Web Inspector 取代了。

## 渲染引擎

`ios`： coreGraphics

`Android`： skia
