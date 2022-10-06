<template>
  <div class="sy-table">
    <a-table
      :data-source="dataSource"
      :columns="columns"
      size="middle"
      :scroll="scroll"
      :pagination="false"
      :bordered="bordered"
    >
      <!-- 表头 -->
      <template #headerCell="{ column }">
        <span>
          <template v-if="column.slotName">
            <slot :name="`header-${column.slotName}`" :row="column">
              {{ column.title }}
            </slot>
          </template>
          <template v-else>
            {{ column.title }}
          </template>
        </span>
      </template>
      <!-- 单元格 -->

      <template #bodyCell="{ column, record, index }">
        <!-- 序号 -->
        <template v-if="column.dataIndex === 'index'">
          {{ index + 1 }}
        </template>
        <template v-if="column.slotName">
          <slot :name="`body-${column.slotName}`" :row="record">
            {{ record[column.key] }}
          </slot>
        </template>
        <template v-else>
          {{ record[column.key] }}
        </template>
      </template>
    </a-table>

    <!-- 分页导航 -->
    <div class="table-footer" v-if="showFooter">
      <a-pagination
        :page-num="page.pageNo"
        :page-size-options="pageSizeOptions"
        show-quick-jumper
        show-size-changer
        :total="total"
        :show-total="(total) => `共${total} 条`"
        @change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'syTable',
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({
        pageNo: 1,
        pageSize: 10
      })
    },
    total: {
      type: Number,
      default: 0
    },
    pageSizeOptions: {
      type: Array,
      default: () => ['5', '10', '20', '30', '40', '50']
    },
    bordered: {
      type: Boolean,
      default: false
    },
    scroll: {
      type: Object,
      default: () => ({ x: 600 })
    }
  },
  emits: ['handleSizeChange'],
  setup(props, { emit }) {
    const handleSizeChange = (pageNo: number, pageSize: number) => {
      emit('handleSizeChange', { pageNo, pageSize });
    };
    return {
      handleSizeChange
    };
  }
});
</script>

<style lang="scss" scoped>
.eps-table {
  .table-footer {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
