# Promise

Promise 的本质是一个有限状态机。

对于 Promise 而言，状态的改变`不可逆`，由 pending 变为其他的状态后，就无法再改变了。

## Promise 怎么解决回调地狱

### 什么是回调地狱

1. 多层嵌套的问题。
2. 每种任务的处理结果存在两种可能性（成功或失败），那么需要在每种任务执行结束后分别处理这两种可能性。

这两种问题在回调函数时代尤为突出。Promise 的诞生就是为了解决这两个问题。

### 解决方法

Promise 利用了三大技术手段来解决`回调地狱`:

#### **回调函数延迟绑定**

回调函数不是直接声明的，而是在通过后面的 then 方法传入的，即延迟传入。这就是`回调函数延迟绑定`。

#### **返回值穿透**

then 中回调函数的传入值创建不同类型的 Promise, 然后把返回的 Promise 穿透到外层, 以供后续的调用。

我们只需要用一个变量接收 Promise 的返回值，后续可以继续链式调用 then。这便是`返回值穿透`的效果。

#### **错误冒泡**

多层嵌套的问题会带来另一个问题——每次任务执行结束后`分别处理成功和失败`的情况怎么解决？

通过 then 传入的回调事件会被`execFunctionWithCatchError()`方法包裹，过程中一产生错误就会返回 reject。

这样 Promise 链前面产生的错误会一直向后传递，被 catch 接收到，就不用频繁地检查错误了。

```js
// 通过then传入的每个回调execFn都要被执行函数execFunctionWithCatchError包裹
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value);
    resolve(result);
  } catch (err) {
    reject(err);
  }
}
```

## 为什么 Promise 要引入微任务

Promise 中的执行函数是同步进行的，但是里面存在着异步操作。

在异步操作结束后会调用 resolve 方法，或者中途遇到错误调用 reject 方法，这两者都是作为**微任务**进入到 EventLoop 中。

回到问题本身，其实就是如何处理回调的问题。总结起来有三种方式:

1. 使用同步回调，直到异步任务进行完，再进行后面的任务。
2. 使用异步回调，将回调函数放在进行`宏任务队列`的队尾。
3. 使用异步回调，将回调函数放到`当前宏任务中`的最后面。

### 优劣对比

第一种方式显然不可取，因为同步的问题非常明显，会让整个脚本阻塞住，当前任务等待，后面的任务都无法得到执行，而这部分`等待的时间`是可以拿来完成其他事情的，导致 CPU 的利用率非常低，而且还有另外一个致命的问题，就是无法实现`延迟绑定`的效果。

如果采用第二种方式，那么执行回调(resolve/reject)的时机应该是在前面`所有的宏任务`完成之后，倘若现在的任务队列非常长，那么回调迟迟得不到执行，造成`应用卡顿`。

为了解决上述方案的问题，另外也考虑到`延迟绑定`的需求，Promise 采取第三种方式, 即`引入微任务`, 即把 resolve(reject) 回调的执行放在当前宏任务的末尾。

简而言之，微任务的诞生就是给紧急任务一个插队的机会。

这样，利用`微任务`解决了两大痛点:

- 采用**异步回调**替代同步回调解决了浪费 CPU 性能的问题。
- 放到**当前宏任务最后**执行，解决了回调执行的实时性问题。

## Promise 如何实现链式调用

每个 then 都返回了新的 Promise，其实是监听了 execFunctionWithCatchError 的执行，也是链式调用的基础。

### then 方法实现

```js
  then(onFulfilled, onRejected) {
    // 未传入 reject 方法，默认抛出错误
    const defaultOnRejected = (err) => {
      throw err;
    };
    onRejected = onRejected || defaultOnRejected;

    // 未传入 resolve 方法，默认返回 resolve 的值
    const defaultOnFulfilled = (value) => {
      return value;
    };
    onFulfilled = onFulfilled || defaultOnFulfilled;

    // 注意：这里返回了新的Promise，其实是监听了execFunctionWithCatchError的执行，也是链式调用的基础
    return new MyPromise((resolve, reject) => {
      // 1.如果在then调用的时候, 状态已经确定下来，那么立即执行
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
      }

      // 2.如果调用时还在异步等待中，那么暂存  成功回调  和  失败的回调  到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        if (onFulfilled)
          this.onFulfilledFns.push(() => {
            execFunctionWithCatchError(
              onFulfilled,
              this.value,
              resolve,
              reject
            );
          });
        if (onRejected)
          this.onRejectedFns.push(() => {
            execFunctionWithCatchError(
              onRejected,
              this.reason,
              resolve,
              reject
            );
          });
      }
    });
  }
```

## 多 Promise 方法

