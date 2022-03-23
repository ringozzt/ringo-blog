# babel polyfill

babel 的编译不会做 polyfill。那么 polyfill 是指什么呢?

```js
const foo = (a, b) => {
  return Object.assign(a, b);
};
```

当我们写出上面这样的代码，交给 babel 编译时，我们得到了：

```js
'use strict';

var foo = function foo(a, b) {
  return Object.assign(a, b);
};
```

arrow function 被编译成了普通的函数，但仔细一看 `Object.assign` 还牢牢的站在那里，而它作为 es2015 的新方法，并不能运行在相当多的浏览器上。为什么不把 Object.assign 编译成 `(Object.assign||function() { /*...*/})` 这样的替代方法呢？好问题！编译为了保证正确的语义，只能转换语法而不是去增加或修改原有的属性和方法。所以 babel 不处理 Object.assign 反倒是最正确的做法。而处理这些方法的方案则被称为 polyfill。

[前端 Polyfill 方案](https://juejin.cn/post/6844903486857936909)
