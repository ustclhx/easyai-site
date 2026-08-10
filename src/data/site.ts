export interface ServiceItem {
  id: "content" | "commerce";
  number: string;
  eyebrow: string;
  title: string;
  summary: string;
  to: string;
  capabilities: string[];
  outcome: string;
}

export const services: ServiceItem[] = [
  {
    id: "content",
    number: "01",
    eyebrow: "内容获客",
    title: "自媒体运营",
    summary: "围绕小红书、抖音与视频号，把选题、生产、分发、互动识别和企微承接串成一套可执行流程。",
    to: "/services/content-operations",
    capabilities: ["内容规划与选题", "多平台表达适配", "评论私信线索识别", "企微承接与跟进"],
    outcome: "稳定输出，更快响应，不漏掉高意向线索",
  },
  {
    id: "commerce",
    number: "02",
    eyebrow: "增长转化",
    title: "电商营销",
    summary: "从商品卖点到活动节奏、投放素材与复盘洞察，帮助小团队更高效地完成营销动作。",
    to: "/services/ecommerce-marketing",
    capabilities: ["商品卖点提炼", "营销素材批量生成", "活动节奏与渠道协同", "数据复盘与策略建议"],
    outcome: "缩短内容生产周期，让每次营销更可复用",
  },
];

export const cooperationSteps = [
  { number: "01", title: "业务诊断", text: "先看清团队、渠道、素材与转化链路，确认 AI 真正该接手的环节。" },
  { number: "02", title: "场景试跑", text: "选一个高频、可衡量的流程，用真实业务素材完成小范围试跑。" },
  { number: "03", title: "流程落地", text: "固化角色分工、审核规则与数据口径，让团队可以稳定使用。" },
  { number: "04", title: "持续优化", text: "根据内容表现和成交反馈，迭代提示词、知识库与自动化节点。" },
];
