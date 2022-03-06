# 技术分享之 Hooks 实战

> 本菜鸟在公司的第一次技术分享，翻车。。。

## 1.解决子组件重渲染

一分钟，大家观察一下这两个案例

![img](https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/d-rerender.png)

- ###### [在线 Demo](https://codesandbox.io/s/reducer-trigger-timming-forked-p2yzq5?file=/src/index.js)

观察左边这个 case，是开发中比较常见的情况

count 变更时，App 组件会 rerender， 导致子组件 MyComponent 也会 rerender。

子组件 MyComponent 没有任何变化，不应该被重渲染，怎么解决？

答案很简单:

1. 整个组件用 memo 包裹（推荐）

2. 把子组件从 App 里抽出，以参数形式传入封装的动态组件 Counter，这样就不受 Counter 的影响。效果是，count 变更时，只有 Counter 会 rerender，MyComponent 不会。（子组件为无状态组件）

## 2.怎么解决 useEffect 的闭包

### **延迟调用会存在闭包问题**

```JavaScript
const App = () => {

  const [count, setCount] = useState(1);



  useEffect(() => {

    setInterval(() => {

      console.log(count);

    }, 1000);

  }, []);



  return (

    <div>

      <button onClick={() => setCount((count) => count + 1)}>Click_btn</button>

      {count}

    </div>

  );

};



export default React.memo(App);
```

以上代码，不管点击多少次，都会打印初始值 1。原因是页面初次渲染后的 count 被定时器引用，形成闭包，尽管之后我们多次点击了 button，`useEffect()`的回调没有再执行。

```JavaScript
const App = () => {

  const [count, setCount] = useState(1);



  useEffect(() => {

    setInterval(() => {

      console.log(count);

    }, 1000);

  }, [count]);



  return (

    <div>

      <button onClick={() => setCount((count) => count + 1)}>Click_btn</button>

      {count}

    </div>

  );

};



export default React.memo(App);
```

有同学会说，把`count`加到`deps[ ]`里面就可以了。(其实会打印 1 2 1 2 1 2)

这样处理`count`确实没有闭包问题了，但在每次 `count`变化时，都会产生一个新的定时器，线程里同时有多个定时函数在跑，乱套了，当然还可以 return 一个`() => clearInterval(timer)`来解决。这只是一个人为的例子，我想说其实可以不用`deps[count]`，也能解决这个问题

### 解法 1: useRef

```JavaScript
const App = () => {

  const [count, setCount] = useState(1);

  const countRef = useRef(count);

  countRef.current = count;



  useEffect(() => {

    setInterval(() => {

      console.log(countRef.current);

    }, 1000);

  }, []);



  return (

    <div>

      <button onClick={() => setCount((count) => count + 1)}>Click_btn</button>

      {count}

    </div>

  );

};



export default React.memo(App);
```

`useRef`仅在 Mount 时期初始化对象，而 Update 时期返回 Mount 时期的结果（memoizedState）。这意味着一次完整的生命周期中，`useRef`保留的引用始终不会改变。而这一特点却让它成为了 Hooks **闭包救星**。

1.媒体播放、管理焦点.focus()

2.解决闭包问题

包括 延时器回调函数、`Promise.then`等，都会造成 useEffect 中的闭包，这时，只需加入

```JavaScript
const countRef = useRef(count);


countRef.current = count;
```

即可解决问题

### 解法 2: 值引用

`解法1`可以针对**基本数据类型--值拷贝**的情况作处理。实际上，只要能保证每次 count 返回的都是同一个对象，不用`useRef()`也可以绕开闭包陷阱。

```JavaScript
const App = () => {

  const [obj, setObj] = useState({ name: 'Jack' });



  useEffect(() => {

    setInterval(() => {

      console.log(obj);

    }, 2000);

  }, []);



  function handleClick() {

    // setObj(

    //   (prevState) => {

    //   var nowObj = Object.assign(prevState, {

    //     name: 'Mark',

    //     age: 100,

    //   });

    //   console.log(nowObj === prevState); // true

    //   return nowObj;

    // }

    setObj((prevState) => {

      prevState.age = 100;

      return prevState;

    });

  }



  return (

    <div>

      <span>

        name: {obj.name} | age: {obj.age}

      </span>

      <div>

        <button onClick={handleClick}>Click_btn</button>

      </div>

    </div>

  );

};



export default React.memo(App);
```

## 3.神奇的 useReducer

### useReducer 的基本语法

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

Dispatch->action->reducer

