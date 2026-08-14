<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { uniqBy } from "lodash-es";
import { storeToRefs } from "pinia";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { services } from "@/data/site";
import { useUiStore } from "@/stores/ui";
import EaButton from "@/components/ui/EaButton.vue";
import EaContainer from "@/components/ui/EaContainer.vue";
import EaDropdown, { type DropdownItem } from "@/components/ui/EaDropdown.vue";

const menuIcon = {
  width: 24,
  height: 24,
  body: '<path fill="currentColor" d="M4 17.27v-1h16v1zm0-4.77v-1h16v1zm0-4.77v-1h16v1z"/>',
};

const ui = useUiStore();
const { mobileMenuOpen } = storeToRefs(ui);
const route = useRoute();

const serviceItems = computed<DropdownItem[]>(() =>
  uniqBy(
    services.map((service) => ({
      label: service.title,
      description: service.eyebrow,
      to: service.to,
    })),
    "to",
  ),
);

const navItems = [
  { label: "首页", to: "/" },
  { label: "合作方式", to: "/cooperation" },
  { label: "关于我们", to: "/about" },
];

watch(() => route.fullPath, ui.closeMobileMenu);
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line/75 bg-canvas/88 backdrop-blur-xl">
    <EaContainer>
      <div class="flex h-[74px] items-center justify-between gap-6">
        <RouterLink to="/" class="group inline-flex items-center gap-3" aria-label="easyai 首页">
          <span class="grid size-9 place-items-center rounded-full bg-brand-ink text-sm font-black text-brand-lime transition group-hover:rotate-6">e</span>
          <span class="text-xl font-semibold tracking-[-0.055em]">easyai</span>
        </RouterLink>

        <nav class="hidden items-center gap-1 lg:flex" aria-label="主导航">
          <RouterLink
            to="/"
            class="rounded-full px-3 py-2 text-sm font-semibold text-muted transition hover:bg-panel-strong hover:text-ink"
            active-class="!text-ink"
          >首页</RouterLink>
          <EaDropdown label="服务方向" :items="serviceItems" />
          <RouterLink
            v-for="item in navItems.slice(1)"
            :key="item.to"
            :to="item.to"
            class="rounded-full px-3 py-2 text-sm font-semibold text-muted transition hover:bg-panel-strong hover:text-ink"
            active-class="!text-ink"
          >{{ item.label }}</RouterLink>
        </nav>

        <div class="hidden lg:block">
          <EaButton size="sm" @click="ui.openConsult">咨询合作</EaButton>
        </div>

        <button
          type="button"
          class="grid size-11 place-items-center rounded-full border border-line bg-surface lg:hidden"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-navigation"
          aria-label="打开导航"
          @click="ui.toggleMobileMenu"
        >
          <Icon :icon="menuIcon" class="size-5" aria-hidden="true" />
        </button>
      </div>
    </EaContainer>

    <Transition name="mobile-nav">
      <div v-if="mobileMenuOpen" id="mobile-navigation" class="border-t border-line bg-surface lg:hidden">
        <EaContainer>
          <nav class="grid gap-1 py-5" aria-label="移动端导航">
            <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="rounded-xl px-4 py-3 font-semibold hover:bg-panel-strong">
              {{ item.label }}
            </RouterLink>
            <p class="px-4 pt-3 pb-1 text-xs font-bold tracking-[0.12em] text-muted uppercase">服务方向</p>
            <RouterLink v-for="item in serviceItems" :key="item.to" :to="item.to" class="rounded-xl px-4 py-3 font-semibold hover:bg-panel-strong">
              {{ item.label }}
            </RouterLink>
            <EaButton class="mt-3" @click="ui.openConsult">咨询合作</EaButton>
          </nav>
        </EaContainer>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.mobile-nav-enter-active,
.mobile-nav-leave-active { transition: opacity 160ms ease, transform 160ms ease; }
.mobile-nav-enter-from,
.mobile-nav-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
