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
    <div ref="root" class="h-[320px] w-full" role="img" :aria-label="label" />
    <p class="sr-only">{{ summary }}</p>
  </div>
</template>
