# package.json 是啥

这个文件存在于绝大多数前端项目中，npm 加载，webpack 等工具的打包都依赖这个文件夹。

### 版本控制

- 指定版本：比如"axios": "0.18.0"，表示安装 0.18.0 的版本
- 波浪号~：比如 "axios": "~1.0.12"，不改变大版本号和次要版本号，表示安装 1.0.x 的最新版本（不低于 1.0.12），但是不安装 1.1.x
- 插入号^：比如 "axios": "^0.3.0"，不改变大版本号，表示安装 0.3.0 及以上的版本，但是不安装 1.0.0
- 比较运算符 >、<、>=、<=，匹配的就是这个区间的版本，例如>3.0.0 <= 3.1.4 ，就会匹配这个区间的版本号
- latest：安装最新的版本

### browserslist

browserslist 字段用来告知支持哪些浏览器及版本。Babel、Autoprefixer 和其他工具会用到它，以将所需的 polyfill 和 fallback 添加到目标浏览器。

### npm install 的不同

`npm install *** --save` 安装到 dependencies
`npm install *** --save-dev` 安装到 devDependencies

#### dependencies 中的依赖

这种依赖是向下遍历的，比如 A 库依赖 B 库，B 库依赖 C 库，在 A 库中 npm install 时，会同时安装 B 和 C

#### devDependencies

install 时只会安装一层 dev 依赖，比如当前项目的 dev 依赖是 B，B 的 dev 依赖是 C，在控制台 npm install，只会安装 B

### dependencies

dependencies 字段中声明的是项目的生产环境中所必须的依赖包。

使用 npm install 安装时**会**安装这些依赖。

### devDependencies

devDependencies 中声明的是开发阶段需要的依赖包，如 Webpack、Eslint、Babel 等，用于辅助开发。

使用 npm install 安装时**会**安装这些依赖。

### peerDependencies

同等依赖，或者叫同伴依赖，用于指定当前包（也就是你写的包）兼容的宿主版本。比如 antd 的开发依赖于 React。

peerDependencies 中的包是没有显式依赖的，这里面的包是你希望调用者项目内有，但是**不会自动下载**。

如果调用者项目内没有这些包，则会在控制台报黄色警告。

### scripts

scripts 是 package.json 中内置的脚本入口，是 key-value 键值对配置，key 为可运行的命令，可以通过 npm run 来执行命令。除了运行基本的 scripts 命令，还可以结合 pre 和 post 完成前置和后续操作。

### main

main 字段用来指定加载的入口文件，在 browser 和 Node 环境中都可以使用。如果不指定该字段，默认是项目根目录下的 index.js。如果没找到，就会报错。

### husky

用于配置一些 git 提交生命周期中的回调，验证当前文件规则是否符合要求。

### lint-staged

lint-staged 是一个在 Git 暂存文件上运行 linters 的工具，配置后每次修改一个文件即可给所有文件执行一次 lint 检查，通常配合 gitHooks\husky 一起使用。
