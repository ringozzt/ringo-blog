# 今日技巧

## 2022-4-19

1. 给一些 git 命令设置别名，可以提高效率。

   如果你使用的是oh-my-zsh，那么默认为你安装了一个插件。

   ```shell
   cd ~/.oh-my-zsh/plugins/git
   ls
   README.md      git.plugin.zsh
   ```

   可以看到一个 `git.plugin.zsh` 文件，vi 打开，看到一些 functions 和 N 多的 alias。

   ```shell
   g='git'
   ga='git add'
   gaa='git add --all'
   gapa='git add --patch'
   gb='git branch'
   gba='git branch -a'
   gbd='git branch -d'
   gbda='git branch --no-color --merged | command grep -vE "^(\*|\s*(master|develop|dev)\s*$)" | command xargs -n 1 git branch -d'
   gbl='git blame -b -w'
   gbnm='git branch --no-merged'
   gbr='git branch --remote'
   gbs='git bisect'
   gbsb='git bisect bad'
   gbsg='git bisect good'
   gbsr='git bisect reset'
   gbss='git bisect start'
   gc='git commit -v'
   'gc!'='git commit -v --amend'
   gca='git commit -v -a'
   'gca!'='git commit -v -a --amend'
   gcam='git commit -a -m'
   'gcan!'='git commit -v -a --no-edit --amend'
   'gcans!'='git commit -v -a -s --no-edit --amend'
   gcb='git checkout -b'
   gcd='git checkout develop'
   gcf='git config --list'
   gcl='git clone --recursive'
   gclean='git clean -fd'
   gcm='git checkout master'
   gcmsg='git commit -m'
   'gcn!'='git commit -v --no-edit --amend'
   gco='git checkout'
   gcount='git shortlog -sn'
   gcp='git cherry-pick'
   gcpa='git cherry-pick --abort'
   gcpc='git cherry-pick --continue'
   gcs='git commit -S'
   gd='git diff'
   gdca='git diff --cached'
   gdct='git describe --tags `git rev-list --tags --max-count=1`'
   gdt='git diff-tree --no-commit-id --name-only -r'
   gdw='git diff --word-diff'
   gf='git fetch'
   gfa='git fetch --all --prune'
   gfo='git fetch origin'
   gg='git gui citool'
   gga='git gui citool --amend'
   ggpull='git pull origin $(git_current_branch)'
   ggpur=ggu
   ggpush='git push origin $(git_current_branch)'
   ggsup='git branch --set-upstream-to=origin/$(git_current_branch)'
   ghh='git help'
   gignore='git update-index --assume-unchanged'
   gignored='git ls-files -v | grep "^[[:lower:]]"'
   git-svn-dcommit-push='git svn dcommit && git push github master:svntrunk'
   gk='\gitk --all --branches'
   gke='\gitk --all $(git log -g --pretty=%h)'
   gl='git pull'
   glg='git log --stat'
   glgg='git log --graph'
   glgga='git log --graph --decorate --all'
   glgm='git log --graph --max-count=10'
   glgp='git log --stat -p'
   glo='git log --oneline --decorate'
   globurl='noglob urlglobber '
   glog='git log --oneline --decorate --graph'
   gloga='git log --oneline --decorate --graph --all'
   glol='git log --graph --pretty='\''%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'\'' --abbrev-commit'
   glola='git log --graph --pretty='\''%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'\'' --abbrev-commit --all'
   glp=_git_log_prettily
   glum='git pull upstream master'
   gm='git merge'
   gmom='git merge origin/master'
   gmt='git mergetool --no-prompt'
   gmtvim='git mergetool --no-prompt --tool=vimdiff'
   gmum='git merge upstream/master'
   gp='git push'
   gpd='git push --dry-run'
   gpoat='git push origin --all && git push origin --tags'
   gpristine='git reset --hard && git clean -dfx'
   gpsup='git push --set-upstream origin $(git_current_branch)'
   gpu='git push upstream'
   gpv='git push -v'
   gr='git remote'
   gra='git remote add'
   grb='git rebase'
   grba='git rebase --abort'
   grbc='git rebase --continue'
   grbi='git rebase -i'
   grbm='git rebase master'
   grbs='git rebase --skip'
   grep='grep  --color=auto --exclude-dir={.bzr,CVS,.git,.hg,.svn}'
   grh='git reset HEAD'
   grhh='git reset HEAD --hard'
   grmv='git remote rename'
   grrm='git remote remove'
   grset='git remote set-url'
   grt='cd $(git rev-parse --show-toplevel || echo ".")'
   gru='git reset --'
   grup='git remote update'
   grv='git remote -v'
   gsb='git status -sb'
   gsd='git svn dcommit'
   gsi='git submodule init'
   gsps='git show --pretty=short --show-signature'
   gsr='git svn rebase'
   gss='git status -s'
   gst='git status'
   gsta='git stash save'
   gstaa='git stash apply'
   gstc='git stash clear'
   gstd='git stash drop'
   gstl='git stash list'
   gstp='git stash pop'
   gsts='git stash show --text'
   gsu='git submodule update'
   gts='git tag -s'
   gtv='git tag | sort -V'
   gunignore='git update-index --no-assume-unchanged'
   gunwip='git log -n 1 | grep -q -c "\-\-wip\-\-" && git reset HEAD~1'
   gup='git pull --rebase'
   gupv='git pull --rebase -v'
   gwch='git whatchanged -p --abbrev-commit --pretty=medium'
   gwip='git add -A; git rm $(git ls-files --deleted) 2> /dev/null; git commit --no-verify -m "--wip--"'
   history='fc -l 1'
   l='ls -lah'
   ```

   当然你也可以去 ~/.gitconfig中配置。

