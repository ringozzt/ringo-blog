# Webpack 基础

首先，webpack 是一款打包工具，我们平时用的 Vue-CLI，create-React-App 等都是基于 Webpack 进行配置的脚手架。

## package.json

这个文件存在于绝大多数前端项目中，npm 加载，webpack 等工具的打包都依赖这个文件夹。

### 版本控制

- 指定版本：比如"axios": "0.18.0"，表示安装 0.18.0 的版本
- 波浪号~：比如 "axios": "~1.0.12",表示安装 1.0.x 的最新版本（不低于 1.0.12），但是不安装 1.1.x，也就是说安装时不改变大版本号和次要版本号
- 插入号^：比如 "axios": "^0.3.0"，表示安装 0.3.0 及以上的版本，但是不安装 1.0.0，也就是说安装时不改变大版本号
- latest：安装最新的版本

### browserslist

browserslist 字段用来告知支持哪些浏览器及版本。Babel、Autoprefixer 和其他工具会用到它，以将所需的 polyfill 和 fallback 添加到目标浏览器。

### dependencies

dependencies 字段中声明的是项目的生产环境中所必须的依赖包。

### devDependencies

devDependencies 中声明的是开发阶段需要的依赖包，如 Webpack、Eslint、Babel 等，用于辅助开发。它们只需安装在开发设备上，而无需在生产环境中运行代码。

### peerDependencies

用来供插件指定其所需要的主工具的版本。

### scripts

scripts 是 package.json 中内置的脚本入口，是 key-value 键值对配置，key 为可运行的命令，可以通过 npm run 来执行命令。除了运行基本的 scripts 命令，还可以结合 pre 和 post 完成前置和后续操作。

### main

main 字段用来指定加载的入口文件，在 browser 和 Node 环境中都可以使用。如果不指定该字段，默认是项目根目录下的 index.js。如果没找到，就会报错。

### husky

用于配置一些 git 提交生命周期中的回调，验证当前文件规则是否符合要求。

### lint-staged

lint-staged 是一个在 Git 暂存文件上运行 linters 的工具，配置后每次修改一个文件即可给所有文件执行一次 lint 检查，通常配合 gitHooks\husky 一起使用。

## webpack.config.js

存放 webpack 配置的说明文件，以下我们讨论的内容多数是写在这里面的。

## module、chunk、bundle

对于初学者来说，这三个概念还是挺迷惑的。通过这张图可以看出：

<img src="https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/webpack.png" style="zoom:50%;" />

`webpack`这个打包器帮我们把各种乱七八糟的资源输出成**浏览器能识别的资源**

### module

module 就是左边的那些资源

### bundle

右边的这一整块就是打包产物 bundle

### chunk

对于打包产物 bundle， 有些情况下，我们觉得太大了。 为了优化性能，比如快速打开首屏，利用缓存等，我们需要对 bundle 进行以下拆分，对于拆分出来的东西，我们叫它 chunk。

## Loader

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。

