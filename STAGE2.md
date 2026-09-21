# 同行实验室 · Stage 2 路线图

> Stage 1 已上线：https://web-puce-seven-23.vercel.app/
> Stage 2 目标：从"展示型主页"升级到"可销售、可交互、可观测"的工具平台。

---

## ✅ Stage 1 已完成（v0.1.0）

- [x] 个人主页 + 5 篇文章 + 4 个 Harness 落地页
- [x] 设计 token（暗色 + 暖米色亮色，跟随主题）
- [x] Newsletter + Harness 通知（Resend 邮件）
- [x] /thanks 订阅成功页
- [x] 品牌 favicon（SVG + 多尺寸 PNG）
- [x] 部署到 Vercel + 3 个环境变量注入
- [x] Git 仓库初始化 + 首次提交

---

## 🚧 Stage 2 路线图（v0.2.0）

按 ROI 排序，从最高优先级开始。

### P0 · 立刻就该做的（商业闭环）

#### 2.1 Stripe Checkout 集成
**为什么先做**：所有 4 个 Harness 详情页底部有 3 个 disabled 按钮（推荐¥199 单件买断 / ¥39 月付 / ¥1,999 团队）。打开它 = 立刻开始收钱。

**需要你做的**：
1. 注册 [stripe.com](https://stripe.com)（个人可用 Stripe Atlas 注册美国公司，或用 Stripe 个人账号）
2. 创建 3 个 Product：
   - **月付订阅 ¥39**（一次性 recurring，价格 ¥39 / 月）
   - **单件买断 ¥199**（一次性，包含 4 个 Harness 各一个 SKU）
   - **团队授权 ¥1,999**（recurring 或一次性，按需）
3. 拿到 4 个 Price ID（`price_xxx`）和 `STRIPE_SECRET_KEY`

**我会做的**：
- `/api/checkout/route.ts` — 创建 Stripe Checkout Session
- `/api/webhooks/stripe/route.ts` — 处理支付成功事件
- 邮件交付：成功后自动发 License Key（一个月的访问期）
- 数据库（Neon Postgres / Supabase）：存 License Key + 绑定邮箱
- 启用 4 个详情页底部所有按钮
- 测试卡：4242 4242 4242 4242 跑通流程

**预估工时**：6-8 小时（含调试）

#### 2.2 Resend 域名验证
**为什么先做**：现在 `RESEND_FROM_EMAIL=onboarding@resend.dev`，沙箱模式只能发到你自己的 Gmail。验证 `tonghanglab.com` 后，任何邮箱都能收到欢迎信。**直接解锁 Stage 1 已就绪功能的最后 20%。**

**需要你做的**：
1. 在域名注册商把 `tonghanglab.com` 的 NS / 解析记录暴露给 Vercel（如果域名在 Vercel 买的最简单）
2. 在 [resend.com/domains](https://resend.com/domains) 添加 `tonghanglab.com`
3. 把 Resend 提供的 SPF / DKIM 记录加到 DNS

**我会做的**：
- 改 `.env.example` 和 Vercel env：`RESEND_FROM_EMAIL=hello@tonghanglab.com`
- 改邮件模板的 `from` 字段
- 加 `reply-to: hello@tonghanglab.com`

**预估工时**：30 分钟（DNS 配置你做的话）+ 10 分钟（代码改动我）

---

### P1 · 用户体验优化（转化率 +20-30%）

#### 2.3 自定义域名 `tonghanglab.com`
**为什么**：现在 URL 是 `web-puce-seven-23.vercel.app`——不是个品牌 URL，会大幅降低分享时的可信度。

**我会做的**：
- Vercel 后台添加域名（DNS 验证）
- 自动 SSL
- 设置 `siteUrl` 改到 `https://tonghanglab.com`

**需要你做的**：
- 把 `tonghanglab.com` 的 DNS 解析到 Vercel（添加 A 记录或 CNAME，按 Vercel 提示）

**预估工时**：30 分钟

#### 2.4 首页"关注话题"接真实数据
**为什么**：现在 hardcoded 了 6 个标签。换成从 contentlayer 跑统计 + 排序，首页立刻活起来。

**我会做的**：
- 改 `app/Main.tsx` 的 `FEATURED_TAGS` 为动态计算
- 按文章数排序取 Top 6
- 加个新组件 `FeaturedTags.tsx`

**预估工时**：30 分钟

#### 2.5 Harness 详情页加 Demo 视频/GIF
**为什么**：光看插画 + 文字，转化率有限。一段 30 秒的产品演示视频能 +30% 转化。

**我会做的**：
- 在 `/harness/[slug]/page.tsx` 的插画下方加 `<DemoVideo>` 占位组件
- 等你录屏后替换

**需要你做的**：
- 用 ScreenFlow / Loom / OBS 录 30 秒演示视频
- 放到 `public/static/videos/` 目录

**预估工时**：1 小时（含你的录屏时间）

---

### P2 · 流量与增长（SEO + 数据）

#### 2.6 Plausible / Umami 接入
**为什么**：现在没数据，不知道访客从哪来、停留多久、转化多少。

**我会做的**：
- 注册 Umami（免费、自托管）
- 在 `app/layout.tsx` 加 `<Script>` 标签
- 配置事件追踪（Newsletter 提交 / Harness 点击 / 邮件打开）

**预估工时**：1 小时

#### 2.7 Giscus 评论接入
**为什么**：博客目前没评论，访客无法反馈。

**需要你做的**：
- 在 GitHub 仓库开 Discussions
- 拿到 [giscus.app](https://giscus.app) 配置（4 个 ID）

**我会做的**：
- 填到 `.env.local` 和 Vercel env
- 启用 `components/Comments.tsx`

**预估工时**：30 分钟

#### 2.8 Sitemap 自动提交 + Google Search Console
**为什么**：sitemap 已经生成，但没提交给搜索引擎。

**我会做的**：
- 提交 `sitemap.xml` 到 Google Search Console
- 加 `robots.txt` 配置
- 加 JSON-LD 结构化数据（每个 Harness 一个 Product schema）

**预估工时**：1 小时

---

### P3 · 用户后台（粘性 + 复购）

#### 2.9 `/console` 用户工作台
**为什么**：付费用户需要一个地方看自己的 License Key、下载历史、续费。

**我会做的**：
- 用户登录（Magic Link，Clerk / NextAuth）
- `/console` 路由：License Key 管理 / Harness 使用记录 / 订阅状态
- 接入 Stripe Customer Portal（管理订阅 / 取消 / 改卡）

**预估工时**：1-2 天（含鉴权选型 + Stripe webhook + UI）

---

### P4 · 桌面端（Stage 3 的 0.1）

#### 2.10 Tauri 桌面壳
**为什么**：把 Web 端的 `/console` 包成桌面应用，本地能跑 Claude / Ollama。

**我会做的**：
- `apps/desktop/` Tauri v2 项目
- 复用 `packages/ui` 和 `/console` 路由
- 系统级集成（本地 LLM、文件系统）

**需要你做的**：
- 安装 Xcode CLT（macOS 编译用）

**预估工时**：3-5 天

---

## 📋 需要你做的事清单（按优先级）

1. ⏳ **注册 Stripe** → 创建 Product → 给 Price ID（解锁 P0 收入）
2. ⏳ **域名 DNS 解析** → tonghanglab.com 指 Vercel（解锁 P1 品牌）
3. ⏳ **Resend 域名验证** → DNS 加 SPF/DKIM（解锁 P0 邮件送达）
4. ⏳ **录 Harness 演示视频** → 30 秒 × 4 个（解锁 P1 转化）
5. ⏳ **GitHub repo**（可选）→ 自动部署（解锁 P2 持续部署）

## 🚀 我能立刻干的事（不需要你参与）

- A. 把首页 `FEATURED_TAGS` 换成动态统计（30 分钟）
- B. 加 `robots.txt` + JSON-LD 结构化数据（1 小时）
- C. 加 `/uses` 工具栈页面（参考废才俱乐部，30 分钟）
- D. 加 `/now` 当前在做什么页面（已写好基础，可美化）
- E. 写第一封 Newsletter 月报（草稿），让你审一遍
- F. 把 NewsletterForm 也加到 `/thanks` / `/about` 等其他位置

---

## 🎯 建议节奏

| 时间 | 建议动作 |
|---|---|
| 今天 | 你注册 Stripe + 给我 Price ID；同时我干 A、B、F |
| 明天 | Stripe 集成完成 + 你验证测试卡走通 |
| 本周 | Resend 域名验证 + 自定义域名 + 录 Demo 视频 |
| 下周 | Umami + Giscus + 数据驱动优化 |
| 月底 | `/console` 用户后台（Stage 2 收尾） |
| 2 个月后 | Tauri 桌面壳（Stage 3 起步） |

---

**当前线上状态**：https://web-puce-seven-23.vercel.app/
**最近一次部署**：包含新 favicon + Stage 2 准备工作
**Git 仓库**：本地已 init，首次提交 `58d0e90`