2. iterm2中使用`alias+缩写`，可以显示完整的命令

3. vscode中cmd+shift+p，输入shell，可以在path中安装’code‘命令。此后你可以在命令行中通过code+路径的方式用vscode打开一个文件。

4. 在iterm2中按住cmd再拖动文件名到光标处，可以将路径显示

5. 在linux下，~代表用户目录。

   假设用户名是bytedance，~/就代表Users/bytedance

   .代表此目录本身，一般可以省略，所以cd ~/. 和cd ~ 和cd ~/效果是一样的

     但是.后面有东西又是另外一个问题，点在文件名头部，代表一个隐藏文件

     比如~/.zshrc，linux下`ls -a`命令可以看见隐藏文件

   >  / 是目录层的分隔、表示符。
   >
   >  只有一个 / 表明是 root， /etc/ 表明是根目录下面的 etc 目录（当然目录最后不需要 / ，但有 / 直接表明他是目录，没有末尾的 / ，那么 /etc 需要检测一下确定是目录还是文件，虽然习惯上 /etc 绝对是目录）
   >
   >  ~ 是一个代位符，表明的是个人目录的地址，因为每个用户都有自己的个人目录地址，所以用 ~ 作为统一替代这个根据用户不同而不同但有规可循的地址，来保证某些情况下的兼容问题。
   >
   >  / 是根节点， ~ 是 home
   >  如果以root账号登陆 
   >  ~ 是 /root/
   >  / 是 /
   >
   >  如果以 name 登陆
   >  ~ 是 /home/name/
   >  / 是 / 

   

## 4-19

