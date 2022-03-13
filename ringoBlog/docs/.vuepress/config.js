module.exports = {
  title: `noob BLOG`,
  description: 'ringo的搬砖记录',
  head: [['link', { rel: 'icon', href: './favicon.ico' }]],
  base: '/ringo-blog/',
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    subSidebar: 'auto',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '鼓足干劲，力争上游',
        items: [
          { text: 'Github', link: 'https://github.com/ringozzt' },
          // {
          //   text: '掘金',
          //   link: '',
          // },
        ],
      },
    ],
    sidebar: [
      {
        title: '关于我',
        path: '/',
        collapsable: false, // 不折叠
        children: [{ title: `出道一年的前端练习生`, path: '/' }],
      },
      {
        title: 'HTML',
        path: '/html/html-detail',
        collapsable: false, // 不折叠
        children: [
          { title: 'script和link标签', path: '/html/script' },
          { title: 'src和href属性', path: '/html/src-href' },
          { title: 'meta标签', path: '/html/meta' },
          { title: '补充关于html', path: '/html/html-detail' },
          { title: '浅聊语义化', path: '/html/html-semantic' },
        ],
      },
      {
        title: 'CSS基础',
        path: '/css/layout',
        collapsable: false, // 不折叠
        children: [
          { title: '常见布局', path: '/css/layout' },
          { title: 'CSS动画', path: '/css/css3' },
          { title: '细节盘点', path: '/css/qa' },
          { title: '重绘重排', path: '/css/reflow' },
          { title: '伪类和伪元素', path: '/css/pseudo' },
        ],
      },
      {
        title: 'JavaScript',
        path: '/js/base',
        collapsable: false, // 不折叠
        children: [
          { title: 'BOM', path: '/js/bom' },
          { title: 'DOM', path: '/js/dom' },
          { title: 'JS编程基础', path: '/js/js-base' },
          { title: 'JS编程进阶', path: '/js/js-senior' },
          { title: 'ES6 基本语法', path: '/js/es6' },
          { title: '事件循环', path: '/js/event-loop' },
          { title: '关于Promise', path: '/js/promise' },
          { title: '异步编程方案', path: '/js/async' },
          { title: '类型判断', path: '/js/type' },
          { title: '事件流', path: '/js/evt-agent' },
          { title: '数组方法', path: '/js/arr' },
          { title: '字符串方法', path: '/js/str' },
          { title: '一行代码实现', path: '/js/single-line-util' },
          { title: 'null和undefined', path: '/js/null' },
        ],
      },
      {
        title: '浏览器',
        path: '/base/fe-cache',
        collapsable: false, // 不折叠
        children: [
          { title: '进程、线程、协程', path: '/base/process' },
          { title: '前端缓存和鉴权', path: '/base/fe-cache' },
          { title: '从输入URL到呈现页面', path: '/browser/from-url' },
          { title: '跨域问题', path: '/browser/cross-origin' },
          { title: 'Webview', path: '/browser/webview' },
          { title: '浏览器的5种观察者', path: '/browser/observer' },
        ],
      },
      {
        title: '前端进阶',
        path: '/advance/optimize',
        collapsable: false, // 不折叠
        children: [
          { title: '长列表', path: '/advance/longlist' },
          { title: '性能优化', path: '/advance/optimize' },
          { title: 'WebSocket', path: '/advance/ws' },
        ],
      },
      {
        title: '框架',
        path: '/mvvm/diff',
        collapsable: false, // 不折叠
        children: [
          { title: '数据驱动视图', path: '/mvvm/diff' },
          { title: 'React Fiber模型', path: '/mvvm/fiber' },
          { title: 'React 15到16', path: '/mvvm/v16' },
          { title: '拒绝Index作key', path: '/mvvm/whynoindexkey' },
          { title: 'React源码学习', path: '/mvvm/react-source' },
          { title: '第一次技术分享', path: '/mvvm/share1' },
          { title: '状态管理方案', path: '/mvvm/store' },
          { title: 'react-dom', path: '/mvvm/react-dom' },
          { title: '小程序原理', path: '/mvvm/mini-program' },
        ],
      },
      {
        title: '工程化基础',
        path: '/project/fe-module',
        collapsable: false, // 不折叠
        children: [
          { title: '模块化基础', path: '/project/fe-module' },
          { title: '浅聊package.json', path: '/project/package.json' },
          { title: 'webpack入门', path: '/project/webpack-base' },
          { title: 'Tree-shaking', path: '/project/tree-shaking' },
        ],
      },
      {
        title: '服务端基础',
        path: '/node/koa-compose',
        collapsable: false, // 不折叠
        children: [{ title: 'koa-中间件机制', path: '/node/koa-compose' }],
      },
      {
        title: '计算机大观园',
        path: '/base/git',
        collapsable: false, // 不折叠
        children: [
          { title: 'Git备忘录', path: '/base/git' },
          { title: '函数式编程', path: '/base/functional' },
          { title: 'svg和canvas', path: '/base/svg-canvas' },
          { title: '云原生概念', path: '/cloud/cloud-native' },
          { title: 'Docker入门', path: '/cloud/docker' },
        ],
      },
      {
        title: '数据结构',
        path: '/algo/map',
        collapsable: false, // 不折叠
        children: [
          { title: '字典', path: '/algo/map' },
          { title: '集合', path: '/algo/set' },
          { title: '链表', path: '/algo/list-node' },
          { title: '堆', path: '/algo/heap' },
          { title: '冒泡排序', path: '/algo/bubble-sort' },
          { title: '选择排序', path: '/algo/select-sort' },
          { title: '插入排序', path: '/algo/insert-sort' },
          { title: '快速排序', path: '/algo/quick-sort' },
          { title: '归并排序', path: '/algo/merge-sort' },
        ],
      },
      {
        title: '实用工具',
        path: '/utils/caniuse',
        collapsable: false, // 不折叠
        children: [
          { title: 'CanIUse', path: '/utils/caniuse' },
          { title: 'base64转换', path: '/utils/show-base64' },
          { title: '可视化正则', path: '/utils/show-regexp' },
        ],
      },
      {
        title: '日报&周报',
        path: '/daily/day20210930',
        collapsable: false, // 不折叠
        children: [
          { title: '日报20210930', path: '/daily/day20210930' },
          { title: '周报20210930', path: '/daily/week20210930' },
          { title: '日报20211009', path: '/daily/day20211009' },
          { title: '日报20211011', path: '/daily/day20211011' },
          { title: '日报20211012', path: '/daily/day20211012' },
          { title: '日报20211013', path: '/daily/day20211013' },
          { title: '日报20211021', path: '/daily/day20211021' },
          { title: '日报20211022', path: '/daily/day20211022' },
          { title: '日报20211026', path: '/daily/day20211026' },
          { title: '日报20211117', path: '/daily/day20211117' },
        ],
      },
    ],
  },
};
