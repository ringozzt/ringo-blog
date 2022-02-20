# 模块化原理

###### ESModule

- 使用import export关键字
- 采用编译阶段的静态分析
  - 一个模块要暴露或引入的方法编译阶段就确定了
  - 有利于webpack分析模块依赖，没用的方法从bundle中剔除，既可以减少bundle的文件大小，又可以提高脚本的执行速度。tree-shaking
- 自动采用严格模式

###### commonJs

- Node遵循cjs规范实现了模块化
- 导出 exports module.exports 导入 require
- exports是一个对象，可以在这个对象中添加属性
- cjs中没有module.exports这个概念，但是为了实现模块的导出，node中使用的是module的类，每一个模块都是module的一个实例，所以node中导出的其实是module.exports，exports只是辅助
- module.exports = exports = {}同一块内存
- cjs加载模块是同步的，加载完毕才能运行
- 所以浏览器使用AMD，后来是ESM
- 另一方面webpack可以将cjs esm转换成umd
- node会缓存require引入，不会有重复引入的问题
- cjs加载的就是module.exports
- node中采用dfs处理循环引入
###### UMD

- 兼容cjs和amd的模块，既可以在webpack、node中被require引用，也可以在浏览器中直接用cdn引入
- 部分npm包会打出cjs、esm、umd三种格式，如antd
###### AMD

- 异步模块定义
- 采用异步加载模块
- 早于cjs，单cjs还在使用，amd已经淘汰了

###### CMD

- 普通模块定义
- 异步加载模块
- 吸收了cjs的优点，诞生了seajs

