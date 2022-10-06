import { ref } from 'vue';
import PageContent from '@/components/pageContent/index.vue';

const usePageSearch = function () {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  const handleQueryChange = (queryInfo?: any, resizePageInfo = true) => {
    let params = { ...queryInfo };
    if (resizePageInfo) {
      params = {
        ...queryInfo,
        pageNo: 1,
        pageSize: 10
      };
    }
    pageContentRef.value?.getPageData(params);
  };
  return {
    pageContentRef,
    handleQueryChange
  };
};

export { usePageSearch };
