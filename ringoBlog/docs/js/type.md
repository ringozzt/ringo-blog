# JS 之类型判断

## typeof

### 不要使用`typeof`来判断`null`

- 这是一个 JavaScript 诞生之初就存在的 bug
- js 底层存储变量时，会在变量的机器码的低位 1-3 位存储类型信息
  - 000：对象
  - 010：浮点数
  - 100：字符串
  - 110：布尔
  - 1：整数
  - 所有机器码全 0：null
  - -2^30：undefined

### 所以，typeof 在判断 null 的时候，会误判成 object

```JavaScript
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof null // 'object'
typeof [] // 'object'
typeof {} // 'object'
typeof console // 'object'
typeof console.log // 'function'

// new 创建的字符串，会被当做Object
let s = new String('abc');
typeof s === 'object'// true
s instanceof String // true
```

另外，typeof 一个 new 出来的变量，实际上返回的是构造函数的一个实例对象。

## instanceof

### 判断一个实例是否属于某构造函数

```javascript
let arr = [];
console.log(arr instanceof Array); // true
```

`instanceof` 主要的实现原理就是只要右边变量的 `prototype` 在左边变量的原型链上即可。因此，`instanceof` 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 `prototype`，如果查找失败，则会返回 false，告诉我们左边变量并非是右边变量的实例。

**缺点：** instanceof 底层原理是检测构造函数的 prototype 属性是否出现在某个实例的原型链上，如果实例的原型链发生变化，则无法做出正确判断。

```javascript
let arr = [];
arr.__proto__ = function () {};
console.log(arr instanceof Array); // false
```

<img src="https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/jsobj_full.jpg" alt="原型链神图" style="zoom:40%;" />

## Object.prototype.toString.call()

Object 的原型对象上有一个 toString 方法，toString 方法默认被所有对象继承，返回 "`[object type]`" 字符串。但此方法经常被原型链上的同名方法覆盖，需要通过 Object.prototype.toString.call() 强行调用。

```javascript
let arr = [];
console.log(Object.prototype.toString.call(arr) === '[object Array]'); // true
```

这个类型就像胎记，一出生就刻在了身上，因此修改原型链不会对它造成任何影响。

```javascript
let arr = [];
arr.__proto__ = function () {};
console.log(Object.prototype.toString.call(arr) === '[object Array]'); // true
```

### 所以，使用 Object.prototype.toString.call()能够**最准确地判断变量类型**。

开发中大家可以结合实际需求选择合适的判断方法。
