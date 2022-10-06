<template>
  <SyDrawer
    v-model:visible="defVisible"
    :title="title"
    @close="close"
    @onSubmit="onSubmit"
    ref="drawerRef"
  >
    <SyForm
      ref="formCompRef"
      v-bind="formConfig"
      v-model="formState"
      @onSubmit="onSubmit"
    >
      <template #footer>
        <slot />
      </template>
    </SyForm>
  </SyDrawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { SyDrawer, SyForm } from '@/baseUI';

export default defineComponent({
  name: 'drawerForm',
  components: {
    SyDrawer,
    SyForm
  },
  props: {
    title: String,
    visible: Boolean,
    show: Boolean,
    formConfig: {
      type: Object,
      required: true
    },
    row: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['onSubmit', 'update:visible', 'update:show'],
  setup(props, { emit, expose }) {
    const drawerRef = ref();
    const defVisible = ref(props.visible);
    // 表单数据处理
    const formState = ref<any>({});
    const formCompRef = ref<InstanceType<typeof SyForm>>();
    const formItems = props.formConfig.formItems as any[];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = item.defaultValue || '';
    }
    // 初始化表单数据
    Object.assign(formState.value, { ...formOriginData, ...props.row });

    const close = () => {
      formState.value = formOriginData;
      emit('update:visible', false);
      emit('update:show', false);
    };
    const onSubmit = () => {
      formCompRef.value
        ?.validate()
        .then(() => {
          emit('onSubmit', formState.value);
        })
        .catch(() => {});
    };
    const handleCloseDrawer = () => {
      drawerRef.value.close();
    };

    expose({
      handleCloseDrawer
    });

    return {
      ...props,
      formState,
      drawerRef,
      formCompRef,
      defVisible,
      onSubmit,
      close,
      handleCloseDrawer
    };
  }
});
</script>

<style lang="scss" scoped></style>
