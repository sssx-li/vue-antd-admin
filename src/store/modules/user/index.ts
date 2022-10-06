import { Module } from 'vuex';

import router from '@/router';
import localCache from '@/utils/catch';
import { IUserState } from './types';
import { IRootState } from '@/store/types';
import { getUserInfo, login } from '@/service/api/user';
import { tokenKey } from '@/common';
import { IAccount } from '@/service/api/user/types';
import { mapMenusToRoutes } from '@/utils/mapMenus';
import { useMessage } from '@/hooks/useMessage';

const userModel: Module<IUserState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userMenus: [],
      userInfo: { username: '', avatar: '' }
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserMenus(state, userMenus: any) {
      const routes = mapMenusToRoutes(userMenus);
      state.userMenus = routes;
      routes.length > 0 &&
        routes.forEach((route) => {
          router.addRoute('main', route);
        });
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
    async loginAction({ commit, dispatch }, payload: IAccount) {
      try {
        const res = await login(payload);
        const { token } = res.data;
        localCache.setCatch(tokenKey, token);
        commit('changeToken', token);
        // const userMenus = await getUserMenu();
        commit('changeUserMenus', []);
        // localCache.setCatch('userMenus', userMenus.data);
        dispatch('getUserInfo');
        router.push('/');
      } catch (error) {
        const message = useMessage();
        message.error('用户名或密码错误');
      }
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache(tokenKey);
      dispatch('getUserInfo');
      const userMenus = localCache.getCache('userMenus') || [];
      token && commit('changeToken', token);
      commit('changeUserMenus', userMenus);
    },
    async getUserInfo({ commit }) {
      const { data } = await getUserInfo();
      commit('changeUserInfo', data);
    }
  }
};

export default userModel;
