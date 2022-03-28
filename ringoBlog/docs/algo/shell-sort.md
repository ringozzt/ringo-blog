# 希尔排序

时间复杂度：O(N^(4/3)) 不稳定

空间复杂度：O(1)

## 基本思想

希尔排序可以理解为优化后的直接插入排序，优化空间复杂度到 O(1)，属于原地排序

插入排序顾名思义，就是在排序的过程中，把数组的每一个元素按照大小关系，插入到前面有序区的对应位置。

而希尔排序，则是通过分组排序先对数组粗略调整：

1. 分组，就是让元素两两一组，同组两个元素之间的跨度，都是数组总长度的一半
2. 让每组元素进行独立排序，排序方式用直接插入排序
3. 重复上述工作，把跨度缩小为原先的一半
4. 继续让每组元素进行独立排序，排序方式用直接插入排序
5. ...重复上面 3、4 两步，直到跨度为 1...
6. 最后，当分组跨度为 1，直接插入排序，此时数组已经有序

[图解-希尔排序](https://juejin.cn/post/6844904007182319624)

## 实现

1. 先将整个待排序的记录序列分割成为若干子序列。
2. 分别进行直接插入排序。
3. 待整个序列中的记录基本有序时，再对全体记录进行依次直接插入排序。

```js
const shellSort = (arr) => {
  let len = arr.length,
    temp,
    gap = 1;
  console.time('希尔排序耗时');
  while (gap < len / 3) {
    //动态定义间隔序列
    gap = gap * 3 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      temp = arr[i];
      let j = i - gap;
      // arr[j], temp 表示间隔gap的两个数，
      // 如果arr[j]>temp则交换（升序）
      for (; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
      console.log('arr  :', JSON.stringify(arr));
    }
  }
  console.timeEnd('希尔排序耗时');
  return arr;
};

const array = [35, 33, 42, 10, 14, 19, 27, 44];
console.log(shellSort(array));
```
