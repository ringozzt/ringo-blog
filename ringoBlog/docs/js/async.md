# 异步方案

# 迭代器和生成器

## 迭代器（Iterator）

### 什么是迭代器？

- 迭代器是帮助我们**对某个数据结构进行遍历的对象**，迭代器是一个**对象**。

- 这个对象需要符合**迭代器协议**（Iterator Protocol）

  - 迭代器协议定义了**产生一系列值（无论是有限个还是无限个）** 的标准方法。
  - 在 js 中这个标准就是一个**特定的 next 方法**。

- next 方法有以下要求：

  - 一个**无参数**或者**一个参数**的函数，返回一个**应当拥有以下两个属性的对象**：
  - **done**（boolean 类型）：
    - 如果迭代器**可以产生序列中的下一个值**，则**为 false**（等价于没有指定 done 的这个属性）。
    - 如果迭代器已将序列**迭代完毕**，则**为 true**。这种情况下，**value 是可选的**，如果 value 依然存在，即为迭代结束之后的**默认返回值**。
  - **value**：迭代器返回的任何**JavaScript 代码**，**done 为 true 时可以省略**。

### 迭代器实现

```javascript
function createIterator(arr) {
  const length = arr.length;
  let index = 0;

  return {
    next() {
      return { done: index >= length, value: arr[index++] };
    },
  };
}
const arr = ['aaa', 'bbb', 'ccc'];

// 这里得到的iterator就是一个迭代器，因为createIterator函数返回的对象满足迭代器协议。
const iterator = createIterator(arr);
console.log(iterator.next()); // { done: false, value: 'aaa' }
console.log(iterator.next()); // { done: false, value: 'bbb' }
console.log(iterator.next()); // { done: false, value: 'ccc' }
console.log(iterator.next()); // { done: true, value: undefined }
```

### 什么是**可迭代对象**？

- 当一个对象**实现了可迭代协议（iterable protocol）** 时，它就是一个**可迭代对象**。
- 这个对象要求是**必须实现@@iterator 方法**，在代码中使用**Symbol.iterator**访问该属性。
- **String，Array，Map，Set，arguments 对象，NodeList 集合**等都是**可迭代对象**。可以通过**调用 Symbol.iterator 生成一个迭代器对象**。

### 可迭代对象的应用

- **JavaScript 语法中**：for..of，展开语法（spread syntax），yield，解构赋值。
- **创建对象时**：new Set(iterable), new Map(iterable), new WeakMap(iterable), new WeakSet(iterable)等等。
- **一些方法的调用**：Promise.all(itrable), Promise.race(iterable), Array.from(iterable)等等。

### 可迭代对象

```javascript
const obj = {
  val: ['aaa', 'bbb', 'ccc'],
  [Symbol.iterator]() {
    let index = 0;
    return {
      // 这里的next用到箭头函数，是为了能够让this指向obj这个对象。
      next: () => {
        return {
          done: this.val.length <= index,
          value: this.val[index++],
        };
      },
    };
  },
};

for (const i of obj) {
  console.log(i); // 打印结果分别是 aaa, bbb, ccc
}
```

### 迭代器中断

- 迭代器在某些情况下会在**没有完全迭代的情况下中断**：
  - 比如遍历过程中通过**break，continue，return，throw**中断的循环操作。
  - 比如在解构的时候，没有解构所有的值。
- 如果**想要监听中断的话，可以添加 return 方法**。return 方法需要**返回一个对象，如果没有返回一个对象会报错**。

```javascript
const obj = {
  val: ['aaa', 'bbb', 'ccc'],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        return {
          done: this.val.length <= index,
          value: this.val[index++],
        };
      },
      return: () => {
        // 当迭代器中断时，会来到该函数
        // 必须返回一个对象
        console.log('迭代器提前终止了');
        return { done: true };
      },
    };
  },
};
```

## Generator

协程在 JavaScript 中的实现 ———— Generator 函数

### 什么是生成器？

- 生成器是 ES6 新增的一种函数控制，使用的方案。它可以让我们更加灵活的**控制函数什么时候继续执行，暂停执行等**。

- 生成器函数也是一个函数，但是和普通函数有一些区别：

  - 生成器函数需要在 function 的后面加上一个符号 \*
  - 生成器函数可以通过**yield**关键字来控制函数的执行流程。
  - 生成器函数的返回值是一个**Generator（生成器）**。**生成器实际上是一种特殊的迭代器**。

### 生成器函数代码

```JavaScript
function* foo() {   // 这里函数定义是有 * 的
    console.log(1)
    yield 1   // 这里yield后面的值会被作为返回的迭代器对象的value值
    console.log(2)
    yield 2
    console.log(3)
}

const generator = foo()  // generator就是一个生成器
// 执行到第一个yield并且暂停
console.log(generator.next()) // 1 { value: 1, done: false }
// 执行到第二个yield并且暂停
console.log(generator.next()) // 2 { value: 2, done: false }
// 执行剩余代码
console.log(generator.next()) // 3 { value: undefined, done: true }
```

- 在执行 foo 函数时，会发现**函数体根本没有执行**，它只是返回了一个**生成器对象**。
- 如果**想要执行函数体里面的代码，调用 next 即可**。
- 如果不希望 next 返回的迭代器对象的 value 的值为 undefined，可以通过**yield 来返回结果**。

### 生成器函数传递参数-next()

