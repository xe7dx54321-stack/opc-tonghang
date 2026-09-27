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
  imageSrc?: string
  downloadFile?: string
}

const harnessData: Record<string, HarnessDetail> = {
  'primary-market-research': {
    code: 'TX-001',
    slug: 'primary-market-research',
    title: '一级市场行业与项目研究 Harness',
    subtitle: '把 BP、访谈与行业材料接入一套可追溯的本地投研工作流',
    tag: 'PE / VC 投研',
    status: 'live',
    description:
      '这是一套可直接作为 Codex 工作区使用的一级市场研究 Harness。它从初始材料分析与行业定位开始，先比较同级可投资细分，再进入行业与项目深研、尽调设计、证据复核和投资判断。下载包包含主控规则、完整工作流、15 个 Skills、3 个研究与复核 Agent、报告模板、公开行业 Wiki 和校验脚本。研究状态、证据与结论保存在用户本地目录。',
    highlights: ['15 个 Skills', '3 个 Agent', '完整投研流程', 'ZIP 本地交付'],
    imageSrc: '/static/images/harness-primary-market.svg',
    downloadFile: '/downloads/primary-market-research-harness.zip',
    problem: {
      title: '一级市场研究容易在哪里失去判断力',
      bullets: [
        '只围绕一份 BP 的亮点求证，可能跳过更关键的行业和细分机会比较。',
        '项目材料、公开资料与投资经理判断混在一起，结论难以复核。',
        '多项目并行时，项目边界、用户方法论和行业知识容易相互污染。',
        '尽调问题、证据缺口和最终投资判断散落在文档中，交接与更新成本高。',
      ],
    },
    solution: {
      title: '下载包里有什么',
      features: [
        {
          name: '完整研究工作流',
          desc: 'AGENTS.md 与 WORKFLOW.md 约束从行业定位、细分筛选到深研、尽调与最终投资结论的顺序，支持交互和自动两种模式。',
        },
        {
          name: '15 个 Skills 与 3 个 Agent',
          desc: '覆盖项目建立、材料分析、行业研究、证据复核、尽调设计、投资备忘录和项目池择优；研究员与复核 Agent 用于分工和独立检查。',
        },
        {
          name: '证据与报告模板',
          desc: '提供证据矩阵、来源索引、尽调清单、行业研究报告、项目投资分析和最终结论模板，配合脚本检查结构。',
        },
        {
          name: '本地知识与项目隔离',
          desc: 'projects/ 按公司隔离研究，wiki/ 沉淀公开、去项目化的行业知识；profiles/ 保存不同用户的方法论。',
        },
      ],
    },
    workflow: {
      title: '从下载到形成判断',
      steps: [
        {
          n: '01',
          name: '本地解压与配置',
          desc: '按 SETUP.md 配置 PowerShell、Python 依赖和 Codex，并运行结构验证。',
        },
        {
          n: '02',
          name: '导入项目材料',
          desc: '在本地工作区提供 BP、访谈纪要或已有研究，选择交互模式或自动模式。',
        },
        {
          n: '03',
          name: '先看行业与细分',
          desc: '确定行业边界，比较同级可投资方向，判断项目是否值得获得深研预算。',
        },
        {
          n: '04',
          name: '深研与尽调设计',
          desc: '围绕关键判断、反证与证据缺口开展行业和项目研究，再生成尽调问题。',
        },
        {
          n: '05',
          name: '复核投资判断',
          desc: '区分事实、假设和待验证项，形成投资建议；最终条款具备后可推进最终结论。',
        },
        {
          n: '06',
          name: '保留本地成果',
          desc: '项目、证据和报告保存在工作区，后续可按规则增量更新或做项目池择优。',
        },
      ],
    },
    pricing: {
      title: '获取本地工作区',
      tiers: [
        {
          name: '一次性下载',
          price: '¥49',
          desc: '获取一级市场行业与项目研究 Harness 完整 ZIP 包，在自己的电脑上使用。',
          features: [
            '完整本地工作区与 SETUP.md',
            '15 个 Skills、3 个 Agent',
            '工作流、证据规则与报告模板',
            '行业 Wiki 与校验脚本',
          ],
          cta: '模拟支付 ¥49 并下载',
          highlight: true,
        },
      ],
    },
    faq: [
      {
        q: '下载后怎么开始使用？',
        a: '解压 ZIP，在 Codex 中打开解压后的目录，按 SETUP.md 安装所需工具并运行验证脚本。然后上传 BP 或指定材料路径，说“开始研究这个项目，使用交互模式”。',
      },
      {
        q: '49 元现在会真实扣款吗？',
        a: '不会。当前网页只有本地模拟支付流程，不连接支付平台、不产生订单或扣款。确认模拟支付后即可下载 ZIP，用于测试购买与交付体验。',
      },
      {
        q: '我的研究材料存在哪里？',
        a: 'Harness 文件和生成的项目目录保存在你解压后的本地工作区。实际使用 Codex 或其他模型服务时，材料传输与保留方式取决于你使用的服务和配置。',
      },
      {
        q: '包含可直接套用的研究结果吗？',
        a: '下载包提供方法、模板和公开行业 Wiki 示例。它不会自动替代新项目的原始资料核验，也不预置你的私有 BP 或客户数据。',
      },
      {
        q: '需要什么运行环境？',
        a: '推荐 Codex 工作区。macOS 上的验证脚本需要 PowerShell 7，图表和 Word 等可选产出需要 Python 依赖；Windows 可使用 PowerShell。具体步骤见 ZIP 中的 SETUP.md。',
      },
    ],
    bestFor: [
      '需要系统研究一级市场行业与项目的投资人',
      '同时管理多个项目、重视项目隔离和证据复核的团队',
      '希望在本地维护自己的投研方法论与行业 Wiki 的研究者',
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
          features: ['4 个 Harness 全部可用', '每月 50 次估值查询', '可视化导出', '社区支持'],
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
          features: ['5 人起', '可上传内部交易', '定制赛道分类', '2 小时培训', '专属支持'],
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
        {
          n: '02',
          name: 'AI 转写 + 抽取',
          desc: 'Whisper 转写 + Claude 实体抽取 + 关键信号识别。',
        },
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
          features: ['终身使用', '不限份数', '引用回溯', '一年内更新', '邮件支持'],
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
          features: ['终身使用', '不限扫描次数', '可导出报告', '一年内更新'],
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
