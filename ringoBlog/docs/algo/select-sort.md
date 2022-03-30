# 选择排序

时间复杂度：O(N^2) 稳定

空间复杂度：O(1)

核心：每轮确定一个数

以**升序**选择排序为例：

1. 找到数组中的最小值，将其放置在数组第一位
2. 找到数组中第二小的值，将其放置在数组第二位
3. 以此类推，执行`n-1`轮就可以完成排序

```js
// 选择排序
function selectSort(arr) {
  let len = arr.length;
  // 外层循环(元素个数-1)次
  for (let i = 0; i < len - 1; i++) {
    // 内层循环找到当前趟数的最小值，换到最前面
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[i]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}
console.log(selectSort([15, 14, 23, 12, 121]));
```
