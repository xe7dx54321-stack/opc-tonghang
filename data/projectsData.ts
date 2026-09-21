interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  code?: string
  tag?: string
  status?: 'live' | 'beta' | 'soon'
}

const projectsData: Project[] = [
  {
    code: 'TX-001',
    title: '尽调骨架 · DD-Skeleton',
    description:
      '把一份 BP 在 30 分钟内拆成技术 / 商业 / 财务 / 团队四个可对比的卡片，附带 50 个常见红旗问题清单。',
    imgSrc: '/static/images/harness-dd.svg',
    href: '/harness/dd-skeleton',
    tag: 'Pre-Seed → A',
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