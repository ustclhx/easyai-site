import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
  routes: [
    { path: "/", name: "home", component: () => import("@/views/HomeView.vue") },
    { path: "/services", name: "services", component: () => import("@/views/ServicesView.vue") },
    {
      path: "/services/content-operations",
      name: "content-operations",
      component: () => import("@/views/ContentOperationsView.vue"),
    },
    {
      path: "/services/ecommerce-marketing",
      name: "ecommerce-marketing",
      component: () => import("@/views/EcommerceMarketingView.vue"),
    },
    { path: "/cooperation", name: "cooperation", component: () => import("@/views/CooperationView.vue") },
    { path: "/about", name: "about", component: () => import("@/views/AboutView.vue") },
    { path: "/:pathMatch(.*)*", name: "not-found", component: () => import("@/views/NotFoundView.vue") },
  ],
});

router.afterEach((to) => {
  const label = typeof to.meta.title === "string" ? to.meta.title : "easyai";
  document.title = label === "easyai" ? "easyai｜AI 运营与电商营销解决方案" : `${label}｜easyai`;
});

export default router;
