<script setup lang="ts">
import { BarChart, LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import { init, use, type ECharts, type EChartsCoreOption } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { debounce } from "lodash-es";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

use([BarChart, LineChart, GridComponent, TooltipComponent, CanvasRenderer]);

const props = defineProps<{
  option: EChartsCoreOption;
  label: string;
  summary: string;
}>();

const root = ref<HTMLDivElement>();
let chart: ECharts | undefined;
let resizeObserver: ResizeObserver | undefined;
const resize = debounce(() => chart?.resize(), 100);

onMounted(() => {
  if (!root.value) return;
  chart = init(root.value, undefined, { renderer: "canvas" });
  chart.setOption(props.option);
  resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(root.value);
});

watch(
  () => props.option,
  (option) => chart?.setOption(option, { notMerge: true }),
  { deep: true },
);

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resize.cancel();
  chart?.dispose();
});
</script>

<template>
  <div>
    <div ref="root" class="ea-chart" role="img" :aria-label="label" />
    <p class="ea-chart__summary">{{ summary }}</p>
  </div>
</template>

<style scoped lang="scss">
.ea-chart {
  width: 100%;
  height: 320px;

  &__summary {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}
</style>
