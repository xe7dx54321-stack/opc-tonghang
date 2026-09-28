'use client'

import { useState } from 'react'
import { demoStages, skillGroups } from '@/data/primaryMarketShowcase'

function Label({
  children,
  tone = 'accent',
}: {
  children: React.ReactNode
  tone?: 'accent' | 'muted' | 'warning'
}) {
  const colors = {
    accent: 'border-accent/30 bg-accent/10 text-accent',
    muted: 'border-hair-2 bg-bg text-ink-2',
    warning: 'border-amber-400/30 bg-amber-400/10 text-warning',
  }
  return (
    <span className={`inline-flex rounded border px-2 py-1 text-[11px] ${colors[tone]}`}>
      {children}
    </span>
  )
}

function ArtifactFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-hair-2 overflow-hidden rounded-xl border bg-bg shadow-[0_24px_80px_-48px_rgba(0,224,199,0.4)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hair px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-danger/70" />
          <span className="h-2 w-2 rounded-full bg-amber-400/70" />
          <span className="h-2 w-2 rounded-full bg-success/70" />
          <span className="ml-2 font-mono text-xs text-ink-2">{title}</span>
        </div>
        <Label>虚构演示</Label>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  )
}

function MiniHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">{children}</p>
  )
}

function ArtifactPreview({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <ArtifactFrame title="01 / 项目建立 · demo-vision-a">
          <MiniHeading>项目 A · 工业视觉质检软件</MiniHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-hair bg-bg-card p-4">
              <div className="text-sm font-semibold text-ink">输入材料</div>
              <div className="mt-3 space-y-2 font-mono text-xs text-ink-2">
                <div>
                  📄 BP_示例.pdf <span className="float-right text-success">已登记</span>
                </div>
                <div>
                  📄 访谈纪要_示例.md <span className="float-right text-success">已登记</span>
                </div>
                <div>
                  📄 财务明细 <span className="text-warning float-right">待提供</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-hair bg-bg-card p-4">
              <div className="text-sm font-semibold text-ink">自动创建的结构</div>
              <div className="mt-3 space-y-1 font-mono text-xs text-ink-2">
                <div>demo-vision-a/</div>
                <div className="pl-3">├ inputs/manifest.md</div>
                <div className="pl-3">├ evidence/source-index.md</div>
                <div className="pl-3">└ outputs/ · reviews/</div>
              </div>
            </div>
          </div>
          <p className="mt-4 border-l-2 border-accent pl-3 text-xs text-ink-2">
            反馈示例：项目身份已确认；财务明细尚未提供，不影响先做行业定位。
          </p>
        </ArtifactFrame>
      )
    case 1:
      return (
        <ArtifactFrame title="02 / 行业定位图谱">
          <MiniHeading>工业软件 · 自上而下定位</MiniHeading>
          <div className="rounded-lg border border-hair bg-bg-card p-4 text-sm">
            <div className="border-hair-2 rounded-md border bg-bg px-3 py-2 font-semibold text-ink">
              工业软件
            </div>
            <div className="ml-4 mt-3 grid gap-2 sm:grid-cols-3">
              <div className="rounded-md border border-hair px-3 py-3 text-ink-2">
                生产执行
                <br />
                <span className="text-xs text-ink-3">生产流程数字化</span>
              </div>
              <div className="rounded-md border border-accent bg-accent/10 px-3 py-3 text-accent">
                质量管理
                <br />
                <span className="text-xs">↳ 视觉质检软件 · 项目 A</span>
              </div>
              <div className="rounded-md border border-hair px-3 py-3 text-ink-2">
                设备运维
                <br />
                <span className="text-xs text-ink-3">设备状态与维护</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Label>购买方：工厂质量部门</Label>
            <Label>任务：降低漏检与误检</Label>
            <Label tone="warning">访谈口径待核验</Label>
          </div>
          <p className="mt-4 text-xs text-ink-2">
            初筛结论示例：有条件继续；先确认视觉质检是否构成独立采购预算。
          </p>
        </ArtifactFrame>
      )
    case 2:
      return (
        <ArtifactFrame title="03 / 细分优先级">
          <MiniHeading>同级软件方向比较 · 以下排序仅为演示</MiniHeading>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[470px] text-left text-xs">
              <thead className="text-ink-3">
                <tr>
                  <th className="pb-2">方向</th>
                  <th className="pb-2">优先级</th>
                  <th className="pb-2">主要判断</th>
                  <th className="pb-2">证据</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hair text-ink-2">
                <tr>
                  <td className="py-3">设备运维软件</td>
                  <td>
                    <Label>P1</Label>
                  </td>
                  <td>需求较清晰</td>
                  <td>中</td>
                </tr>
                <tr className="bg-accent/5">
                  <td className="py-3 font-semibold text-accent">质量管理软件 ← 项目 A</td>
                  <td>
                    <Label tone="warning">P2</Label>
                  </td>
                  <td>有机会，采购周期待核验</td>
                  <td>中低</td>
                </tr>
                <tr>
                  <td className="py-3">生产排程软件</td>
                  <td>
                    <Label tone="muted">P3</Label>
                  </td>
                  <td>竞争拥挤</td>
                  <td>中</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 rounded-lg border border-hair bg-bg-card p-3 text-xs leading-relaxed text-ink-2">
            决策示例：如只能布局一个方向，优先看 P1；若可布局多个，项目 A
            可在补证后进入深研。用户确认后才推进。
          </p>
        </ArtifactFrame>
      )
    case 3:
      return (
        <ArtifactFrame title="04 / 行业与项目深研">
          <MiniHeading>行业规律 → 项目判断 → 待验证证据</MiniHeading>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-hair bg-bg-card p-4">
              <div className="text-xs text-accent">行业关键因素</div>
              <p className="mt-2 text-sm font-semibold text-ink">误检率、部署成本、产线切换阻力</p>
            </div>
            <div className="rounded-lg border border-hair bg-bg-card p-4">
              <div className="text-xs text-accent">项目优势候选</div>
              <p className="mt-2 text-sm font-semibold text-ink">两条试点产线</p>
              <p className="mt-1 text-xs text-ink-3">管理层口径，尚未独立核验</p>
            </div>
            <div className="rounded-lg border border-hair bg-bg-card p-4">
              <div className="text-warning text-xs">决定性缺口</div>
              <p className="mt-2 text-sm font-semibold text-ink">付费转化与跨厂复制</p>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-hair p-3 font-mono text-xs text-ink-2">
            E-012 · 试点运行记录 → 支持性能线索，暂不支持“规模化可复制”
          </div>
          <p className="mt-4 text-xs text-ink-2">
            产物预览：行业报告 + 三章项目初步分析 + 可追溯证据矩阵。
          </p>
        </ArtifactFrame>
      )
    case 4:
      return (
        <ArtifactFrame title="05 / 尽调计划">
          <MiniHeading>从判断缺口出发，而不是套通用清单</MiniHeading>
          <div className="space-y-2">
            <div className="flex gap-3 rounded-lg border border-danger/30 bg-danger/5 p-3">
              <Label tone="warning">P0</Label>
              <div className="text-sm text-ink">
                <strong>付费客户真实性</strong>
                <p className="mt-1 text-xs text-ink-2">
                  请求：合同、验收及回款记录；影响收入质量判断。
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg border border-hair bg-bg-card p-3">
              <Label>P1</Label>
              <div className="text-sm text-ink">
                <strong>性能可重复性</strong>
                <p className="mt-1 text-xs text-ink-2">
                  请求：不同产线的误检 / 漏检日志；影响复制能力判断。
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg border border-hair bg-bg-card p-3">
              <Label tone="muted">访谈</Label>
              <div className="text-sm text-ink">
                <strong>质量负责人</strong>
                <p className="mt-1 text-xs text-ink-2">核对采购决策链、替换成本和续费原因。</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-ink-2">
            你能逐项删减和确认范围。竞争企业接触需由你决定是否执行。
          </p>
        </ArtifactFrame>
      )
    case 5:
      return (
        <ArtifactFrame title="06 / 新材料进入后">
          <MiniHeading>本轮输入：示例合同 + 示例试运行日志</MiniHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-hair bg-bg-card p-4">
              <div className="text-xs text-ink-3">DD-001 · 付费客户</div>
              <div className="text-warning mt-2 text-lg font-semibold">部分确认</div>
              <p className="mt-2 text-xs leading-relaxed text-ink-2">
                发现 1 份付费合同、2 份免费试用协议；与 BP 中“3 家付费客户”存在口径冲突。
              </p>
            </div>
            <div className="rounded-lg border border-hair bg-bg-card p-4">
              <div className="text-xs text-ink-3">DD-002 · 性能复现</div>
              <div className="mt-2 text-lg font-semibold text-success">已收到日志</div>
              <p className="mt-2 text-xs leading-relaxed text-ink-2">
                覆盖 2 条产线；尚无跨厂部署数据，不足以确认规模化复制。
              </p>
            </div>
          </div>
          <p className="mt-4 border-l-2 border-amber-400 pl-3 text-xs text-ink-2">
            判断变化：收入质量判断下修；下一步只需核对首份合同回款和试用转付费条件。
          </p>
        </ArtifactFrame>
      )
    case 6:
      return (
        <ArtifactFrame title="07 / 尽调结论与建议">
          <MiniHeading>材料收尾后的投资建议 · 尚非最终交易决策</MiniHeading>
          <div className="flex flex-wrap items-start gap-3">
            <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4">
              <div className="text-warning text-xs">证据充分度</div>
              <div className="mt-1 text-4xl font-bold text-ink">B</div>
            </div>
            <div className="min-w-[220px] flex-1 rounded-xl border border-hair bg-bg-card p-4">
              <div className="text-xs text-accent">阶段建议</div>
              <div className="mt-2 text-lg font-semibold text-ink">
                继续谈，但暂不按已规模化定价
              </div>
              <p className="mt-2 text-xs text-ink-2">核心赌注：试点能否跨厂复制并稳定转付费。</p>
            </div>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg border border-hair p-3 text-xs text-ink-2">
              反证：免费试用被计入付费客户
            </div>
            <div className="rounded-lg border border-hair p-3 text-xs text-ink-2">
              条件：核验回款，设置分期或交割先决条件
            </div>
          </div>
          <p className="mt-4 text-xs text-ink-2">
            独立复核会检查证据等级、关键假设和计算是否支持这段建议。
          </p>
        </ArtifactFrame>
      )
    case 7:
      return (
        <ArtifactFrame title="08 / 最终版研究包">
          <MiniHeading>假设用户提供拟议条款 · 示例数值不构成报价</MiniHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-hair bg-bg-card p-4">
              <div className="font-mono text-xs text-accent">REPORT / INDUSTRY</div>
              <div className="mt-3 text-lg font-semibold text-ink">行业研究 · 最终版</div>
              <p className="mt-2 text-xs leading-relaxed text-ink-2">
                需求、价值链、竞争与时点判断；只保留去项目化的公开行业内容。
              </p>
            </div>
            <div className="rounded-lg border border-hair bg-bg-card p-4">
              <div className="font-mono text-xs text-accent">REPORT / INVESTMENT</div>
              <div className="mt-3 text-lg font-semibold text-ink">项目投资分析 · 最终版</div>
              <p className="mt-2 text-xs leading-relaxed text-ink-2">
                业务、财务情景、假设条款、估值、稀释与退出路径。
              </p>
            </div>
          </div>
          <div className="mt-3 rounded-lg border border-amber-400/30 bg-amber-400/5 p-3 text-xs text-ink-2">
            条款状态：用户情景假设 · 正式协议尚未取得 · 两篇报告均保留标记
          </div>
        </ArtifactFrame>
      )
    case 8:
      return (
        <ArtifactFrame title="09 / 最终投资结论">
          <MiniHeading>报告 × 尽调状态 × 证据 × 条款</MiniHeading>
          <div className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-5">
            <div className="text-warning text-xs">示例结论 · 基于假设条款</div>
            <div className="mt-2 text-2xl font-bold text-ink">有条件投资</div>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              前提：核实首份付费合同回款；第二笔投资与跨厂转付费里程碑挂钩。
            </p>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <div className="rounded-lg border border-hair p-3 text-xs text-ink-2">
              项目风险
              <br />
              <strong className="mt-1 block text-ink">复制能力待证</strong>
            </div>
            <div className="rounded-lg border border-hair p-3 text-xs text-ink-2">
              价格与条款
              <br />
              <strong className="mt-1 block text-ink">分期 + 先决条件</strong>
            </div>
            <div className="rounded-lg border border-hair p-3 text-xs text-ink-2">
              复核状态
              <br />
              <strong className="mt-1 block text-ink">待用户确认</strong>
            </div>
          </div>
        </ArtifactFrame>
      )
    default:
      return (
        <ArtifactFrame title="10 / 正式提交版 · 可选">
          <MiniHeading>基于已冻结结论进行编辑与排版</MiniHeading>
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3 rounded-lg border border-hair bg-bg-card p-4">
              <div>
                <div className="font-semibold text-ink">行业研究报告</div>
                <div className="mt-1 text-xs text-ink-3">面向投委会，去项目化</div>
              </div>
              <Label>Word</Label>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-hair bg-bg-card p-4">
              <div>
                <div className="font-semibold text-ink">项目投资分析报告</div>
                <div className="mt-1 text-xs text-ink-3">与冻结的结论、数字和条款一致</div>
              </div>
              <Label>Word</Label>
            </div>
          </div>
          <p className="mt-4 text-xs text-ink-2">
            系统同时保留项目证据与复核底稿；正式 Word 不是重新研究的新版本。
          </p>
        </ArtifactFrame>
      )
  }
}