1. 给一些 git 命令设置别名，可以提高效率。

   如果你使用的是oh-my-zsh，那么默认为你安装了一个插件。

   ```shell
   cd ~/.oh-my-zsh/plugins/git
   ls
   README.md      git.plugin.zsh
   ```

   可以看到一个 `git.plugin.zsh` 文件，vi 打开，看到一些 functions 和 N 多的 alias。

   ```shell
   g='git'
   ga='git add'
   gaa='git add --all'
   gapa='git add --patch'
   gb='git branch'
   gba='git branch -a'
   gbd='git branch -d'
   gbda='git branch --no-color --merged | command grep -vE "^(\*|\s*(master|develop|dev)\s*$)" | command xargs -n 1 git branch -d'
   gbl='git blame -b -w'
   gbnm='git branch --no-merged'
   gbr='git branch --remote'
   gbs='git bisect'
   gbsb='git bisect bad'
   gbsg='git bisect good'
   gbsr='git bisect reset'
   gbss='git bisect start'
   gc='git commit -v'
   'gc!'='git commit -v --amend'
   gca='git commit -v -a'
   'gca!'='git commit -v -a --amend'
   gcam='git commit -a -m'
   'gcan!'='git commit -v -a --no-edit --amend'
   'gcans!'='git commit -v -a -s --no-edit --amend'
   gcb='git checkout -b'
   gcd='git checkout develop'
   gcf='git config --list'
   gcl='git clone --recursive'
   gclean='git clean -fd'
   gcm='git checkout master'
   gcmsg='git commit -m'
   'gcn!'='git commit -v --no-edit --amend'
   gco='git checkout'
   gcount='git shortlog -sn'
   gcp='git cherry-pick'
   gcpa='git cherry-pick --abort'
   gcpc='git cherry-pick --continue'
   gcs='git commit -S'
   gd='git diff'
   gdca='git diff --cached'
   gdct='git describe --tags `git rev-list --tags --max-count=1`'
   gdt='git diff-tree --no-commit-id --name-only -r'
   gdw='git diff --word-diff'
   gf='git fetch'
   gfa='git fetch --all --prune'
   gfo='git fetch origin'
   gg='git gui citool'
   gga='git gui citool --amend'
   ggpull='git pull origin $(git_current_branch)'
   ggpur=ggu
   ggpush='git push origin $(git_current_branch)'
   ggsup='git branch --set-upstream-to=origin/$(git_current_branch)'
   ghh='git help'
   gignore='git update-index --assume-unchanged'
   gignored='git ls-files -v | grep "^[[:lower:]]"'
   git-svn-dcommit-push='git svn dcommit && git push github master:svntrunk'
   gk='\gitk --all --branches'
   gke='\gitk --all $(git log -g --pretty=%h)'
   gl='git pull'
   glg='git log --stat'
   glgg='git log --graph'
   glgga='git log --graph --decorate --all'
   glgm='git log --graph --max-count=10'
   glgp='git log --stat -p'
   glo='git log --oneline --decorate'
   globurl='noglob urlglobber '
   glog='git log --oneline --decorate --graph'
   gloga='git log --oneline --decorate --graph --all'
   glol='git log --graph --pretty='\''%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'\'' --abbrev-commit'
   glola='git log --graph --pretty='\''%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'\'' --abbrev-commit --all'
   glp=_git_log_prettily
   glum='git pull upstream master'
   gm='git merge'
   gmom='git merge origin/master'
   gmt='git mergetool --no-prompt'
   gmtvim='git mergetool --no-prompt --tool=vimdiff'
   gmum='git merge upstream/master'
   gp='git push'
   gpd='git push --dry-run'
   gpoat='git push origin --all && git push origin --tags'
   gpristine='git reset --hard && git clean -dfx'
   gpsup='git push --set-upstream origin $(git_current_branch)'
   gpu='git push upstream'
   gpv='git push -v'
   gr='git remote'
   gra='git remote add'
   grb='git rebase'
   grba='git rebase --abort'
   grbc='git rebase --continue'
   grbi='git rebase -i'
   grbm='git rebase master'
   grbs='git rebase --skip'
   grep='grep  --color=auto --exclude-dir={.bzr,CVS,.git,.hg,.svn}'
   grh='git reset HEAD'
   grhh='git reset HEAD --hard'
   grmv='git remote rename'
   grrm='git remote remove'
   grset='git remote set-url'
   grt='cd $(git rev-parse --show-toplevel || echo ".")'
   gru='git reset --'
   grup='git remote update'
   grv='git remote -v'
   gsb='git status -sb'
   gsd='git svn dcommit'
   gsi='git submodule init'
   gsps='git show --pretty=short --show-signature'
   gsr='git svn rebase'
   gss='git status -s'
   gst='git status'
   gsta='git stash save'
   gstaa='git stash apply'
   gstc='git stash clear'
   gstd='git stash drop'
   gstl='git stash list'
   gstp='git stash pop'
   gsts='git stash show --text'
   gsu='git submodule update'
   gts='git tag -s'
   gtv='git tag | sort -V'
   gunignore='git update-index --no-assume-unchanged'
   gunwip='git log -n 1 | grep -q -c "\-\-wip\-\-" && git reset HEAD~1'
   gup='git pull --rebase'
   gupv='git pull --rebase -v'
   gwch='git whatchanged -p --abbrev-commit --pretty=medium'
   gwip='git add -A; git rm $(git ls-files --deleted) 2> /dev/null; git commit --no-verify -m "--wip--"'
   history='fc -l 1'
   l='ls -lah'
   ```

   当然你也可以去 ~/.gitconfig中配置。

2. iterm2中使用`alias+缩写`，可以显示完整的命令

3. vscode中cmd+shift+p，输入shell，可以在path中安装’code‘命令。此后你可以在命令行中通过code+路径的方式用vscode打开一个文件。

4. 在iterm2中按住cmd再拖动文件名到光标处，可以将路径显示

