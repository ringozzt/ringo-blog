# 盘一盘数组方法

## 集合类

### forEach

只是遍历一次数组，**没有返回值**

### map

遍历一次数组，**返回新的数组**

### filter

遍历一次数组，当前回调若返回 true，则 push 该元素进**返回值数组**；若为 false，跳过该元素

### reduce

`reduce()` 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为**一个值**。`reduce()` 方法接受四个参数：**初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce() 的数组**。

### reduceRight

reduceRight()方法的功能和 reduce()功能是一样的，不同的是 reduceRight()从数组的末尾向前将数组中的数组项做累加。

## 检索类

### findIndex

返回 callback 结果为 true 的元素的下标，没找到返回-1

### find

`find`与`findIndex`的唯一区别在于，它返回的是实际值，而不是索引。可以重用已经实现的`findIndex`实现`find`。

### indexOf

获取给定值的索引

### lastIndexOf

返回数组中最后一个元素的索引

### every

一假即假

`every()` 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试，它返回一个布尔值。

**等价于逻辑与（&&）的数组**

### some

一真即真

`some` 方法与 `every` 刚好相反，即只要其中一个为`true` 就会返回`true`。

**等价于逻辑或（||）数组**

### includes

判断数组是否含有给定值

## 操作数组内容类

### concat

合并多个数组，返回新数组。纯函数

### join

将数组中所有元素用给定字符拼接成字符串。纯函数

### sort

按照`a , b 两个元素`，`a - b`升序，`b - a`降序，排序原数组。副作用

> 如果没有指明 `compareFunction` ，那么元素会按照转换为的字符串的逐个字符的**Unicode 位点**进行排序。

