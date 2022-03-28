# 易混淆点

## Math.round()、ceil()、floor()

### Math.round()

字面意思附近、周围。

求一个附近的整数。

四舍五入：（小数点后第一位）大于五全部加，等于五正数加，小于五全不加。

```js
// 小数点后第一位<5
正数：Math.round(11.46)=11
负数：Math.round(-11.46)=-11

// 小数点后第一位>5
正数：Math.round(11.68)=12
负数：Math.round(-11.68)=-12

// 小数点后第一位=5
正数：Math.round(11.5)=12
负数：Math.round(-11.5)=-11
```

### Math.ceil()

字面意思天花板。

无论正负、小数范围，向上取整。

```js
// 向上取整
Math.ceil(11.46)=Math.ceil(11.68)=Math.ceil(11.5)=12
Math.ceil(-11.46)=Math.ceil(-11.68)=Math.ceil(-11.5)=-11
```

### Math.floor()

字面意思地板。

无论正负、小数范围，向下取整。

```js
// 向下取整
Math.floor(11.46)=Math.floor(11.68)=Math.floor(11.5)=11
Math.floor(-11.46)=Math.floor(-11.68)=Math.floor(-11.5)=-12
```

## return、break、continue

JS 跳出循环的三种方法

### Return 语句

- return 语句就是用于指定函数返回的值
- return 语句返回 null，就相当于返回 false，代表结束循环

```js
for (let i = 1; i < 5; i++) {
  if (i == 3) {
    return;
  }
  console.log(i);
}
// 1
// 2
```

### Break 语句

- break 语句会使运行的程序立刻退出包含在最内层的循环或者退出一个 switch 语句。
- 用来退出循环或者 switch 语句的, 所以只有当它出现在循环、swtich 语句中的时候, 这种形式的 break 语句才是合法的

```js
for (let i = 1; i < 50; i++) {
  if (i == 3) {
    break;
  }
  console.log(i);
}
// 1
// 2
```

### Continue 语句

- continue 语句和 break 语句相似。不同的是，它不是退出一个循环，而是开始循环的一次新迭代。
- continue 语句只能用在 while 语句、do/while 语句、for 语句的循环体内, 在其他地方使用都会引起错误

```js
for (var i = 5; i >= 0; i--) {
  if (i == 4 || i == 3 || i == 1) {
    continue;
  }
  console.log(i);
}
// 当i = 4、i = 3、i = 1的时候，跳过本次循环
```
