# 计数排序

时间复杂度：O(N+R)

空间复杂度：O(N+R)

R: 待排数组最值之差（记为 R）

## 基本思想

所谓“计数”，就是数一数，统计每个元素重复出现的次数。

分为两步：查和排。

首先查一查每个元素都出现了多少次，比如元素 0 出现了 1 次，元素 1 出现了 1 次，元素 2 出现了 3 次等。

都统计好了，然后排序的过程就简单了，从小到大按顺序填充数组即可，出现几次就填充几次就好了。

“从小到大”这个词语，就体现了排序的过程。

## 实现

核心是用一个计数表来记录差值，遍历此表即可还原出排序后的数组。

```js
const sortArray = (nums) => {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;

  // 记录下最值
  for (const num of nums) {
    num < min && (min = num);
    num > max && (max = num);
  }
  // 初始化 计数表
  const count = new Array(max - min + 1).fill(0);

  // 将与最小值的差值记录下来
  for (const num of nums) {
    count[num - min]++;
  }

  let index = 0;
  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      // 注意这里是index++，不是i++
      // 用计数表下标+min，还原出 源数据。
      nums[index++] = i + min;
      // 考虑重复元素情况
      count[i]--;
    }
  }
  return nums;
};

console.log(sortArray([25, 76, 34, 232, 6, 456, 221]));
```