[sort 底层原理](https://juejin.cn/post/6977983566256799781)

### reverse

数组中元素的位置反转，返回原数组。副作用

### shift

删除数组头部一个元素并返回该元素。副作用

### unshift

添加一个或多个元素到数组头部。副作用

### slice

`slice` 会提取原数组中索引从 `begin` 到 `end` 的所有元素（包含 `begin`，但不包含 `end`）。纯函数

- 编程中常听到的概念都是左闭右开，slice 也是 含左不含右 ，[A, B)。
- Math.random()产生范围在 [0,1)的数

### splice

`splice()` 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容，splice 也是左闭右开 含左不含右 ，[A, B)。副作用

### pop

`pop()`方法从数组中删除最后一个元素，并返回该元素的值。副作用

### push

`push()` 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。副作用

### fill

用一个占位符值填充一个空数组，可以使用`fill`方法。多用于初始化数组。副作用

## 拍平类

### flat

`flat`方法通过可指定深度值来减少嵌套的深度。纯函数

### flatMap

`flatMap()` 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。纯函数

## 生成器类

### values

`values`方法返回一个生成器，该生成器生成数组的值。

### keys

`keys`方法返回一个生成器，该生成器生成数组的索引。

### entries

`entry`方法返回生成键值对的生成器。

## 改变原数组

**`splice`**、**`reverse`**、**`sort`**、**`push`**、**`pop`**、**`shift`**、**`unshift`**、**`fill`**

---

## 对比几个循环

### forEach 和 for 的区别

1. for 循环可以使用 break 跳出循环，但 forEach 不能
2. **forEach 中使用 return 会跳过一次迭代**
3. **for 可以用 continue 跳过循环中的一个迭代，forEach 用 continue 会报错**
4. for 循环可以控制循环起点（i 初始化的数字决定循环的起点），forEach 只能默认从索引 0 开始
5. for 循环过程中支持修改索引（修改 i），但 forEach 做不到（底层控制 index 自增，我们无法左右它）

### for of 和 for in

1. `for...of`是 ES6 引入的循环方法，内部调用的是`Symbol.iterator`方法

2. `for...of`循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如`arguments`对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串

3. `for...in`循环读取键名，`for...of`循环读取键值。如果要通过`for...of`循环，获取数组的索引，可以借助数组实例的`entries`方法和`keys`方法

4. `for...of`不能遍历对象，因为`Object`没有内建迭代器对象

5. 使用`for in`会遍历数组所有的可枚举属性，包括原型，如果不想遍历原型方法和属性的话，可以在循环内部判断一下，使用`hasOwnProperty()`方法可以判断某属性是不是该对象的实例属性

   ```js
   var arr = [1, 2, 3];
   Array.prototype.a = 123;

   for (let index in arr) {
     let res = arr[index];
     console.log(res);
   }
   //1 2 3 123

   for (let index in arr) {
     if (arr.hasOwnProperty(index)) {
       let res = arr[index];
       console.log(res);
     }
   }
   // 1 2 3
   ```

### map 和 forEach

1. `map` 返回新数组，`forEach`无返回值
2. `map`可以使用 break 中断循环，`forEach`不能使用 break 中断循环
3. `forEach`会改变原始的数组的值，而`map`是纯函数。（当然，两者可以互相实现彼此的功能）

---

## 数组去重

### 1. 双循环遍历去重

双重 for（或 while）循环是比较笨拙的方法，它实现的原理很简单：先定义一个包含原始数组第一个元素的数组，然后遍历原始数组，将原始数组中的每个元素与新数组中的每个元素进行比对，如果不重复则添加到新数组中，最后返回新数组；因为它的时间复杂度是 O(n^2)，如果数组长度很大，那么将会非常耗费内存

```js
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!');
    return;
  }
  let res = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    let flag = true;
    for (let j = 0; j < res.length; j++) {
      if (arr[i] === res[j]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      res.push(arr[i]);
    }
  }
  return res;
}
```

### 2. IndexOf 去重

#### 思路 1

数组的 indexOf()方法可返回某个指定的元素在数组中首次出现的位置。该方法首先定义一个空数组 res，然后调用 indexOf 方法对原来的数组进行遍历判断，如果元素不在 res 中，则将其 push 进 res 中，最后将 res 返回即可获得去重的数组

```js
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!');
    return;
  }
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) {
      res.push(arr[i]);
    }
  }
  return res;
}
```

#### 思路 2

利用 indexOf 检测元素在数组中第一次出现的位置是否和元素现在的位置相等，如果不等则说明该元素是重复元素

```js
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!');
    return;
  }
  return Array.prototype.filter.call(arr, function (item, index) {
    return arr.indexOf(item) === index;
  });
}
```

### 3. sort 去重

这种方法首先调用了数组的排序方法 sort()，然后根据排序后的结果进行遍历及相邻元素比对，如果相等则跳过该元素，直到遍历结束

```js
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!');
    return;
  }
  arr = arr.sort();
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      res.push(arr[i]);
    }
  }
  return res;
}
```

### 4. 利用对象属性去重

创建空对象，遍历数组，将数组中的值设为对象的属性，并给该属性赋初始值 1，每出现一次，对应的属性值增加 1，这样，属性值对应的就是该元素出现的次数了

```js
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!');
    return;
  }
  let res = [],
    obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      res.push(arr[i]);
      obj[arr[i]] = 1;
    } else {
      obj[arr[i]]++;
    }
  }
  return res;
}
```

### 5. set 与结构赋值去重

ES6 中新增了数据类型 set，set 的一个最大的特点就是数据不重复。Set 函数可以接受一个数组（或类数组对象）作为参数来初始化，利用该特性也能做到给数组去重

```js
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!');
    return;
  }
  return [...new Set(arr)];
}
```

### 6. Array.from 与 set 去重

Array.from 方法可以将 Set 结构转换为数组结果，而我们知道 set 结果是不重复的数据集，因此能够达到去重的目的

```js
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!');
    return;
  }
  return Array.from(new Set(arr));
}
```

#### 具体去重比较

将这样一个数组按照上面的方法去重后的比较：

```javascript
var array = [
  1,
  1,
  '1',
  '1',
  null,
  null,
  undefined,
  undefined,
  new String('1'),
  new String('1'),
  /a/,
  /a/,
  NaN,
  NaN,
];
```

| 方法                       | 说明                              | 结果                                                             |
| -------------------------- | --------------------------------- | ---------------------------------------------------------------- |
| 双层 for 循环              | 对象和 NaN 不去重                 | [1, "1", null, undefined, String, String, /a/, /a/, NaN, NaN]    |
| Array.sort()加一行遍历冒泡 | 对象和 NaN 不去重 数字 1 也不去重 | [/a/, /a/, "1", 1, String, 1, String, NaN, NaN, null, undefined] |
| Array.filter()加 indexOf   | 对象不去重 NaN 会被忽略掉         | [1, "1", null, undefined, String, String, /a/, /a/]              |
| Object 键值对去重          | **全部去重**                      | [1, "1", null, undefined, String, /a/, NaN]                      |
| ES6 中的 Set 去重          | **对象不去重 NaN 去重**           | [1, "1", null, undefined, String, String, /a/, /a/, NaN]         |
