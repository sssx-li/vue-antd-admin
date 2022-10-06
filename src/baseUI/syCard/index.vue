<template>
  <a-card :bordered="false" :style="styles">
    <div class="card-titile">
      <slot name="cardHeader">
        {{ title }}
      </slot>
    </div>
    <div class="card-content">
      <slot />
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'syCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    styles: {
      type: Object,
      default: () => ({
        'border-radius': '6px',
        'box-shadow': '0 1px 4px rgba(0, 21, 41, 0.08)'
      })
    }
  },
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.ant-card {
  margin-bottom: 20px;
}
:deep(.ant-card-body) {
  padding: 16px !important;
}
.card-titile {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
