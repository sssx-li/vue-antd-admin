<template>
  <a-form
    :layout="layout"
    :autocomplete="autocomplete"
    @finish="onSubmit"
    :model="formData"
    :wrapperCol="wrapperCol"
    :labelCol="labelCol"
    ref="formRef"
    class="sy-form"
  >
    <template v-for="item in formItems" :key="item.label">
      <a-form-item
        :label="item.label"
        v-bind="
          item.rules && item.rules.length > 0 && validateInfos[item.field]
        "
      >
        <template v-if="item.type === 'input'">
          <a-input
            v-model:value="formData[item.field]"
            :size="size"
            :placeholder="item.placeholder"
            @change="handleValueChange($event, item)"
          />
        </template>
        <template v-else-if="item.type === 'password'">
          <a-input-password
            :size="size"
            v-model:value="formData[item.field]"
            :placeholder="item.placeholder"
            @change="handleValueChange($event, item)"
          />
        </template>
        <template v-else-if="item.type === 'textarea'">
          <a-textarea
            v-model:value="formData[item.field]"
            :size="size"
            :show-count="item.showCount"
            :maxlength="item.maxlength"
            @change="handleValueChange($event, item)"
          />
        </template>
        <template v-else-if="item.type === 'select'">
          <a-select
            v-model:value="formData[item.field]"
            :size="size"
            :placeholder="item.placeholder"
            :options="item.options"
            @change="handleValueChange($event, item)"
          >
          </a-select>
        </template>
        <template v-else-if="item.type === 'switch'">
          <a-switch
            v-model:checked="formData[item.field]"
            :size="size"
            @change="handleValueChange($event, item)"
          />
        </template>
      </a-form-item>
    </template>
    <a-form-item>
      <slot name="footer"> </slot>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, PropType, watch } from 'vue';

import { useFormValidate } from '@/hooks/useFormValidate';
import { IFormItem } from './types';
export default defineComponent({
  name: 'syForm',
  props: {
    layout: {
      type: String,
      default: 'inline'
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    modelValue: {
      type: Object,
      required: true
    },
    wrapperCol: {
      type: Object,
      default: () => ({
        style: { width: '180px', margin: '0 0 15px' }
      })
    },
    labelCol: {
      type: Object,
      default: () => ({ style: { width: '100px' } })
    },
    size: {
      type: String,
      default: 'default'
    },
    optionsObj: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['update:modelValue', 'onSubmit'],
  setup(props, { emit, expose }) {
    // --- 属性 ---
    // 初始化表单数据(因为antd表单组件底层封装方式不同，在表单元素上使用model-value代替v-model时无法达到双向绑定的效果)
    const formData = ref({});
    const formRef = ref();
    watch(
      () => props.modelValue,
      (val) => {
        formData.value = JSON.parse(JSON.stringify(val));
      },
      {
        immediate: true,
        deep: true
      }
    );

    // 获取校验规则
    const rulesList = {};
    props.formItems.forEach((item) => {
      const { rules, field } = item;
      if (rules && rules.length > 0) {
        (rulesList as any)[field] = rules;
      }
    });
    const { validate, validateInfos } = useFormValidate(
      formData,
      reactive({
        ...rulesList
      })
    );

    // --- 方法 ---
    const onSubmit = () => {
      validate().then(() => {
        emit('onSubmit');
      });
    };
    const handleValueChange = (event: any, item: any) => {
      const { field, type } = item;
      let value: any = '';
      switch (type) {
        case 'input':
        case 'password':
        case 'textarea':
          value = event.target.value;
          break;
        case 'select':
        case 'switch':
          value = event;
          break;
      }
      emit('update:modelValue', {
        ...props.modelValue,
        [field]: value
      });
    };

    expose({
      validate
    });
    return {
      formRef,
      validate,
      validateInfos,
      onSubmit,
      formData,
      handleValueChange
    };
  }
});
</script>

<style lang="scss" scoped>
.ant-form-inline .ant-form-item-with-help {
  margin-bottom: 0;
}
</style>
