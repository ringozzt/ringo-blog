# 二分查找

时间复杂度：O(logN)

空间复杂度：O(1)

## 基本思想

### 前提

**数组为有序数组**，同时**数组中无重复元素**。

### 思路

1. 从数组的中间元素开始，如果中间元素正好是目标值，则搜索结束。
2. 目标值大于或小于中间元素，则在大于或小于中间元素的那一半数组中二分搜索。

## 实现

```js
function binarySearch(arr, target) {
  if (!target) return;
  let low = 0;
  let high = arr.length - 1;
  // 如果产生交集代表搜索完成
  while (low <= high) {
    // 设置中间值
    const mid = Math.floor((low + high) / 2);
    const element = arr[mid];
    // 判断是左搜索，还是右搜索
    if (element > target) {
      high = mid - 1;
    } else if (element < target) {
      low = mid + 1;
    } else {
      // 搜索完成
      return mid;
    }
  }
  // 没找到
  return -1;
}

console.log(binarySearch([3, 4, 5, 6, 7, 9, 12, 15], 15));
```