- 既然生成器可以暂停来分段执行，我们可以给**每个分段来传递参数**。
- 我们在调用 next 函数时，可以**给 next 函数传递参数**，那么这个参数**会作为上一个 yield 语句的返回值**。
- 一般情况下，**不会给第一个 next 传递参数**，因为第一个 next 前面没有 yield

```javascript
function* bar() {
  const num1 = yield 'a';
  const num2 = yield num1;
  const num3 = yield num2;
}

const generator = bar();
console.log(generator.next()); // { value: 'a', done: false }
console.log(generator.next('b')); // { value: 'b', done: false }
console.log(generator.next('c')); // { value: 'c', done: false }
console.log(generator.next()); // { value: undefined, done: true }
```

### 提前结束生成器函数-return 函数

- return 函数**也可以给生成器函数传递参数**。不过执行 return 函数后，生成器函数就会**结束**，之后调用 next 也**不会继续生成值了**。当调用 return 时，value 为**return 传入的参数**。

```javascript
function* bar() {
  const val1 = yield 'a';
  console.log('val1', val1); // 这里是不会被执行的，因为调用了return函数
}
const generator = bar();
console.log(generator.next()); // { value: 'a', done: false }
console.log(generator.return(1)); // { value: 1, done: true }
console.log(generator.next()); // { value: undefined, done: true }
```

### 生成器抛出异常-throw 函数

- 除了可以给生成器函数内部传递参数之外，也可以该**生成器行内部抛出异常**。
- 抛出异常后，可以**在生成器函数中捕获异常**。

```javascript
function* bar() {
  console.log('start');

  try {
    yield 1;
  } catch (err) {
    console.log('生成器函数内部捕获异常', err); // 这里会捕获到 'err message'
    yield 'catch内部使用yield';
  }
  yield 'catch外部使用yield';
}

const generator = bar();
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.throw('err message')); // { value: 'catch内部使用yield', done: false }
console.log(generator.next()); // { value: 'catch外部使用yield', done: false }
```

### 生成器替代迭代器

- 生成器是一种特殊的迭代器，在某些情况下可以使用生成器**替代迭代器**。

```javascript
// 实现让对象能够使用for...of遍历
function* generator() {
  const keys = Object.keys(this);

  for (let i = 0; i < keys.length; i++) {
    yield this[keys[i]];
  }
}

const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  [Symbol.iterator]: generator,
};

for (const item of obj) {
  console.log(item); // 1， 2， 3， 4
}
```

---

## await async

### 异步编程终极方案，用同步的方式，执行异步操作。

在 async 函数中，await 规定了异步操作只能一个一个排队执行，从而达到用同步的方式，执行异步操作的效果。

**await 只能在 async 中使用，否则会报错**！

await 后如果跟随的不是 Promise，可能会造成同步触发的效果。

```javascript
function request(num) {
  // 去掉Promise
  setTimeout(() => {
    console.log(num * 2);
  }, 1000);
}

async function fn() {
  await request(1); // 2
  await request(2); // 4
  // 1秒后执行完  同时输出
}
fn();
```

总结：

- await 只能在 async 函数中使用，不然会报错
- async 后面会跟上一个表达式，这个表达式会返回一个 Promise
- await 会等到 Promise 状态变成 fulfilled，才继续执行异步函数
- 如果 await 后面是一个普通的值，会直接返回
- 如果 async 抛出了异常，程序不会报错，而是作为 Promise 的 reject 来传递

## generator 实现 async

```javascript
function generatorToAsync(generatorFn) {
  return function () {
    const gen = generatorFn.apply(this, arguments); // gen有可能传参

    // 返回一个Promise
    return new Promise((resolve, reject) => {
      function go(key, arg) {
        let res;
        try {
          res = gen[key](arg); // 这里有可能会执行返回reject状态的Promise
        } catch (error) {
          return reject(error); // 报错的话会走catch，直接reject
        }

        // 解构获得value和done
        const { value, done } = res;
        if (done) {
          // 如果done为true，说明走完了，进行resolve(value)
          return resolve(value);
        } else {
          // 如果done为false，说明没走完，还得继续走

          // value有可能是：常量，Promise，Promise有可能是成功或者失败
          return Promise.resolve(value).then(
            (val) => go('next', val),
            (err) => go('throw', err)
          );
        }
      }

      go('next'); // 第一次执行
    });
  };
}

const asyncFn = generatorToAsync(gen);

asyncFn().then((res) => console.log(res));
```

## 测试对比一下：

### async/await 版本

```javascript
async function asyncFn() {
  const num1 = await fn(1);
  console.log(num1); // 2
  const num2 = await fn(num1);
  console.log(num2); // 4
  const num3 = await fn(num2);
  console.log(num3); // 8
  return num3;
}
const asyncRes = asyncFn();
console.log(asyncRes); // Promise
asyncRes.then((res) => console.log(res)); // 8
```

### 自执行 generator

```JavaScript
function* gen() {
  const num1 = yield fn(1)
  console.log(num1) // 2
  const num2 = yield fn(num1)
  console.log(num2) // 4
  const num3 = yield fn(num2)
  console.log(num3) // 8
  return num3
}

const genToAsync = generatorToAsync(gen)
const asyncRes = genToAsync()
console.log(asyncRes) // Promise
asyncRes.then(res => console.log(res)) // 8
```

##### 参考文章：

- [深入理解 async](https://juejin.cn/post/7007031572238958629)
