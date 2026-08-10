<script setup lang="ts">
import EaBadge from "@/components/ui/EaBadge.vue";
import EaButton from "@/components/ui/EaButton.vue";
import EaCard from "@/components/ui/EaCard.vue";
import EaContainer from "@/components/ui/EaContainer.vue";
import EaSection from "@/components/ui/EaSection.vue";
import { useUiStore } from "@/stores/ui";

const ui = useUiStore();
const modules = [
  { number: "01", title: "内容策划", text: "从产品、人群和平台趋势中形成选题池，给出角度、结构与发布建议。", tags: ["选题池", "内容日历", "平台适配"] },
  { number: "02", title: "内容生产", text: "基于品牌语气生成图文、短视频脚本与口播稿，支持一稿多平台改写。", tags: ["图文", "短视频脚本", "批量改写"] },
  { number: "03", title: "互动识别", text: "识别评论和私信中的咨询、异议与高意向信号，并建议回复优先级。", tags: ["意图分类", "回复建议", "风险提醒"] },
  { number: "04", title: "企微成交", text: "把有效线索带入企微，生成跟进摘要、话术建议和下一步提醒。", tags: ["线索摘要", "跟进建议", "成交复盘"] },
];

const channels = ["小红书", "抖音", "视频号", "公众号", "企业微信"];
</script>

<template>
  <div>
    <EaSection class="!pb-18 !pt-20 sm:!pt-28">
      <EaContainer>
        <div class="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <EaBadge tone="accent">01 / 内容获客</EaBadge>
            <h1 class="section-title mt-8 max-w-5xl">把内容做出来，<br />也把客户<span class="text-[var(--ea-accent-hover)]">接回来。</span></h1>
          </div>
          <div>
            <p class="text-lg leading-8 text-muted">面向 1—5 人服务型小企业的 AI 运营员工：覆盖内容获客、评论私信识别与企微成交，不让线索停在平台里。</p>
            <div class="mt-6 flex flex-wrap gap-2"><EaBadge v-for="channel in channels" :key="channel">{{ channel }}</EaBadge></div>
          </div>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection tone="dark" tight>
      <EaContainer>
        <div class="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div><p class="eyebrow !text-white/55">Workflow</p><h2 class="mt-5 text-4xl font-medium tracking-[-0.05em] sm:text-6xl">一条从内容到成交的线。</h2></div>
          <p class="max-w-xl leading-7 text-white/58 lg:justify-self-end">不同平台保留不同表达，线索和客户信息则进入统一的处理规则。</p>
        </div>
        <div class="grid gap-4 lg:grid-cols-4">
          <EaCard v-for="item in modules" :key="item.number" dark class="min-h-[340px] !p-6">
            <div class="flex items-center justify-between"><span class="text-xs font-black text-brand-lime">{{ item.number }}</span><span class="text-white/20">→</span></div>
            <h3 class="mt-12 text-3xl font-medium tracking-[-0.04em]">{{ item.title }}</h3>
            <p class="mt-4 text-sm leading-6 text-white/55">{{ item.text }}</p>
            <div class="mt-7 flex flex-wrap gap-2"><EaBadge v-for="tag in item.tags" :key="tag" tone="dark">{{ tag }}</EaBadge></div>
          </EaCard>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection>
      <EaContainer>
        <div class="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <p class="eyebrow">Human in the loop</p>
            <h2 class="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">自动化不是自动发布一切。</h2>
            <p class="mt-5 leading-7 text-muted">我们会为品牌风险、平台规则和客户关系保留人工审核点。AI 建议动作，人决定边界。</p>
            <EaButton size="lg" class="mt-8" @click="ui.openConsult">咨询内容运营方案</EaButton>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <EaCard v-for="item in [{title:'适合交给 AI', list:['选题收集与整理','多平台内容改写','评论私信初筛','跟进信息摘要']},{title:'保留人工决策', list:['品牌观点与立场','敏感内容审核','高价值客户沟通','成交条件与承诺']}]" :key="item.title">
              <h3 class="text-xl font-semibold">{{ item.title }}</h3>
              <ul class="mt-6 grid gap-3 text-sm text-muted"><li v-for="text in item.list" :key="text" class="flex gap-3"><span class="text-[var(--ea-accent-hover)]">●</span>{{ text }}</li></ul>
            </EaCard>
          </div>
        </div>
      </EaContainer>
    </EaSection>
  </div>
</template>
