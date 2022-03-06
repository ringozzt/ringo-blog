# Index 不能作为 key

- [为什么不要用 Index 作 key-Vue](https://juejin.cn/post/6844904113587634184)

- [为什么不要用 index 作 key-React](https://juejin.cn/post/6844903527836286989)

### 发生异常的情况

- 写列表渲染时， 子组件依赖内部状态（非受控组件） 或 临时 DOM 状态（原生 input） 的情况，如果有 删除、增加、排序这样的功能，不要把 index 作为 key。
- 在 Vue 中造成首尾对比未命中，销毁并重新生成节点，每一项都会经历完整的 vm.\_update(vm.\_render())）过程
- 在 React 中对性能优化没有帮助
