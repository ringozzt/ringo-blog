# JavaScript 进阶

## 闭包

我理解的闭包，实际上就是**能够访问**除了本身作用域以外的**其他作用域**的**函数**。

两大作用：

- 保存，只要当前上下文不被释放，则存储的这些私有变量也不会被释放
- 保护，在当前作用域中，维护了一个私有变量，且这个变量不会再改变

就像我旅游，身上背了一个包，里面有瓶水我喝完就丢掉了，但是门票我得一直拿着，因为后续还要用。

### JS 堆栈内存释放

- 堆内存：存储引用类型值，对象类型就是键值对，函数就是代码字符串。
- 堆内存释放：将引用类型的空间地址变量赋值成 `null`，或没有变量占用堆内存了浏览器就会释放掉这个地址
- 栈内存：提供代码执行的环境和存储基本类型值。
- 栈内存释放：一般当函数执行完后函数的私有作用域就会被释放掉。

> **但栈内存的释放也有特殊情况：**
>
> **① 函数执行完，但是函数的私有作用域内有内容被栈外的变量还在使用的，栈内存就不能释放里面的基本值也就不会被释放。**
>
> **② 全局下的栈内存只有页面被关闭的时候才会被释放**

### 产生闭包的场景

1. **返回函数**的函数

2. 将**函数**作为参数传进另一个函数

3. 在任何**异步事件**中(宏任务、微任务)，只要使用了回调，实际上使用的就是闭包。

   原因：异步事件在**出栈时**只能去上层作用域查找变量。

4. 自执行函数，保存了`全局作用域window`和`当前函数的作用域`

   ```js
   var a = 2;
   (function IIFE() {
     // 输出2
     console.log(a);
   })();
   ```

5. 比较常见的闭包实现有：防抖、节流、柯里化

### 如何解决下面的循环输出问题？

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, 0);
}
```

为什么会全部输出 6？如何改进，让它输出 1，2，3，4，5？(方法越多越好)

解决方法：

1、利用 IIFE(立即执行函数表达式)当每次 for 循环时，把此时的 i 变量传递到定时器中

```js
for (var i = 1; i <= 5; i++) {
  (function (j) {
    setTimeout(function timer() {
      console.log(j);
    }, 0);
  })(i);
}
```

2、给定时器传入第三个参数, 作为 timer 函数的第一个函数参数

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function timer(j) {
      console.log(j);
    },
    0,
    i
  );
}
```

3、使用 ES6 中的 let

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, 0);
}
```

let 使 JS 发生革命性的变化，让 JS 有函数作用域变为了块级作用域，用 let 后作用域链不复存在。代码的作用域以块级为单位，以上面代码为例:

```
// i = 1
{
  setTimeout(function timer(){
    console.log(1)
  },0)
}
// i = 2
{
  setTimeout(function timer(){
    console.log(2)
  },0)
}
// i = 3
...
```

因此能输出正确的结果。

#### 怎么检查内存泄露

- performance 面板 和 memory 面板可以找到泄露的现象和位置
- [监控内存泄漏](https://juejin.cn/post/6844904048961781774)

---

## 原型链

在 JavaScript 中，每当定义一个函数数据类型(普通函数、类)时候，都会天生自带一个 prototype 属性，这个属性指向函数的原型对象。

当函数经过`new`调用时，这个函数就成为了构造函数，返回一个全新的**实例对象**，这个实例对象有一个`__proto__`属性，指向构造函数的原型对象。

### 描述一下原型链

JavaScript 对象通过`__proto__` 指向父类构造函数的原型对象，父类的原型对象又通过`__proto__`指向他的父类原型对象，就这样直到指向 Object 对象为止，Object 的原型对象的`__proto__`指向 null，这样就形成了一个原型指向的链条, 即原型链。

<center class="half"><img src="https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/jsobj_full.jpg" alt="moliy_prototype_chain" style="zoom:25%;" /><img src="https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/Blog/js-relation.png" style="zoom:50%;" /></center>

### JS 面向对象之寄生组合式继承

```js
function inheritPrototype(SubType, SuperType) {
  SubType.prototype = Objec.create(SuperType.prototype);
  Object.defineProperty(SubType.prototype, 'constructor', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: SubType,
  });
}

function Person(name, age, friends) {
  this.name = name;
  this.age = age;
  this.friends = friends;
}

Person.prototype.running = function () {
  console.log('running~');
};

Person.prototype.eating = function () {
  console.log('eating~');
};

function Student(name, age, friends, sno, score) {
  Person.call(this, name, age, friends);
  this.sno = sno;
  this.score = score;
}

inheritPrototype(Student, Person);

Student.prototype.studying = function () {
  console.log('studying~');
};

// 测试一下
var stu = new Student('why', 18, ['kobe'], 111, 100);
console.log(stu);
stu.studying();
stu.running();
stu.eating();
```

---

## 赋值和深/浅拷贝的区别

这三者的区别如下，不过比较的前提都是**针对引用类型**：

- 当我们把一个对象赋值给一个新的变量时，**赋的其实是该对象的在栈中的地址，而不是堆中的数据**。也就是两个对象指向的是同一个存储空间，无论哪个对象发生改变，其实都是改变的存储空间的内容，因此，两个对象是联动的。
- 浅拷贝：**重新在堆中创建内存**，拷贝前后对象的基本数据类型互不影响，但拷贝前后对象的引用类型因共享同一块内存，会相互影响。
- 深拷贝：**重新在堆中创建内存**，将对象中的子对象进行递归拷贝，拷贝前后的两个对象互不影响。

## js 中的浅拷贝

- 堆内存中开辟一块区域，基本类型值拷贝，**引用数据类型**拷贝值引用。

- **浅拷贝的限制是只能拷贝一层对象，对嵌套的对象依然拷贝的是引用地址**

### 什么是拷贝

```js
let arr = [1, 2, 3];
let newArr = arr;
newArr[0] = 100;

