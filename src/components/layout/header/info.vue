<template>
  <a-dropdown class="info-container" :overlayStyle="{ width: '150px' }">
    <span class="avatar" @click="showUserInfo" @click.prevent>
      <a-avatar
        :src="
          userInfo.avatar ||
          'http://minio-test.epshealth.com:7070/uurm/_public/userPic/1'
        "
      >
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <span class="user-name">{{ userInfo.username }}</span>
    </span>
    <template #overlay>
      <a-menu @click="onClick">
        <a-menu-item key="userInfo"> 用户信息 </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout">登出</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { message } from 'ant-design-vue';

import localCache from '@/utils/catch';
import { useModalConfirm } from '@/hooks/useModalConfirm';
import { useStore } from '@/store';

export default defineComponent({
  name: 'infoComp',
  setup() {
    const store = useStore();
    const confirm = useModalConfirm();
    const userInfo = computed(() => store.state.user.userInfo);

    const onClick = (obj: any) => {
      const { key } = obj;
      if (key === 'logout') {
        confirm({ content: '确定要退出登录吗' })
          .then(() => {
            localCache.clearCache();
            window.location.reload();
          })
          .catch(() => {});
      } else if (key === 'userInfo') {
        message.info('个人信息');
      }
    };

    return {
      userInfo,
      onClick
    };
  }
});
</script>

<style lang="scss" scoped>
.avatar {
  cursor: pointer;
  padding: 0px 10px;
  font-size: 18px;
  min-width: 100px;
  .user-name {
    padding-left: 4px;
    font-size: 18px;
  }
}
</style>
