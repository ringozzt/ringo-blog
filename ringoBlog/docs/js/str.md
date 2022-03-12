# 字符串方法

<img src="https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/strFn.webp" alt="strFn" style="zoom: 50%;" />

### length

### charAt() charCodeAt()

- charAt() 方法获取到的是指定位置的字符；
- charCodeAt()方法获取的是指定位置字符的 Unicode 值。

## 检索字符串是否包含特定序列

### indexOf()

查找某个字符，**有则返回第一次匹配到的位置**，否则返回-1

### lastIndexOf()

查找某个字符，有则返回最后一次匹配到的位置，否则返回-1

### includes()

判断字符串是否包含指定的子字符串

### startsWith()

检测字符串**是否以指定的子字符串开始**

### endsWith()

检测字符串**是否是以指定的子字符串结尾**

## 连接多个字符串

### concat

str1.concat(str2, str3...)

## 字符串分割成数组

### split

## 截取字符串

### substr

string.substr(start, ?length)

### substring

string.substring(from, ?to)

### slice

一个[a, ?b)的区间，只有 a 就是从 a 开始截取

## 大小写转换

### toLowerCase

### toUpperCase

## 字符串模式匹配

### replace

- searchValue：必需。规定子字符串或要替换的模式的 RegExp 对象。如果该值是一个字符串，则将它作为要检索的直接量文本模式，而不是首先被转换为 RegExp 对象。
- newValue：必需。一个字符串值。规定了替换文本或生成替换文本的函数。

string.replace(searchValue, newValue)

如果 regexp 具有全局标志 g，那么 replace() 方法将替换所有匹配的子串。否则，它只替换第一个匹配子串。

### match

string.match(regexp)

该方法的参数 regexp 是必需的，规定要匹配的模式的 RegExp 对象。如果该参数不是 RegExp 对象，则需要首先把它传递给 RegExp 构造函数，将其转换为 RegExp 对象。

### search

检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。

其语法如下：

```js
string.search(searchvalue);
```

**注意：** 要执行忽略大小写的检索，请追加标志 i。该方法不执行全局匹配，它将忽略标志 g，也就是只会返回第一次匹配成功的结果。如果没有找到任何匹配的子串，则返回 -1。

**返回值：** 返回 str 中第一个与 regexp 相匹配的子串的起始位置。

```javascript
let str = 'abcdef';
str.search(/bcd/); // 输出结果：1
```

## 移除字符串收尾空白符

### trim

移除字符串首尾空白符，该方法不会改变原始字符串，需要接收 str.trim()的返回值

### trimStart

**从原始字符串的开头删除了空白的新字符串**，不会修改原始字符串

### trimEnd

**从原始字符串的结尾删除了空白的新字符串**，不会修改原始字符串

## 获取字符串本身

#### valueOf

#### toString

## 重复一个字符串

### repeat

repeat() 方法返回一个新字符串，表示将原字符串重复 n 次：

```javascript
'x'.repeat(3); // 输出结果："xxx"
'hello'.repeat(2); // 输出结果："hellohello"
'na'.repeat(0); // 输出结果：""
```

## 补齐字符串长度

### padStart

用于头部补全。该方法有两个参数，其中第一个参数是一个数字，表示字符串补齐之后的长度；第二个参数是用来补全的字符串。

如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串：

```javascript
'x'.padStart(1, 'ab'); // 'x'
```

如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串：

```javascript
'x'.padStart(5, 'ab'); // 'ababx'
'x'.padStart(4, 'ab'); // 'abax'
```

如果省略第二个参数，默认使用空格补全长度：

```javascript
'x'.padStart(4); // '   x'
```

padStart()的常见用途是为数值补全指定位数，笔者最近做的一个需求就是将返回的页数补齐为三位，比如第 1 页就显示为 001，就可以使用该方法来操作：

```javascript
'1'.padStart(3, '0'); // 输出结果： '001'
'15'.padStart(3, '0'); // 输出结果： '015'
```

### padEnd

用于尾部补全。该方法也是接收两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串：

```javascript
'x'.padEnd(5, 'ab'); // 'xabab'
'x'.padEnd(4, 'ab'); // 'xaba'
```

## 字符串转为数字

### parseInt

解析一个字符串，并返回一个整数

### parseFloat

解析一个字符串，并返回一个浮点数
