import { RouteRecordRaw } from 'vue-router';

const mainStaticRoute: RouteRecordRaw = {
  path: '/main/home',
  name: 'home',
  meta: { title: '首页', icon: 'HomeFilled', sort: 1 },
  component: () => import('@/views/main/home/index.vue')
};

export default mainStaticRoute;
