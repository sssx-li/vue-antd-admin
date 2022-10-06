<template>
  <div class="header-container">
    <component
      :is="isCollapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'"
      @click="changeCollapsed"
    />
    <Info />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import Info from './info.vue';
export default defineComponent({
  name: 'headerComp',
  components: {
    Info
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:collapsed'],
  setup(props, { emit }) {
    const isCollapsed = ref(props.collapsed);
    watch(
      () => props.collapsed,
      (val) => {
        isCollapsed.value = val;
      }
    );
    const changeCollapsed = () => {
      emit('update:collapsed', !isCollapsed.value);
    };
    return {
      isCollapsed,
      changeCollapsed
    };
  }
});
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  height: 48px;
  line-height: 48px;
  justify-content: space-between;
  align-items: center;
  .icon-title {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    min-width: 210px;
    .title {
      font-weight: bold;
      color: #fff;
      font-size: 18px;
      margin-left: 10px;
    }
  }
}
</style>
