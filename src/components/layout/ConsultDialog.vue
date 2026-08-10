<script setup lang="ts">
import { storeToRefs } from "pinia";
import EaButton from "@/components/ui/EaButton.vue";
import EaDialog from "@/components/ui/EaDialog.vue";
import EaField from "@/components/ui/EaField.vue";
import { useContactStore } from "@/stores/contact";
import { useUiStore } from "@/stores/ui";

const ui = useUiStore();
const contact = useContactStore();
const { consultOpen } = storeToRefs(ui);
const { form, status, feedback } = storeToRefs(contact);

function onOpenChange(open: boolean) {
  consultOpen.value = open;
  if (!open) contact.resetStatus();
}
</script>

<template>
  <EaDialog
    :open="consultOpen"
    title="说说你现在卡在哪里"
    description="无需先整理成标准需求。告诉我们团队规模、业务场景和希望改善的环节就够了。"
    @update:open="onOpenChange"
  >
    <form class="grid gap-5" @submit.prevent="contact.submit">
      <div class="grid gap-5 sm:grid-cols-2">
        <EaField v-model="form.name" name="name" label="怎么称呼" placeholder="你的姓名" required />
        <EaField v-model="form.company" name="company" label="公司 / 团队" placeholder="团队名称（选填）" />
      </div>
      <EaField v-model="form.contact" name="contact" label="联系方式" placeholder="微信、手机号或邮箱" required />
      <label class="grid gap-2 text-sm font-semibold text-ink">
        <span>关注方向</span>
        <select v-model="form.service" name="service" class="h-12 rounded-[var(--ea-radius-sm)] border border-line bg-canvas px-4 font-normal text-ink">
          <option>自媒体运营</option>
          <option>电商营销</option>
          <option>两个方向都想了解</option>
        </select>
      </label>
      <EaField
        v-model="form.message"
        name="message"
        label="想解决的问题"
        placeholder="例如：5 人团队，每周要发 20 条内容，评论和私信经常漏回……"
        multiline
        required
      />
      <p v-if="feedback" :class="['rounded-xl border px-4 py-3 text-sm leading-6', status === 'error' ? 'border-[var(--ea-danger)]/30 bg-[var(--red-3)] text-[var(--red-11)]' : 'border-line bg-panel-strong text-muted']" role="status">
        {{ feedback }}
      </p>
      <div class="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p class="max-w-sm text-xs leading-5 text-muted">提交即代表你同意我们仅将信息用于本次业务沟通。</p>
        <EaButton type="submit" size="lg" :disabled="status === 'submitting'">
          {{ status === "submitting" ? "正在提交" : "提交咨询" }}
          <template #trailing>→</template>
        </EaButton>
      </div>
    </form>
  </EaDialog>
</template>
