<template>
  <a-modal
    v-model:visible="defVisible"
    :title="title"
    :okType="okType"
    :okText="okText"
    :width="width"
    :footer="footer"
    :destroyOnClose="destroyOnClose"
    :afterClose="afterClose"
    @ok="handleOk"
  >
    <div class="modal-contetn">
      <slot />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'syModal',
  props: {
    title: String,
    visible: Boolean,
    footer: [String, Object],
    okType: {
      type: String,
      default: 'primary'
    },
    okText: {
      type: String,
      default: '确定'
    },
    width: {
      type: [String, Number],
      default: '520px'
    },
    destroyOnClose: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:visible', 'close', 'onSubmit'],
  setup(props, { emit, expose }) {
    const defVisible = ref(false);
    watch(
      () => props.visible,
      (val) => {
        defVisible.value = val;
      },
      {
        immediate: true
      }
    );

    const afterClose = () => {
      emit('update:visible', false);
      emit('close');
    };

    const close = () => {
      defVisible.value = false;
    };

    const handleOk = () => {
      emit('onSubmit');
    };

    expose({
      close
    });

    return {
      ...props,
      defVisible,
      handleOk,
      afterClose
    };
  }
});
</script>

<style lang="scss" scoped></style>
