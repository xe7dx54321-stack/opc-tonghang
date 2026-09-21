'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface NotifyFormProps {
  harnessSlug: string
  harnessTitle: string
  className?: string
  cta?: string
}

export default function NotifyForm({
  harnessSlug,
  harnessTitle,
  className = '',
  cta = '预约内测 / 上线通知',
}: NotifyFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/notify/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, harnessSlug, harnessTitle }),
      })
      const data = await res.json()
      if (data.ok) {
        setStatus('success')
        setEmail('')
        router.push(
          `/thanks?type=harness&slug=${encodeURIComponent(harnessSlug)}&title=${encodeURIComponent(harnessTitle)}`
        )
      } else {
        setStatus('error')
        setErrorMsg(
          data.error === 'invalid_email'
            ? '请输入有效的邮箱地址'
            : data.error === 'invalid_harness'
              ? 'Harness 不存在'
              : '提交失败，请稍后再试'
        )
      }
    } catch {
      setStatus('error')
      setErrorMsg('网络异常，请稍后再试')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className} aria-label={`预约 ${harnessTitle} 通知`}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          disabled={status === 'loading' || status === 'success'}
          className="flex-1 rounded-md border border-hair bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none disabled:opacity-50"
          aria-label="邮箱"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-bg transition hover:brightness-110 disabled:opacity-60"
        >
          {status === 'loading' ? '提交中...' : status === 'success' ? '✓ 已记录' : cta}
        </button>
      </div>
      {status === 'error' && <p className="mt-2 text-xs text-danger">{errorMsg}</p>}
      <p className="mt-2 text-xs text-ink-3">
        Harness 上线 / 开放内测时第一时间通知你。
      </p>
    </form>
  )
}