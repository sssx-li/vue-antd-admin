import { ref, reactive, watch } from 'vue';
import Request from '@/service';

import { useMessage } from './useMessage';
import { useModalConfirm } from './useModalConfirm';

import { IDataModel, ITableList } from '@/service/api/types';

/**
 *
 * @param url 请求数据地址
 * @param curPageQuery 当前页面请求参数(除pageNo、pageSize)
 */
const usePageContent = function (url: string, curPageQuery: any = {}) {
  const message = useMessage();
  const confirm = useModalConfirm();

  const pageInfo = reactive({ pageNo: 1, pageSize: 10 });
  const dataSource = ref<any[]>([]);
  const total = ref(0);

  watch(pageInfo, () => getPageData());

  /**
   *
   * @param query 常用于覆盖 curPageQuery和pageInfo 的参数值
   */
  const getPageData = async (query?: any) => {
    query = query ?? {};
    try {
      const res = await Request.get<IDataModel<ITableList>>({
        url,
        params: {
          ...curPageQuery,
          ...pageInfo,
          ...query
        }
      });
      const {
        data: { list, page }
      } = res;
      dataSource.value = list;
      total.value = page.count;
    } catch (error) {
      message.error('获取数据失败，请刷新重试');
    }
  };

  // 编辑
  const handleEdit = async (row: any) => {
    try {
      await Request.put<IDataModel>({
        // TODO 这里mock接口无法匹配到动态的路由，需按实际接口来做修改
        // url: `${url}/${row.id}`,
        url,
        data: row
      });
      message.success('操作成功');
    } catch (error) {
      message.error('操作失败, 请稍后再试');
    }
  };

  // 改变页码
  const handleSizeChange = (page: any) => {
    Object.assign(pageInfo, page);
  };

  // 删除
  const handleDelete = (id: string | number) => {
    confirm()
      .then(async () => {
        try {
          await Request.delete({
            // TODO 这里mock接口无法匹配到动态的路由，需按实际接口来做修改
            // url: `${url}/${row.id}`,
            url,
            data: id
          });
        } catch (error) {
          message.error('删除失败，请稍后再试');
        }
        refresh();
      })
      .catch(() => {});
  };

  // 刷新数据
  const refresh = () => {
    pageInfo.pageNo = 1;
    getPageData();
  };

  return {
    pageInfo,
    dataSource,
    total,
    getPageData,
    refresh,
    handleSizeChange,
    handleDelete,
    handleEdit
  };
};

export { usePageContent };