5. 在linux下，~代表用户目录。

   假设用户名是bytedance，~/就代表Users/bytedance

   .代表此目录本身，一般可以省略，所以cd ~/. 和cd ~ 和cd ~/效果是一样的

     但是.后面有东西又是另外一个问题，点在文件名头部，代表一个隐藏文件

     比如~/.zshrc，linux下`ls -a`命令可以看见隐藏文件

   >  / 是目录层的分隔、表示符。
   >
   >  只有一个 / 表明是 root， /etc/ 表明是根目录下面的 etc 目录（当然目录最后不需要 / ，但有 / 直接表明他是目录，没有末尾的 / ，那么 /etc 需要检测一下确定是目录还是文件，虽然习惯上 /etc 绝对是目录）
   >
   >  ~ 是一个代位符，表明的是个人目录的地址，因为每个用户都有自己的个人目录地址，所以用 ~ 作为统一替代这个根据用户不同而不同但有规可循的地址，来保证某些情况下的兼容问题。
   >
   >  / 是根节点， ~ 是 home
   >  如果以root账号登陆 
   >  ~ 是 /root/
   >  / 是 /
   >
   >  如果以 name 登陆
   >  ~ 是 /home/name/
   >  / 是 / 

   

## 4-20

1. node.js - Gulp构建无法正常工作，因为在打包机上NODE_ENV = production时未安装devDependencies。

   首先，把构建工具等依赖放在 devDependencies 的姿势是正确的—[npm](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)。

   实际上构建这个动作属于dev而不是prod。

   解决方案：

   1. npm install --only = dev将安装dev依赖项，而与NODE_ENV无关
   2. 如果一定要设置 NODE_ENV 为 production，可执行 npm install --production=false 取消默认行为。

