# 冒泡排序

时间复杂度：O(N^2) 稳定

空间复杂度：O(1)

核心：每轮比较次数都比上一轮少

以**升序**冒泡排序为例：

1. 依次比较所有相邻元素，如果第一个比第二个大，则交换他们
2. 一轮下来可以保证最后一个数是最大的
3. 执行`n`轮就可以完成排序

```js
// 冒泡排序
function bubbleSort(arr) {
  // 优化标注
  let flag = 1;
  // 遍历 i 次
  for (let i = 0; i < arr.length && flag === 1; i++) {
    flag = 0;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = 1;
      }
    }
  }
  return arr;
}

console.log(bubbleSort([7, 5, 4, 15, 3, 9, 6, 12]));
```
