import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export type ContactStatus = "idle" | "submitting" | "success" | "preview" | "error";

export interface ContactForm {
  name: string;
  company: string;
  contact: string;
  service: string;
  message: string;
}

const emptyForm = (): ContactForm => ({
  name: "",
  company: "",
  contact: "",
  service: "自媒体运营",
  message: "",
});

export const useContactStore = defineStore("contact", () => {
  const form = reactive<ContactForm>(emptyForm());
  const status = ref<ContactStatus>("idle");
  const feedback = ref("");
  const configuredEmail = (import.meta.env.VITE_CONTACT_EMAIL ?? "").trim();
  const isConfigured = computed(
    () => configuredEmail.length > 3 && !configuredEmail.endsWith(".example"),
  );

  async function submit() {
    status.value = "submitting";
    feedback.value = "";

    if (!isConfigured.value) {
      await Promise.resolve();
      status.value = "preview";
      feedback.value = "当前为私密预览，提交入口待绑定公司邮箱；你的信息没有被发送。";
      return;
    }

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${configuredEmail}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: "easyai 官网合作咨询" }),
      });

      if (!response.ok) throw new Error("提交失败");
      status.value = "success";
      feedback.value = "已收到，我们会尽快与你联系。";
      Object.assign(form, emptyForm());
    } catch {
      status.value = "error";
      feedback.value = "暂时无法提交，请稍后再试。";
    }
  }

  function resetStatus() {
    status.value = "idle";
    feedback.value = "";
  }

  return { form, status, feedback, isConfigured, submit, resetStatus };
});