console.log(arr); //[100, 2, 3]
```

```js
let arr = [1, 2, 3];
let newArr = arr.slice();
newArr[0] = 100;

console.log(arr); //[1, 2, 3]
```

当修改 newArr 的时候，arr 的值并不改变。什么原因?因为这里 newArr 是 arr 浅拷贝后的结果，newArr 和 arr 现在引用的已经不是同一块空间啦！

这就是浅拷贝！

但是这又会带来一个潜在的问题:

```js
let arr = [1, 2, { val: 4 }];
let newArr = arr.slice();
newArr[2].val = 1000;

console.log(arr); //[ 1, 2, { val: 1000 } ]
```

由于对象的浅拷贝保存的是引用地址，所以会出现这种奇怪现象。

### 浅拷贝的几种方法

1. 遍历原数组，手动赋值给新数组

2. Object.assign()

   > ```javascript
   > Object.assign((target = {}), ...sources);
   > ```

   其中 `target` 是目标对象，`sources` 是源对象，可以有多个，返回修改后的目标对象 `target`。

3. concat()，参数为空，返回值就是直接浅拷贝一份

4. slice()，参数为空，返回值就是直接浅拷贝一份

5. ...展开运算符

   ```js
   let arr = [1, 2, 3];
   let newArr = [...arr]; //跟arr.slice()是一样的效果
   ```

## 深拷贝

基于浅拷贝的对象地址引用，深拷贝可以解决这些问题。

### 简易版

```js
JSON.parse(JSON.stringify());
```

估计这个 api 能覆盖大多数的应用场景，没错，谈到深拷贝，我第一个想到的也是它。但是实际上，对于某些严格的场景来说，这个方法是有巨大的坑的。问题如下：

> 1. 无法解决`循环引用`的问题。举个例子：

```js
const a = { val: 2 };
a.target = a;
```

拷贝 a 会出现系统栈溢出，因为出现了`无限递归`的情况。

> 2. 无法拷贝一写`特殊的对象`，诸如 RegExp, Date, Set, Map 等。

> 3. 无法拷贝`函数`(划重点)。

> 4. 会抛弃对象的 constructor,所有的构造函数会指向 Object

所以这种解决方式不太完美。

### 完善版

一般开发中会使用 lodash 的 cloneDeep。接下来贴一哈我的手写方式：

```js
function isObject(value) {
  const valueType = typeof value;
  return value !== null && (valueType === 'object' || valueType === 'function');
}

function deepClone(originValue, map = new WeakMap()) {
  // 判断是否是一个Set类型
  if (originValue instanceof Set) {
    return new Set([...originValue]);
  }

  // 判断是否是一个Map类型
  if (originValue instanceof Map) {
    return new Map([...originValue]);
  }

  // 判断如果是Symbol的value, 那么创建一个新的Symbol
  if (typeof originValue === 'symbol') {
    return Symbol(originValue.description);
  }

  // 判断如果是函数类型, 那么直接使用同一个函数
  if (typeof originValue === 'function') {
    return originValue;
  }

  // 判断传入的originValue是否是一个对象类型
  if (!isObject(originValue)) {
    return originValue;
  }
  if (map.has(originValue)) {
    return map.get(originValue);
  }

  // 判断传入的对象是数组, 还是对象
  const newObject = Array.isArray(originValue) ? [] : {};
  map.set(originValue, newObject);
  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key], map);
  }

  // 对Symbol的key进行特殊的处理
  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  for (const sKey of symbolKeys) {
    // const newSKey = Symbol(sKey.description)
    newObject[sKey] = deepClone(originValue[sKey], map);
  }

  return newObject;
}

// deepClone({name: "why"})

// 测试代码
let s1 = Symbol('aaa');
let s2 = Symbol('bbb');

const obj = {
  name: 'why',
  age: 18,
  friend: {
    name: 'james',
    address: {
      city: '广州',
    },
  },
  // 数组类型
  hobbies: ['abc', 'cba', 'nba'],
  // 函数类型
  foo: function (m, n) {
    console.log('foo function');
    console.log('100代码逻辑');
    return 123;
  },
  // Symbol作为key和value
  [s1]: 'abc',
  s2: s2,
  // Set/Map
  set: new Set(['aaa', 'bbb', 'ccc']),
  map: new Map([
    ['aaa', 'abc'],
    ['bbb', 'cba'],
  ]),
};

// 测试一下

obj.info = obj;

const newObj = deepClone(obj);
console.log(newObj === obj);

obj.friend.name = 'kobe';
obj.friend.address.city = '成都';
console.log(newObj);
console.log(newObj.s2 === obj.s2);

console.log(newObj.info.info.info);
```

### 参考文章

1. [闭包分析](https://juejin.cn/post/6937469222251560990)
2. [js 灵魂之问(上)](https://juejin.cn/post/6844903974378668039)
3. [js 灵魂之问(下)](https://juejin.cn/post/6844904004007247880)
4. [非常全面](https://juejin.cn/post/7016593221815910408)
