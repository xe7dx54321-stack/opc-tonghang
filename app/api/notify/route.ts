import { NextRequest, NextResponse } from 'next/server'
import { sendHarnessInterestEmails, emailConfig } from '@/lib/resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const VALID_HARNESS_SLUGS = new Set([
  'dd-skeleton',
  'oneliner-comp',
  'research-digest',
  'signal-radar',
])

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
}

export async function POST(req: NextRequest) {
  let body: { email?: string; harnessSlug?: string; harnessTitle?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const email = (body.email || '').trim().toLowerCase()
  const harnessSlug = (body.harnessSlug || '').trim().toLowerCase()

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
  }
  if (!harnessSlug || !VALID_HARNESS_SLUGS.has(harnessSlug)) {
    return NextResponse.json({ ok: false, error: 'invalid_harness' }, { status: 400 })
  }

  const harnessTitle = body.harnessTitle || harnessSlug

  const result = await sendHarnessInterestEmails(email, harnessTitle, harnessSlug)

  if (!result.ok) {
    if (result.reason === 'not_configured') {
      console.warn(`[notify] (dev mode) would notify: ${email} for ${harnessSlug}`)
      return NextResponse.json({
        ok: true,
        dev: true,
        message: '开发模式：Resend 未配置，已在服务端日志记录。',
      })
    }
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    configured: emailConfig.isConfigured,
  })
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    configured: emailConfig.isConfigured,
    validHarnesses: Array.from(VALID_HARNESS_SLUGS),
  })
}