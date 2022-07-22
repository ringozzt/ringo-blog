# 深浅拷贝、对比

## 赋值和深/浅拷贝的区别

这三者的区别如下，不过比较的前提都是**针对引用类型**：

- 当我们把一个对象赋值给一个新的变量时，**赋的其实是该对象的在栈中的地址，而不是堆中的数据**。也就是两个对象指向的是同一个存储空间，无论哪个对象发生改变，其实都是改变的存储空间的内容，因此，两个对象是联动的。
- 浅拷贝：**重新在堆中创建内存**，拷贝前后对象的基本数据类型互不影响，但拷贝前后对象的引用类型因共享同一块内存，会相互影响。
- 深拷贝：**重新在堆中创建内存**，将对象中的子对象进行递归拷贝，拷贝前后的两个对象互不影响。

## js 中的浅拷贝

- 🚨 注意：堆内存中**开辟一块区域**，产生新对象，必然要先开辟一块内存空间
- 基本类型值拷贝，**引用数据类型**拷贝值引用
- **浅拷贝的限制是只能拷贝一层对象，对嵌套的对象依然拷贝的是引用地址**

### 什么是拷贝

```js
let arr = [1, 2, 3];
let newArr = arr;
newArr[0] = 100;

console.log(arr); //[100, 2, 3]
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

深拷贝可以解决一些问题，比如浅拷贝的对象地址引用。

### 简易版

```js
JSON.parse(JSON.stringify());
// 对象中有时间类型的时候，序列化之后会变成字符串类型。

// 对象中有undefined和Function类型数据的时候，序列化之后会直接丢失。

// 对象中有NaN、Infinity和-Infinity的时候，序列化之后会显示null。

// 对象循环引用的时候，会直接报错。
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

[深拷贝]()

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

## 引用比较

下面三种对比方式用于 Object，实现引用比较功能：

- `===`
- `==`
- `Object.is()`

```js
const hero1 = {
  name: 'Batman',
};
const hero2 = {
  name: 'Batman',
};

hero1 === hero1; // => true
hero1 === hero2; // => false

hero1 == hero1; // => true
hero1 == hero2; // => false

Object.is(hero1, hero1); // => true
Object.is(hero1, hero2); // => false
```

## 浅比较

浅对比函数写法有很多，不过其效果都是标准的，就是只比较一层，下面给出了一种写法：

```js
function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}
```

可以看到，浅对比就是将对象每个属性进行引用对比，算是一种性能上的平衡，尤其在 redux 下有特殊的意义。

下面给出了使用例子：

```js
const hero1 = {
  name: 'Batman',
  realName: 'Bruce Wayne',
};
const hero2 = {
  name: 'Batman',
  realName: 'Bruce Wayne',
};
const hero3 = {
  name: 'Joker',
};

shallowEqual(hero1, hero2); // => true
shallowEqual(hero1, hero3); // => false
```

如果对象层级再多一层，浅对比就无效了，此时需要使用深对比。

## 深比较

深对比就是递归对比对象所有简单对象值，遇到复杂对象就逐个 key 进行对比，以此类推。

可以看到，只要遇到 Object 类型的 key，就会递归调用一次 `deepEqual` 进行比较，否则对于简单类型直接使用 `!==` 引用对比。

值得注意的是，数组类型也满足 `typeof object === "object"` 的条件，且 `Object.keys` 可以作用于数组，且 `object[key]` 也可作用于数组，因此数组和对象都可以采用相同方式处理。

```js
function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}

function isObject(object) {
  return object != null && typeof object === 'object';
}

// 测试
const hero1 = {
  name: 'Batman',
  address: {
    city: 'Gotham',
  },
};
const hero2 = {
  name: 'Batman',
  address: {
    city: 'Gotham',
  },
};

console.log(deepEqual(hero1, hero2)); // => true
```

但深对比会造成性能损耗，不要小看递归的作用，在对象树复杂时，深对比甚至会导致严重的性能问题。