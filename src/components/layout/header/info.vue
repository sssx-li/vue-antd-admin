<template>
  <div class="info-container">
    <a-space :size="8">
      <a-button type="text" shape @click="logout">
        <template #icon>
          <LoginOutlined />
        </template>
      </a-button>
      <span class="avatar" @click="showUserInfo">
        <a-avatar :src="userInfo.avatar">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <span class="user-name">{{ userInfo.nickname }}</span>
      </span>
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import localCache from '@/utils/catch';
import { useMessage } from '@/hooks/useMessage';
import { useModalConfirm } from '@/hooks/useModalConfirm';

export default defineComponent({
  name: 'infoComp',
  setup() {
    const message = useMessage();
    const confirm = useModalConfirm();
    const userInfo = reactive({
      nickname: '超级管理员',
      avatar: 'http://minio-test.epshealth.com:7070/uurm/_public/userPic/1'
    });
    const logout = () => {
      confirm({ content: '确定要退出登录吗' })
        .then(() => {
          localCache.clearCache();
          window.location.reload();
        })
        .catch(() => {});
    };
    const showUserInfo = () => {
      message.info('个人信息');
    };

    return {
      userInfo,
      logout,
      showUserInfo
    };
  }
});
</script>

<style lang="scss" scoped>
.info-container {
  min-width: 192px;
  :deep(.ant-space) {
    height: 48px;
    line-height: 48px;
  }
  :deep(.ant-space-item) {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0px 10px;
    font-size: 18px;
    .avatar {
      .user-name {
        padding-left: 10px;
        font-size: 14px;
      }
    }
  }
}
</style>
