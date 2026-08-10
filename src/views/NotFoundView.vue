<script setup lang="ts">
import EaButton from "@/components/ui/EaButton.vue";
import EaContainer from "@/components/ui/EaContainer.vue";
import EaSection from "@/components/ui/EaSection.vue";
</script>

<template>
  <EaSection class="min-h-[70vh]">
    <EaContainer>
      <p class="text-sm font-black tracking-[0.14em] text-muted uppercase">404 / Page not found</p>
      <h1 class="display-title mt-8">走错一步，<br />没关系。</h1>
      <p class="mt-7 text-lg text-muted">这个页面暂时不存在，回首页继续看看吧。</p>
      <EaButton to="/" size="lg" class="mt-8">返回首页</EaButton>
    </EaContainer>
  </EaSection>
</template>
