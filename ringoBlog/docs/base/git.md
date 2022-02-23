# Git 命令清单

## 首先梳理几个 git 的概念：

Workapce：工作区

Index/Stage：暂存区

Repository：仓库区（本地仓库）

Remote：远程仓库

下面的<name>，指我的分支名

## 常用的拉代码操作：

```shell
git  init

git remote add origin “GitHub项目地址” 		(通过ssh或配置git账户然后使用http/https)

git clone “GitHub项目地址”		(通过ssh或配置git账户然后使用http/https)

git checkout -b <name>

##
```

## 常用的一次提交过程：

```shell
git add .

git commit -m “本次提交信息”

git pull origin master

git push -u origin <name>

git push origin <name>
```

## 常用操作：

```shell
git branch		##查看当前分支

git branch <name>		##创建分支

git checkout <name>		##切换分支

git checkout -b <name>		##创建并切换分支

git branch -D <name>		##强行删除分支

git merge <name>		##合并<name>分支到当前分支
```

## rebase 和 merge

```shell
git checkout <name>

git rebase master
```

#### rebase 和 merge 的另一个区别是 rebase 的冲突是一个一个解决，如果有十个冲突，先解决第一个，然后执行下列命令：

```shell
git add -u

git rebase –contiune
```

#### 继续后才会出现第二个冲突，直到所有冲突解决完，而 merge 是所有的冲突都会一次性显示出来。另外如果 rebase 过程中，你想中途退出，恢复 rebase 前的代码则可以用命令：

```shell
git rebase –abort

git push origin <name>		## rebase前最好先push <name>到远端，否则可能无法push
```

#### git pull == git fetch(获取) + git merge(合并)

git merge 前一定要 git fetch，因为 git fetch 相当于将 ‘远程仓库的内容 ’ 更新到 ‘远程仓库副本’

`git fetch`是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中。

而`git pull` 则是将远程主机的最新内容拉下来后直接合并，即：`git pull = git fetch + git merge`，这样可能会产生冲突，需要手动解决。

fecth 只获取信息，不动你的东西。等于你浏览了网页，知道发新番了，你也能上 B 站看，然而你本地么也无有。

pull 就是你看到发新番了，把它下载下来，小心翼翼的备份到了你个人本地的片库里。

#### 最直观地说，merge 方式来合并的分支会有很多分叉，而 rebase 出来的就是一条直线

两者得到的结果是一样的，merge 就是两个分支在最后交汇，rebase 就是将两个分支并成了一条分支，<name>合并前所有的 commit 消失了

对于多人协作的项目来说，merge 的方式并不好，实际工作中推荐使用 rebase 来合并代码

git pull 操作默认的使用 merge 方式将远端修改拉到本地，如果 git pull -r 就会使用 rebase 将远端修改拉到本地

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

##### 参考文章：

1.https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html

2.https://www.ruanyifeng.com/blog/2014/06/git_remote.html

3.https://blog.csdn.net/t949500898/article/details/108572456
