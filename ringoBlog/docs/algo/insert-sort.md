# 插入排序

时间复杂度稳定 O(n2)

核心：找到对的位置插入

以**升序**插入排序为例：

1. 从第二个数开始往前比较
2. 比前面的数小就继续往前比较
3. 在合适的位置插入该元素
4. 第三个数开始往前比较
5. 以此类推，进行到最后一个数

```js
// 插入排序
function insertSort(arr) {
  const result = [arr[0]];

  // for循环控制需要排序的趟数
  // i从1开始，因为默认第一个数已排序
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    // 找到合适的插入位置,每次确定一个数
    for (let j = result.length - 1; j >= 0; j--) {
      // 当前数往前比较，小于等于已存在的数就继续往前 j--
      if (current > result[j]) {
        // 找到位置了，当前数插入到j+2
        result.splice(j + 1, 0, current);
        break;
      }
      // 当前数小于等于result[0]
      if (j === 0) {
        result.unshift(current);
      }
    }
  }
  return result;
}

console.log(insertSort([5, 4, 3, 2, 1]));
```