[setState 写法](https://codesandbox.io/s/reducer-trigger-timming-forked-b9dfi2)

[dispatch 写法](https://codesandbox.io/s/reducer-trigger-timming-forked-hk96qg)

![img](https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/p-reducer.png)

- 【组件负责发出 action，reducer 负责更新状态】的解耦模式，使得代码逻辑变得更加清晰，代码行为更加可预测(比如 useEffect 的更新时机更加稳定)。

- useReducer 总是返回**相同的 dispatch 函数**，这是彻底解耦的标志：状态更新逻辑可以任意变化，而发起 actions 的渠道始终不变

这里先问大家 3 个问题：

1. 触发 action 后 reducer 会在什么时候执行
2. setState(dispatch)是在什么时候初始化的
3. 为什么 setState(dispatch)值相同时，函数组件不更新

### 内联 useReducer

[内联用法示例](https://codesandbox.io/s/reducer-trigger-unnecessary-lhqnc?file=/src/index.js)

[计数器示例](https://codesandbox.io/s/reducer-trigger-timming-forked-1tzv7?file=/src/index.js)

可能会出乎很多人的意料。因为大部分人对 reducer 的触发时机的理解是错误的（包括以前的我）。

这种现象其实不是一个 bug，这是 useReducer 的一种内联机制。

### hook 中的战斗机-作弊模式

由于 useReducer 造就的解耦模式以及高级用法，React 团队的 Dan Abramov 将 useReducer 描述为["React 的作弊模式"](https://twitter.com/dan_abramov/status/1102010979611746304)。

![img](https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/dan-re-reducer.png)

### 深入探究-发现大佬的备注-找到答案

**[ReactFiberHooks.new.js](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.new.js)** **--> dispatchSetState 函数:**

![img](https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/re-reduce-src.png)

#### 大概意思：

```TypeScript
try {

          const currentState: S = (queue.lastRenderedState: any);

          const eagerState = lastRenderedReducer(currentState, action);

          // Stash the eagerly computed state, and the reducer used to compute

          // it, on the update object. If the reducer hasn't changed by the

          // time we enter the render phase, then the eager state can be used

          // without calling the reducer again.

          /*

              将即时获取的状态和用于计算状态的reducer隐藏在update对象上

              如果在我们进入呈现阶段时reducer还没有改变，

              那么可以使用早些时候获取的状态，而无需再次调用reducer。

          */

          update.hasEagerState = true;

          update.eagerState = eagerState;

          if (is(eagerState, currentState)) {

            // Fast path. We can bail out without scheduling React to re-render.

            // It's still possible that we'll need to rebase this update later,

            // if the component re-renders for a different reason and by that

            // time the reducer has changed.

            /*

                快速路径。我们可以跳出过程而不安排react重新渲染。

                我们以后仍有可能需要重新调整这个更新，如果组件因为不同的原因而重新呈现,

                到那时reducer已经改变了，我们仍有可能需要重新校准这个更新。

            */

            return;

          }

        } catch (error) {

          // Suppress the error. It will throw again in the render phase.

        } finally {

          if (__DEV__) {

            ReactCurrentDispatcher.current = prevDispatcher;

          }

        }
```

当 React 在重新渲染后看到新的 reducer 时，它必须放弃之前在尝试确定是否需要重新渲染时所做的一些工作，因为新的 reducer 可能会产生不同的结果。这只是 React 代码中性能优化细节的一部分，您大多不需要担心，但值得注意的是，如果您不必要地重新定义函数，您最终可能会损失一些性能优化。

实际上这个 if 语句就是用来判断我们这次更新是否和上次一样，如果一样就不会在进行调度更新 。

1. 创建一个 update 并加入到 fiber.hook.queue 链表中，并且链表指针指向这个 update；
2. 判断当前是否是渲染阶段决定要不要马上调度更新；
3. 判断这次的操作和上次的操作是否相同， 如果相同则不进行调度更新；
4. 满足上述条件则将带有 update 的 fiber 进行调度更新；

函数组件生命周期中存在 2 个链表，

1.单向链表：fiber.memoizedState 中：函数组件中的多个 hook 按**声明的顺序**存进 workInProgressHook，

2.环形链表：fiber.hook.queue 中：`1`中的任意 hook 产生的 update 都有自己的队列

### 回答前面的三个问题：

触发 action 后 reducer 会在什么时候执行？

- React 会在页面下次渲染的时候，同步地调用 reducer 来处理队列中的 action

setState(dispatch)是在什么时候初始化的

- `useState`会在第一次执行函数组件时进行初始化，返回`[state, dispatchAction]`

为什么 setState(dispatch)值相同时，函数组件不更新

- dispatch 触发时，`dispatchSetState()`函数接收到 action 执行一遍得到 eagerState，和 old state 进行对比，如果没有变化就不会进行更新。

参考资料：

1. https://stackoverflow.com/questions/54892403/usereducer-action-dispatched-twice/54894698
2. https://segmentfault.com/a/1190000023039945
3. https://twitter.com/dan_abramov/status/1102010979611746304
4. https://github.com/facebook/react/issues/17953
5. https://juejin.cn/post/6990679048741453854#heading-10
