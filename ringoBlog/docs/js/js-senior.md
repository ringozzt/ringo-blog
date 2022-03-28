# JavaScript 进阶

## 原型链

在 JavaScript 中，每当定义一个函数数据类型(普通函数、类)时候，都会天生自带一个 prototype 属性，这个属性指向函数的原型对象。

当函数经过`new`调用时，这个函数就成为了构造函数，返回一个全新的**实例对象**，这个实例对象有一个`__proto__`属性，指向构造函数的原型对象。

原型链是继承的主要实现方式，通过这种方式继承多个引用类型的属性和方法。

### 描述一下原型链

JavaScript 对象通过`__proto__` 指向父类构造函数的原型对象，父类的原型对象又通过`__proto__`指向他的父类原型对象，就这样直到指向 Object 对象为止，Object 的原型对象的`__proto__`指向 null，这样就形成了一个原型指向的链条, 即原型链。

<center class="half"><img src="https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/jsobj_full.jpg" alt="moliy_prototype_chain" style="zoom:30%;" /><img src="https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/Blog/js-relation.png" style="zoom:60%;" /></center>

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

// 测试
var stu = new Student('why', 18, ['kobe'], 111, 100);
console.log(stu);
stu.studying();
stu.running();
stu.eating();
```

---

## 闭包

我理解的闭包，就是**能够访问**除了本身作用域以外的**其他作用域**的**函数**。

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

## 深、浅拷贝

[我的理解](https://ringozzt.github.io/ringo-blog/js/deep.html)

## 深、浅比较

[我的理解](https://ringozzt.github.io/ringo-blog/js/deep.html)

---

### 参考文章

1. [闭包分析](https://juejin.cn/post/6937469222251560990)
2. [js 灵魂之问(上)](https://juejin.cn/post/6844903974378668039)
3. [js 灵魂之问(下)](https://juejin.cn/post/6844904004007247880)
4. [非常全面](https://juejin.cn/post/7016593221815910408)
