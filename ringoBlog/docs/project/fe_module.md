# 模块化原理

### ESModule

- 使用 import export 关键字
- 采用编译阶段的静态分析
  - 一个模块要暴露或引入的方法编译阶段就确定了
  - 有利于 webpack 分析模块依赖，没用的方法从 bundle 中剔除，既可以减少 bundle 的文件大小，又可以提高脚本的执行速度。tree-shaking
- 自动采用严格模式

### commonJs

- Node 遵循 cjs 规范实现了模块化
- 导出 exports module.exports 导入 require
- exports 是一个对象，可以在这个对象中添加属性
- cjs 中没有 module.exports 这个概念，但是为了实现模块的导出，node 中使用的是 module 的类，每一个模块都是 module 的一个实例，所以 node 中导出的其实是 module.exports，exports 只是辅助
- module.exports = exports = {}同一块内存
- cjs 加载模块是同步的，加载完毕才能运行
- 所以浏览器使用 AMD，后来是 ESM
- 另一方面 webpack 可以将 cjs esm 转换成 umd
- node 会缓存 require 引入，不会有重复引入的问题
- cjs 加载的就是 module.exports
- node 中采用 dfs 处理循环引入

### UMD

- 兼容 cjs 和 amd 的模块，既可以在 webpack、node 中被 require 引用，也可以在浏览器中直接用 cdn 引入
- 部分 npm 包会打出 cjs、esm、umd 三种格式，如 antd

### AMD

- 异步模块定义
- 采用异步加载模块
- 早于 cjs，单 cjs 还在使用，amd 已经淘汰了

### CMD

- 普通模块定义
- 异步加载模块
- 吸收了 cjs 的优点，诞生了 seajs
