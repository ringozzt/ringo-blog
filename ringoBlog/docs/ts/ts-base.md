# TypeScript 基础

JavaScript 作为一种弱类型语言（类型不安全的语言）、动态类型语言，十分不利于大型项目的维护。而伴随近几年前端业务的崛起，需要一种提供编译时类型检查，也就是静态类型检查的语言。

那么 TypeScript 就应运而生了，满足了静态类型检查这个需求。

TS 本质上是 JS 的超集，基于 ES6 以后的语法提供全面支持，与 JS 语法兼容。

而且还有额外的更好的提示、更易于重构的好处。

官方提供操场：[tsPlayGround](https://www.typescriptlang.org/zh/play?#code/Q)

开源好书：

1. [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese)
2. [TypeScript Handbook](https://zhongsp.gitbooks.io/typescript-handbook/content/)
3. [TypeScript 入门教程](https://ts.xcatliu.com/)

## 基本类型

### JS 的运行时类型

#### string

#### boolean

#### number

0xff、0o77、0b11

#### string

原生支持模板字符串

#### object

#### bigint

#### symbol

#### undefined

#### null

### JS 的包装类型

#### Number

#### Boolean

#### String

#### Object

#### Symbol

### 复合类型

#### class

#### array

### ts 新增

#### tuple

元组：规定了类型的数组

```ts
let x: [number, string];
x = [10, 'hello']; // ok
x = ['hello', 10]; // error
```

#### enum

枚举，默认从 0 开始编码

```tsx
enum Color {
  Red,
  Green,
  Blue,
}
console.log(Color.Green); // 1
console.log(Coloe[2]); // Blue
// 初始值从 0 开始
enum ProcessState {
  'untreated' = 0,
  'processing',
  'resolved',
  'rejected',
  'increased',
  'repeated',
  'timeout',
}
console.log(ProcessState[6]); // timeout
// 可以自定义枚举值
enum Animal {
  Cat = 'Garfield',
  Dog = 'husky',
}
console.log(Animal.Cat); // Garfield
```

#### Interface

接口，定义了一种抽象，一种声明

可以描述函数、对象、构造器的结构：

```tsx
interface IPerson {
  name: string;
  age: number;
}

class Person implements IPerson {
  name: string;
  age: number;
}

const obj: IPerson = {
  name: 'guang',
  age: 18,
};
```

接口和类的区别：

1. 接口没有执行的部分，只是约束了一些类型，像一个模板
2. 类可以产生一个实例化对象，有实例化的过程

### 特殊的类型

#### void

空，可以是 null 或者 undefined，一般是用于函数返回值

#### never

永远不会返回，不可达，比如函数抛异常的时候，返回值就是 never

```tsx
// 返回never的函数必须存在无法到达的终点
function infinteLoop(): never {
  while (true) {}
}
```

#### any

任意类型，任何类型都可以赋值给它，它也可以赋值给任何类型（除了 never）。

相当于放弃类型校验。

#### unknown

是未知类型，任何类型都可以赋值给它，但是它不可以赋值给别的类型。

## 高级类型

**高级类型的特点是传入类型参数，经过一系列类型运算逻辑后，返回新的类型。**

### 推导：infer

如何提取类型的一部分呢？答案是 infer。

比如提取元组类型的第一个元素：

```typescript
type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R]
  ? T
  : never;

type res = First<[1, 2, 3]>; // type res = 1
```

### 联合：｜

联合类型（Union）类似 js 里的或运算符 |，但是作用于类型，代表类型可以是几个类型之一。

```typescript
type Union = 1 | 2 | 3;
```

### 交叉：&

交叉类型（Intersection）类似 js 中的与运算符 &，但是作用于类型，代表对类型做合并。

```typescript
type ObjType = { a: number } & { c: boolean };
```

注意，同一类型可以合并，不同的类型没法合并，会被舍弃，返回 never

### 映射类型

比如我们把一个索引类型的值变成 3 个元素的数组：

```ts
type MapType<T> = {
    [Key in keyof T]: [T[Key], T[Key], T[Key]]
}

type res = MapType<{a: 1, b: 2}>;
// type res = {
	a: [1, 1, 1];
	b: [2, 2, 2];
}
```

## 类的概念

可以理解为生成对象的模板，通过类可以实例化一个对象，对象就是我们实际可以操作的东西

### 由三部分组成

属性

构造器

方法

### extends 继承

搭配 class 使用，类之间的继承

子类从基类中继承属性和方法

#### super 关键字

ES6 要求，子类的构造函数必须执行一次 super 函数，否则会报错。

代表父类的构造函数，但是返回的是子类的实例，即 `super` 内部的 `this` 指的是子类。

```js
class Person {
  constructor() {
    console.log(new.target.name); // new.target 指向当前正在执行的函数
  }
  eat() {
    console.log('eating');
  }
}

class Man extends Person {
  constructor {
    // 等同 Person.prototype.constructor.call(this, props)
    super(); // 代表引入父类的构造函数，但是返回的是子类的实例
  }
	rudeEat() {
    super.eat(); // 此时super被当做对象使用，相当于Person.prototype.eat()
  }
}

new A(); // A
new B(); // B
```

### implements 实现

搭配 Interface 使用，类和接口之间的派生

通过 implements 可以确定派生关系， 也就是说这个类必须实现接口当中的所有方法

### 修饰符

| 访问权限修饰符 | 访问范围                                |
| -------------- | --------------------------------------- |
| public         | `默认权限，全部都可以访问 `             |
| protected      | `可以在当前类或者派生类中使用 `         |
| private        | 只能在当前类中使用                      |
| readonly       | 只读，等于把 set 方法给干掉了，只能 get |

### static

静态属性/方法，无需实例化即可访问

## 类型推断

只需提供必要的类型，ts 能够自动帮助我们推导出全部类型

## 可选参数/默认参数

`?:`关键字，实现同 ES6

可选链和默认值：? 和 ?? ，下面这两种写法等价：

```
const res = data?.name ?? 'zzt';
const res2 = data && data.name  || 'zzt';
```

## 泛型

> **混淆点：**
>
> 与 any 不同，any 放弃了类型系统；而泛型表示暂时不确定具体类型，但是需要约束

核心写法：

```ts
<T>(arg: T)
```

并不是 T 字母有什么特殊含义，一种规范而已。

### 例子

比如一个 add 函数既可以做整数加法、又可以做浮点数加法，利用泛型我们只需要声明一个函数

```ts
T add<T>(T a, T b) {
    return a + b;
}

add(1,2);
add(1.111, 2.2222);
```

返回对象某个属性值的函数

```typescript
function getPropValue<T>(obj: T, key): key对应的属性值类型 {
  return obj[key];
}
```

### 支持类型编程的类型系统

在 Java 里面，拿到了对象的类型就能找到它的类，进一步拿到各种信息，所以类型系统支持泛型就足够了。

但是在 JavaScript 里面，对象可以字面量的方式创建，还可以灵活的增删属性，拿到对象并不能确定什么，所以要支持对传入的类型参数做进一步的处理。

**对传入的类型参数（泛型）做各种逻辑运算，产生新的类型，这就是类型编程。**

比如上面那个 getProps 的函数，类型可以这样写：

```typescript
function getPropValue<T extends object, Key extends keyof T>(
  obj: T,
  key: Key
): T[Key] {
  return obj[key];
}
// 这里的 keyof T、T[Key] 就是对类型参数 T 的类型运算。
```

细品下面这段逻辑，能够融会贯通泛型概念

```ts
// 泛型基本使用方法
function identity<T>(arg: T): T {
  return arg;
}
identity(1); // ok
identity('foo'); // ok

// 泛型类型
let myIdentity1: <T>(arg: T) => T = identity;
// 泛型接口定义
interface GenericIdentityFn {
  <T>(arg: T): T;
}
let myIdentity2: GenericIdentityFn = identity;
myIdentity2(1); // ok

// 通过泛型接口限定类型
interface GenericIdentityFn2<T> {
  (arg: T): T;
}
let myIdentity3: GenericIdentityFn2<string> = identity;
myIdentity3('foo'); // ok
myIdentity3(1); // error
```

## 总结：

TypeScript 给 JavaScript 增加了一套类型系统，但并没有改变 JS 的语法，只是做了扩展，是 JavaScript 的超集。

这套类型系统支持泛型，也就是类型参数，有了一些灵活性。而且又进一步支持了对类型参数的各种处理，也就是类型编程，灵活性进一步增强。

现在 TS 的类型系统是图灵完备的，JS 可以写的逻辑，用 TS 类型都可以写。

但是很多类型编程的逻辑写起来比较复杂，因此被戏称为类型体操。
