<script setup lang="ts">
import { computed } from "vue";
import type { EChartsCoreOption } from "echarts/core";
import EaChart from "@/components/ui/EaChart.vue";

const option = computed<EChartsCoreOption>(() => ({
  animation: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  grid: { left: 14, right: 14, top: 24, bottom: 24, containLabel: true },
  tooltip: {
    trigger: "axis",
    backgroundColor: "#14201a",
    borderWidth: 0,
    textStyle: { color: "#fff" },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["第 1 周", "第 2 周", "第 3 周", "第 4 周", "第 5 周", "第 6 周"],
    axisLine: { lineStyle: { color: "#dfe4df" } },
    axisTick: { show: false },
    axisLabel: { color: "#66736b", fontSize: 11 },
  },
  yAxis: {
    type: "value",
    splitLine: { lineStyle: { color: "#e7ebe7" } },
    axisLabel: { show: false },
  },
  series: [
    {
      name: "稳定触达",
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      data: [28, 43, 51, 72, 86, 108],
      lineStyle: { color: "#14201a", width: 3 },
      itemStyle: { color: "#b8f348", borderColor: "#14201a", borderWidth: 2 },
      areaStyle: { color: "rgba(184, 243, 72, 0.24)" },
    },
  ],
}));
</script>

<template>
  <EaChart
    :option="option"
    label="六周稳定触达趋势示意图"
    summary="示意数据从第 1 周的 28 增长到第 6 周的 108，用于表达流程逐步稳定后的增长趋势，不代表客户承诺。"
  />
</template>
