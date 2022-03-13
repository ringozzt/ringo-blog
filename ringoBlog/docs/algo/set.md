# 集合

## 概念

集合是一种**无序且唯一**的数据结构。

- **无序**：没有先后顺序，不关心顺序 => Set 是集合，不能像数组用下标取值
- **唯一**：集合中的元素不允许有重复

[MDN-Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

## API

JavaScript 可用`Set()`表示集合：

```javascript
let mySet = new Set();

mySet.add(1); // Set [ 1 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add('some text'); // Set [ 1, 5, "some text" ]
let o = { a: 1, b: 2 };
mySet.add(o);

mySet.add({ a: 1, b: 2 }); // o 指向的是不同的对象，所以没问题

mySet.has(1); // true
mySet.has(3); // false
mySet.has(5); // true
mySet.has(Math.sqrt(25)); // true
mySet.has('Some Text'.toLowerCase()); // true
mySet.has(o); // true

mySet.size; // 5

mySet.delete(5); // true,  从set中移除5
mySet.has(5); // false, 5已经被移除

mySet.size; // 4, 刚刚移除一个值

console.log(mySet);
// logs Set(4) [ 1, "some text", {…}, {…} ] in Firefox
// logs Set(4) { 1, "some text", {…}, {…} } in Chrome
```

遍历方式

- `keys()`：返回键名的遍历器
- `values()`：返回键值的遍历器
- `entries()`：返回键值对的遍历器
- `forEach()`：使用回调函数遍历每个成员
- `for..of`：解构键值对遍历

```js
// 迭代整个set
// 按顺序输出：1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}
for (let item of mySet) console.log(item);

// 按顺序输出：1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}
for (let item of mySet.keys()) console.log(item);

// 按顺序输出：1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}
for (let item of mySet.values()) console.log(item);

// 按顺序输出：1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}
//(键与值相等)
for (let [key, value] of mySet.entries()) console.log(key);
```
