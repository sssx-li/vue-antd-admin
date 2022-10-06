import { RouteRecordRaw } from 'vue-router';

const aboutRoutes: RouteRecordRaw = {
  path: '/main/about',
  name: 'about',
  redirect: '/main/about/first',
  meta: {
    title: '关于',
    icon: 'FolderOutlined',
    url: '/main/about',
    sort: 2
  },
  children: [
    {
      path: '/main/about/first',
      name: 'aboutFirst',
      component: () => import('@/views/main/about/index.vue'),
      meta: {
        title: '关于1-1',
        icon: 'SnippetsOutlined',
        url: '/main/about/first',
        isHidden: true
      }
    },
    {
      path: '/main/about/secound',
      name: 'aboutSecound',
      component: () => import('@/views/main/about/secound.vue'),
      meta: {
        title: '关于1-2',
        icon: 'SnippetsOutlined',
        url: '/main/about/secound'
      }
    }
  ]
};
export default aboutRoutes;
