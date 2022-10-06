<template>
  <SyModal
    v-model:visible="defVisible"
    :title="title"
    :destroyOnClose="destroyOnClose"
    :footer="footer"
    :okText="okText"
    :okType="okType"
    :width="width"
    @onSubmit="onSubmit"
    @close="close"
    ref="dialogRef"
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
  </SyModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { SyModal, SyForm } from '@/baseUI';

export default defineComponent({
  name: 'dialogForm',
  components: {
    SyModal,
    SyForm
  },
  props: {
    visible: Boolean,
    show: Boolean,
    title: String,
    destroyOnClose: Boolean,
    footer: [String, Object],
    okText: String,
    okType: String,
    width: [Number, String],
    formConfig: {
      type: Object,
      required: true
    },
    row: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['update:visible', 'update:show', 'onSubmit', 'onClose'],
  setup(props, { emit, expose }) {
    const dialogRef = ref();
    const loading = ref(false);
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
      emit('onClose');
    };
    const onSubmit = () => {
      formCompRef.value
        ?.validate()
        .then(() => {
          loading.value = true;
          emit('onSubmit', formState.value);
        })
        .catch(() => {});
    };

    const handleCloseDialog = () => {
      loading.value = false;
      dialogRef.value.close();
    };

    expose({
      handleCloseDialog
    });

    return {
      ...props,
      loading,
      formState,
      dialogRef,
      formCompRef,
      defVisible,
      onSubmit,
      close,
      handleCloseDialog
    };
  }
});
</script>

<style lang="scss" scoped>
.ant-form-inline .ant-form-item-with-help {
  margin-bottom: 0;
}
</style>
