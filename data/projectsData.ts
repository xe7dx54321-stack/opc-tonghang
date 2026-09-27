interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  code?: string
  tag?: string
  status?: 'live' | 'beta' | 'soon'
  details?: string[]
  price?: string
}

const projectsData: Project[] = [
  {
    code: 'TX-001',
    title: '一级市场行业与项目研究 Harness',
    description:
      '一套可直接在 Codex 中运行的一级市场投研工作区。从 BP 和访谈材料出发，依次完成行业定位、细分筛选、行业与项目深研、尽调设计及投资判断；每一步保留证据、假设与反证。',
    details: [
      '15 个 Skills + 3 个研究/复核 Agent',
      '内含工作流、证据标准、报告模板与行业 Wiki',
      '下载 ZIP，解压后按 SETUP.md 在本地使用',
    ],
    price: '¥49 · 一次性下载',
    imgSrc: '/static/images/harness-primary-market.svg',
    href: '/harness/primary-market-research',
    tag: 'PE / VC 投研',
    status: 'live',
  },
  {
    code: 'TX-002',
    title: '一句话估值 · OneLiner-Comp',
    description:
      '输入赛道 + 阶段 + 营收，自动跑出可比交易并给出一个有置信区间的估值锚点（PE/VC / 二级两套口径）。',
    imgSrc: '/static/images/harness-comp.svg',
    href: '/harness/oneliner-comp',
    tag: '估值对标',
    status: 'live',
  },
  {
    code: 'TX-003',
    title: '研究员速记 · Research-Digest',
    description:
      '把一份会议录音 + 一份 PDF / 财报压成 1 页结构化纪要，支持中文行业术语与引用回溯。',
    imgSrc: '/static/images/harness-research.svg',
    href: '/harness/research-digest',
    tag: 'AI 工作流',
    status: 'beta',
  },
  {
    code: 'TX-004',
    title: '行业信号雷达 · SignalRadar',
    description:
      '聚合 16 个数据源（招聘、专利、招投标、论文、研报、财报…），给一个赛道打分：热度 × 资本 × 政策 × 团队。',
    imgSrc: '/static/images/harness-radar.svg',
    href: '/harness/signal-radar',
    tag: '赛道研究',
    status: 'soon',
  },
]

export default projectsData
