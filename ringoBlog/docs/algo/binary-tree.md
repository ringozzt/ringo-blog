# 二叉树

二叉树是一种每个节点最多只能有两个子节点的**树**。

树是一种**分层**数据的抽象模型。

树的常用操作：

- 深度优先遍历，尽可能**深**地搜索树的分支。
  - 前序遍历，根-左-右
  - 中序遍历，左-根-右
  - 后序遍历，左-右-根
- 广度优先遍历，先访问离根节点**最近**的节点。
  - 层序遍历

## 树的遍历

比如有这么一棵树

<img src="https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/Blog/b-tree.png" alt="binary-tree" style="zoom: 67%;" />

在 JavaScript 中常用`Object`来实现二叉树，如上图二叉树可表示为：

```javascript
// 层序结果 [1, 2, 3, 4, 5, 6, 7, null, null, 8, 9]
const bt = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: {
      val: 5,
      left: {
        val: 8,
        left: null,
        right: null,
      },
      right: {
        val: 9,
        left: null,
        right: null,
      },
    },
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: null,
      right: null,
    },
    right: {
      val: 7,
      left: null,
      right: null,
    },
  },
};
```

### 前序遍历

1. 访问**根节点**
2. 对根节点的**左子树**进行**前序遍历**
3. 对根节点的**右子树**进行**前序遍历**

![front-traverse](https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/Blog/f-traverse.gif)

**递归版：**

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 递归前序遍历： 根 - 左 - 右
const preorderTraversal = (root) => {
  const res = [];
  const preOrder = (root) => {
    if (!root) return;
    res.push(root.val); // 根
    preOrder(root.left); // 左
    preOrder(root.right); // 右
  };
  preOrder(root);
  return res;
};
```

**非递归版：**

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 前序遍历（非递归）
const preorderTraversal = (root) => {
  if (!root) return [];
  const res = [];
  const stack = [root];
  while (stack.length) {
    // n是栈顶元素，栈顶元素出栈
    const n = stack.pop();
    // 访问栈顶元素
    res.push(n.val);
    // 栈顶左节点入栈
    n.right && stack.push(n.right);
    // 栈顶右节点入栈
    n.left && stack.push(n.left);
  }
  return res;
};
```

### 中序遍历

1. 对根节点的**左子树**进行**前序遍历**
2. 访问**根节点**
3. 对根节点的**右子树**进行**前序遍历**

![mid-traverse](https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/Blog/mid-traverse.gif)

**递归版：**

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 递归中序遍历：左-根-右
const inorderTraversal = (root) => {
  const res = [];
  const inOrder = (root) => {
    if (!root) return;
    inOrder(root.left); // 左
    res.push(root.val); // 根
    inOrder(root.right); // 右
  };
  inOrder(root);
  return res;
};
```

**非递归版：**

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 中序遍历（非递归）
const inorderTraversal = (root) => {
  if (!root) return [];
  const res = [];
  const stack = [];
  let p = root;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const n = stack.pop();
    res.push(n.val);
    p = n.right;
  }
  return res;
};
```

### 后序遍历

1. 对根节点的**左子树**进行**前序遍历**
2. 对根节点的**右子树**进行**前序遍历**
3. 访问**根节点**

![back-traverse](https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/Blog/b-traverse.gif)

**递归版：**

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 递归后序遍历：左-右-根
const postorderTraversal = (root) => {
  const res = [];
  const postOrder = (root) => {
    if (!root) return;
    postOrder(root.left); // 左
    postOrder(root.right); // 右
    res.push(root.val); // 根
  };
  postOrder(root);
  return res;
};
```

**非递归版：**

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 后序遍历（非递归）
const postorderTraversal = (root) => {
  if (!root) return [];
  const arr = [root];
  const res = [];
  while (arr.length) {
    const n = arr.pop();
    res.unshift(n.val);
    n.left && arr.push(n.left);
    n.right && arr.push(n.right);
  }
  return res;
};
```

---

#### 转载自：

1. [数据结构-二叉树](https://lzxjack.top/post?title=b-tree)
2. [数据结构-树](https://lzxjack.top/post?title=tree)
