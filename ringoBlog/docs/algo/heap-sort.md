# 堆排序

**时间复杂度**： O(NlogN)

**空间复杂度**： O(logN)

## 建堆思想

堆是一棵完全二叉树，它可以使用数组存储，并且堆的最值存储在根节点。

所以我们可以每次取堆的根结点与堆的最后一个节点交换，

此时最值放入了有效序列的最后一位，并且有效序列减 1，有效堆依然保持完全二叉树的结构。

然后堆化，成为新的顶堆，重复此操作，直到有效堆的长度为 0，排序完成。

## 实现

完整步骤为：

- 将待排序序列构成一个大顶堆，此时，整个序列的最大值就是堆顶的根节点
- 将其与末尾元素进行交换，此时末尾元素就是最大值
- 然后将剩余 n-1 个元素重新构成一个堆，就会得到 n 个元素的次小值，如此反复执行，便能得到一个有序序列

```js
function heap_sort(arr) {
  let len = arr.length;

  function swap(i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  // 将 start 结点以下的堆整理为大顶堆
  function max_heapify(start, end) {
    // 当前父节点
    let dad = start;
    let son = dad * 2 + 1;

    // 如果交换前父节点大于子节点，退出
    if (son >= end) return;
    // 找到两个孩子中较大的一个，再与父节点比较
    if (son + 1 < end && arr[son] < arr[son + 1]) {
      son++;
    }
    // 如果父节点小于等于子节点:交换
    if (arr[dad] <= arr[son]) {
      swap(dad, son);
      max_heapify(son, end);
    }
  }

  // 初始化大顶堆
  // 从第一个非叶子结点开始，对每一个非叶子结点 heapify
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    max_heapify(i, len);
  }
  // 排序，每一次 for 循环找出一个当前最大值，数组长度减一
  for (let j = len - 1; j > 0; j--) {
    // 根节点与最后一个节点交换
    swap(0, j);
    // 从根节点开始调整，并且最后一个结点已经为当前最大值，不需要再参与比较，所以第三个参数为 j，即比较到最后一个结点前一个即可
    max_heapify(0, j);
  }
  return arr;
}

console.log(heap_sort([25, 76, 34, 232, 6, 456, 221])); // [6, 25, 34, 76, 221, 232, 456]
```

## 复杂性对比

| 名称     | 最好    | 平均           | 最坏       | 内存   | 稳定性 |
| -------- | ------- | -------------- | ---------- | ------ | ------ |
| 归并排序 | nlog(n) | nlog(n)        | nlog(n)    | n      | Yes    |
| 快速排序 | nlog(n) | nlog(n)        | n2         | log(n) | No     |
| 希尔排序 | nlog(n) | 取决于差距序列 | n(log(n))2 | 1      | No     |
| 堆排序   | nlog(n) | nlog(n)        | nlog(n)    | 1      | No     |
