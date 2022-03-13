# ES6

### let/const

- var 声明的变量是会进行作用域提升的，但是 let 声明的变量在声明之前访问会报错。实际上，变量在执行上下文被创建出来时就已经存在了，只是不能被访问
- 作用域提升：变量在声明之前可以被访问
- let、const 没有作用域提升，但是在解析阶段会被创建出来
- 在全局通过 var 声明一个变量，实际上会在 window 上添加一个属性，但是 let、const 是做不到的
- ES5 中只有两个作用域：全局作用域和函数作用域，ES6 新增了块级作用域，通过 var、const、function、class 声明的标识符都是具备块级作用域限制的。特殊的是，函数的块级作用域，存在变量提升
- 暂时性死区：使用 let、const 定义的变量，在声明之前，变量都是不可以访问的

### 模板字符串

- 动态拼接标识符
- 特殊用法：标签模板字符串，styled-components

### 函数默认值，解构赋值

### 字面量增强

- 对象中的属性名和属性值相同，可以简写
- 对象内方法名的简写，省略 function
- 计算属性名，可以在属性名[ ]中使用运算符

### Class

- 使用 extends 实现继承
- 在子类中使用 this 或返回默认对象前，需通过 super 调用父类构造函数。可以用在：子类的构造函数、实例方法、静态方法
- Class 关键字声明的类经过 Babel 转换为 ES5 的代码（为了保证 Class 可枚举）后会产生副作用。

### 箭头函数

- 相较于普通函数，箭头函数是没有 prototype 的，不能作为构造函数，不能使用 new 来创造对象
- 箭头函数的 this 在定义时继承自外层的第一个普通函数(外层没有函数就是 window)，确定了就不会改变(call,apply,bind 失效)
- 内部没有 arguments 对象，会访问外层第一个普通函数的参数。如果要获取不定数量的参数，可以使用 rest 运算符

```javascript
const a = (first, ...abc) => {
  console.log(first, abc); // 1 [2, 3, 4]
};
a(1, 2, 3, 4);
```

- rest 参数注意点：

  - rest 可以帮我们转换数组

    ```javascript
    arguments.push(0); // arguments.push is not a function
    arguments = [...arguments];
    //或者
    arguments = Array.from(arguments);
    ```

  - 函数的 length 属性，不包括 rest 参数

    ```javascript
    (function (...a) {}.length(
      // 0
      function (a, ...b) {}
    ).length); // 1
    ```

  - rest 必须是函数最后一位参数

    ```javascript
    let a = (first, ...rest, three) => {
      console.log(first, rest,three); // 报错：Rest parameter must be last formal parameter
    };
    a(1, 2, 3, 4);
    ```

- 箭头函数不支持 new.target，普通函数可以通过他返回该函数的引用

- 箭头函数一行返回对象字面量，需要返回`=> ({ key: value })`

- 函数体只有一行且不需要返回值，可以用 void

  ```
  const fun = () => void doesNotReturn();
  ```

- 不支持函数参数重名

  ```javascript
  function func1(a, a) {
    console.log(a, arguments); // 2 [1,2]
  }

  const func2 = (a, a) => {
    console.log(a); // 报错：在此上下文中不允许重复参数名称
  };
  func1(1, 2);
  func2(1, 2);
  ```

- 箭头函数的解析顺序优先

  ```javascript
  let a = false || function() {}; // ok
  let b = false || () => {}; // Malformed arrow function parameter list
  let c = false || (() => {}); // ok
  ```

### 严格模式

- 严格模式必须在全局/函数的开头声明才生效
- 全局作用域下的箭头函数，严格和非严格模式 this 都指向 window
- 非严格：默认绑定的 this 指向全局对象，严格：this 指向 undefined

### 展开运算符

- 一种浅拷贝

### Symbol

- 新增的第七种数据类型
- 可以用在对象中表示唯一属性名
- 可以通过 Symbol.for 创建相同的 Symbol
- 通过 Symbol.keyFor 可以获取对应的 key

### Set

- 类似数组，内置迭代器，元素不能重复，常用于数组去重

- 支持 for of 遍历

### WeakSet

- 只能存放对象类型，不能存放基本数据类型，不能遍历、for of
- 其中的对象无法获取，对元素保持弱引用，便于 GC
- 场景：可以用在构造函数中，如果直接通过字面量创建，而不是通过 new 创建出来的对象，无法调用对象方法

### Map

- 和 Object 只能使用字符串或者 Symbol 作属性名不同，map 中属性名可以是任何类型
- 可以通过 for of 遍历

### weakmap

- 不能遍历、for of
- 只能使用对象作 key，不能使用基本数据类型
- 场景：响应式原理

### Proxy

- 创建一个代理对象，用于监听一个对象的相关操作
- 13 个捕获器，方法类似于对象
  [掌握 Proxy](https://juejin.cn/post/6844904012790120462)
  [vue2->vue3,defineProperty->Proxy](https://juejin.cn/post/6844903601416978439)

### Reflect

- 用于操作对象，类似于继承了 Object 中操作对象的方法
- Object 作为一个构造函数，不应该直接操作他，reflect 是为了规范对对象本身的操作
- 13 个方法
  [掌握 reflect](https://juejin.cn/post/6997212505579716644)

### Promise

### Generator
