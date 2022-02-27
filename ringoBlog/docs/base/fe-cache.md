# 前端缓存

## 浏览器缓存策略

#### 先查强缓存，超时了会去协商缓存

- 强缓存

  - 请求 url 前，先读缓存，命中返回 200

  - Expires(http1) :设置过期时间

    如果服务器时间和浏览器时间不一致，就不准了

  - cache-control(http1.1)：max-age=3600(s)

    没有使用具体时间点，而是时长

    优先级高于 expires

    private：只有浏览器能缓存，中间代理不行

    no-cache：跳过强缓存，发送 http 请求，直接进入协商缓存

    no-store：不进行缓存

    s-maxage:代理服务器的缓存时间

  - pragma: no-cache，和 cache-control 一样

- 协商缓存

  各有优势：

> etag 更加精准：
>
> - last-modified 编辑了但是没改，也会造成缓存失效
>
> - 一秒内改了多次，last-modified 以秒为单位，体现不出来
> - 性能上 last-modified 优于 etag，hash 比较耗时

- `Last-modified`：最后修改时间

  浏览器第一次发送请求后，resp 中返回

  之后的请求头带上`If-modified-since`，服务器收到后就可以对比判断是否需要返回新的资源

  - `If-modified-since`小于`Last-modified`说明更新了，返回新的资源
  - 否则返回 304，走浏览器的缓存

- Etag

  - 服务器根据文件内容，hash 出唯一标识，只要内容改变就重新生成，resp 中返回给客户端
  - 浏览器下次请求时，带上 If-None-match,发送给服务器，服务器会和该资源的 Etag 对比
    - 不一样了，说明要更新了，返回新的资源
    - 一样，返回 304，走浏览器缓存

- 目前大部分项目中的方案

  - html 协商缓存
  - css js 图片 强缓存，文件名带上 hash

当 ctrl+f5 强制刷新时，跳过强缓存和协商缓存，从服务器取

f5 刷新网页时，跳过强缓存，但会检查协商缓存

浏览器地址栏写入，走缓存拿

###### 浏览器缓存的位置

- service worker

  web worker 线程可以分解耗时的任务

  PWA: service worker 增加了离线缓存的能力，可以拦截页面所有网络请求，使用 cache indexDB 的 api 主动管理缓存内容，为弱网环境下运行 web 提供了可能，让 web 在体验上更接近原生

- memory cache

  使用率高的文件，存活时间短，效率高

  preload：首屏关键资源，类似字体

  prefetch：异步加载的模块、大概率被访问的模块

  如果存在 cache-control 和 max-age 会被存储在 disk 中，否则存在 memory 中

- disk cache

  大的 js css 文件

- push cache

## 浏览器的本地存储

#### cookie、 localstorage、 sessionstrorage

###### Cookie

- 为了弥补 http 在状态管理上的不足
- 容量缺陷：上限 4kb
- 性能缺陷：域名下的任何地址请求都会带上 cookie
- 安全缺陷：以纯文本的形式传递，httponly 为 flase，js 脚本能直接读取 cookie

###### LocalStorage

- 容量：上限 5M，相比于 cookie 大大增加
- 只存在于客户端，不参与和服务端的通信
- 适合存储搜索历史、主题风格官网 logo、vuex、redux 的持久化、部分用户信息
- setItem,getItem,removeItem

SessionStorage

- 会话级别，页面刷新还在，页面关闭就消失了
- 可以存储本次浏览记录、表单信息刷新了还在

###### IndexDB

- 支持事务，二进制数据(arraybuffer,blob 对象)，键值对存储

## DNS 缓存

- DNS 是域名和 IP 地址的映射，浏览器也提供了 DNS 的数据缓存，如果一个地址已经解析过，会把解析的结果缓存下来，下次输入直接找到了 ip 地址。另外如果不指定端口，默认 IP80 端口

# Cookie、Session、Token

## 为解决 http 无状态而诞生

HTTP 协议是一种`无状态协议`，即每次服务端接收到客户端的请求时，都是一个全新的请求，服务器并不知道客户端的历史请求记录；Session 和 Cookie 的主要目的就是为了弥补 HTTP 的无状态特性。

## Session

客户端请求服务端，服务端会为这次请求开辟一块`内存空间`，这个对象便是 Session 对象，存储结构为 `ConcurrentHashMap`。Session 弥补了 HTTP 无状态特性，服务器可以利用 Session 存储客户端在同一个会话期间的一些操作记录。

