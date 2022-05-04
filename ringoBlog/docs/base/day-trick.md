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

   

## 2022-4-20

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

   

## 2022-4-20

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

   

## 2022-4-21

1. 为什么要prepublish，先build一遍，https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html
1. 注意，`prepublish`这个钩子不仅会在`npm publish`命令之前运行，还会在`npm install`（不带任何参数）命令之前运行。
1. cross-env 能够提供一个设置环境变量的script，兼容unix、windows
1. http_proxy=xxx、https_proxy=xxx 可以设置unix环境的代理地址
1. npm i 时FetchError...很可能是没代理导致的请求超时
1. npm i 时只会安装一层 devDeps，比如当前项目的 dev 依赖是 B，B 的 dev 依赖是 C，在控制台 npm install，只会安装 B
1. 默认的NODE_ENV是空，也就是development；会安装deps和devDeps
1. *npm* get registry 可以用来查询npm源
1. 在package-lock.json中可以找到deps依赖包的关系