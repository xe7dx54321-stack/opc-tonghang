# 同行实验室 · Tonghang Lab

> PE/VC 投资人独立运营的研究与工具实验室。聚焦 AI、半导体、新能源、机器人等硬科技方向，分享投资方法论、AI 工作流与可执行的 Harness 工具。

## 当前进度

✅ Stage 1 - 可部署的最小版本

- [x] Fork 自 [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)
- [x] 应用设计 token（同行实验室品牌色：薄荷青绿 + 翠绿渐变）
- [x] 暗色为主 + 暖米色亮色模式 + 多主题切换
- [x] 首页 Hero + Bento Grid（mission-hero 同款视觉风格）
- [x] 5 篇投资方法论 / AI 工作流示例文章
- [x] 4 个 Harness 产品落地页（含 SVG 插画 + 状态徽章）
- [x] Logo（同行实验室六边形 + 双箭头标）
- [x] 字体组合：Noto Sans SC + JetBrains Mono
- [x] SEO / Open Graph / RSS 准备

## 技术栈

| 层 | 选型 |
|---|---|
| 框架 | Next.js 14.2.33（App Router + TypeScript） |
| 样式 | Tailwind CSS 3.4 + CSS 变量设计 token |
| 内容 | Contentlayer2 + MDX |
| 字体 | Noto Sans SC + JetBrains Mono（next/font） |
| 搜索 | kbar（pliny 内置） |
| 评论 | Giscus（待配置） |
| 分析 | Umami（待配置） |
| 部署 | Vercel（推荐）/ Cloudflare Pages |

## 本地启动

```bash
# 一键启动（已写好脚本，避开 WeSight 环境的 SWC 签名问题）
./dev.sh
```

或手动：

```bash
export PATH=/usr/local/bin:/bin:/usr/bin:/usr/sbin:/sbin:$PATH
codesign --force --sign - node_modules/@next/swc-darwin-arm64/next-swc.darwin-arm64.node
npm install --no-audit --no-fund
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

> 注意：在 WeSight / Electron 环境下，默认 `node` 是 Electron 壳（Team ID 与 SWC 不匹配），
> 必须用 `/usr/local/bin/node`（系统 Node 24+）。`dev.sh` 已自动处理。

## 目录结构

```
web/
├── app/                     # Next.js App Router
│   ├── Main.tsx             # 首页 Hero + Bento Grid
│   ├── layout.tsx           # 全局布局（字体 / 主题）
│   ├── page.tsx             # 首页路由
│   ├── about/               # 关于页
│   ├── blog/                # 文章列表 + 详情
│   ├── projects/            # Harness 产品落地页
│   ├── tags/                # 标签页
│   └── theme-providers.tsx  # next-themes 包装
├── components/              # 共享组件
├── css/
│   ├── tailwind.css         # 设计 token + Tailwind base
│   └── prism.css            # 代码高亮
├── data/
│   ├── siteMetadata.js      # 站点元数据（标题/作者/社交）
│   ├── headerNavLinks.ts    # 顶部导航
│   ├── logo.svg             # 同行实验室 Logo
│   ├── projectsData.ts      # Harness 产品列表
│   ├── authors/             # 作者 MDX
│   └── blog/                # 文章 MDX（5 篇示例）
├── public/static/images/    # Harness SVG 插画等
├── tailwind.config.js       # 配色 / 字体配置
├── next.config.js           # 安全头 / mdx 配置
├── dev.sh                   # 启动脚本
└── README.md
```

## 设计 Token（CSS 变量）

`css/tailwind.css` 中定义，所有变量可被 Tailwind utility 引用：

| Token | 暗色 | 亮色 | 用途 |
|---|---|---|---|
| `--bg` | `#0A0A0A` | `#F5F2EC` | 主背景 |
| `--bg-card` | `#111418` | `#FFFFFF` | 卡片背景 |
| `--ink` | `#E8ECEF` | `#0A0A0A` | 主文字 |
| `--ink-2` | `#A8B0B8` | `#4A4A4A` | 次文字 |
| `--accent` | `#00E0C7` | `#00B89F` | 品牌强调色 |
| `--success` | `#00A85A` | - | 成功/已购 |
| `--hair` | `#1A1D22` | `#E6E1D6` | 分隔线 |

## 下一步（Roadmap）

### Stage 1 完成（本周）

- [ ] 替换 `static/favicons/` 下的图标为同行实验室 Logo 衍生
- [ ] 配置 Giscus（评论）
- [ ] 配置 Plausible / Umami（分析）

### Stage 2（Harness 落地页 + Stripe）

- [ ] 接入 Stripe Checkout（月付 ¥39 / 单件买断 ¥199 / 团队授权）
- [ ] 把 `/harness/[slug]` 动态页做出来（每个 Harness 一个落地页）
- [ ] 邮件交付（Resend）

### Stage 3（Web Console + 桌面）

- [ ] Web 端 `/console`（用户执行 Harness 的工作台）
- [ ] Tauri 桌面壳（复用 packages/ui）
- [ ] 本地 Wiki + AI 问答

## 部署

推荐 Vercel：

```bash
# 安装 vercel CLI
npm i -g vercel

# 登录 + 部署
vercel
```

或在 [vercel.com/new](https://vercel.com/new) 直接导入 GitHub 仓库。

## License

MIT（来自 timlrx/tailwind-nextjs-starter-blog）。

_Last verified: 2026-09-21 15:28 UTC_