### Session 如何判断是否是同一会话

**session 的设置是通过 set-cookie 来完成的**

服务器第一次接收到请求时，开辟了一块 Session 空间（创建了 Session 对象），同时生成一个 sessionId ，并通过响应头的 **Set-Cookie：JSESSIONID=XXXXXXX **命令，向客户端发送要求设置 Cookie 的响应； 客户端收到响应后，在本机客户端设置了一个 **JSESSIONID=XXXXXXX **的 Cookie 信息，该 Cookie 的过期时间为浏览器会话结束；

接下来客户端每次向同一个网站发送请求时，请求头都会带上该 Cookie 信息（包含 sessionId ）， 然后，服务器通过读取请求头中的 Cookie 信息，获取名称为 JSESSIONID 的值，得到此次请求的 sessionId。

### session 缺点

Session 机制有个缺点，比如 A 服务器存储了 Session，就是做了负载均衡后，假如一段时间内 A 的访问量激增，会转发到 B 进行访问，但是 B 服务器并没有存储 A 的 Session，会导致 Session 的失效。

## Cookie

HTTP 协议中的 Cookie 包括 `Web Cookie` 和`浏览器 Cookie`，它是服务器发送到 Web 浏览器的一小块数据。服务器发送到浏览器的 Cookie，浏览器会进行存储，并与下一个请求一起发送到服务器。通常，它用于判断两个请求是否来自于同一个浏览器，例如用户保持登录状态。

> HTTP Cookie 机制是 HTTP 协议无状态的一种补充和改良

Cookie 主要用于下面三个目的

- `会话管理`

登陆、购物车、游戏得分或者服务器应该记住的其他内容

- `个性化`

用户偏好、主题或者其他设置

- `追踪`

记录和分析用户行为

Cookie 曾经用于一般的客户端存储。虽然这是合法的，因为它们是在客户端上存储数据的唯一方法，但如今建议使用现代存储 API。Cookie 随每个请求一起发送，因此它们可能会降低性能（尤其是对于移动数据连接而言）。

### 创建 Cookie

当接收到客户端发出的 HTTP 请求时，服务器可以发送带有响应的 `Set-Cookie` 标头，Cookie 通常由浏览器存储，然后将 Cookie 与 HTTP 标头一同向服务器发出请求。

#### Set-Cookie 和 Cookie 标头

`Set-Cookie` HTTP 响应标头将 cookie 从服务器发送到用户代理。实际上 token、sessionid，都可以通过这种方式存储

#### Cookie 的 Secure 和 HttpOnly 标记

安全的 Cookie 需要经过 HTTPS 协议通过加密的方式发送到服务器。即使是安全的，也不应该将敏感信息存储在 cookie 中，因为它们本质上是不安全的，并且此标志不能提供真正的保护。

**HttpOnly 的作用**

- 会话 Cookie 中缺少 HttpOnly 属性会导致攻击者可以通过程序(JS 脚本、Applet 等)获取到用户的 Cookie 信息，造成用户 Cookie 信息泄露，增加攻击者的跨站脚本攻击威胁。
- HttpOnly 是微软对 Cookie 做的扩展，该值指定 Cookie 是否可通过客户端脚本访问。
- 如果在 Cookie 中没有设置 HttpOnly 属性为 true，可能导致 Cookie 被窃取。窃取的 Cookie 可以包含标识站点用户的敏感信息，如 ASP.NET 会话 ID 或 Forms 身份验证票证，攻击者可以重播窃取的 Cookie，以便伪装成用户或获取敏感信息，进行跨站脚本攻击等。

### Cookie 的作用域

`Domain` 和 `Path` 标识定义了 Cookie 的作用域：即 Cookie 应该发送给哪些 URL。

