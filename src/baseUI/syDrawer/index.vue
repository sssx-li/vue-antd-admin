<template>
  <a-drawer
    v-model:visible="defVisible"
    :title="title"
    placement="right"
    :width="drawerWidth"
    @after-visible-change="afterVisibleChange"
    destroyOnClose
  >
    <div class="drawer-body">
      <div class="content">
        <slot />
      </div>
      <div class="floor-container" v-if="showFooter">
        <a-button :disabled="loading" block @click="close"> 取消 </a-button>
        <a-button
          :loading="loading"
          type="primary"
          block
          @click="emit('onSubmit')"
        >
          {{ loadingText }}
        </a-button>
      </div>
    </div>
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';

export default defineComponent({
  name: 'syDrawer',
  props: {
    title: {
      type: String,
      default: ''
    },
    drawerWidth: {
      type: String,
      default: '520px'
    },
    loading: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['onSubmit', 'update:visible', 'close'],
  setup(props, { emit, expose }) {
    const defVisible = ref<boolean>(false);
    watch(
      () => props.visible,
      (val) => {
        defVisible.value = val;
      },
      {
        immediate: true
      }
    );

    const afterVisibleChange = (bool: boolean) => {
      if (!bool) {
        emit('update:visible', false);
        emit('close');
      }
    };
    const loadingText = computed(() => {
      return props.loading ? '提交中...' : '提交';
    });

    const close = () => {
      defVisible.value = false;
    };

    expose({
      close
    });

    return {
      defVisible,
      ...props,
      loadingText,
      afterVisibleChange,
      emit,
      close
    };
  }
});
</script>
<style lang="scss" scoped>
.drawer-body {
  height: calc(100% - 50px);
  .content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 10px;
  }
  .floor-container {
    border-top: 1px solid #eaeaea;
    padding-top: 20px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    button {
      width: 48%;
    }
  }
}
</style>
