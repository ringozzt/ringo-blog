# JS 之类型判断

## typeof

不要使用`typeof`来判断`null`

- 这是一个 JavaScript 诞生之初就存在的 bug
- js 底层存储变量时，会在变量的机器码的低位 1-3 位存储类型信息
  - 000：对象
  - 010：浮点数
  - 100：字符串
  - 110：布尔
  - 1：整数
  - 所有机器码全 0：null
  - -2^30：undefined

所以，typeof 在判断 null 的时候，会误判成 object

```JavaScript
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof null // 'object'
typeof [] // 'object'
typeof {} // 'object'
typeof console // 'object'
typeof console.log // 'function'
```

## instanceof

## Object.prototype.toString.call()