`Domain` 标识指定了哪些主机可以接受 Cookie。如果不指定，默认为当前主机(**不包含子域名**）。如果指定了`Domain`，则一般包含子域名。

例如，如果设置 `Domain=mozilla.org`，则 Cookie 也包含在子域名中（如`developer.mozilla.org`）。

例如，设置 `Path=/docs`，则以下地址都会匹配：

- `/docs`
- `/docs/Web/`
- `/docs/Web/HTTP`

## 什么是 Json Web Tokens

### 简单说就是更安全的 token。

Json Web Token 的简称就是 JWT，通常可以称为 `Json 令牌`。它是`RFC 7519` 中定义的用于`安全的`将信息作为 `Json 对象`进行传输的一种形式。JWT 中存储的信息是经过`数字签名`的，因此可以被信任和理解。可以使用 HMAC 算法或使用 RSA/ECDSA 的公用/专用密钥对 JWT 进行签名。

使用 JWT 主要用来下面两点

- `认证(Authorization)`：这是使用 JWT 最常见的一种情况，一旦用户登录，后面每个请求都会包含 JWT，从而允许用户访问该令牌所允许的路由、服务和资源。`单点登录`是当今广泛使用 JWT 的一项功能，因为它的开销很小。
- `信息交换(Information Exchange)`：JWT 是能够安全传输信息的一种方式。通过使用公钥/私钥对 JWT 进行签名认证。此外，由于签名是使用 `head` 和 `payload` 计算的，因此你还可以验证内容是否遭到篡改。

JWT 主要由三部分组成，每个部分用 `.` 进行分割，各个部分分别是

- `Header`
- `Payload`
- `Signature`

**Header**

Header 是 JWT 的标头，它通常由两部分组成：`令牌的类型(即 JWT)`和使用的 `签名算法`，例如 HMAC SHA256 或 RSA。

**Payload**

Token 的第二部分是 `Payload`，Payload 中包含一个声明。声明是有关实体（通常是用户）和其他数据的声明。共有三种类型的声明：**registered, public 和 private** 声明。

**signature**

JWT 的第三部分是一个签证信息，这个签证信息由三部分组成

- header (base64 后的)
- payload (base64 后的)
- secret

#### 拼凑在一起就是完整的 JWT

三个由点分隔的 Base64-URL 字符串部分组成在一起，这个字符串可以在 HTML 和 HTTP 环境中轻松传递这些字符串。

## JSON Web Token 和 Session、Cookies 的对比

### 不同之处

#### 密码签名

JWT 具有加密签名，而 Session Cookies 则没有。

#### JSON 是无状态的

JWT 是`无状态`的，因为声明被存储在`客户端`，而不是服务端内存中。

身份验证可以在`本地`进行，而不是在请求必须通过服务器数据库或类似位置中进行。 这意味着可以对用户进行多次身份验证，而无需与站点或应用程序的数据库进行通信，也无需在此过程中消耗大量资源。

#### 可扩展性

Session Cookies 是存储在服务器内存中，这就意味着如果网站或者应用很大的情况下会耗费大量的资源。由于 JWT 是无状态的，在许多情况下，它们可以节省服务器资源。因此 JWT 要比 Session Cookies 具有更强的`可扩展性`。

#### JWT 支持跨域认证

Session Cookies 只能用在`单个节点的域`或者它的`子域`中有效。如果它们尝试通过第三个节点访问，就会被禁止。如果你希望自己的网站和其他站点建立安全连接时，这是一个问题。

使用 JWT 可以解决这个问题，使用 JWT 能够通过`多个节点`进行用户认证，也就是我们常说的`跨域认证`。

---

### 相同之处

#### 都是为了身份验证

它们既可以对用户进行身份验证，也可以用来在用户单击进入不同页面时以及登陆网站或应用程序后进行身份验证。

如果没有这两者，那你可能需要在每个页面切换时都需要进行登录了。因为 HTTP 是一个无状态的协议。这也就意味着当你访问某个网页，然后单击同一站点上的另一个页面时，服务器的`内存中`将不会记住你之前的操作。

**JWT 和 Session Cookies 就是用来处理在不同页面之间切换，保存用户登录信息的机制**。

也就是说，这两种技术都是用来保存你的登录状态，能够让你在浏览任意受密码保护的网站。通过在每次产生新的请求时对用户数据进行身份验证来解决此问题。

所以 JWT 和 Session Cookies 的相同之处是什么？那就是它们能够支持你在发送不同请求之间，记录并验证你的登录状态的一种机制。

## JWT 和 Session Cookies 的选型

我们上面探讨比较了 JWT 和 Cookies ，相信你也会对选型有了更深的认识，大致来说

对于只需要登录用户并访问存储在站点数据库中的一些信息的中小型网站来说，Session Cookies 通常就能满足。

如果你有企业级站点，应用程序或附近的站点，并且需要处理大量的请求，尤其是第三方或很多第三方（包括位于不同域的 API），则 JWT 显然更适合。
