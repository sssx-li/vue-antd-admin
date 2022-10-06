<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>
<script lang="ts">
import { ref, onMounted, watchEffect, PropType, defineComponent } from 'vue';

import { EChartsOption } from 'echarts';
import { useEcharts } from '@/hooks/useEcharts';

export default defineComponent({
  name: 'syEchart',
  props: {
    options: {
      type: Object as PropType<EChartsOption>
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    }
  },
  setup(props) {
    const echartDivRef = ref<HTMLElement>();
    onMounted(() => {
      const { setOptions } = useEcharts(echartDivRef.value!);
      watchEffect(() => {
        setOptions(props.options!);
      });
    });
    return {
      echartDivRef
    };
  }
});
</script>

<style lang="scss" scoped></style>
