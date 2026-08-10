<script setup lang="ts">
import { RouterView } from "vue-router";
import ConsultDialog from "@/components/layout/ConsultDialog.vue";
import SiteFooter from "@/components/layout/SiteFooter.vue";
import SiteHeader from "@/components/layout/SiteHeader.vue";
</script>

<template>
  <a class="skip-link" href="#main-content">跳到主要内容</a>
  <div class="min-h-screen bg-canvas text-ink">
    <SiteHeader />
    <main id="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter />
    <ConsultDialog />
  </div>
</template>
