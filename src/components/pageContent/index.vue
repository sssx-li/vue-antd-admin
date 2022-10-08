<template>
  <SyTable
    :dataSource="dataSource"
    v-bind="contentTableConfig"
    :page="pageInfo"
    :total="total"
    @handleSizeChange="handleSizeChange"
  >
    <!-- 单元格 -->
    <template #body-createTime="scope">
      {{ $filters.formatTime(scope.row.createTime) }}
    </template>
    <template #body-updateTime="scope">
      {{ $filters.formatTime(scope.row.updateTime) }}
    </template>
    <template #body-handler="scope">
      <slot name="handler" :row="scope.row">
        <a-space>
          <a-button
            type="primary"
            size="small"
            @click="emit('edit', scope.row)"
          >
            编辑
          </a-button>
          <a-button
            type="primary"
            danger
            size="small"
            @click="emit('delete', scope.row)"
          >
            删除
          </a-button>
        </a-space>
      </slot>
    </template>

    <!-- 其他插槽 -->
    <template
      v-for="item in otherPropSlots"
      :key="item.key"
      #[`body-${item.slotName}`]="scope"
    >
      <template v-if="item.slotName">
        <slot :name="`body-${item.slotName}`" :row="scope.row"></slot>
      </template>
    </template>
  </SyTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { SyTable } from '@/baseUI';

import { usePageContent } from '@/hooks/usePageContent';

export default defineComponent({
  name: 'pageContentComp',
  components: {
    SyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    curPageQuery: {
      // 当前页面接口所需初始参数
      type: Object,
      default: () => {}
    }
  },
  emits: ['edit', 'delete'],
  setup(props, { emit, expose }) {
    const {
      pageInfo,
      dataSource,
      total,
      getPageData,
      refresh,
      handleSizeChange,
      handleDelete,
      handleEdit,
      handleCreate
    } = usePageContent(props.contentTableConfig?.url, props.curPageQuery);

    // 获取其他的动态插槽名称
    let filterSlotNameList = props.contentTableConfig?.filterSlotNameList || [];
    filterSlotNameList = filterSlotNameList.concat(['handler']);
    const otherPropSlots = props.contentTableConfig?.columns.filter(
      (item: any) => {
        if (filterSlotNameList.includes(item.slotName)) return false;
        return item.slotName;
      }
    );

    getPageData();

    expose({
      getPageData,
      handleEdit,
      refresh,
      handleCreate
    });

    return {
      dataSource,
      total,
      otherPropSlots,
      pageInfo,
      emit,
      getPageData,
      refresh,
      handleEdit,
      handleSizeChange,
      handleDelete,
      handleCreate
    };
  }
});
</script>

<style lang="scss" scoped></style>
