# Git 命令清单

## git 基础概念

Workapce：工作区

Index/Stage：暂存区

Repository：仓库区（本地仓库）

Remote：远程仓库

下面的<name>，指我的分支名

### 常用的拉代码操作：

```shell
git init

git remote add origin “GitHub项目地址” 		(通过ssh或配置git账户然后使用http/https)

git clone “GitHub项目地址”		(通过ssh或配置git账户然后使用http/https)

git checkout -b <name>
```

### 常用的一次提交过程：

```shell
git add .

git commit -m "本次提交信息"

git pull origin master

# 简写 git push -u origin master｜完整 git push --set-upstream origin master
git push -u origin <name>

git push origin <name>
```

### 常用操作：

```shell
git branch		# 查看当前分支

git branch <name>		# 创建分支

git checkout <name>		# 切换分支

git checkout -b <name>		# 创建并切换分支

git branch -D <name>		# 强行删除分支

git merge <name>		# 合并<name>分支到当前分支

git log --oneline  # 查看当前分支的commit日志
```

## 重点：实际场景 - 学习命令

### 场景一

**我正在 dev 分支上开发，突然来了一个 Jira，我不得不丢下手中的代码切换到 master 分支查看情况。只能提个临时的 commit 保存现场吗？**

#### 使用 stash

提一个 commit 当然也可以，但是这种情况最适合的操作是 `git stash ` 来保存中间态

```sh
git stash save "half of work"

git checkout master
...

git checkout feature/dev

git stash pop
```

```sh
# 把所有未提交的修改（包括暂存的和非暂存的）都保存起来
git stash save "msg"

# 应用缓存堆栈中的第一个 stash 后移除它
git stash pop

# 查看 stash 列表
git stash list

# 应用指定的 stash ，但不在事后移除
git stash apply [stash id]

# 查看 stash 的 diff 内容
git stash -p [stash id]

# 移除某个stash
git stash drop [stash id]

# 清空 stash
git stash clear
```

---

### 场景二

**项目开发过程中，即使对应的功能并没有完成，最好每天下班前都提交一下 commit，防止电脑晚上出啥问题导致进度丢失。**

**为了最终不出现太多无意义的或含义重复的 commit，我该怎么做呢？**

#### 使用 amend

```sh
# 将本次修改和上一次 commit 合并，且可以修改 commit msg
# 如果 amend 不输入 -m ，则采用上一次 commit 的msg
# -a 参数就是可以把还没有执行add命令的修改一起提交
git commit -a --amend -m "new msg"
```

---

### 场景三

**我一个人开发某项目，从 master 拉出自己的开发分支 feature/dev，同时 master 仍在更新中，怎样的开发模式可以避免最后合并到 master 时有太多的冲突？**

#### 答案是使用 merge 和 rebase

![merge和rebase的区别](https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/merge-rebase.png)

#### 直观的结果是 merge 产生两根线，rebase 产生一根线。

merge 的优点是使用简单，保留了分支的结构，便于回溯；缺点是分支结构太多，看起来不美观

rebase 的优点是分支结构优雅美观，缺点是丢失了分支结构，模糊了分支间的关系，且 rebase 过程中可能进行多次冲突的解决。

```sh
# on feature/dev
# git fetch + git rebase
# git pull 操作默认的使用 merge 方式将远端修改拉到本地，如果 git pull -r 就会使用 rebase 将远端修改拉到本地
git pull origin master -rebase
# or
git merge master


# 切到需要合并的分支
git checkout <dev>
# 合并<name>分支到当前分支
git merge <master>

# 切到需要合并的分支，也就是 待变基分支、当前分支
git checkout <dev>
# 相当于把<dev>的树枝掰断，嫁接到 基分支<master> 尾端
git rebase <master>

# 官方解释：当执行 rebase 操作时，git 会从两个分支的共同祖先开始提取‘待变基分支上的修改’，然后将待变基分支指向基分支的最新提交，最后将刚才‘提取的修改’应用到‘基分支的最新提交’的后面。
```

具体使用上两者没有好坏之分，根据团队约定即可。

但是多人协作的场景，比如有人在以我的 feature/dev 分支为基础进行开发，要慎用 rebase。

```javascript
rebase 工作流：
git rebase
while(存在冲突) {
    git status
    找到当前冲突文件，编辑解决冲突
    git add -u
    git rebase --continue
    if( git rebase --abort )
        break;
}
merge工作流 ：
1.git pull  (或fetch && merge)
2.编辑冲突文件
3.git pull
```

---

### 场景四

