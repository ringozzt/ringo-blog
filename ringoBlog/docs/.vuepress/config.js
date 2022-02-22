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
  },
  themeConfig: {
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
        path: '/basis',
        collapsable: false, // 不折叠
        children: [{ title: '语义化', path: '/basis/html_semantic' }],
      },
      {
        title: 'CSS基础',
        path: '/basis/css',
        collapsable: false, // 不折叠
        children: [{ title: '常见布局', path: '/basis/css' }],
      },
      {
        title: 'JavaScript',
        path: '/basis/js1',
        collapsable: false, // 不折叠
        children: [
          { title: 'JS编程基础', path: '/basis/js1' },
          { title: 'ES6 基本语法', path: '/basis/es6' },
          // { title: 'BOM', path: '/basis/es6' },
          // { title: '事件流，事件捕获，冒泡', path: '/basis/es6' },
        ],
      },
      {
        title: '浏览器',
        path: '/cs_basis/fe_cache',
        collapsable: false, // 不折叠
        children: [
          { title: '前端缓存', path: '/cs_basis/fe_cache' },
          { title: 'Webview', path: '/cs_basis/webview' },
          { title: '性能优化', path: '/basis/optimize' },
        ],
      },
      {
        title: '计算机大观园',
        path: '/cs_basis/git',
        collapsable: false, // 不折叠
        children: [
          { title: 'Git备忘录', path: '/cs_basis/git' },
          { title: '函数式编程', path: '/cs_basis/functional' },
          { title: 'svg和canvas', path: '/cs_basis/svg-canvas' },
          { title: '云原生概念', path: '/cloud/cloud-native' },
          { title: 'Docker入门', path: '/cloud/docker' },
        ],
      },
      {
        title: '工程化基础',
        path: '/project/fe_module',
        collapsable: false, // 不折叠
        children: [{ title: '模块化基础', path: '/project/fe_module' }],
      },
    ],
  },
};
