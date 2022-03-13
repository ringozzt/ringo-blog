# 模块化原理

### ESModule / ES6 模块化

- 使用 import export 关键字

- 静态分析特性：编译阶段就分析出模块依赖

  > 简单来说一段`js`代码的执行过程，需要经历以下三个步骤:
  >
  > 1. `V8`通过源码进行词法分析，语法分析生成`AST`和执行上下文。
  > 2. 根据`AST`生成计算机可执行的字节码。
  > 3. 执行生成的字节码。
  >
  > ESM 在第一步时就可以确定依赖关系，从而剔除 dead code（Terser 根据 DCE 标记删掉这些没被用到的导出语句）；
  > 而 CommonJS 同步加载模块，依赖于代码的执行，第三步才能确认模块依赖，所以不支持 Tree-Shaking。
  >
  > [从 Tree Shaking 来走进 Babel 插件开发](https://mp.weixin.qq.com/s/igLFmFGQXSq0qb56-mr0CQ)

- 一个模块要暴露或引入的方法能够在编译阶段就确定

- 有利于 webpack 分析模块依赖，没用到的方法从 bundle 中剔除

- tree-shaking 依赖于 ES Module 的静态语法分析(不执行任何代码就可以知道模块间的依赖关系)

- 自动采用严格模式

- import 静态编译

> import 模块时只是生成**引用地址**， 等到需要时才去取值， 所以不存在缓存的问题。
>
> import 是解构过程，**编译时调用**，也就是**异步加载**。虽然 import 命令具有提升效果，会提升到整个模块的头部， 但为了规范还是建议放在文件开头。

---

### commonJs / CJS

- Node 遵循 cjs 规范实现了模块化

- 导出 exports module.exports 导入 require

- exports 是一个对象，可以在这个对象中添加属性

- module.exports = exports = { }同一块内存

  > cjs 中没有 module.exports 这个概念，但是为了实现模块的导出，node 中使用的是 module 的类，每一个模块都是 module 的一个实例，所以 node 中导出的其实是 module.exports，exports 只是辅助

- cjs 加载模块是同步的，加载完毕才能运行

- 所以浏览器使用 AMD，后来是 ESM

- 另一方面 webpack 可以将 cjs esm 转换成 umd

- node 会缓存 require 引入，不会有重复引入的问题

- cjs 加载的就是 module.exports

- node 中采用 dfs 处理循环引入

#### require 动态编译

第一次加载某个模块时， Node 会缓存该模块， 后续加载就从缓存中获取。

require 是值拷贝，**运行时调用**，也就是**同步加载**。

相当于一个全局方法，所以 require 理论上可以写在代码块的任何地方。

#### require 和 import 的性能

`require` 的性能相对于 `import` 稍低。

因为 `require` 是在运行时才引入模块并且还赋值给某个变量，而 `import` 只需要依据 `import` 中的接口在编译时引入指定模块所以性能稍高

---

### UMD

- 兼容 cjs 和 amd 的模块，既可以在 webpack、node 中被 require 引用，也可以在浏览器中直接用 cdn 引入
- 部分 npm 包会打出 cjs、esm、umd 三种格式，如 antd

---

### AMD

- 异步模块定义
- 采用异步加载模块
- 早于 cjs，但 cjs 还在使用，amd 已经逐渐淘汰了

---

### CMD

- 普通模块定义
- 异步加载模块，吸收了 cjs 的优点，但目前也较少使用了
- 优秀的实现方案： sea.js