2. Gulp快速入门：[juejin](https://juejin.cn/post/6917069979913289736)

```sh
gulp的核心api:

task, series, parallel, src, pipe, dest, on, watch
- task: 创建一个任务
- series：顺序执行多个任务
- prallel：并行执行多个任务
- src：读取数据源转换成stream
- pipe：管道-可以在中间对数据流进行处理
- dest：输出数据流到目标路径
- on：事件监听
- watch：数据源监听
```


3. ```sh
   npm i xxx -g === npm i xxx --global # 全局安装
   npm i xxx -D === npm i xxx --save-dev # 安装并写入dev deps依赖
   npm i xxx -S === npm i xxx --save #安装并写入dep依赖
   ```

4. definePlugin：可以用来定义一些环境变量

5. linux下pwd命令，可以展示当前路径

6. npm run build --prefix 可以更改dist文件路径

   

## 4-21

1. 为什么要prepublish，先build一遍，https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html
1. 注意，`prepublish`这个钩子不仅会在`npm publish`命令之前运行，还会在`npm install`（不带任何参数）命令之前运行。
1. cross-env 能够提供一个设置环境变量的script，兼容unix、windows
1. http_proxy=xxx、https_proxy=xxx 可以设置unix环境的代理地址
1. npm i 时FetchError...很可能是没代理导致的请求超时
1. npm i 时只会安装一层 devDeps，比如当前项目的 dev 依赖是 B，B 的 dev 依赖是 C，在控制台 npm install，只会安装 B
1. 默认的NODE_ENV是空，也就是development；会安装deps和devDeps
1. *npm* get registry 可以用来查询npm源
1. 在package-lock.json中可以找到deps依赖包的关系



## 4-25

1. sh和bash的区别：

   两者是不同的标准，bash更具有兼容性
   
   

## 5-1

1. 如果这是一个受控组件的话，一般不这么做，而是组件内触发自己的事件，再调用 props 的 func，还有就是命名的话一般以  onXxxx 来
2. modal 的场景，更合理的应该是 props 有一个 onClose 事件，在点击我知道了或者蒙层的时候，组件内调用 props.onClose，父组件再触发自身的 setShow
3. 表单组件建议全部受控，最好理解，也好控制，有bug好排查



## 5-16

1. npm install --prefix 可以将软件包安装到指定目录中。如：

   ```bash
   npm install --prefix ./my-app react
   ```

   上面的这个命令会将一个`react`包安装到`my-app`文件夹中。

2. npm install --silent 安装过程什么都不输出

3. npm install --quiet 安装过程只输出错误和警告

## 5-30

1. git默认是不允许提交一个空的目录到版本库上的, 可以在空的文件夹里面建立一个.gitkeep文件，然后提交去即可。 其实. gitkeep 就是一个占位符。

## 7-13

1. vscode同一个仓库想开两个分支（两个分屏），可以新建一个父文件夹，再拉一份；这样就可以两个文件夹开两个分支了
2. 跨域问题：浏览器特有的保护措施。协议、域名、端口，任一不同都会造成跨域。可以观察控制台的跨域警告来判断。
   - Charles可以解决跨域：将请求地址写成127.0.0.1（前端地址），然后remote成真实地址，这样经过Charles的转发，就巧妙地绕过了跨域。
3. sticky和fixed的区别：fixed脱标，需要考虑padding重叠的部分。而sticky还在文档流内。尤其是在置顶navbar场景，优先使用sticky。
   - 复习：absolute和fixed脱标，产生新的BFC。

## 小知识

### 关于schema里的url query中extra字段问题

```js 
sslocal://web_view?type=fullscreen&hide_nav_bar=1&url=https%3A%2F%2Fwww.bbb.com%2Frender%2Fworld_center%2Ftemplate%2Fmain%2Findex.html%3Fhide_h5_title%3D0%26scene_id%3D3%26scene_params%3D%257B%2522you_id%2522%253A%252248888846050000601204%2522%257D%26todo_from%3Dmsg_detail
```

1. 为啥需要escape两次value再塞进去呢，因为在Charles中看到的，和在Webview中实际的window.Location是不一样的。
2. webview中的location是parse过一遍的（大概类似于浏览器搜索框会parse一次）
3. 所以如果server只escape一遍，就会出现url不完整的情况，因为extra中有部分字段被一起parse了。接到schema query上去了。
4. 那么escape两遍，前端还需要处理吗？从window.Location...巴拉巴拉中拿到参数之后，这是还是有一层escape在的。
5. 如果是get请求，则可以直接作为入参带过去；因为以koa为例，服务端框架一般都会在处理request前parse一次this.req对象。这时我们这一层escape就被解了。
6. 如果是post，则需要decodeURIComponent(urlParams.xx)搞出真正的extra-value，然后可以JSON.parse转为对象，作为入参传入Body。
7. 综上，传extra字段escape两遍value，前端parse（decode）一次，是url query带复杂json参数一种比较好的方式，如果你愿意还可以套娃多次、加密、哈希全整上。。。
8. 感恩的心



## 7-19

1. 成银老师的几个库还是很超前的，学习依赖注入、ast
2. 学习单一责任原则。一个组件只做一件事。
3. 自下而上最初比较慢，但从长远来看会更快，因为它的适应性更强。你可以更容易地避免仓促的抽象，而是随着时间的推移在变化的浪潮中游走，直到正确的抽象变得明显。

####  部分摘要：

1. 我们的心理模型，我们对事物的思考方式，最终在很大程度上影响了我们的决定。
2. 当我们作为一个团队建立东西时，重要的是明确我们所拥有的模型，并期望其他人拥有。因为每个人通常都有他们自己的隐含模型。
3. **这个组件的一个责任是什么？**好的组件API设计自然遵循单一责任原则，这对组合模式很重要。我们很容易把简单的东西混为一谈。随着需求的到来和变化，保持简单的东西往往是相当困难的
4. **什么是其状态的绝对最小但完整的表示？**这个想法是，最好从你的状态的最小但完整的真相来源开始，你可以从中衍生出变化。这很灵活，也很简单，而且可以避免常见的数据同步错误，比如更新一个状态而不更新另一个。 

自上而下与自下而上，我想这好比vue和react。

- 自上而下的思维模式倾向于从一开始就把自己固定在一个特定的抽象概念上，以解决眼前的问题。它是直观的。它常常被认为是构建组件的最直接的方法。它也经常导致API优化为*初始的*容易消费。
- 与自上而下的方法相比，自下而上的方法往往不那么直观，而且最初可能会比较慢。它导致了多个较小的组件，但是其API是可重复使用的。总的复杂性分布在许多较小的单一责任组件中，而不是一个单一的单体组件。
- 自下而上的方法可以让你在长期内更好地迭代。

文章中还有一些智慧之处。

> A component should ideally only do one thing. If it ends up growing, it should be decomposed into smaller sub components.

> 一个组件最好只做一件事。如果它最终发展壮大，它应该被分解成更小的子组件。





## 7-20

1. 打包的几种途径webpack、rollup、esbuild（仅esm），他们如何tree-shaking

2. monorepo抽一个文件夹放业务组件，esm单独引入

3. modal组件如何抽象，以受控的方式去改变蒙层状态，关闭的操作作为onConfirm的入参透传给用户

4. 声明式：confirmModal全局方法

   ``` js
   let root = document.querySelector('#confirm-modal');
   if (!root) {
     root = document.createElement('div');
     root.id = 'confirm-modal';
     document.body.appendChild(root);
   }
   ```

## 7-21

1. 学习动作结构的定义


