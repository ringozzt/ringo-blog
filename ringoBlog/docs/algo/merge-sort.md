# 归并排序

时间复杂度：O(NlogN)
空间复杂度：O(N)

核心：左右根

## 分治思想

归并排序是建立在`归并`操作上的一种排序算法，该算法是采用`分治法`的一个非常典型的应用。

将已有序的子序列合并，得到完全有序的序列；先使每个子序列有序，再使子序列段间有序。

若将两个有序表合并成一个有序表，称为`二路归并`。

缺点：需要额外空间，但是稳定。

## 实现

以**升序**归并排序为例：

1. 归

   把数组分成两半，再递归地对子数组进行“分”操作，直到分成**一个个单独的数**

2. 并

   把两个数**合并**为**有序数组**，再对有序数组进行合并，直到全部子数组合并为**一个完整数组**

```js
// 归并 == 后序遍历-左右根

// 归：左右递归
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

// 并，此时子序列已经有序
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

  // 先left，再right，确保升序
  while (left.length) result.push(left.shift());

  while (right.length) result.push(right.shift());

  return result;
};

console.log(mergeSort([1, 5, 3, 2, 14, 6, 2, 3, 4, 5, 6, 7]));
```