[MDN-Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
[MDN-使用 Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)

### Promise.all

返回一个 Promise 实例，入参数组中的实例都成功时 resolve 结果数组；只要有一个失败，则回调失败

**场景：结果相互依赖，都成功才算成功；任何一个请求 reject 都会失败**

```js
function all(promises) {
  // 问题关键: 什么时候要执行resolve, 什么时候要执行reject
  return new Promise((resolve, reject) => {
    const values = [];
    promises.forEach((promise) => {
      promise.then(
        (res) => {
          values.push(res);
          if (values.length === promises.length) {
            resolve(values);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
}
```

### Promise.allSettled

返回一个数组，入参数组中所有的 Promise 状态都确定后才回调成功，返回数组包含每个实例的结果

**场景：无论成功失败；期望知道每个实例的结果**

```js
function allSettled(promises) {
  return new Promise((resolve) => {
    const results = [];
    promises.forEach((promise) => {
      promise.then(
        (res) => {
          results.push({ status: PROMISE_STATUS_FULFILLED, value: res });
          if (results.length === promises.length) {
            resolve(results);
          }
        },
        (err) => {
          results.push({ status: PROMISE_STATUS_REJECTED, value: err });
          if (results.length === promises.length) {
            resolve(results);
          }
        }
      );
    });
  });
}
```

### Promise.race

返回一个 Promise 实例，入参数组中有一个的 Promise 状态返回直接回调成功，返回该实例的状态

**场景：期望最快得到一个结果，无论成功或失败**

```js
function race(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve, reject);
    });
  });
}
```

### Promise.any

有一个 resolve 就返回 resolve，全部都 rejected 就返回[AggregateError: All promises were rejected]

**场景：期望 最快的、成功的 结果，比如从响应最快的服务器读取资源**

```js
function any(promises) {
  // resolve必须等到有一个成功的结果
  // reject所有的都失败才执行reject
  const reasons = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve, (err) => {
        reasons.push(err);
        if (reasons.length === promises.length) {
          reject(new AggregateError(reasons));
        }
      });
    });
  });
}
```

## 一些特殊情况的处理

[Promise.then()值非函数，导致透传](https://juejin.cn/post/6844904077537574919#heading-24)

[.then()/.catch()不能返回 promise 本身](https://juejin.cn/post/6844904077537574919#heading-23)

[promise 中 return Error](https://juejin.cn/post/6844904077537574919#heading-22)

[.catch()捕获规则](https://juejin.cn/post/6844904077537574919#heading-18)

[.catch()捕获规则 2](https://juejin.cn/post/6844904077537574919#heading-25)

## Promise A+规范实现

```js
// ES6 ES2015
// https://promisesaplus.com/
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

// 执行函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value);
    resolve(result);
  } catch (err) {
    reject(err);
  }
}

class MyPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFns = [];
    this.onRejectedFns = [];

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          this.onFulfilledFns.forEach((fn) => {
            fn(this.value);
          });
        });
      }
    };

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          this.onRejectedFns.forEach((fn) => {
            fn(this.reason);
          });
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    // 未传入 reject 方法，默认抛出错误
    const defaultOnRejected = (err) => {
      throw err;
    };
    onRejected = onRejected || defaultOnRejected;

    // 未传入 resolve 方法，默认返回 resolve 的值
    const defaultOnFulfilled = (value) => {
      return value;
    };
    onFulfilled = onFulfilled || defaultOnFulfilled;

    // 注意：这里返回了新的Promise，其实是监听了execFunctionWithCatchError的执行，也是链式调用的基础
    return new MyPromise((resolve, reject) => {
      // 1.如果在then调用的时候, 状态已经确定下来，那么立即执行
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
      }

      // 2.如果调用时还在异步等待中，那么暂存  成功回调  和  失败的回调  到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        if (onFulfilled)
          this.onFulfilledFns.push(() => {
            execFunctionWithCatchError(
              onFulfilled,
              this.value,
              resolve,
              reject
            );
          });
        if (onRejected)
          this.onRejectedFns.push(() => {
            execFunctionWithCatchError(
              onRejected,
              this.reason,
              resolve,
              reject
            );
          });
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    this.then(
      () => {
        onFinally();
      },
      () => {
        onFinally();
      }
    );
  }

  static resolve(value) {
    // 1. 传参为一个 Promise, 则直接返回它。
    // 2. 传参为一个 thenable 对象，返回的 Promise 会跟随这个对象，采用它的最终状态作为自己的状态。
    // 3. 其他情况，直接返回以该值为成功状态的promise对象。
    if (value instanceof Promise) return value;
    return new MyPromise((resolve, reject) => {
      if (value && value.then && typeof value.then === 'function') {
        // value 状态变为成功调用然后 resolve，将新 Promise 的状态变为成功
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  static all(promises) {
    // 问题关键: 什么时候要执行resolve, 什么时候要执行reject
    return new MyPromise((resolve, reject) => {
      const values = [];
      promises.forEach((promise) => {
          (res) => {
            values.push(res);
            if (values.length === promises.length) {
              resolve(values);
            }
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve) => {
      const results = [];
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            results.push({ status: PROMISE_STATUS_FULFILLED, value: res });
            if (results.length === promises.length) {
              resolve(results);
            }
          },
          (err) => {
            results.push({ status: PROMISE_STATUS_REJECTED, value: err });
            if (results.length === promises.length) {
              resolve(results);
            }
          }
        );
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        // promise.then(res => {
        //   resolve(res)
        // }, err => {
        //   reject(err)
        // })
        // 因为只是调用传入的方法，简化可得：
        promise.then(resolve, reject);
      });
    });
  }

  static any(promises) {
    // resolve必须等到有一个成功的结果
    // reject所有的都失败才执行reject
    const reasons = [];
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, (err) => {
          reasons.push(err);
          if (reasons.length === promises.length) {
            reject(new AggregateError(reasons));
          }
        });
      });
    });
  }

  // end
}
```

## 参考文章：

1. [45 个 Promise 面试题](https://juejin.cn/post/6844904077537574919)
2. [三元—为什么 Promise 要引入微任务？](https://sanyuan0704.top/blogs/javascript/js-async/005.html)
