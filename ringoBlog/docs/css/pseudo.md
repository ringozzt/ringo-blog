# 伪类和伪元素

## 伪元素在 css3 之前就存在，之后才分为伪类和伪元素

**1. 伪类表示被选择元素的某种状态，例如`:hover`**

**2. 伪元素表示的是被选择元素的某个部分，这个部分看起来像一个独立的元素，但是"假元素"，只存在于 css 中，所以叫"伪"的元素，例如`::before`和`::after`**

核心区别在于，是否创造了“新的元素”

## 伪类

### 状态类

- :link 链接原始状态

- :visited 被激活时和访问过之后

- :hover 悬停时

- :focus 聚焦时(上一个点过的地方)

- :active 被激活时

### 结构性类

- :not(xxx)
- :first-child
- :nth-child(n)第 n 个

### 表单伪类

- :required 必填
- :read-only 只读
- :invalid 验证失败
- :valid 验证成功
- :disabled 禁用

### 其他伪类

- :fullscreen 全屏模式下的

## 伪元素

- ::section 光标选中的部分
- ::placeholder 输入框里占位符的颜色
- ::before 前缀
- ::after 后缀
