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

## Number()和 parseInt()、parseFloat()

三者的作用：把其他数据类型转换成数字。

`Number()` 可以用于任何数据类型转换成数值

`parseInt()` 用于将字符串转换成数值

`parseInt()`和 `parseFloat()` 这两者的区别就是`整数`和`浮点数`的区别

### Number()

1. Boolean 值，true 转换成 1， false 转换成 0；
2. null，返回 0；
3. undefined, 返回 NaN；
4. 如果是字符串：
   - 字符串只包含数据时，将转换成十进制的数值，第一个数字是 0 的话，将会忽略，如：`Number('0123') -> 123`；
   - 字符串包含有效的浮点数，如“1.1”，将转换成对应的浮点数，如：`Number('01.1') -> 1.1`；
   - 字符串包含有效的十六进制格式，如“0xf”，将转换成相同大小的十进制数值，如：`Number('0xf') -> 15`；
   - 字符串为空，转换成 0，如：`Number('') -> 0`；
   - 字符串包含了除上面这几种格式外的字符，将转换成`NaN`，如：`Number('123x') -> NaN`
5. 如果是对象，则调用对象的 ValueOf()方法，然后依照前面的规则转换返回的值；如果转换的结果是 NaN，则调用的对象的 toString()方法，然后再次依照前面的规则转换返回的字符串值。

### parseInt()

只能将字符串转换成数值；与 `Number()`转字符串的区别是：

1. 字符串数字开头或者负号开头，往后取值，直到非数字停止，如：`parseInt('123x') -> 123`、`parseInt('-023x') -> -23`，注意：`parseInt('-0a') -> -0`、`parseInt('-0x') -> NaN`(0x 为十六进制数的开头)、`parseInt('-abc') -> NaN`；
2. 字符串非数字或者负号开头，则为`NaN`，如：`parseInt('x123') -> NaN`；
3. 空字符串，返回`NaN`, 如：`parseInt('') -> NaN`；
4. `parseInt('1.1') -> 1` 这也是它和 parseFloat() 的差别。

#### Number() 和 parseInt() 对比的一张表

| 值         | Number() | parseInt() |
| ---------- | -------- | ---------- |
| ''         | 0        | NaN        |
| true/false | 1/0      | NaN        |
| '0123'     | 123      | 123        |
| '123x'     | NaN      | 123        |
| 'x123'     | NaN      | NaN        |
| '01.1'     | 1.1      | 1          |

### parseInt() 还有第二个参数

第二个参数用于指定转换时，转换成多少进制(如 2 进制、8 进制、10 进制、16 进制 等等)，默认为 10 进制。

```javascript
parseInt('-023x', 8); // -19

parseInt('010', 10); // 10

parseInt('010', 8); // 8

parseInt('0x10', 10); // 0

parseInt('0x10', 16); // 16

parseInt('0xf', 16); // 15
```

说到这第二个参数，有一个非常经典的面试题：

```javascript
['1', '2', '3'].map(parseInt); // 会得到什么结果？？？
```

正确答案：

应该是 `[1, NaN, NaN]`

原因就出在 parseInt()的第二个参数身上：

```
['1', '2', '3'].map(parseInt)`，其实拆解出来就是： `['1', '2', '3'].map((currentValue, index) => parseInt(currentValue, index))
```

三个值转换相当于：`parseInt('1', 0)`、`parseInt('2', 1)`、`parseInt('3', 2)`

> 1. parseInt('1', 0) 第二个参数为 0,相当的没传，即默认值,也就是 10 进制，正确转换成 1；
> 2. parseInt('2', 1) 第二参数不合法，看文档，第二个参数是 2-36 的值，`如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN`；
> 3. parseInt('3', 2) 参数合法，但是，2 进制里没有 3 这个数字，所以返回`NaN`
