# 函数式编程

> 函数式编程（functional programming）或称函数程序设计、泛函编程，是一种编程范式，它将电脑运算视为函数运算，并且避免使用程序状态以及易变对象。
>
> 函数式编程关心数据的映射，命令式编程关心解决问题的步骤。
>
> 也许是继“面向对象编程”之后，下一个主流的编程范式，历史是个圈。

#### 简单地说，函数式编程就是把运算过程尽可能地用函数嵌套来表示。JavaScript 符合函数式编程的范式，也有纯函数的概念。到近些年，函数式以其优雅，简单的特点开始重新风靡整个编程界，主流语言在设计的时候无一例外都会更多的参考函数式特性`Lambda`表达式、原生支持`map`、`reduce`、`rest，`Java8`开始支持函数式编程等等。

#### 在前端领域，我们同样能看到很多函数式编程的影子，`ES6`中加入了箭头函数，`Redux`引入`Elm`思路降低`Flux`的复杂性，`React16.6`开始推出`React.memo()`，使得`pure functional components`成为可能，`16.8`开始主推`Hooks`，建议使用`pure function`进行组件编写等等。

- 函数和其他对象一样，可以存在数组里，当作参数传递，赋值给变量…
- 没有副作用，函数保持独立，没有与作用域外的互动
- 引用透明===纯函数的概念，纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用
- 状态的不可变性，在 JavaScript 中的 splice()改变原数组和 slice()拷贝返回新数组
- 柯里化`Currying`和函数组合`Compose`。

#### Currying 的重要意义在于可以把函数完全变成「接受一个参数；返回一个值」的固定形式，这样对于讨论和优化会更加方便。对于柯里化`Currying`，简单来说就是将一个多元函数，转换成一个依次调用的单元函数，也就是把一个多参数的函数转化为单参数函数的方法，函数的柯里化是用于将一个操作分成多步进行，并且可以改变函数的行为，在我的理解中柯里化实际就是实现了一个状态机，当达到指定参数时就从继续接收参数的状态转换到执行函数的状态。简单来说，通过柯里化可以把函数调用的形式改变。

```javascript
var add = function (x) {
  return function (y) {
    return x + y;
  };
};

var increment = add(1);
var addTen = add(10);

increment(2);
// 3

addTen(2);
// 12
```

#### 函数组合的目的是将多个函数组合成一个函数，将函数串联起来执行，一个函数的输出结果是另一个函数的输入参数，一旦第一个函数开始执行，就会像多米诺骨牌一样推导执行了。

```javascript
const compose = (f, g) => (x) => f(g(x));
const f = (x) => x + 1;
const g = (x) => x * 2;
const fg = compose(f, g);
fg(1); //3
```

#### 我们可以看到`compose`就实现了一个简单的功能，形成了一个全新的函数，而这个函数就是一条从`g -> f`的流水线，同时我们可以很轻易的发现`compose`其实是满足结合律的。

##### 参考文章：

1.https://github.com/WindrunnerMax/EveryDay/blob/master/JavaScript/%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B%E7%9A%84%E7%90%86%E8%A7%A3.md

2.http://www.ruanyifeng.com/blog/2012/04/functional_programming.html

3.https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch1.html

4.https://www.zhihu.com/question/20037482