**项目开发过程中没有使用 git commit --amend 整理 commit 记录。可以在项目开发完提交 cr 或 mr 之前，再对 commit 进行整理合并吗？**

#### 答案还是 `git rebase`

```sh
# on feature/dev
# 合并从 startpoint 到 endpoint 的commit，endpoint 默认为HEAD
git rebase -i <startpoint> [endpoint]
#or
# 合并从 HEAD 版本开始往过去数 N 个版本
git rebase -i HEAD~N
```

1. 输入上面的任意一条命令后，分为两个区域，命令编辑区和命令说明区。

2. 在命令编辑区将 pick 改成 s 代表合并此 commit ，将下面两个 pick 改为 s 就是合并到第一个 commit，

   完成编辑后通过 vim 的 `:wq` 或 `:x` 可以保存并退出，进入下一个 msg 修改界面，

3. 修改提交信息后，同样通过 vim 的 `:wq` 或 `:x` 可以保存并退出。

至此，整个合并操作便完成了~

恭喜你，变基成功 ：）🤪

![rebase图示](https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/rebase-process.png)

---

### 场景五

**假设 v2 是稳定版本的分支，v3 是开发版本的分支，我们不能直接把两个分支合并，这样会导致稳定版本混乱，但是又想增加一个 v3 的功能到 v2 中，怎么办？**

![cherry图示](https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/cherry-pick.png)

#### git cherry-pick 可以解决

```sh
# 将指定的提交 commitHash 应用于当前分支
git cherry-pick <commitHash>

# 支持一次 pick 多个提交
git cherry-pick <HashA> <HashB>

# 转移从 A 到 B 的所有提交。且 A 必须早于 B
# A不被包含在 Cherry-pick 中，左开右闭，(A, B]
git cherry-pick A..B

# 作用同上，但 A 包含在 Cherry-pick 中, 左闭右闭，[A, B]
git cherry-pick A^..B
```

---

### merge 和 rebase 解决冲突

上面的一些命令中，容易产生冲突的有 merge、rebase、cherry-pick；其中 rebase 和 cherry-pick 类似，可能连续冲突多次，需要使用 continue 推进下一步。

**rebase、cherry-pick 的冲突是一个一个解决，如果有十个冲突怎么办呢，按照下列命令执行**：

```shell
1. 查看并手动解决冲突

2. git commit -a -m "msg"

3. git rebase –contiune

4. 循环上面三个步骤直到 rebase 成功
```

**而 merge 是所有的冲突都会一次性显示出来。**

**另外如果 rebase 过程中，你想中途退出，恢复 rebase 前的代码则可以用命令**

```shell
git rebase –abort

git push origin <name>		# rebase前最好先push <name>到远端，留下一些记录
```

---

### git pull

**git pull == git fetch(获取) + git merge(合并)**

git merge 前一定要 git fetch，因为 git fetch 相当于将 ‘远程仓库的内容 ’ 更新到 ‘远程仓库副本’

`git fetch`是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中。

而`git pull` 则是将远程主机的最新内容拉下来后直接合并，即：`git pull = git fetch + git merge`，这样可能会产生冲突，需要手动解决。

**企业级理解：**

fecth 只获取信息，不动你的东西。等于你浏览了网页，知道发新番了，你也能上 B 站看，然而你本地么也无有。

pull 就是你看到发新番了，把它下载下来，小心翼翼的备份到了你个人本地的片库里。

---

### 回滚

![revert-reset](https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/gitreset.png)

#### 核心区别：是否生成了一个 revert-commit

由于回滚完还是需要 MR，我们一般直接操作 gitlab 或者 github 上的还原，这个还原其实就是 git revert

#### 但是在合并主分支后，要注意操作顺序

<img src="https://cdn.jsdelivr.net/gh/ringozzt/myPics@main/revert-trap.png" style="zoom:35%;" />

### GUI 软件有助于理解 Git

1. Sourcetree
2. Github Desktop
3. vscode 插件 Git Graph

---

## 总结：

1. stash 暂存命令
2. amend 合并/修改上一个 commit
3. merge 分支合并
4. rebase 变基 or 合并 commit
5. cherry-pick 摘取指定 commit
6. git pull == fetch + merge
7. 两种回滚区别：是否生成了一个 revert-commit

##### 参考文章：

1. 静思的命令行介绍
2. [常用 Git 命令清单](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
3. [Git 远程操作详解](https://www.ruanyifeng.com/blog/2014/06/git_remote.html)
4. [rebase 详解——非常精髓](https://blog.csdn.net/t949500898/article/details/108572456)
