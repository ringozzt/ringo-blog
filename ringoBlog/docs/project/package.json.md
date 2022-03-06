# package.json 是啥

这个文件存在于绝大多数前端项目中，npm 加载，webpack 等工具的打包都依赖这个文件夹。

### 版本控制

- 指定版本：比如"axios": "0.18.0"，表示安装 0.18.0 的版本
- 波浪号~：比如 "axios": "~1.0.12",表示安装 1.0.x 的最新版本（不低于 1.0.12），但是不安装 1.1.x，也就是说安装时不改变大版本号和次要版本号
- 插入号^：比如 "axios": "^0.3.0"，表示安装 0.3.0 及以上的版本，但是不安装 1.0.0，也就是说安装时不改变大版本号
- latest：安装最新的版本

### browserslist

browserslist 字段用来告知支持哪些浏览器及版本。Babel、Autoprefixer 和其他工具会用到它，以将所需的 polyfill 和 fallback 添加到目标浏览器。

### dependencies

dependencies 字段中声明的是项目的生产环境中所必须的依赖包。

### devDependencies

devDependencies 中声明的是开发阶段需要的依赖包，如 Webpack、Eslint、Babel 等，用于辅助开发。它们只需安装在开发设备上，而无需在生产环境中运行代码。

### peerDependencies

用来供插件指定其所需要的主工具的版本。

### scripts

scripts 是 package.json 中内置的脚本入口，是 key-value 键值对配置，key 为可运行的命令，可以通过 npm run 来执行命令。除了运行基本的 scripts 命令，还可以结合 pre 和 post 完成前置和后续操作。

### main

main 字段用来指定加载的入口文件，在 browser 和 Node 环境中都可以使用。如果不指定该字段，默认是项目根目录下的 index.js。如果没找到，就会报错。

### husky

用于配置一些 git 提交生命周期中的回调，验证当前文件规则是否符合要求。

### lint-staged

lint-staged 是一个在 Git 暂存文件上运行 linters 的工具，配置后每次修改一个文件即可给所有文件执行一次 lint 检查，通常配合 gitHooks\husky 一起使用。