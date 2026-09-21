'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface NewsletterFormProps {
  variant?: 'default' | 'compact'
  className?: string
  /** 用于埋点，标识表单来源（例：'home-newsletter-card'） */
  source?: string
  /** 提交成功后跳的页面（默认 /thanks） */
  redirectTo?: string
  /** 自定义按钮文案 */
  cta?: string
  /** 自定义 placeholder */
  placeholder?: string
  /** 附在标题上方的 eyebrow 文案 */
  eyebrow?: string
  /** 自定义副标题/说明文字 */
  description?: string
}

export default function NewsletterForm({
  variant = 'default',
  className = '',
  source = 'newsletter',
  redirectTo = '/thanks',
  cta = '订阅',
  placeholder = 'you@example.com',
  eyebrow,
  description,
}: NewsletterFormProps) {
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
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      const data = await res.json()
      if (data.ok) {
        setStatus('success')
        setEmail('')
        // 用 query 告知 thanks 页来源
        const sep = redirectTo.includes('?') ? '&' : '?'
        router.push(`${redirectTo}${sep}type=newsletter&source=${encodeURIComponent(source)}`)
      } else {
        setStatus('error')
        setErrorMsg(
          data.error === 'invalid_email'
            ? '请输入有效的邮箱地址'
            : '订阅失败，请稍后再试或邮件 hello@tonghanglab.com'
        )
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg('网络异常，请稍后再试')
    }
  }

  if (variant === 'compact') {
    return (
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-2 sm:flex-row ${className}`}
        aria-label="Newsletter 订阅"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={status === 'loading' || status === 'success'}
          className="flex-1 rounded-md border border-hair bg-bg px-3 py-2 text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none disabled:opacity-50"
          aria-label="邮箱"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="rounded-md bg-brand-gradient px-4 py-2 text-sm font-semibold text-bg transition hover:brightness-110 disabled:opacity-60"
        >
          {status === 'loading' ? '提交中...' : status === 'success' ? '✓ 已订阅' : cta}
        </button>
        {status === 'error' && (
          <p className="text-xs text-danger sm:absolute sm:mt-12">{errorMsg}</p>
        )}
      </form>
    )
  }

  return (
    <div className={className}>
      {eyebrow && (
        <div className="font-num text-[10px] uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </div>
      )}
      {description && <p className="mt-2 text-sm text-ink-2">{description}</p>}
      <form onSubmit={handleSubmit} className="mt-4" aria-label="Newsletter 订阅">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 rounded-md border border-hair bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none disabled:opacity-50"
            aria-label="邮箱"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-bg transition hover:brightness-110 disabled:opacity-60"
          >
            {status === 'loading' ? '提交中...' : status === 'success' ? '✓ 已订阅' : cta}
          </button>
        </div>
        {status === 'error' && (
          <p className="mt-2 text-xs text-danger">{errorMsg}</p>
        )}
        <p className="mt-2 text-xs text-ink-3">
          提交即同意接收邮件。可随时通过邮件内链接退订。
        </p>
      </form>
    </div>
  )
}