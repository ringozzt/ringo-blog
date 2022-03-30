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

### 实现

```js
// 1.用来验证 变量R的原型 是否存在于 变量L的原型链上
// 2.判断 L 是不是 R 的实例对象
function instance_of(L, R) {
  // 验证如果为基本数据类型，就直接返回 false
  const baseType = ['string', 'number', 'boolean', 'undefined', 'symbol'];
  if (baseType.includes(typeof L)) {
    return false;
  }

  let RP = R.prototype; // 取 R 的显示原型
  L = L.__proto__; // 取 L 的隐式原型
  while (true) {
    if (L === null) {
      // 找到最顶层
      return false;
    }
    if (L === RP) {
      // 严格相等
      return true;
    }
    L = L.__proto__; // 没找到继续向上一层原型链查找
  }
}

function Foo(name) {
  this.name = name;
}

var f = new Foo('nick');

console.log(f instanceof Foo); // true
console.log(f instanceof Object); // true
console.log(instance_of(f, Foo));
console.log(instance_of(f, Object));
```

**缺点：** instanceof 底层原理是检测构造函数的 prototype 属性是否出现在某个实例的原型链上，如果实例的原型链发生变化，则无法做出正确判断。

```javascript
let arr = [];
arr.__proto__ = function () {};
console.log(arr instanceof Array); // false
```

<img src="https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/jsobj_full.jpg" alt="原型链神图" style="zoom:40%;" />

## constructor

实例的构造函数属性 constructor 指向构造函数本身。

```js
let arr = [];
console.log(arr.constructor === Array); // true
```

**缺点：** 如果 arr 的 constructor 被修改，则无法做出正确判断。

```js
let arr = [];
arr.constructor = function () {};
console.log(arr.constructor === Array); // false
```

## ** proto **

实例的 ** proto ** 指向构造函数的原型对象

```js
let arr = [];
console.log(arr.__proto__ === Array.prototype); // true
```

**缺点：** 如果实例的原型链的被修改，则无法做出正确判断。

```js
let arr = [];
arr.__proto__ = function () {};
console.log(arr.__proto__ === Array.prototype); // false
```

## Object.getPrototypeOf()

Object 自带的方法，获取某个对象所属的原型对象

```js
let arr = [];
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
```

**缺点：** 如果实例的原型链的被修改，则无法做出正确判断。

```js
let arr = [];
arr.__proto__ = function () {};
console.log(Object.getPrototypeOf(arr) === Array.prototype); // false
```

## Array.prototype.isPrototypeOf()

Array 原型对象的方法，判断其是不是某个对象的原型对象

```js
let arr = [];
console.log(Array.prototype.isPrototypeOf(arr)); // true
```

**缺点：** 如果实例的原型链的被修改，则无法做出正确判断。

```js
let arr = [];
arr.__proto__ = function () {};
console.log(Array.prototype.isPrototypeOf(arr)); // false
```

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

### 核心: 原型链的向上查找

所以，使用 Object.prototype.toString.call()能够**最准确地判断变量类型**。

## Array.isArray()

Array.isArray() 是 ES6 新增的方法，专门用于数组类型判断，原理同上。

```js
let arr = [];
console.log(Array.isArray(arr)); // true
```

修改原型链不会对它造成任何影响。

```js
let arr = [];
arr.__proto__ = function () {};
console.log(Array.isArray(arr)); // true
```

## 使用 == 自动进行类型转换

1. 查看是否是 `undefined` 和 `null` 比较

- ✅ 返回 `true`
- ⬇️ 如果不是继续下一条规则

2. 是否正在比较 `string` 和 `number`

- ✅ 如果是，那么将 `string` 转为 `number` 并回到最初重新比较 ♻️
- ⬇️ 如果不是继续下一条规则

3. 查看我们比较的项中是否有 `boolean`

- ✅ 如果有，那么将 `boolean` 转为 `number` 并回到最初重新比较 ♻️
- ⬇️ 如果不是继续下一条规则

4. 查看是否有一项是 `object`

- ✅ 如果有，那么将 `object` 转为其原始值 `primitive` 并回到最初重新比较 ♻️
- ❌ 如果还不是，只能返回 `false` 了 💩

[图解 == 操作符那些事](https://juejin.cn/post/6844903793893572622)

### 以下比较结果都是 true

```js
// 不要用if(!array)判断空数组，建议使用if(array.length === 0)
[] == false;

!![] == true;

undefined == false;

null == undefined;

NaN == false;

'' == false;

0 == false;

1 == true;

!null == true;

// 但是注意 null 本身和 true/false 作比较，结果都是false
null == true; // false
null == false; // true
```

## isNaN

[NaN 的前世今生](https://juejin.cn/post/6844903507368083469)

---

开发中大家可以结合实际需求选择合适的判断方法。
