module.exports = {
  head: [['link', { rel: 'icon', href: './favicon.ico' }]],
  title: `Ringo's blog`,
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
        text: '想成为 FE Engineer',
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
        collapsable: true, // 不折叠
        children: [{ title: '每天想搞 FE ', path: '/' }],
      },
      {
        title: '前端基础知识',
        path: '/basis/fe_cache',
        collapsable: false, // 不折叠
        children: [
          { title: '前端缓存', path: '/basis/fe_cache' },
          { title: '模块化基础', path: '/basis/fe_module' },
        ],
      },
    ],
  },
};
