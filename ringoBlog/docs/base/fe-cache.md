# 前端缓存和鉴权

在客户端，我们通常用缓存来避免频繁请求数据库，保存一些登录态，来维持 client-server 对话。

接下来，我通过 DNS 缓存、CDN 缓存、浏览器缓存、前端鉴权来梳理一下整个脉络。

## DNS 缓存

DNS 是域名和 IP 地址的映射，浏览器也提供了 DNS 的数据缓存，如果一个地址已经解析过，会把解析的结果缓存下来，下次输入直接找到了 ip 地址。另外如果不指定端口，默认 IP80 端口。

## CDN 缓存

CDN 往往被用来存放静态资源，像 JS、CSS、图片等不需要服务器进行计算即可得到的资源。而需要后端实时动态生成的资源，较为常见的就是 JSP、ASP 或者依赖服务端渲染得到的 HTML 页面，这些通常不会放到 CDN 服务器上。

### 回源

没有资源，资源过期，访问的资源是不缓存资源等都会导致回源。

资源过期时间就是根据我们老生常谈的请求头部来判定。

缓存服务器会请求上一级缓存服务器，直到源站，以获取目标资源。

### 资源更新

分两种，主动（PUSH）和被动（PULL）。

被动就是利用回源在途经的 cdn 节点缓存数据。

而主动指的是，我们从服务器主动往 cdn 推送数据，那么之前的缓存就会失效。

## 浏览器缓存策略

浏览器中的缓存作用分为两种情况，一种是需要发送`HTTP`请求，一种是不需要发送。

### 强缓存

首先是检查强缓存，这个阶段`不需要`发送 HTTP 请求。

所谓检查，是通过两个字段 Expires、Cache-Control。

在`HTTP/1.0`时期，使用的是**Expires**，而`HTTP/1.1`使用的是**Cache-Control**。

请求 url 前，先读缓存，命中返回 200。

当**Expires**和**Cache-Control**同时存在的时候，Cache-Control 优先级高。

#### 关于 Expires(http1)

设置浏览器的缓存过期时间（值为 GMT 时间，即格林尼治时间）

如果服务器时间和浏览器时间不一致，就不准了

#### 关于 cache-control(http1.1)

有以下属性：

##### max-age

max-age = 3600 (s)

没有使用具体时间点，而是时长

优先级高于 expires

##### private

只有浏览器能缓存，中间的代理服务器不能缓存

##### public

客户端和代理服务器都可缓存

##### no-cache

跳过强缓存，发送 http 请求，直接进入协商缓存

##### no-store

不进行缓存

##### s-maxage

代理服务器的缓存时长

#### 关于 Pragma

当该字段值为`no-cache`的时候，会告诉浏览器不要对该资源缓存，即每次都得向服务器发一次请求才行。

```js
res.setHeader('Pragma', 'no-cache'); //禁止缓存
res.setHeader('Cache-Control', 'public,max-age=120'); //2分钟
```

通过 Pragma 来禁止缓存，通过 Cache-Control 设置两分钟缓存，但是重新访问我们会发现浏览器会再次发起一次请求，说明了`Pragma的优先级高于Cache-Control`

### 协商缓存

当资源缓存时间超时，也就是强缓存失效之后，浏览器在请求头中携带相应的`缓存tag`来向服务器发请求，由服务器根据这个 tag 来决定是否使用缓存，这就是**协商缓存**。

这样的缓存 tag 分为两种: **Last-Modified** 和 **ETag**。两者各有优势：

> etag 更加精准：
>
> - last-modified 编辑了但是没改，也会造成缓存失效
>
> - 一秒内改了多次，last-modified 以秒为单位，体现不出来
> - 性能上 last-modified 优于 etag，hash 比较耗时

#### 两者对比

1. 在`精准度`上，`ETag`优于`Last-Modified`。ETag 是按照内容给资源上标识，因此能准确感知资源的变化。而 Last-Modified 就不一样了，它在一些特殊的情况并不能准确感知资源变化，主要有两种情况:

   - 编辑了资源文件，但是文件内容并没有更改，这样也会造成缓存失效。
   - Last-Modified 能够感知的单位时间是秒，如果文件在 1 秒内改变了多次，Last-Modified 就不能体现出修改了。

2. 在性能上，`Last-Modified`优于`ETag`，也很简单理解，`Last-Modified`仅仅只是记录一个时间点，而 `Etag`需要根据文件的具体内容生成哈希值。

如果两种方式都支持的话，服务器会优先考虑`ETag`。

#### Last-modified：最后修改时间

浏览器第一次发送请求后，resp 中返回