**loader** 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 [模块](https://webpack.docschina.org/concepts/modules)，以供应用程序使用，以及被添加到依赖图中。

### 常见的 Loader：

#### less-loader、sass-loader

Less-loader 的作用就是将 less 代码转译为浏览器可以识别的 CSS 代码

#### css-loader

主要是解析 css 文件中的@import 和 url 语句，处理 css-modules，并将结果作为一个 js 模块返回

#### style-loader

经过 css-loader 的转译，我们已经得到了完整的 css 样式代码块，style-loader 的作用就是将包含 css 样式的 js 模块以 style 标签的方式插入 DOM 树中。

#### postcss-loader

PostCSS 本身是一个功能比较单一的工具。它提供了一种方式用 JavaScript 代码来处理 CSS。它负责把 CSS 代码解析成抽象语法树结构（Abstract Syntax Tree，AST），再交由插件来进行处理。PostCSS 的强大之处在于其不断发展的插件体系。

- [autoprefixer (opens new window)](https://github.com/postcss/autoprefixer)给 css 加前缀
- [precss (opens new window)](https://github.com/jonathantneal/precss)提供类似 sass 语法，告别 sass 包
- [cssnext (opens new window)](https://github.com/MoOx/postcss-cssnext)将未来 CSS 特性编译为现今支持的特性
- [px2rem-postcss (opens new window)](https://github.com/songsiqi/px2rem-postcss)将 px 转为 rem 工具。`移动端强烈推荐`

#### babel-loader（重要）

将 ES6+ 语法转换为 ES5 语法

**安装**

```javascript
cnpm i babel-loader @babel/core @babel/preset-env -D
```

- babel-loader 这是使 babel 和 webpack 协同工作的模块
- @bable/core 这是 babel 编译器核心模块
- @babel/preset-env 这是 babel 官方推荐的预置器，可根据用户的环境自动添加所需的插件和补丁来编译 Es6 代码

#### swc-loader

`rust`的出现让前端刮起了一阵重写工具风，用 rust 重构的 babel 就是 swc，它的性能很夸张，来到了毫秒级。感兴趣的同学可以看这两篇，这里就不展开了 [swc 入门](https://juejin.cn/post/7034316603890237477) [rust 重构](https://juejin.cn/post/7033196853218770980)

#### file-loader

用于处理文件类型资源，如`jpg`，`png`等图片。返回能直接访问的 URL。

#### url-loader

`url-loader`也是处理图片类型资源，只不过它与`file-loader`有一点不同，`url-loader`可以设置一个根据图片大小进行不同的操作，如果该图片大小大于指定的大小，则将图片进行打包资源，否则将图片转换为`base64`字符串合并到`js`文件里

## Mode

通过选择 `development`, `production` 或 `none` 之中的一个，来设置 `mode` 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 `production`。

```javascript
module.exports = {
  mode: 'production',
};
```

想要了解更多，请查阅 [mode 配置](https://webpack.docschina.org/configuration/mode)，这里有具体每个值相应的优化行为。

支持以下字符串值：

| 选项          | 描述                                                                                                                                                                                                                                          |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `development` | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `development`. 为模块和 chunk 启用有效的名。                                                                                                                                         |
| `production`  | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `production`。为模块和 chunk 启用确定性的混淆名称，`FlagDependencyUsagePlugin`，`FlagIncludedChunksPlugin`，`ModuleConcatenationPlugin`，`NoEmitOnErrorsPlugin` 和 `TerserPlugin` 。 |
| `none`        | 不使用任何默认优化选项                                                                                                                                                                                                                        |

如果没有设置，webpack 会给 `mode` 的默认值设置为 `production`。

## Plugin

### 常用的 plugin：

#### html-webpack-plugin

将一个页面模板打包到 dist 目录下，默认都是自动引入 js or css

#### clean-webpack-plugin

用于每次打包 dist 目录删除

#### purge-webpack-plugin

用于删除未使用到的 CSS 样式（CSS tree-shaking）

#### extract-text-webpack-plugin

将`css`样式从`js`文件中提取出来最终合成一个`css`文件，该插件只支持`webpack4`之前的版本，如果你当前是`webpack4`及以上版本那么就会报错。

#### mini-css-extract-plugin

该插件与上面的`exract-text-webpack-plugin`的一样，都是将 css 样式提取出来, 唯一就是用法不同，本插件的`webpack4+`推荐使用

#### uglifyjs-webpack-plugin

用于压缩丑化`js`文件，针对`webpack4`版本以上。

#### SplitChunksPlugin

可以看这篇，传送门 [chunk 全解](https://juejin.cn/post/6844903680307625997)

## Tree-shaking

Tree-Shaking 是一种基于 ES Module 规范的 Dead Code Elimination 技术，它会在运行过程中静态分析模块之间的导入导出，确定 ESM 模块中哪些导出值未曾其它模块使用，并将其删除，以此实现打包产物的优化。

Tree Shaking 较早前由 Rich Harris 在 Rollup 中率先实现，Webpack 自 2.0 版本开始接入，至今已经成为一种应用广泛的性能优化手段。

**webpack5 已经自带了这个功能了，当打包环境为`production`时，默认开启 tree-shaking 功能。**

### 具体方案有两种：

- usedExports：通过标记某些函数是否被使用过，之后通过 terser 来压缩
  - usedExports 设置为 true 时，可删除的代码块会有一段注释：unused harmony export mul，就是标记这段代码未使用，那么 Terser 就会在优化时删除这段代码。
- sideEffects：跳过整个模块/文件，直接查看跳过该文件是否导致副作用
  - 用于告知 webpack compiler 哪些模块是有副作用的
  - 配置为 false，代表默认使用 usedExports 删除未使用到的 exports
  - 模块导入后是否被使用、未使用到的直接删除

### 在生产环境中，可以这样配置

- optimization 中配置 usedExports 为 true，来帮助 terser 进行优化
- 在 package.json 中配置 sideEffects 为 true，直接帮助模块进行优化

## HMR

### webpack-dev-server

webpack-dev-server 是一个封装好的 webpack 开发服务器，底层使用 express。通常用在开发环境的 webpack 打包，它有以下这些作用：

1. 读取 webpack.config.js 并使用 webpack 进行编译
2. **默认集成一些第三方插件并可供配置，都在 webpack.config.js 下的`devServer`节点下（本节重点）**
3. 开启一个 websocket 以实现热更新
   - 基于[webpack-dev-middleware ](https://github.com/webpack/webpack-dev-middleware)实现
   - 编译输出放到内存中(memory-fs)，不会生成真实的文件
4. 开启本地 express 服务器以实现网址预览

> webpack 打包和 webpack-dev-server 开启服务的区别:webpack 输出真实的文件，而 webpack-dev-server 只将 bundle 存放到内存中，不输出真实的文件

### devServer 配置

webpack 的 devServer 配置基于[webpack-dev-server ](https://github.com/webpack/webpack-dev-server)集成的插件。该插件提供了 proxy 代理配置，基于 express 中间件 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)实现，该中间件又基于 node [http-proxy ](https://github.com/nodejitsu/node-http-proxy),所以如果要详细知道 proxy 各个参数的意义和实现方式，可以阅读下 http-proxy 的源码。

> proxy 作用：解决开发环境的跨域问题(不用再去配置 nginx）

```js
devServer: {
    // 提供静态文件目录地址
    // 基于express.static实现
    contentBase: path.join(__dirname, 'dist'),
    // 任意的 404 响应都被替代为 index.html
    // 基于node connect-history-api-fallback包实现
    historyApiFallback: true,
    // 是否一切服务都启用 gzip 压缩
    // 基于node compression包实现
    compress: true,
    // 是否隐藏bundle信息
    noInfo: true,
    // 发生错误是否覆盖在页面上
    overlay: true,
    // 是否开启热加载
    // 必须搭配webpack.HotModuleReplacementPlugin 才能完全启用 HMR。
    // 如果 webpack 或 webpack-dev-server 是通过 --hot 选项启动的，那么这个插件会被自动添加
    hot: true,
    // 热加载模式
    // true代表inline模式，false代表iframe模式
    inline: true, // 默认是true
    // 是否自动打开
    open: true,
    // 设置本地url和端口号
    host: 'localhost',
    port: 8080,
    // 代理
    // 基于node http-proxy-middleware包实现
    proxy: {
        // 匹配api前缀时，则代理到3001端口
        // 即http://localhost:8080/api/123 = http://localhost:3001/api/123
        // 注意:这里是把当前server8080代理到3001，而不是任意端口的api代理到3001
        '/api': 'http://localhost:3001',
        // 设置为true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求
        // 主要解决跨域问题
        changeOrigin: true,
        // 针对代理https
        secure: false,
        // 覆写路径：http://localhost:8080/api/123 = http://localhost:3001/123
        pathRewrite: {'^/api' : ''}
    }
}

```
