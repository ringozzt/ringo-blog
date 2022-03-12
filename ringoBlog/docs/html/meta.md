# meta 标签

`meta` 元素往往不会引起用户的注意，但是`meta`对整个网页有影响，会对网页能否被搜索引擎检索，和在搜索中的排名（SEO）起着关键性的作用。

`meta`有个必须的属性`content`用于表示需要设置的项的值。

`meta`存在两个非必须的属性`http-equiv`和`name`, 用于表示要设置的项。

比如`<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`,设置的项是`Content-Security-Policy`设置的值是`upgrade-insecure-requests`。

## http-equiv （请求头信息）

`http-equiv`一般设置的都是与`http`请求头相关的信息，设置的值会关联到 http 头部。也就是说浏览器在请求服务器获取`html`的时候，服务器会将`html`中设置的`meta`放在响应头中返回给浏览器。常见的类型比如`content-type`, `expires`, `refresh`, `set-cookie`, `window-target`, `charset`， `pragma`等等。

### 1. content-type

比如：`<meta http-equiv="content-type" content="text/html charset=utf8">`可以用来声明文档类型、设字符集，目前`content-type`只能在 html 文档中使用。

这样设置浏览器的头信息就会包含:

```html
content-type: text/html charset=utf8
```

### 2. expires

用于设置浏览器的过期时间, 其实就是响应头中的 expires 属性。

```html
<meta http-equiv="expires" content="31 Dec 2021" /> expires:31 Dec 2008
```

### 3. refresh

该设定表示 5 秒自动刷新并且跳转到指定的网页。如果不设置 url 的值那么浏览器则刷新本网页。

```html
<meta http-equiv="refresh" content="5 url=http://www.zhiqianduan.com" />
```

### 4. window-target

强制页面在当前窗口以独立页面显示, 可以防止别人在框架中调用自己的页面。

```html
<meta http-equiv="window-target" content="_top" />
```

### 5. pragma

禁止浏览器从本地计算机的缓存中访问页面的内容

```html
<meta http-equiv="pragma" content="no-cache" />
```

### 6. x-dns-prefetch-control

虽然在 meta 标签设置缓存无效，但是我们可以设置 meta 标签来提前进行 DNS 解析以此来提升网站性能。

在 HTML 页面中的 a 标签会自动启用 DNS 提前解析，但是在 HTTPS 上却失效了，这个时候就轮到该属性登场了。

通过设置`<meta http-equiv="x-dns-prefetch-control" content="on" />`就可以让 a 标签在 HTTPS 环境下进行 DNS 预解析。

## charset（字符集）

设置字符集。

当 meta 和 header 头（`<meta http-equiv="content-type" content="text/html charset=utf8">`）中同时设置一个内容的时候，header 头中的会覆盖 meta 中的信息优先使用。

## name （描述信息）SEO

`name`属性主要用于描述网页，与对应的`content`中的内容主要是便于搜索引擎查找信息和分类信息用的, 用法与`http-equiv`相同，`name`设置属性名，`content`设置属性值。

### 1. author

`author`用来标注网页的作者

```html
<meta name="author" content="aaa@mail.abc.com" />
```

### 2. description（SEO）

`description`用来告诉搜素引擎当前网页的主要内容，是关于网站的一段描述信息。

```html
<meta
  name="description"
  content="最专业的程序员导航,编程导航,发现优质编程学习资源,提高编程学习效率"
/>
```

### 3. keywords（SEO）

`keywords`设置网页的关键字，来告诉浏览器关键字是什么。是一个经常被用到的名称。它为文档定义了一组关键字。某些搜索引擎在遇到这些关键字时，会用这些关键字对文档进行分类。

```html
<meta
  name="keywords"
  content="编程,程序员,程序员导航,编程资源,编程学习,编程导航,计算机,自学编程"
/>
```

### 4. generator

表示当前`html`是用什么工具编写生成的，并没有实际作用，一般是编辑器自动创建的。

```html
<meta name="generator" content="vscode" />
```

### 5. revised

指定页面的最新版本

```html
<meta name="revised" content="V2，2015/10/1" />
```

### 6. robots

告诉搜索引擎机器人抓取哪些页面，`all / none / index / noindex / follow / nofollow`。

```html
<meta name="robots" content="all" />
```

`all`：文件将被检索，且页面上的链接可以被查询； `none`：文件将不被检索，且页面上的链接不可以被查询； `index`：文件将被检索； `follow`：页面上的链接可以被查询； `noindex`：文件将不被检索，但页面上的链接可以被查询； `nofollow`：文件将不被检索，页面上的链接可以被查询。

### 7.viewport

指 web 页面上用户可见的区域，用于移动端页面设计

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
```

> 由于一开始的网页主要只是用于在 PC 上展示，所以开发者们并没有过多考虑关于移动端访问的问题，但随着移动端的兴起，越来越多的 Web 访问变成了通过移动端进行的。
>
> 而由于 PC 端的 viewport 比移动端大，所以为了解决这个问题，浏览器只能的等比的缩小整个页面，导致页面的字体，图片等等都显得非常小，而由于 PC 端的 viewport 是横屏的（宽大大于高），而移动端是竖屏，所以用户放大网页之后还会出现横向的滚动条，这一系列都让用户体验相当不好。
>
> 所以为了解决上面的问题，最早由 Apple 在 Safari iOS 中引入了 viewport meta 标签，让 Web 开发人员控制视口的大小和比例。

| key           | mean             | example                                                      |
| ------------- | ---------------- | ------------------------------------------------------------ |
| width         | 视口的宽度       | width=device-width 指缩放为 100% 时以 CSS 像素计量的屏幕宽度 |
| initial-scale | 初始化缩放比例   | initial-scale=1.0 初始化不进行缩放                           |
| maximum-scale | 用户最大缩放比例 | maximum-scale=1.0 不允许用户缩放                             |
| user-scalable | 用户页面缩放     | user-scalable=no 不允许用户缩放                              |

## content（内容描述）

相当于 KEY(name)：value(content)

与 name 属性强关联，对 SEO 起决定性作用。

## scheme (翻译方案-已废弃)

`scheme` 属性用于指定要用来翻译属性值的方案。`html5`不支持该属性。