之后的请求头带上`If-modified-since`，服务器收到后就可以对比判断是否需要返回新的资源

- `If-modified-since`小于`Last-modified`说明更新了，返回新的资源
- 否则返回 304，走浏览器的缓存

#### Etag：标签

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

### 浏览器缓存的位置

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

cookie、 localstorage、 sessionstrorage

### Cookie

- 为了弥补 http 在状态管理上的不足
- 容量缺陷：上限 4kb
- 性能缺陷：域名下的任何地址请求都会带上 cookie
- 安全缺陷：以纯文本的形式传递，httpOnly 为 flase，js 脚本能直接读取 cookie，会引起 XSS 攻击

### LocalStorage

- 容量：上限 5M，相比于 cookie 大大增加
- 只存在于客户端，不参与和服务端的通信
- 适合存储搜索历史、主题风格官网 logo、vuex、redux 的持久化、部分用户信息
- setItem、getItem、removeItem

### SessionStorage

- 会话级别，页面刷新还在，页面关闭就消失了
- 可以存储本次浏览记录、表单信息刷新了还在

### IndexDB

- 支持事务，二进制数据(arraybuffer,blob 对象)，键值对存储

## 前端鉴权方案

为解决 http 无状态而诞生。

HTTP 协议是一种`无状态协议`，即每次服务端接收到客户端的请求时，都是一个全新的请求，服务器并不知道客户端的历史请求记录；Session 和 Cookie 的主要目的就是为了弥补 HTTP 的无状态特性。

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

`Set-Cookie` HTTP 响应标头将 cookie 从服务器发送到用户代理。实际上 token、sessionid，都可以通过这种方式存储。

### 常用属性

#### Secure

- 如果一个 cookie 被设置了 Secure=true，那么这个 cookie 只能用 https 协议发送给服务器，用 http 协议是不发送的。
- cookie 是在 https 的情况下创建的，且他的 Secure=true，那么之后你一直用 https 访问其他的页面，cookie 都会被发送到服务器（保持登录态）。但是如果这时 url 被改成 http 协议访问其他页面，你就需要重新登录了，因为这个 cookie 不能在 http 协议中发送。

#### HttpOnly

- HttpOnly 是微软对 Cookie 做的扩展，该值指定 Cookie 是否可通过客户端脚本（JavaScript）访问。
- 会话 Cookie 中缺少 HttpOnly 属性会导致攻击者可以通过程序(JS 脚本、Applet 等)获取到用户的 Cookie 信息，造成用户 Cookie 信息泄露，增加攻击者的跨站脚本攻击威胁。

#### Domain

`Domain` 和 `Path` 标识定义了 Cookie 的作用域：即 Cookie 应该发送给哪些 URL。

`Domain` 标识指定了哪些主机可以接受 Cookie。

