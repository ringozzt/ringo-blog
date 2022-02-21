module.exports = {
  head: [['link', { rel: 'icon', href: './favicon.ico' }]],
  title: `BLOG by noob FE`,
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
        children: [{ title: '出道一年的前端练习生', path: '/' }],
      },
      // {
      //   title: 'HTML',
      //   path: '/',
      //   collapsable: false, // 不折叠
      //   children: [{ title: '语义化', path: '/' }],
      // },
      {
        title: 'CSS基础',
        path: '/basis/css',
        collapsable: false, // 不折叠
        children: [{ title: '常见布局', path: '/basis/css' }],
      },
      {
        title: 'JavaScript',
        path: '/basis/es6',
        collapsable: false, // 不折叠
        children: [
          { title: 'ES6 基本语法', path: '/basis/es6' },
          // { title: 'BOM', path: '/basis/es6' },
          // { title: '事件流，事件捕获，冒泡', path: '/basis/es6' },
        ],
      },
      {
        title: '浏览器基础',
        path: '/cs_basis/fe_cache',
        collapsable: false, // 不折叠
        children: [
          { title: '前端缓存', path: '/cs_basis/fe_cache' },
          { title: 'Webview', path: '/cs_basis/webview' },
          { title: '性能优化', path: '/basis/optimize' },
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
