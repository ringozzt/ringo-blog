# CSS 常用布局

## 垂直水平居中

### 单行文本、inline、inline-block 情况

- text-align:center;

  padding: 10px 0;

- text-align:center;

  height: 100px;

  line-height:100px;

### 定宽高的情况

- absolute+负 margin
- absolute+0 位移+margin auto
- absolute+calc(50%-50px)

### 不定宽高的情况

- absolute
  top:50%
  left:50%
  transform:translate(-50%,-50%)

- 父 flex

  justify-content: center

  align-items:center

- 父 display:grid

  子 justify-self：center

  align-self：center

- 父 display:table-cell

  vertical-align:middle

  text-align:center

  子 display:inline-block

## 两栏布局

- `aside`:

  float:left

  width:200px

  `main`:

  overflow:hidden

- float+margin

- flex+flex:1 原理 flex-grow1flex-shrink1flex-basis0

- grid grid-template-columns:200px 1fr

## 三栏布局

- 圣杯布局

  - 三浮动，侧边栏相对定位移回来

- 双飞翼

  - 三浮动，侧边栏 margin 回来

- float+overflow（BFC）

  - main：overflow：hidden
  - aside width+float

- flex+flex1(flex:1 1 0% 后两位固定，赋值也是给第一位)
- grid+grid-template-columns：200px 1fr 200px
