# 快速排序

时间复杂度：O(nlogn)

核心：根左右

以**升序**快速排序为例：

1. 分区
   - 从数组中任意选择一个元素作为`基准`，所有比`基准`小的元素放在`基准`前面，比`基准`大的元素放在`基准`后面。
2. 递归
   - 递归地对`基准`前后的子数组进行**分区操作**

```js
// 快排 == 二叉树前序遍历，根左右
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr; //递归出口
  }
  let left = [],
    right = [],
    current = arr.splice(0, 1);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < current) {
      left.push(arr[i]); //放在左边
    } else {
      right.push(arr[i]); //放在右边
    }
  }
  return quickSort(left).concat(current, quickSort(right));
}
console.log(quickSort([1, 5, 3, 2, 14, 6, 2, 3, 4, 5, 6, 7]));
```
