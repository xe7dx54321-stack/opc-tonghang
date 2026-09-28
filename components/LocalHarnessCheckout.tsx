'use client'

import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'tonghanglab:primary-market-research:demo-unlocked'

export default function LocalHarnessCheckout({ downloadFile }: { downloadFile: string }) {
  const [unlocked, setUnlocked] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const downloadRef = useRef<HTMLAnchorElement>(null)
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setUnlocked(window.localStorage.getItem(STORAGE_KEY) === 'true')
  }, [])

  useEffect(() => {
    if (!showConfirm) return
    confirmRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowConfirm(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [showConfirm])

  const finishDemo = () => {
    window.localStorage.setItem(STORAGE_KEY, 'true')
    setUnlocked(true)
    setShowConfirm(false)
    downloadRef.current?.click()
  }

  return (
    <div className="bg-card-gradient mt-8 max-w-xl rounded-2xl border border-accent p-6 sm:p-8">
      <div className="font-num text-[11px] uppercase tracking-[0.2em] text-accent">
        本地交付演示
      </div>
      <div className="mt-3 flex flex-wrap items-baseline gap-3">
        <span className="text-4xl font-bold text-ink">¥49</span>
        <span className="text-sm text-ink-2">一次性下载完整 Harness ZIP</span>
      </div>
      <ul className="mt-5 space-y-2 text-sm text-ink-2">
        <li>✓ 主控规则、工作流与 SETUP.md</li>
        <li>✓ 15 个 Skills、3 个 Agent 与报告模板</li>
        <li>✓ 行业 Wiki、验证脚本和本地项目目录</li>
      </ul>
      <p className="mt-5 rounded-lg border border-hair bg-bg p-3 text-sm leading-relaxed text-ink-2">
        当前是本地模拟支付：不会扣款、创建真实订单或验证付款。确认后即可下载，用于体验购买与交付流程。
      </p>
      {unlocked ? (
        <div className="mt-6">
          <p className="mb-3 text-sm text-success">模拟支付已完成，下载入口已开放。</p>
          <a
            href={downloadFile}
            download="一级市场行业与项目研究Harness.zip"
            className="bg-brand-gradient inline-flex rounded-md px-5 py-3 text-sm font-semibold text-bg transition hover:brightness-110"
          >
            下载 Harness ZIP ↓
          </a>
          <button
            type="button"
            onClick={() => {
              window.localStorage.removeItem(STORAGE_KEY)
              setUnlocked(false)
            }}
            className="ml-4 mt-3 text-sm text-ink-3 underline-offset-4 hover:text-accent hover:underline"
          >
            重新体验模拟支付
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="bg-brand-gradient mt-6 inline-flex rounded-md px-5 py-3 text-sm font-semibold text-bg transition hover:brightness-110"
        >
          模拟支付 ¥49 并下载 →
        </button>
      )}
      <a
        ref={downloadRef}
        href={downloadFile}
        download="一级市场行业与项目研究Harness.zip"
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        下载
      </a>
      <p className="mt-4 text-xs leading-relaxed text-ink-3">
        解压后先阅读 ZIP 内的 SETUP.md。下载记录仅保存在当前浏览器，不代表真实购买凭证。
      </p>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-payment-title"
            className="w-full max-w-md rounded-2xl border border-accent/40 bg-bg-card p-6 shadow-2xl"
          >
            <div className="font-num text-[11px] uppercase tracking-[0.2em] text-accent">
              Demo Checkout
            </div>
            <h3 id="demo-payment-title" className="mt-3 text-xl font-bold text-ink">
              确认模拟支付 ¥49
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              这是本地交互演示，不需要填写银行卡，也不会产生实际扣款。点击确认后，浏览器会开始下载完整
              ZIP。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                ref={confirmRef}
                type="button"
                onClick={finishDemo}
                className="bg-brand-gradient rounded-md px-4 py-2.5 text-sm font-semibold text-bg hover:brightness-110"
              >
                确认模拟支付并下载
              </button>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="border-hair-2 rounded-md border px-4 py-2.5 text-sm text-ink-2 hover:text-ink"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
