import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: { title: "AI 运营与电商营销解决方案", description: "easyai 为 1—5 人小团队提供可落地的自媒体运营与电商营销 AI 工作流。" },
    },
    {
      path: "/services",
      name: "services",
      component: () => import("@/views/ServicesView.vue"),
      meta: { title: "服务方向", description: "从内容获客到电商营销，easyai 为小团队设计可被采用的 AI 工作流。" },
    },
    {
      path: "/services/content-operations",
      name: "content-operations",
      component: () => import("@/views/ContentOperationsView.vue"),
      meta: { title: "内容获客", description: "把内容生产、评论私信识别和企微成交接进一条可审核的工作流。" },
    },
    {
      path: "/services/ecommerce-marketing",
      name: "ecommerce-marketing",
      component: () => import("@/views/EcommerceMarketingView.vue"),
      meta: { title: "增长转化", description: "围绕商品理解、营销素材、活动协同与数据复盘建立增长工作流。" },
    },
    {
      path: "/cooperation",
      name: "cooperation",
      component: () => import("@/views/CooperationView.vue"),
      meta: { title: "合作方式", description: "从一个真实场景开始试跑 easyai，再逐步扩展为团队能力。" },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
      meta: { title: "关于 easyai", description: "easyai 面向个人与小团队，把 AI 放进真实业务现场。" },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/NotFoundView.vue"),
      meta: { title: "页面不存在", description: "你访问的页面不存在，返回 easyai 首页继续浏览。" },
    },
  ],
});

router.afterEach((to) => {
  const label = typeof to.meta.title === "string" ? to.meta.title : "AI 运营与电商营销解决方案";
  document.title = `${label}｜easyai`;
  const description = typeof to.meta.description === "string" ? to.meta.description : "easyai 为小团队提供可落地的 AI 运营工作流。";
  let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.content = description;
});

export default router;
