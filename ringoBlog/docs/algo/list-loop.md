# 链表是否有环

目前有三种思路：

1. 标志位判断是否走过
2. js api 特性：不能序列化循环结构，try catch 判断
3. 快慢指针是否相遇

## 解法一：标志法

给每个已遍历过的节点加标志位，遍历链表，当出现下一个节点已被标志时，则证明单链表有环

```js
var hasCycle = function (head) {
  while (head) {
    if (head.flag) return true;
    head.flag = true;
    head = head.next;
  }
  return false;
};
```

时间复杂度：O(n) 空间复杂度：O(n)

## 解法二：利用 JSON.stringify() 不能序列化含有循环引用的结构

```js
var hasCycle = function (head) {
  try {
    JSON.stringify(head);
    return false;
  } catch (err) {
    return true;
  }
};
```

时间复杂度：O(n) 空间复杂度：O(n)

## 解法三：快慢指针（双指针法）

设置快慢两个指针，遍历单链表，快指针一次走两步，慢指针一次走一步，如果单链表中存在环，则快慢指针终会指向同一个节点，否则直到快指针指向 null 时，快慢指针都不可能相遇

```js
var hasCycle = function (head) {
  if (!head || !head.next) {
    return false;
  }
  let fast = head.next.next,
    slow = head;
  while (fast !== slow) {
    if (!fast || !fast.next) return false;
    fast = fast.next.next;
    slow = slow.next;
  }
  return true;
};
```

时间复杂度：O(n) 空间复杂度：O(1)
