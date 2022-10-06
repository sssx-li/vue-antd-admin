<template>
  <a-layout class="main-container">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo-box">
        <img
          :src="logo"
          alt="log"
          :class="[collapsed ? 'small-logo' : 'logo']"
        />
        <h2 class="title" v-show="!collapsed">后台管理系统</h2>
      </div>
      <LayoutMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <LayoutHeader v-model:collapsed="collapsed" />
      </a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LayoutHeader from '@/components/layout/header/index.vue';
import LayoutMenu from '@/components/layout/menu/index.vue';
import logo from '@/assets/images/logo.png';
export default defineComponent({
  name: 'mainView',
  components: {
    LayoutHeader,
    LayoutMenu
  },
  setup() {
    const collapsed = ref(false);
    return {
      logo,
      collapsed
    };
  }
});
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  .header {
    height: 50px;
    background: #fff;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    transition: all 0.3s;
    padding: 0 16px;
  }
  .logo-box {
    margin: 14px auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo {
      height: 50px;
    }
    .small-logo {
      height: 30px;
    }
    .title {
      margin: 14px 0 20px;
      font-size: 18px;
      color: #fff !important;
    }
  }
  .ant-layout-content {
    padding: 20px;
  }
}
</style>
