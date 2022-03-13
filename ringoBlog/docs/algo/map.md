# 字典

## 概念

字典也是一种存储**唯一值**的数据结构，但它是以**键值对**的形式来存储。[MDN-map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

1. 与 Object 不同，map 允许使用几乎所有类型（对象、数组、undefined...）作为 key；Object 只允许 string 或者 Symbol 作 key

2. Map 内部实现了迭代器，可以用 for...of 遍历（TODO：ts 实战中发现必须用 Array.from 包一层，否则报错）

## API

字典的常用操作：增、删、改、查。

JavaScript 中可用`Map()`表示字典：

```javascript
const m = new Map();

// 增
m.set('a', 'aaa');
m.set('b', 'bbb');
m.set('c', 'ccc');
// Map(3) { 'a' => 'aaa', 'b' => 'bbb', 'c' => 'ccc' }

// 删
m.delete('b');
// Map(2) { 'a' => 'aaa', 'c' => 'ccc' }
m.clear();
// Map(0) {}

// 改
m.set('a', 'aaa');
m.set('b', 'bbb');
m.set('a', '11111');
// Map(2) { 'a' => '11111', 'b' => 'bbb' }

// 查
m.get('a');
// 'aaa'
m.has('a');
// true
```

遍历方式

- `keys()`：返回键名的遍历器
- `values()`：返回键值的遍历器
- `entries()`：返回键值对的遍历器
- `forEach()`：使用回调函数遍历每个成员
- `for..of`：解构键值对遍历

```js
for (const [key, value] of m) {
  console.log(key, value);
}
```
