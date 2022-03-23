# tree-shaking

> 五柳：“搞清楚一些模糊的概念的优先级是优于了解其底层实现的”

结论：

1. webpack 的 tree-shaking 方式之一通过 Terser、UglifyJS 这一类 DCE（Dead Code Elimination）工具来完成；
2. rollup 早期没有 DCE 概念，后来的版本(2.55.1)也原生支持了 DCE。

Tree-shaking 这一术语在前端社区内，起初是 [Rich Harris](https://github.com/Rich-Harris) 在 Rollup 中提出。

简单概括起来，Tree-shaking 可以使得项目最终构建（Bundle）结果中只包含你实际需要的代码。

下面也会介绍一下**rollup**这个轻量级的打包器，实际上也是 vite、snowpack 实现 build 步骤的依靠。

> vite 文档：
>
> 尽管原生 ESM 现在得到了广泛支持，但由于嵌套导入会导致额外的网络往返，在生产环境中发布未打包的 ESM 仍然效率低下（即使使用 HTTP/2）。为了在生产环境中获得最佳的加载性能，最好还是将代码进行 tree-shaking、懒加载和 chunk 分割（以获得更好的缓存）。
>
> ##### 为何不用 ESBuild 打包？[#](https://cn.vitejs.dev/guide/why.html#why-not-bundle-with-esbuild)
>
> 虽然 `esbuild` 快得惊人，并且已经是一个在构建库方面比较出色的工具，但一些针对构建 _应用_ 的重要功能仍然还在持续开发中 —— 特别是代码分割和 CSS 处理方面。就目前来说，Rollup 在应用打包方面更加成熟和灵活。尽管如此，当未来这些功能稳定后，我们也不排除使用 `esbuild` 作为生产构建器的可能。

---

## rollup

rollup 的产生就是针对开发 js 库的。

> rollup 生成代码只是把我们的代码转码成目标格式 js 并无其他，同时如果需要，他可以同时帮我们生成支持 umd/commonjs/es 的 js 代码，vue/react/angular 都在用他作为打包工具。查看他们的官网代码都可以看到 rollup 的影子。

#### 对比 webpack

- `webpack`可以进行**代码分隔**,**静态资源处理**,**热模块替换**
- `rollup`支持`ES6 module`，`tree-shaking`功能强大；但`webpack`不支持导出`ES6 module`。
- `webpack`打包体积臃肿，`rollup`打包后简洁，更接近源代码。

对比两者各自特性，可以发现`webpack`更适合于`应用`，而`rollup`更适用于`类库`。

---

## esm 如何转为 cjs

[为什么能快乐的在 esm 中使用 cjs 模块](https://juejin.cn/post/6844904126195695624)

- default 的处理比较特殊，不能`export == exports.xx` 一一对应，需要交给 babel 处理

[rollup 官网](https://www.rollupjs.com/)

[项目减重之 rollup 的 Tree-shaking](https://juejin.cn/post/6968262966604988429)

---

## rollup 和 webpack 的 tree-shaking

说到 Tree-shaking，不难免提及 Dead Code Elimination，相信很多同学在一些关于 Tree-shaking 的文章中都会看到诸如这样的描述：Tree-shaking 是一项 Dead Code Elimination（以下统称 DCE）技术。

也许这个时候你会问 Tree-shaking 不是还会消除 Dead Code 吗？

确实，但是也不一定，如果你使用的是现在的 Rollup `v2.55.1`，它是会进行 DCE，即消除 Dead Code。

但是，如果你用的是 Webpack 的话，那就是另一番情况了，它需要使用 Terser、Uglify 对应的插件来实现 DCE。

### webpack

两种方式:

1. optimization 中配置 usedExports 为 true，来帮助 terser 进行优化
2. 在 package.json 中配置 sideEffects 为 true，直接帮助模块进行优化

方案一 中 Tree Shaking 的实现分为如下步骤：

- 在 `FlagDependencyExportsPlugin` 插件中根据模块的 `dependencies` 列表收集模块导出值，并记录到 ModuleGraph 体系的 `exportsInfo` 中
- 在 `FlagDependencyUsagePlugin` 插件中收集模块的导出值的使用情况，并记录到 `exportInfo._usedInRuntime` 集合中
- 在 `HarmonyExportXXXDependency.Template.apply` 方法中根据导出值的使用情况生成不同的导出语句
- 使用 DCE 工具删除 Dead Code，实现完整的树摇效果

在 Webpack 中，启动 Tree Shaking 功能必须同时满足三个条件：

- 使用 ESM 规范编写模块代码
- 配置 `optimization.usedExports` 为 `true`，启动标记功能
- 启动代码优化功能，可以通过如下方式实现：
  - 配置 `mode = production`
  - 配置 `optimization.minimize = true`
  - 提供 `optimization.minimizer` 数组

例如：

```Javascript
// webpack.config.js
module.exports = {
  entry: "./src/index",
  mode: "production",
  devtool: false,
  optimization: {
    usedExports: true,
  },
};
```

### rollup

### 早期的 Tree-shaking

Rich Haris 举了个做蛋糕的例子，指出 DCE 就好比在做蛋糕的时候直接把鸡蛋放入搅拌，最后在做好的蛋糕中取出蛋壳，这是不完美的做法，而 Tree-shaking 则是在做蛋糕的时候只放入我想要的东西，即不会把蛋壳放入搅拌制作蛋糕。

因此，Tree-shaking 表达的不是指消除 Dead Code，而是指保留 Live Code。即使最终 DCE 和 Tree-shaking 的结果是一致的，但是由于 JavaScript 静态分析的局限性，实际过程并不同。并且，包含有用的代码可以得到更好的结果，从表面看（做蛋糕的例子）这也是一种更符合逻辑的方法。

在早期， Rollup 提出和支持 Tree-shaking 的时候，它并不会做额外的 DCE，这也可以在 15 年 Rich Haris 写的[那篇文章](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80)中看出，当时他也提倡大家使用 Rollup + Uglify。

Rollup 的 Tree-shaking 最初并不支持 DCE，它仅仅**只是在构建结果中保留你导入的模块中需要的代码**。

### 现在的 Tree-shaking

[现在 Rollup 官方介绍的 tree-shaking](https://rollupjs.org/guide/en/#what-is-tree-shaking)

> Tree-shaking，也被称为 Live Code Inclusion，是指 Rollup 消除项目中实际未使用的代码的过程，它是一种 Dead Code Elimination 的方式，但是在输出方面会比其他方法更有效。
>
> 该名称源自模块的抽象语法树（Abstract Sytanx Tree）。该算法首先会标记所有相关的语句，然后通过摇动语法树来删除所有的 Dead Code。
>
> Tree-shaking 是 DCE 的一种新的实现，Javascript 同传统的编程语言不同的是，javascript 绝大多数情况需要通过网络进行加载，然后执行，加载的文件大小越小，整体执行时间更短，所以去除无用代码以减少文件体积，对 javascript 来说更有意义。
>
> 它在思想上类似于 GC（Garbage Collection）中的标记清除算法。尽管，**该算法不限于 ES Module**，但它们使其效率更高，因为它允许 Rollup 将所有模块一起视为具有共享绑定的大抽象语法树。

随着时间的推移，Rollup **原生支持了 DCE**，对 Tree-shaking 的定义已经不仅仅是 ES Module 相关。

所以，有时候我们看到一些文章介绍 Tree-shaking 实现会是这样：

- 利用 **ES Module 可以进行静态分析**的特点来检测模块内容的导出、导入以及被使用的情况，保留 Live Code
- 消除**不会被执行**和**没有副作用（Side Effect）** 的 Dead Code，即 DCE 过程

第 2 点就是说，一段代码**没有被执行**，但是**存在副作用**，这部分代码就不会被消除。

> ### 副作用哪来的：
>
> babel 为了符合 ES6 真正的语义，会做一些改变源码，产生副作用的转义。
>
> 除非开启`loose`模式，直译的话叫做宽松模式。它是做什么用的呢？它会不严格遵循 ES6 的语义，而采取更符合我们平常编写代码时的习惯去编译代码。
>
> 这个模式具体的 babel 配置如下：
>
> ```js
> // .babelrc
> {
>   "presets": [["env", { "loose": false }]]
> }
> ```

### Dead Code 一般具有以下几个特征

- 代码不会被执行，不可到达

- 代码执行的结果不会被用到

- 代码只会影响死变量（只写不读）

### rollup 能做什么

- rollup 只处理函数和顶层的 import/export 变量，不能把没用到的类的方法消除掉
- javascript 动态语言的特性使得静态分析比较困难，rollup 只能静态分析

---

### 感谢巨人

1. [从过去到现在，聊聊 Tree-shaking 是什么？](https://segmentfault.com/a/1190000040476979)
2. [揭秘 Rollup Tree Shaking](https://segmentfault.com/a/1190000040009496)
3. [Webpack Tree-Shaking 实现原理](https://juejin.cn/post/7002410645316436004)
4. [tree-shaking 还得是 rollup，webpack 不行？](https://mp.weixin.qq.com/s/7C9fsdwvHokLngrK-XYdZQ)
5. [Tree-Shaking 性能优化实践 - 原理篇](https://juejin.cn/post/6844903544756109319)
6. [why vite](https://cn.vitejs.dev/guide/why.html)
