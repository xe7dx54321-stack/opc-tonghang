import { NextRequest, NextResponse } from 'next/server'
import { sendNewsletterEmails, emailConfig } from '@/lib/resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
}

export async function POST(req: NextRequest) {
  let body: { email?: string; source?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid_json' },
      { status: 400 }
    )
  }

  const email = (body.email || '').trim().toLowerCase()
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: 'invalid_email' },
      { status: 400 }
    )
  }

  const result = await sendNewsletterEmails(email)

  if (!result.ok) {
    if (result.reason === 'not_configured') {
      console.warn(`[newsletter] (dev mode) would subscribe: ${email}`)
      return NextResponse.json({
        ok: true,
        dev: true,
        message: '开发模式：Resend 未配置，已在服务端日志记录。',
      })
    }
    return NextResponse.json(
      { ok: false, error: 'send_failed' },
      { status: 500 }
    )
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
    message: emailConfig.isConfigured
      ? 'Newsletter endpoint ready (Resend configured).'
      : 'Newsletter endpoint ready, but Resend is not configured (dev mode).',
  })
}