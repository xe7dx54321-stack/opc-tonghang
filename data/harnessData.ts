// 每个 Harness 的完整详情内容，用于 /harness/[slug] 详情页
// 结构保持简洁，便于后续通过 CMS / Notion / markdown 替换

export interface HarnessDetail {
  code: string
  slug: string
  title: string
  subtitle: string
  tag: string
  status: 'live' | 'beta' | 'soon'
  description: string
  // Hero 数据
  highlights: string[] // 顶部一行的亮点（每条 4-8 字）
  // Problem / Solution / Workflow
  problem: {
    title: string
    bullets: string[]
  }
  solution: {
    title: string
    features: { name: string; desc: string }[]
  }
  workflow: {
    title: string
    steps: { n: string; name: string; desc: string }[]
  }
  // Pricing
  pricing: {
    title: string
    tiers: {
      name: string
      price: string
      period?: string
      desc: string
      features: string[]
      cta: string
      highlight?: boolean
    }[]
  }
  // FAQ
  faq: { q: string; a: string }[]
  // 适用场景
  bestFor: string[]
}

const harnessData: Record<string, HarnessDetail> = {
  'dd-skeleton': {
    code: 'TX-001',
    slug: 'dd-skeleton',
    title: '尽调骨架 · DD-Skeleton',
    subtitle: '把一份 30 页 BP 在 30 分钟内拆成可对比的结构化卡片',
    tag: 'Pre-Seed → A',
    status: 'live',
    description:
      '面对一份 30+ 页的 BP，投资经理真正需要的信息只占 10%。DD-Skeleton 用四维结构化框架（技术 / 商业 / 财务 / 团队）把一份 BP 压成 4 张可对比的卡片，附带 50 个常见红旗问题清单。',
    highlights: ['30 min / BP', '50 红旗问题', '4 维结构化', '可对比卡片'],
    problem: {
      title: '为什么 BP 阅读总在浪费你的时间',
      bullets: [
        '一份 30+ 页 BP 真正可用的信息 < 10%，但你要花 30-60 分钟读完',
        '读完后没有结构化笔记，无法横向对比 5 份同赛道 BP',
        '红旗问题靠"个人经验"，新人和老人之间有断层',
        'IC 会议前的 Memo 总是"先开一份空白文档，从零开始回忆"',
      ],
    },
    solution: {
      title: 'DD-Skeleton 的工作方式',
      features: [
        {
          name: '四维结构化卡片',
          desc: '把任何一份 BP 自动拆成 技术 / 商业 / 财务 / 团队 四张卡片，每张卡片内含 8-12 个关键字段。',
        },
        {
          name: '50 个红旗问题清单',
          desc: '按维度组织的红旗信号库，每条带"严重程度"和"建议验证方式"，可直接拷进你的 Memo。',
        },
        {
          name: '可对比 BP 库',
          desc: '结构化后自动归入 Notion 数据库，支持跨项目检索（按赛道 / 阶段 / 关键字段）。',
        },
        {
          name: 'IC Memo 模板',
          desc: '一键生成 IC 会议用的 1 页 Memo，含团队共识部分与待跟进问题。',
        },
      ],
    },
    workflow: {
      title: '完整工作流（6 步）',
      steps: [
        { n: '01', name: '上传 BP', desc: 'PDF / Word / Markdown / 邮件正文均可，单份或批量。' },
        {
          n: '02',
          name: 'AI 抽取',
          desc: 'Claude 自动识别 BP 中的关键字段，按四维分类填入。',
        },
        {
          n: '03',
          name: '红旗初筛',
          desc: '对每条关键字段跑红旗问题库，输出"必深挖"清单。',
        },
        {
          n: '04',
          name: '人工 review',
          desc: '投资经理 10-15 分钟 review + 修正，比从零读快 3-5 倍。',
        },
        {
          n: '05',
          name: '结构化归档',
          desc: '自动写入 Notion 数据库，支持后续搜索 / 横向对比。',
        },
        {
          n: '06',
          name: '生成 Memo',
          desc: '一键生成 IC 会议用的 1 页 Memo，含关键信息 + 待跟进问题。',
        },
      ],
    },
    pricing: {
      title: '三种使用方式',
      tiers: [
        {
          name: '月付订阅',
          price: '¥39',
          period: '/ 月',
          desc: '包含全部 4 个 Harness，可任意组合使用。',
          features: [
            '4 个 Harness 全部可用',
            '每月 50 份 BP 处理额度',
            'Notion 集成',
            '社区支持',
          ],
          cta: '立即订阅',
        },
        {
          name: '单件买断',
          price: '¥199',
          desc: 'DD-Skeleton 永久使用，含一年内所有更新。',
          features: [
            'DD-Skeleton 终身使用',
            '不限 BP 处理份数',
            'Notion 集成',
            '一年内更新',
            '邮件支持',
          ],
          cta: '买断 DD-Skeleton',
          highlight: true,
        },
        {
          name: '团队授权',
          price: '¥1,999',
          period: '起',
          desc: '5 人起，含内部知识库部署 + 培训。',
          features: [
            '5 人起，含内部账号',
            '私有部署可选',
            '定制红旗问题库',
            '2 小时 1v1 培训',
            '专属技术支持',
          ],
          cta: '联系咨询',
        },
      ],
    },
    faq: [
      {
        q: '需要我自己提供 Claude / OpenAI API Key 吗？',
        a: '不需要。订阅后用我配置好的 Claude 3.5 Sonnet，按用量计费已包含在订阅里。如果你想用自己的 Key 跑本地模型（Ollama / DeepSeek），买断版本可以解锁。',
      },
      {
        q: '处理一份 BP 大概要多久？',
        a: 'AI 抽取约 2-3 分钟。人工 review 约 10-15 分钟。从 PDF 上传到 Memo 完成，全流程约 20-25 分钟。',
      },
      {
        q: '我的 BP / 公司数据会被上传到哪里？',
        a: '所有数据走 Claude API（Anthropic），不落第三方服务器。月付版使用我配置的 Key（账单隔离）；买断版可用你自己的 Key，完全独立。团队版支持私有部署。',
      },
      {
        q: '能处理中文 BP 吗？',
        a: '可以。Claude 对中文金融 / 行业术语的处理准确率 > 90%。我已经验证过 200+ 份中文 BP。',
      },
      {
        q: '和市面上"AI 尽调工具"有什么区别？',
        a: '市面上大部分是"通用文档摘要"。DD-Skeleton 是按 PE/VC 实战经验设计的——四维框架、50 红旗问题、IC Memo 模板，都来自真实项目，不是套壳 ChatGPT。',
      },
    ],
    bestFor: [
      'Pre-Seed → A 轮的硬科技项目',
      '需要快速判断"值不值得深聊"的早期项目',
      '团队内部新人培训（建立统一尽调标准）',
    ],
  },

  'oneliner-comp': {
    code: 'TX-002',
    slug: 'oneliner-comp',
    title: '一句话估值 · OneLiner-Comp',
    subtitle: '输入赛道 + 阶段 + 营收，30 秒拿到一个有置信区间的估值锚点',
    tag: '估值对标',
    status: 'live',
    description:
      '估值对标是 PE/VC 的日常工作，但每次都从零拼可比公司清单。OneLiner-Comp 把过去 5 年 1,200+ 笔可比交易沉淀成结构化数据库，输入三个字段即可输出一个带置信区间的估值锚点。',
    highlights: ['30 秒 / 次', '1,200+ 交易', 'PE/VC + 二级双口径', '置信区间'],
    problem: {
      title: '为什么估值对标总是从零开始',
      bullets: [
        '每次做对标都要从零搜可比交易清单（数据库散落在 PitchBook / IT 桔子 / Wind）',
        '可比公司数量太少时置信度低，太多又会出现"苹果 vs 橘子"问题',
        'PE/VC 一级估值 vs A 股 / 港股二级估值口径不同，经常混着用',
        '给创始人反馈"为什么是这个估值"时缺乏可视化支撑',
      ],
    },
    solution: {
      title: 'OneLiner-Comp 的工作方式',
      features: [
        {
          name: '三字段输入',
          desc: '只需输入 赛道 / 阶段 / 营收（可选），即可得到估值锚点。',
        },
        {
          name: '1,200+ 可比交易库',
          desc: '按赛道（一级 16 类 + 二级 30+ 类）× 阶段（Pre-Seed → Pre-IPO）交叉索引。',
        },
        {
          name: '双口径估值',
          desc: '同时给 PE/VC 一级估值倍数（EV/Revenue, EV/EBITDA）和 A 股 / 港股二级口径。',
        },
        {
          name: '置信区间可视化',
          desc: '输出带 95% 置信区间的折线图 + 散点图，可直接拷进 IC Memo。',
        },
      ],
    },
    workflow: {
      title: '完整工作流（4 步）',
      steps: [
        {
          n: '01',
          name: '输入字段',
          desc: '赛道（如"AI Infra"）+ 阶段（如"A 轮"）+ 营收（如"¥12M ARR"）。',
        },
        {
          n: '02',
          name: '匹配可比交易',
          desc: '自动从库中捞出 20-50 笔最相关的可比交易。',
        },
        {
          n: '03',
          name: '输出锚点',
          desc: '给出估值中位数 + 95% 置信区间，附可视化图表。',
        },
        {
          n: '04',
          name: '导出',
          desc: '一键导出 IC Memo 段落，或附在给创始人的反馈邮件里。',
        },
      ],
    },
    pricing: {
      title: '三种使用方式',
      tiers: [
        {
          name: '月付订阅',
          price: '¥39',
          period: '/ 月',
          desc: '包含全部 4 个 Harness，可任意组合使用。',
          features: [
            '4 个 Harness 全部可用',
            '每月 50 次估值查询',
            '可视化导出',
            '社区支持',
          ],
          cta: '立即订阅',
        },
        {
          name: '单件买断',
          price: '¥199',
          desc: 'OneLiner-Comp 永久使用，含一年内所有更新。',
          features: [
            'OneLiner-Comp 终身使用',
            '不限查询次数',
            '可视化导出',
            '一年内更新',
            '邮件支持',
          ],
          cta: '买断 OneLiner-Comp',
          highlight: true,
        },
        {
          name: '团队授权',
          price: '¥1,999',
          period: '起',
          desc: '5 人起，可定制内部对标库。',
          features: [
            '5 人起',
            '可上传内部交易',
            '定制赛道分类',
            '2 小时培训',
            '专属支持',
          ],
          cta: '联系咨询',
        },
      ],
    },
    faq: [
      {
        q: '可比交易库的数据来源是什么？',
        a: '公开数据：PitchBook、IT 桔子、CB Insights、A 股 / 港股公告。私域数据：团队订阅后可上传内部交易到我看不到的私有库（端到端加密）。',
      },
      {
        q: '对于超早期项目（Pre-Seed，没营收）能估值吗？',
        a: '可以，但置信区间会变宽。基于"团队背景 + 赛道热度"给出一个定性区间。',
      },
      {
        q: '和"IT 桔子"等数据库有什么区别？',
        a: 'IT 桔子是"原始数据"，OneLiner-Comp 是"加工后的判断"。前者要你自己跑统计、做图表、写 Memo；后者 30 秒出结论 + 直接导出。',
      },
      {
        q: '可以接入企业内部的数据吗？',
        a: '团队版支持。可以上传 Excel / CSV，自动合并到私有库。',
      },
    ],
    bestFor: ['估值对标', 'IC 会议', '给创始人的反馈邮件', '二级 vs 一级口径校准'],
  },

  'research-digest': {
    code: 'TX-003',
    slug: 'research-digest',
    title: '研究员速记 · Research-Digest',
    subtitle: '把一段 30 分钟会议录音 + 一份 80 页财报，压成 1 页结构化纪要',
    tag: 'AI 工作流',
    status: 'beta',
    description:
      '研究员每天处理大量原始材料：会议录音、PDF 财报、研报、招股书。Research-Digest 把这些多模态材料统一压成 1 页结构化纪要，含关键数据、风险信号、待跟进问题，每条带原文引用回溯。',
    highlights: ['音频 + PDF', '1 页纪要', '引用回溯', '中文术语优化'],
    problem: {
      title: '为什么"听录音 + 看财报"永远做不完',
      bullets: [
        '30 分钟会议录音 → 听 + 整理 ≈ 1 小时',
        '80 页财报 → 精读 + 摘要 ≈ 2-3 小时',
        '纪要格式不统一，跨项目对比困难',
        '关键引用经常丢失，3 个月后想不起"当时 CEO 怎么说的"',
      ],
    },
    solution: {
      title: 'Research-Digest 的工作方式',
      features: [
        {
          name: '多模态输入',
          desc: '支持 音频 (mp3/m4a) + PDF + Word + 网页 + 截图，统一处理。',
        },
        {
          name: '1 页结构化纪要',
          desc: '固定 6 段：业务概览 / 关键数据 / 风险信号 / 待跟进 / 估值锚点 / 行动项。',
        },
        {
          name: '引用回溯',
          desc: '每条结论带原文位置（音频时间戳 / PDF 页码），可一键跳转。',
        },
        {
          name: '中文术语优化',
          desc: '针对中国金融 / 行业术语微调 prompt，准确率 > 90%。',
        },
      ],
    },
    workflow: {
      title: '完整工作流（5 步）',
      steps: [
        {
          n: '01',
          name: '上传材料',
          desc: '把录音 + PDF + 任何材料一次性丢进来。',
        },
        { n: '02', name: 'AI 转写 + 抽取', desc: 'Whisper 转写 + Claude 实体抽取 + 关键信号识别。' },
        {
          n: '03',
          name: '生成纪要',
          desc: '按 6 段模板生成 1 页纪要，每条带原文引用。',
        },
        {
          n: '04',
          name: '人工 review',
          desc: '研究员 5-10 分钟 review，比从零整理快 5-10 倍。',
        },
        {
          n: '05',
          name: '归档',
          desc: '直接写入 Notion / Obsidian，自动关联到项目卡片。',
        },
      ],
    },
    pricing: {
      title: '三种使用方式',
      tiers: [
        {
          name: '月付订阅',
          price: '¥39',
          period: '/ 月',
          desc: '包含全部 4 个 Harness。',
          features: ['全部 Harness 可用', '每月 30 份纪要额度', 'Notion 集成'],
          cta: '立即订阅',
        },
        {
          name: '单件买断',
          price: '¥199',
          desc: 'Research-Digest 永久使用，含一年内更新。',
          features: [
            '终身使用',
            '不限份数',
            '引用回溯',
            '一年内更新',
            '邮件支持',
          ],
          cta: '买断 Research-Digest',
          highlight: true,
        },
        {
          name: '团队授权',
          price: '¥1,999',
          period: '起',
          desc: '5 人起，可对接内部录音系统。',
          features: ['5 人起', '可对接内部系统', '定制模板', '专属培训'],
          cta: '联系咨询',
        },
      ],
    },
    faq: [
      {
        q: '音频转写用什么模型？',
        a: '默认 Whisper Large V3（本地或 API）。中文识别准确率 > 95%。团队版可切换为自部署的 Paraformer。',
      },
      {
        q: '80 页财报的引用回溯准吗？',
        a: '准。Claude 3.5 Sonnet 对中文 PDF 的实体抽取 + 页码定位准确率 > 90%。少数情况会标"未定位"，需要人工确认。',
      },
      {
        q: '我的录音会被上传到哪里？',
        a: '走 Whisper API + Claude API，不落第三方服务器。月付版用我配置的 Key；买断版可用你自己的 Key。',
      },
    ],
    bestFor: ['投后管理', '会议密集的研究员', '投决会前的快速 review'],
  },

  'signal-radar': {
    code: 'TX-004',
    slug: 'signal-radar',
    title: '行业信号雷达 · SignalRadar',
    subtitle: '聚合 16 个数据源，给一个赛道打 4 维度分数',
    tag: '赛道研究',
    status: 'soon',
    description:
      '赛道热度的判断永远是个难题。SignalRadar 聚合 16 个公开数据源（招聘 JD、专利、招投标、研报、财报、论文……），对一个赛道做 4 维度打分（热度 × 资本 × 政策 × 团队），输出 0-100 的趋势判断。',
    highlights: ['16 数据源', '4 维度打分', '趋势判断', '赛道对比'],
    problem: {
      title: '为什么"赛道热度判断"总是凭感觉',
      bullets: [
        '招聘 JD 数量 + 专利公开数量 是判断热度的好指标，但分散在 6+ 个平台',
        '招投标数据反映政策方向，但需要专业账号',
        '学术论文代表"未来 3-5 年的潜在赛道"，但普通人不会定期去查',
        '没有统一打分模型，新人判断和老人判断差距很大',
      ],
    },
    solution: {
      title: 'SignalRadar 的工作方式',
      features: [
        {
          name: '16 个数据源聚合',
          desc: '招聘（5）+ 专利（3）+ 招投标（2）+ 论文（3）+ 研报（2）+ 财报（1）。',
        },
        {
          name: '4 维度雷达图',
          desc: '热度 / 资本 / 政策 / 团队 四维，每维 0-100 分。',
        },
        {
          name: '趋势判断',
          desc: '不仅给当前分数，还给过去 6/12/24 个月的趋势线。',
        },
        {
          name: '赛道对比',
          desc: '可同时对比 3-5 个赛道，输出排序与建议关注级别。',
        },
      ],
    },
    workflow: {
      title: '完整工作流（3 步）',
      steps: [
        {
          n: '01',
          name: '输入赛道',
          desc: '输入赛道名（如"AI Infra"）或上传赛道关键词清单。',
        },
        {
          n: '02',
          name: '聚合 + 打分',
          desc: '后台聚合 16 个数据源，跑 4 维度打分模型。',
        },
        {
          n: '03',
          name: '输出报告',
          desc: '1 页 PDF 报告 + 可对比的雷达图。',
        },
      ],
    },
    pricing: {
      title: '三种使用方式',
      tiers: [
        {
          name: '月付订阅',
          price: '¥39',
          period: '/ 月',
          desc: '包含全部 4 个 Harness。',
          features: ['全部 Harness 可用', '每月 20 次雷达扫描'],
          cta: '预约内测',
        },
        {
          name: '单件买断',
          price: '¥199',
          desc: 'SignalRadar 永久使用。',
          features: [
            '终身使用',
            '不限扫描次数',
            '可导出报告',
            '一年内更新',
          ],
          cta: '预约内测',
          highlight: true,
        },
        {
          name: '团队授权',
          price: '¥1,999',
          period: '起',
          desc: '5 人起，可对接内部数据库。',
          features: ['5 人起', '可对接内部数据', '定制评分维度'],
          cta: '联系咨询',
        },
      ],
    },
    faq: [
      {
        q: '数据源是公开的还是私有的？',
        a: '全部使用公开 API + 公开网页抓取，不接入私有数据源。可保证结果可复现。',
      },
      {
        q: '什么时候正式上线？',
        a: '预计 4-6 周。MVP 已经在跑，主要在优化打分模型和报告模板。',
      },
      {
        q: '可以自定义打分维度吗？',
        a: '团队版支持。可以加自己的内部数据源（如 CRM / 内部研报库）作为新维度。',
      },
    ],
    bestFor: ['赛道研究', '新方向判断', '季度策略会议', '投资人日常 track'],
  },
}

export default harnessData
export function getHarnessDetail(slug: string): HarnessDetail | undefined {
  return harnessData[slug]
}