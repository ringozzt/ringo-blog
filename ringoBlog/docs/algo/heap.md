# 堆

## 概念

堆是具有以下性质的**完全二叉树**（注：**没有要求左右值的大小关系**）

- 最大堆：所有节点都大于等于它的左右子节点
- 最小堆：所有节点都小于等于它的左右子节点

> 注意因为完全二叉树的性质，可以用数组表示对应的树结构（所以，堆排序过程中，你是看不到树这数据结构的，用数组进行映射了），这就是`顺序存储`

即按照**广度优先遍历**的顺序依次填入到**数组**中。

另外，节点位置与数组的下标`index`有如下关系：

- 任意节点的**左侧子节点**（若存在）的位置：`2 × index + 1`
- 任意节点的**右侧子节点**（若存在）的位置：`2 × index + 2`
- 任意节点的**父节点**的位置：`( index - 1 ) / 2`（商）

堆经常被用来实现优先队列，这种结构优势是可以动态分配内存大小，缺点是运行时需动态分配内存，存取速度较慢。

- React16 中新增的调度器 `Scheduler` ，内部维护了**taskQueue**就是用小顶堆实现的，所有的任务按照过期时间，从小到大进行排列，这样 `Scheduler` 就可以只花费 O(1)复杂度找到队列中最早过期，或者说最高优先级的那个任务。

- 堆排序局部性差，导致缓存命中率低

---

## 实现

创建一个大顶堆（小顶堆）常用的方式有两种：

- 插入式建堆：每次插入一个节点，实现一个大顶堆（或小顶堆）
- 原地建堆：又称堆化，给定一组节点，实现一个大顶堆（或小顶堆）

### 方法一：插入式建堆

**时间复杂度：** O(logn)，为树的高度

**插入节点：**

- 将节点插入到队尾
- **自下往上堆化：** 将插入节点与其父节点比较，如果插入节点大于父节点（大顶堆）或插入节点小于父节点（小顶堆），则插入节点与父节点调整位置
- 一直重复上一步，直到不需要交换或交换到根节点，此时插入完成。

### TopK 问题——小顶堆

```js
// 小顶堆------插入式建堆
class MinHeap {
  constructor() {
    this.heap = [];
  }
  // 交换节点位置
  swap(i1, i2) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }
  // 获得父节点
  getParentIndex(i) {
    // 除2
    return (i - 1) >> 1;
  }
  // 获得左子节点
  getleftIndex(i) {
    return 2 * i + 1;
  }
  // 获得右子节点
  getrightIndex(i) {
    return 2 * i + 2;
  }
  // 上移，入堆
  // 将插入节点与其父节点比较，如果插入节点小于父节点，交换
  shiftUp(index) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    // 比较 当前节点 和 父节点 大小
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      // 递归，直到不需要交换或交换到根节点，此时插入完成
      this.shiftUp(parentIndex);
    }
  }
  // 下移，堆化
  shiftDown(index) {
    const leftIndex = this.getleftIndex(index);
    const rightIndex = this.getrightIndex(index);
    // 左节点小于父节点
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  // 插入
  insert(value) {
    this.heap.push(value);
    // 最后一个元素入堆
    this.shiftUp(this.heap.length - 1);
  }
  // 删除堆顶
  pop() {
    // 数组pop()，length-1
    // 返回值（小顶堆的最后一个元素）赋值给堆顶
    // 原最小值被覆盖了
    this.heap[0] = this.heap.pop();
    // 对堆顶重新排序
    this.shiftDown(0);
  }
  // 获取堆顶
  peek() {
    return this.heap[0];
  }
  // 获取堆的大小
  size() {
    return this.heap.length;
  }
}

// TopK 问题
const findKthLargest = (nums, k) => {
  // 维护一个 k个元素的小顶堆
  const minHeap = new MinHeap();
  for (const num of nums) {
    // 将数组元素依次插入堆中
    minHeap.insert(num);
    // 如果堆大小超过k，将堆顶(最小值) 用堆尾(最大值)覆盖
    if (minHeap.size() > k) minHeap.pop();
  }
  // 返回堆顶，此时堆顶就是第k大的元素（比它小的都被去掉了，比它大的在堆下面）
  return minHeap.peek();
};

console.log(findKthLargest([1, 2, 3, 4, 5, 6], 3));
```

### 方法二：原地建堆（堆化）

原地建堆的方法有两种：一种是承袭上面插入的思想，即从前往后、自下而上式堆化建堆；与之对应的另一种是，从后往前、自上往下式堆化建堆。其中

- **自下而上式堆化** ：将节点与其父节点比较，如果节点大于父节点（大顶堆）或节点小于父节点（小顶堆），则节点与父节点调整位置
- **自上往下式堆化** ：将节点与其左右子节点比较，如果存在左右子节点大于该节点（大顶堆）或小于该节点（小顶堆），则将子节点的最大值（大顶堆）或最小值（小顶堆）与之交换

**所以，自下而上式堆是调整节点与父节点（往上走），自上往下式堆化是调整节点与其左右子节点（往下走）**

---

## 补充

### JS 中的引用数据类型

Object、Array、Function...

存储在堆内存

- 占据空间大、大小不确定
- 引用数据类型在栈中存储了指针，指向堆内该实体的起始地址
- Js 解释器寻找引用值时，会先检索栈中的地址，再获得堆中的实体

---

## 感谢巨人：

1. [前端进阶算法 9](https://juejin.cn/post/6844904179278823437)
2. [飞鸟-数据结构-堆](https://lzxjack.top/post?title=heap)
