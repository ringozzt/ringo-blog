# undefined 和 null

JavaScript 中的基本数据类型包括：

String、Number、Boolean、null、undefined、BigInt，

其中 null 和 undefined 都表示“无”这层含义，一般情况下，两者几乎没有区别。

## 相似之处

### 可以进行赋值

在全局定义两个变量，一个是 null，另一个是 undefined，最终他们都被挂载到全局对象上了，且值都为 undefined：

```js
var a = null;
var b = undefined;
console.log(global.a, global.b); // undefined undefined。这说明，null不是全局对象的一个属性。
```

### 类型转换

在 if 语句中，null 和 undefined 都会被认为是 false：

```js
var a = null;
var b = undefined;

if (!a) {
  console.log(a); // null
}

if (!b) {
  console.log(b); // undefined
}
```

也就是说，在具有类型转换的场景中，null 和 undefined 都会被转化为 false：

```js
console.log(!!null); // false
console.log(!!undefined); // false
```

### ==判断为 true

如下代码，用==判断 null 和 undefined，结果为 true，~~这是因为它们都被转化为了布尔值的 false~~，这是因为它们都表示无效的值，所以 ECMA 规范规定了 null 和 undefined 是相等的，并不能用转换数据类型来解释。

```js
console.log(null == undefined); // true
```

### ===判断为 false

而使用===判断时，由于它们属于不同的数据类型，则直接会返回 false：

```js
console.log(null === undefined); // false
```

## 不同之处

### null

**null 表示一个值被定义了，但定义的是空值。**

以下是 null 的经典用法。

（1）作为函数的参数，表示不传入此参数。

```js
const test = (a, b) => {
  console.log(b);
};

test(null, 2); // 2
```

（2）作为原型链的终点。

```js
console.log(Object.prototype.__proto__); // null
```

### undefined

**undefined 表示根本不存在定义。**

以下是 undefined 的经典用法。

（1）变量被声明，但还没有赋值，此时的变量等于 undefined。

```js
let a;
console.log(a); // undefined
```

（2）调用函数时，应该传入的参数未传入，则该参数为 undefined。

```js
const test = (a) => {
  console.log(a);
};

test(); // undefined
```

（3）对象没有定义的属性，该属性为 undefined。

```js
const obj = {};

console.log(obj.a); // undefined

// 注意，在未定义的属性上，继续读取属性会报错
console.log(obj.a.b); // TypeError: Cannot read property 'b' of undefined
```

（4）不在数组索引范围的值，为 undefined。

```js
const arr = [1];

console.log(arr[100]); // undefined
```

（5）函数没有返回值时，默认返回的是 undefined。

```js
const test = () => {};

console.log(test()); // undefined
```

### 感谢巨人：

1. [飞鸟-JS 空值区别](https://lzxjack.top/post?title=null-undefined#2-%E4%B8%8D%E5%90%8C%E7%82%B9)
