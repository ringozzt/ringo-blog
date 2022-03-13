# 归并排序

时间复杂度：O(nlogn)

核心：左右根

以**升序**归并排序为例：

1. 归

   把数组分成两半，再递归地对子数组进行“分”操作，直到分成**一个个单独的数**

2. 并

   把两个数**合并**为**有序数组**，再对有序数组进行合并，直到全部子数组合并为**一个完整数组**

```js
// 归并排序 == 二叉树的后续遍历，左右根
// 左右递归
const mergeSort = (arr) => {
  //采用自上而下的递归方法
  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  // length >> 1 和 Math.floor(len / 2) 等价
  let middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle); // 拆分为两个子数组
  return merge(mergeSort(left), mergeSort(right));
};

// 并
const merge = (left, right) => {
  const result = [];

  while (left.length && right.length) {
    // 注意: 判断的条件是小于或等于，如果只是小于，那么排序将不稳定.
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  // 把多余的部分拼接到有序队列尾部
  while (left.length) result.push(left.shift());

  while (right.length) result.push(right.shift());

  return result;
};

console.log(mergeSort([1, 5, 3, 2, 14, 6, 2, 3, 4, 5, 6, 7]));
```