如果不指定，默认为当前主机(**不包含子域名**）。

如果指定了`Domain`，则访问子域名也会携带 Cookie。

例如，如果设置 `Domain=mozilla.org`，则 Cookie 也会包含在子域名中（如`developer.mozilla.org`）。

#### Path

例如，设置 `Path=/docs`，则以下地址都会匹配：

- `/docs`
- `/docs/Web/`
- `/docs/Web/HTTP`

### 不同子域名跨域

子域名间 Cookie 是不共享的，但各子域名均可获取到父级域名的 Cookie，类似于 useContext。

即`app.demo.com`与`news.demo.com`均可以获取 `demo.com`域名下的 Cookie。

所以可以通过将 Cookie 设置在父级域名上，可以达到子域名共享的效果，即当用户在 `app.demo.com` 域名下登录时，在`demo.com`域名下设置名为 SessionID 的 Cookie，当用户之后访问`news.demo.com`时，后台服务也可以获取到该 SessionID，从而识别用户。

## Session

客户端请求服务端，服务端会为这次请求开辟一块`内存空间`，这个对象便是 Session 对象，存储结构为 `ConcurrentHashMap`。Session 弥补了 HTTP 无状态特性，服务器可以利用 Session 存储客户端在同一个会话期间的一些操作记录。

### Session 如何判断是否是同一会话

**session 的设置是通过 set-cookie 来完成的**

服务器第一次接收到请求时，开辟了一块 Session 空间（创建了 Session 对象），同时生成一个 sessionId ，并通过响应头的 **Set-Cookie：JSESSIONID=XXXXXXX **命令，向客户端发送要求设置 Cookie 的响应； 客户端收到响应后，在本机客户端设置了一个 **JSESSIONID=XXXXXXX **的 Cookie 信息，该 Cookie 的过期时间为浏览器会话结束；

接下来客户端每次向同一个网站发送请求时，请求头都会带上该 Cookie 信息（包含 sessionId ）， 然后，服务器通过读取请求头中的 Cookie 信息，获取名称为 JSESSIONID 的值，得到此次请求的 sessionId。

### session 缺点

Session 机制不便于维护集群间的服务一致性，比如 A 服务器存储了 Session，就是做了负载均衡后，假如一段时间内 A 的访问量激增，会转发到 B 进行访问，但是 B 服务器并没有存储 A 的 Session，会导致 Session 的失效。

## Token

相比 Cookie、session，token 因为它的「无状态性」，有效期、使用限制等信息都包括在 token 内容里，对 cookie 的管理能力依赖较小，客户端使用起来就显得更自由。

便于跨域，Session、Cookies 只能用在`单个节点的域`或者它的`子域`中有效。而 token 相对灵活，通过 URL 也可以传递。

### Acesss Token

#### 组成

uid(用户唯一的身份标识)、

time(当前时间的时间戳)、

有效期、

sign（签名，token 的前几位用哈希算法压缩成的一定长度的十六进制字符串）

#### 传递流程

- 用户登录，服务端校验账号密码，获得用户信息
- 把 token 通过响应报文 Set-Cookie 标头，返回给浏览器
- 此后用户请求业务接口，通过 cookie 携带 token（拼接在 url 中也可以）
- 接口校验 token 有效性，进行正常业务接口处理

<img src="https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/Blog/pic-token.png" alt="access-token" style="zoom:30%;" />

### Refresh Token

refresh token 是专用于刷新 access token 的 token。

业务接口用来鉴权的 token，我们称之为 access token。越是权限敏感的业务，我们越希望 access token 有效期足够短，以避免被盗用。但过短的有效期会造成 access token 经常过期，过期后怎么办呢？

1. 让用户重新登录获取刷新 access token，显然不够友好，要知道有的 access token 过期时间可能只有几分钟。

2. 再来一个 token，客户端直接用 refresh token 去更新 access token，我们称为 refresh token。

- access token 用来访问业务接口，由于有效期足够短，盗用风险小，也可以使请求方式更宽松灵活
- refresh token 用来获取 access token，有效期可以长一些，通过独立服务和严格的请求方式增加安全性；由于不常验证，也可以如前面的 session 一样处理

<img src="https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/Blog/refresh-token.png" alt="refresh-token" style="zoom:33%;" />

## Json Web Tokens

### 简单说就是更安全的 token

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

Session、Cookies 是存储在服务器内存中，这就意味着如果网站或者应用很大的情况下会耗费大量的资源。

由于 JWT 是无状态的，在许多情况下，它们可以节省服务器资源（通过 url、body 信息等来传递）。

因此 JWT 要比 Session Cookies 具有更强的`可扩展性`。

#### JWT 支持跨域认证

Session、Cookies 只能用在`单个节点的域`或者它的`子域`中有效。如果它们尝试通过第三个节点访问，就会被禁止。如果你希望自己的网站和其他站点建立安全连接时，这是一个问题。

使用 JWT 可以解决这个问题，使用 JWT 能够通过`多个节点`进行用户认证，也就是我们常说的`跨域认证`。

### 相同之处

#### 都是为了身份验证

它们既可以对用户进行身份验证，也可以用来在用户单击进入不同页面时以及登陆网站或应用程序后进行身份验证。

如果没有这两者，那你可能需要在每个页面切换时都需要进行登录了。因为 HTTP 是一个无状态的协议。这也就意味着当你访问某个网页，然后单击同一站点上的另一个页面时，服务器的`内存中`将不会记住你之前的操作。

**JWT 和 Session Cookies 就是用来处理在不同页面之间切换，保存用户登录信息的机制**。

也就是说，这两种技术都是用来保存你的登录状态，能够让你在浏览任意受密码保护的网站。通过在每次产生新的请求时对用户数据进行身份验证来解决此问题。

所以 JWT 和 Session Cookies 的相同之处是什么？那就是它们能够支持你在发送不同请求之间，记录并验证你的登录状态的一种机制。

## JWT 和 Session Cookies 的选型

我们上面探讨比较了 JWT 和 Cookies ，相信你也会对选型有了更深的认识，大致来说

对于只需要登录用户并访问存储在站点数据库中的一些信息的中小型网站来说，Session 、Cookies 通常就能满足。

如果你有企业级站点，应用程序或附近的站点，并且需要处理大量的请求，尤其是第三方或很多第三方（包括位于不同域的 API），则 JWT 显然更适合，做成 OAuth 等单点登录方案即可。

## OAuth 2.0

[OAuth2.0 的四种授权方式](https://juejin.cn/post/6847009773477429255)
