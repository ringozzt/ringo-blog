# 桶排序

时间复杂度： O(N+R)

空间复杂度： O(N+R)

## 基本思想

桶排序是计数排序的升级版。

它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。

为了使桶排序更加高效，我们需要做到这两点：

- 在额外空间充足的情况下，尽量增大桶的数量。
- 使用的映射函数能够将输入的 N 个数据均匀的分配到 K 个桶中。

> 什么时候最快（Best Cases）： 当输入的数据可以均匀的分配到每一个桶中

> 什么时候最慢（Worst Cases）： 当输入的数据被分配到了同一个桶中

## 实现

1. 取 n 个桶，根据数组的最大值和最小值确认每个桶存放的数的区间。
2. 将数组元素插入到相应的桶里，最后再合并各个桶。

```js
function bucketSort(nums) {
  // 桶的个数，只要是正数即可
  let num = 5;
  let max = Math.max(...nums);
  let min = Math.min(...nums);
  // 计算每个桶存放的数值范围，至少为1
  // 向上取整
  let range = Math.ceil((max - min) / num) || 1;
  // 创建二维数组，第一维表示第几个桶，第二维表示该桶里存放的数
  let arr = Array.from(Array(num)).map(() => Array().fill(0));
  nums.forEach((val) => {
    // 计算元素应该分布在哪个桶
    let index = parseInt((val - min) / range);
    // 防止index越界，例如当[5,1,1,2,0,0]时index会出现5
    index = index >= num ? num - 1 : index;
    // temp就是一个桶
    let temp = arr[index];
    // 插入排序，将元素有序插入到桶中
    let j = temp.length - 1;
    while (j >= 0 && val < temp[j]) {
      temp[j + 1] = temp[j];
      j--;
    }
    temp[j + 1] = val;
  });
  // 修改回原数组
  let res = [].concat.apply([], arr);
  nums.forEach((val, i) => {
    nums[i] = res[i];
  });
  return nums;
}

console.log(bucketSort([3, 4, 5, 6, 7, 9, 12, 15], 15));
```
