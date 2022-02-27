module.exports = {
  head: [['link', { rel: 'icon', href: './favicon.ico' }]],
  title: `noob BLOG`,
  description: 'ringo的搬砖记录',
  theme: 'reco',
  // 路径名为 "/<REPO>/"
  base: '/ringo-blog/',
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  themeConfig: {
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
          { title: '盘点html中的细节', path: '/html/html-detail' },
          { title: '细看语义化', path: '/html/html-semantic' },
        ],
      },
      {
        title: 'CSS基础',
        path: '/css/layout',
        collapsable: false, // 不折叠
        children: [
          { title: '常见布局', path: '/css/layout' },
          { title: '重绘重排', path: '/css/reflow' },
          { title: '伪类和伪元素', path: '/css/pseudo' },
        ],
      },
      {
        title: 'JavaScript',
        path: '/js/base',
        collapsable: false, // 不折叠
        children: [
          { title: 'JS编程基础', path: '/js/base' },
          { title: 'ES6 基本语法', path: '/js/es6' },
          { title: '异步编程方案', path: '/js/generator' },
          { title: 'JS之类型判断', path: '/js/type' },
          { title: '事件流', path: '/js/evt-agent' },
          { title: '数组方法盘点', path: '/js/arr' },
          // { title: 'BOM', path: '/basis/es6' },
          // { title: '事件流，事件捕获，冒泡', path: '/basis/es6' },
        ],
      },
      {
        title: '浏览器',
        path: '/base/fe-cache',
        collapsable: false, // 不折叠
        children: [
          { title: '进程、线程、协程', path: '/base/process' },
          { title: '从输入URL到呈现页面', path: '/base/from-url' },
          { title: '前端缓存和鉴权', path: '/base/fe-cache' },
          { title: '跨域问题', path: '/base/cross-origin' },
          { title: 'Webview', path: '/base/webview' },
          { title: '性能优化', path: '/advance/optimize' },
        ],
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
        title: '工程化基础',
        path: '/project/fe-module',
        collapsable: false, // 不折叠
        children: [{ title: '模块化基础', path: '/project/fe-module' }],
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