export default function PrimaryMarketShowcase() {
  const [active, setActive] = useState(0)
  const stage = demoStages[active]

  return (
    <>
      <section id="workflow" className="scroll-mt-16 border-t border-hair py-16">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /interactive-walkthrough
        </div>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              跟着一个虚构项目，走完整个研究流程
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-2">
              点选阶段，依次看你会提供什么、Harness
              如何推进、屏幕上会出现什么成果，以及何时由你决定继续。演示项目、文件、数字和结论全部虚构，仅展示交互方式与交付形态。
            </p>
          </div>
          <a href="#capabilities" className="text-sm font-semibold text-accent hover:underline">
            看 15 个 Skills 与 3 个 Agent →
          </a>
        </div>

        <div className="mt-8 grid gap-3 rounded-xl border border-hair bg-bg-card p-4 text-sm text-ink-2 sm:grid-cols-3">
          <div>
            <span className="font-semibold text-ink">交互模式：</span>
            行业定位、细分结论、核心判断、尽调范围与投资结论等节点由你确认。
          </div>
          <div>
            <span className="font-semibold text-ink">自动模式：</span>
            行业定位、细分筛选和行业与项目深研可按策略放行，完成尽调设计后集中汇报。
          </div>
          <div>
            <span className="font-semibold text-ink">决策边界：</span>
            最终投资结论仍需要最终条款或你明确授权的假设条款。
          </div>
        </div>

        <div className="mt-8">
          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
            aria-label="研究流程阶段"
          >
            {demoStages.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(index)}
                aria-current={index === active ? 'step' : undefined}
                className={`flex min-h-16 items-start gap-3 rounded-lg border p-3 text-left transition ${index === active ? 'border-accent bg-accent/10 text-ink' : 'border-hair bg-bg-card text-ink-2 hover:border-accent/50'}`}
              >
                <span
                  className={`font-mono text-xs ${index === active ? 'text-accent' : 'text-ink-3'}`}
                >
                  {item.id}
                </span>
                <span className="text-sm font-semibold leading-snug">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-hair bg-bg-card">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hair px-5 py-4 sm:px-7">
            <span className="font-mono text-xs text-accent">
              STAGE {stage.id} / {String(demoStages.length).padStart(2, '0')}
            </span>
            <span className="text-xs text-ink-3">示例项目 A · 工业视觉质检软件 · 全部虚构</span>
          </div>
          <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <div>
              <h3 className="text-2xl font-bold text-ink">{stage.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{stage.purpose}</p>
              <div className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-4">
                <MiniHeading>你会怎么与 Harness 交互</MiniHeading>
                <p className="text-sm leading-relaxed text-ink">{stage.userInput}</p>
              </div>
              <div className="mt-6">
                <MiniHeading>Harness 会怎样执行</MiniHeading>
                <ol className="space-y-3">
                  {stage.actions.map((action, i) => (
                    <li key={action} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                      <span className="mt-0.5 font-mono text-xs text-accent">0{i + 1}</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-6 border-t border-hair pt-5">
                <MiniHeading>这一阶段你会拿到</MiniHeading>
                <div className="flex flex-wrap gap-2">
                  {stage.deliverables.map((deliverable) => (
                    <Label key={deliverable}>{deliverable}</Label>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <ArtifactPreview index={active} />
              <div className="mt-4 rounded-lg border border-hair bg-bg p-4 text-sm leading-relaxed text-ink-2">
                <span className="font-semibold text-accent">阶段确认 / 边界：</span>
                {stage.checkpoint}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-hair px-5 py-4 sm:px-7">
            <button
              type="button"
              disabled={active === 0}
              onClick={() => setActive(active - 1)}
              className="text-sm font-medium text-ink-2 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← 上一步
            </button>
            <span className="font-mono text-xs text-ink-3">
              {active + 1} / {demoStages.length}
            </span>
            <button
              type="button"
              disabled={active === demoStages.length - 1}
              onClick={() => setActive(active + 1)}
              className="text-sm font-medium text-accent hover:underline disabled:cursor-not-allowed disabled:opacity-40"
            >
              下一步 →
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-hair bg-bg-card p-4">
            <div className="font-semibold text-ink">跨项目择优</div>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              已有多个项目时，可用决策卡比较候选，定向复核领先项目，再给出优先配置建议。
            </p>
          </div>
          <div className="rounded-xl border border-hair bg-bg-card p-4">
            <div className="font-semibold text-ink">公开行业 Wiki</div>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              经过核验、去项目化的行业知识可沉淀复用；私有公司材料留在项目目录。
            </p>
          </div>
          <div className="rounded-xl border border-hair bg-bg-card p-4">
            <div className="font-semibold text-ink">方法持续调整</div>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              你的专业反馈可进入个人 Profile 或经过验证的工作流改进，方便下一次沿用。
            </p>
          </div>
        </div>
      </section>

      <section id="capabilities" className="scroll-mt-16 border-t border-hair py-16">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /capabilities
        </div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          15 个 Skills：每个环节都有人负责
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-2">
          下面介绍它们负责什么、什么时候参与、为你的研究带来什么。这里展示功能边界与交付价值，不公开内部判断规则。
        </p>
        <div className="mt-10 space-y-12">
          {skillGroups.map((group, groupIndex) => (
            <div key={group.title}>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-mono text-xs text-accent">0{groupIndex + 1}</span>
                <h3 className="text-xl font-bold text-ink">{group.title}</h3>
              </div>
              <p className="mt-2 text-sm text-ink-3">{group.subtitle}</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.skills.map((skill) => (
                  <article
                    key={skill.id}
                    className="rounded-xl border border-hair bg-bg-card p-5 transition hover:border-accent/40"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-mono text-[10px] text-accent">${skill.id}</div>
                      <span className="text-[11px] text-ink-3">{skill.moment}</span>
                    </div>
                    <h4 className="mt-3 text-lg font-semibold text-ink">{skill.name}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-ink-2">{skill.role}</p>
                    <div className="mt-4 border-t border-hair pt-4">
                      <div className="text-[11px] font-semibold text-accent">它让什么做得更好</div>
                      <p className="mt-1 text-sm leading-relaxed text-ink-2">{skill.value}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-hair py-16">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /agent-architecture
        </div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          3 个 Agent：研究与复核分开做
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-2">
          主 Agent
          负责与你沟通、推进阶段并合并正式产物；下面三个是按任务调用的只读角色。分工让并行研究有边界，也让关键结论经过独立检查。
        </p>
        <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-5 sm:p-6">
          <div className="font-mono text-xs text-accent">MAIN AGENT / 研究负责人</div>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">
            理解你的目标、安排研究范围、合并证据和报告、在重要节点请你确认；最终对交付物和结论负责。
          </p>
        </div>
        <div className="mx-auto h-6 w-px bg-accent/40" />
        <div className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-xl border border-hair bg-bg-card p-5">
            <div className="font-mono text-xs text-accent">01 / research_worker</div>
            <h3 className="mt-3 text-xl font-semibold text-ink">专题研究员</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              接收明确边界的市场、客户、竞争、技术或监管研究包；查找可核验来源，也主动找反证。
            </p>
            <div className="mt-4 border-t border-hair pt-4 text-sm leading-relaxed text-ink-2">
              <strong className="text-ink">为什么有用：</strong>
              专题可以并行推进，来源和限制一起返回。它不直接改正式项目结论，由主 Agent 统一整合。
            </div>
          </article>
          <article className="rounded-xl border border-hair bg-bg-card p-5">
            <div className="font-mono text-xs text-accent">02 / investment_reviewer</div>
            <h3 className="mt-3 text-xl font-semibold text-ink">投资研究复核员</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              在细分筛选、核心判断、尽调建议和最终决策等节点，独立检查证据、矛盾、口径和关键算式。
            </p>
            <div className="mt-4 border-t border-hair pt-4 text-sm leading-relaxed text-ink-2">
              <strong className="text-ink">为什么有用：</strong>
              把写报告和挑错分开；有重要缺口时可以要求整改，避免顺滑叙事压过证据。
            </div>
          </article>
          <article className="rounded-xl border border-hair bg-bg-card p-5">
            <div className="font-mono text-xs text-accent">03 / portfolio_reviewer</div>
            <h3 className="mt-3 text-xl font-semibold text-ink">项目池复核员</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              只在跨项目择优时检查候选是否完整、不同阶段是否可比、偏好如何影响排序，以及验证任务能否执行。
            </p>
            <div className="mt-4 border-t border-hair pt-4 text-sm leading-relaxed text-ink-2">
              <strong className="text-ink">为什么有用：</strong>
              防止项目数量一多就靠印象排序，也防止资料更完整的项目被误认为更值得投。
            </div>
          </article>
        </div>
        <p className="mt-5 rounded-lg border border-hair bg-bg-card p-4 text-sm leading-relaxed text-ink-2">
          <span className="font-semibold text-ink">协作边界：</span>三个 Agent
          只读研究或审核材料；主 Agent
          负责写入正式成果并向你汇报。需要你确认的阶段仍由你决定，不会由 Agent 代签。
        </p>
      </section>
    </>
  )
}
