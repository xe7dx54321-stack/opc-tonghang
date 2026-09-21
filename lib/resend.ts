// Resend 客户端 + 邮件模板工具
// 注意：所有调用前都应校验环境变量是否存在

import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const ownerEmail = process.env.OWNER_EMAIL || 'hello@tonghanglab.com'

export const resend = apiKey ? new Resend(apiKey) : null

export const emailConfig = {
  from: fromEmail,
  ownerEmail,
  isConfigured: !!apiKey,
}

/**
 * 基础邮件 HTML 模板（带品牌 header/footer）
 */
function baseTemplate({ title, contentHtml }: { title: string; contentHtml: string }): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Noto Sans SC',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#111418;border:1px solid #1A1D22;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:32px 40px 0 40px;">
              <div style="font-family:ui-monospace,SFMono-Regular,'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:#7C858E;text-transform:uppercase;">
                TONGXING · LAB
              </div>
              <div style="margin-top:8px;font-size:20px;font-weight:700;color:#E8ECEF;">
                ${title}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 32px 40px;color:#A8B0B8;font-size:15px;line-height:1.7;">
              ${contentHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #1A1D22;color:#7C858E;font-size:12px;">
              同行实验室 · PE/VC 投资人独立运营的研究与工具实验室
              <br />
              <a href="https://tonghanglab.com" style="color:#00E0C7;text-decoration:none;">tonghanglab.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

interface SendNewsletterWelcomeParams {
  to: string
}

export function renderNewsletterWelcomeHtml({ to }: SendNewsletterWelcomeParams): string {
  const contentHtml = `
    <p>感谢订阅 <strong style="color:#00E0C7;">同行实验室</strong> 研究月报。</p>
    <p>每月一封，包含三件事：</p>
    <ol>
      <li>一份我看过的项目（带理由）</li>
      <li>一段当前市场判断</li>
      <li>两条 AI 工作流实战</li>
    </ol>
    <p>不发广告，可随时退订。</p>
    <p style="margin-top:32px;color:#7C858E;font-size:13px;">— 同行实验室</p>
  `
  return baseTemplate({ title: '欢迎订阅同行实验室', contentHtml })
}

interface SendOwnerNotificationParams {
  type: 'newsletter' | 'harness-interest'
  email: string
  meta?: Record<string, string>
}

export function renderOwnerNotificationHtml({
  type,
  email,
  meta = {},
}: SendOwnerNotificationParams): string {
  const metaRows = Object.entries(meta)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:5px 12px;color:#7C858E;font-family:ui-monospace,monospace;font-size:13px;">${k}</td><td style="padding:5px 12px;color:#E8ECEF;">${v}</td></tr>`
    )
    .join('')

  const typeLabel =
    type === 'newsletter' ? 'Newsletter 订阅' : 'Harness 兴趣登记'
  const contentHtml = `
    <p>新的 <strong style="color:#00E0C7;">${typeLabel}</strong> 提交：</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="background:#0A0A0A;border:1px solid #1A1D22;border-radius:8px;margin:16px 0;">
      <tr>
        <td style="padding:8px 12px;color:#7C858E;font-family:ui-monospace,monospace;font-size:13px;">email</td>
        <td style="padding:8px 12px;color:#00E0C7;font-family:ui-monospace,monospace;font-size:14px;">
          <a href="mailto:${email}" style="color:#00E0C7;">${email}</a>
        </td>
      </tr>
      ${metaRows}
    </table>
    <p style="margin-top:16px;color:#7C858E;font-size:13px;">时间：${new Date().toLocaleString('zh-CN', { hour12: false })}</p>
  `
  return baseTemplate({ title: `新${typeLabel}`, contentHtml })
}

/**
 * 发送 Newsletter 订阅流程：
 * 1. 给订阅者发欢迎邮件（沙箱模式可能失败，但不影响主流程）
 * 2. 给你（站长）发通知邮件（永远尝试发出去，订阅的事实记录）
 */
export async function sendNewsletterEmails(email: string) {
  if (!resend) {
    console.warn('[resend] API key not configured, skip sending')
    return { ok: false, reason: 'not_configured' as const }
  }
  const welcomeHtml = renderNewsletterWelcomeHtml({ to: email })
  const notifyHtml = renderOwnerNotificationHtml({ type: 'newsletter', email })

  const errors: string[] = []

  // 1. 通知站长（核心，不能失败）
  let notifyOk = false
  try {
    const r = await resend.emails.send({
      from: emailConfig.from,
      to: emailConfig.ownerEmail,
      replyTo: email,
      subject: `[Newsletter] 新订阅：${email}`,
      html: notifyHtml,
    })
    if (r.error) errors.push(`notify: ${r.error.message}`)
    else notifyOk = true
  } catch (err) {
    errors.push(`notify exception: ${String(err)}`)
  }

  // 2. 欢迎邮件（沙箱模式可能拒收非账号邮箱，失败不阻塞）
  let welcomeOk = false
  try {
    const r = await resend.emails.send({
      from: emailConfig.from,
      to: email,
      subject: '欢迎订阅同行实验室研究月报',
      html: welcomeHtml,
    })
    if (r.error) errors.push(`welcome: ${r.error.message}`)
    else welcomeOk = true
  } catch (err) {
    errors.push(`welcome exception: ${String(err)}`)
  }

  if (!notifyOk) {
    console.error('[resend] sendNewsletterEmails critical failure', errors)
    return { ok: false, reason: 'send_failed' as const, error: errors.join('; ') }
  }
  if (errors.length) console.warn('[resend] partial success', errors)
  return { ok: true, notifyOk, welcomeOk }
}

/**
 * 发送 Harness 兴趣登记：
 * 通知站长（核心）+ 给订阅者发确认（沙箱模式可能拒收）。
 */
export async function sendHarnessInterestEmails(
  email: string,
  harnessTitle: string,
  harnessSlug: string
) {
  if (!resend) {
    console.warn('[resend] API key not configured, skip sending')
    return { ok: false, reason: 'not_configured' as const }
  }
  const contentHtml = `
    <p>感谢你对 <strong style="color:#00E0C7;">${harnessTitle}</strong> 的关注。</p>
    <p>Harness 上线 / 开放内测时，我会第一时间通过邮件告诉你。</p>
    <p style="margin-top:24px;">
      <a href="https://tonghanglab.com/harness/${harnessSlug}/" style="display:inline-block;padding:10px 20px;background:linear-gradient(135deg,#00E0C7,#00A85A);color:#0A0A0A;text-decoration:none;border-radius:6px;font-weight:600;">
        查看 Harness 详情页 →
      </a>
    </p>
    <p style="margin-top:32px;color:#7C858E;font-size:13px;">— 同行实验室</p>
  `
  const welcomeHtml = baseTemplate({
    title: `${harnessTitle} · 预约成功`,
    contentHtml,
  })
  const notifyHtml = renderOwnerNotificationHtml({
    type: 'harness-interest',
    email,
    meta: { harness: harnessTitle, slug: harnessSlug },
  })

  const errors: string[] = []

  let notifyOk = false
  try {
    const r = await resend.emails.send({
      from: emailConfig.from,
      to: emailConfig.ownerEmail,
      replyTo: email,
      subject: `[Harness 兴趣] ${harnessTitle} · ${email}`,
      html: notifyHtml,
    })
    if (r.error) errors.push(`notify: ${r.error.message}`)
    else notifyOk = true
  } catch (err) {
    errors.push(`notify exception: ${String(err)}`)
  }

  let welcomeOk = false
  try {
    const r = await resend.emails.send({
      from: emailConfig.from,
      to: email,
      subject: `${harnessTitle} · 预约成功`,
      html: welcomeHtml,
    })
    if (r.error) errors.push(`welcome: ${r.error.message}`)
    else welcomeOk = true
  } catch (err) {
    errors.push(`welcome exception: ${String(err)}`)
  }

  if (!notifyOk) {
    console.error('[resend] sendHarnessInterestEmails critical failure', errors)
    return { ok: false, reason: 'send_failed' as const, error: errors.join('; ') }
  }
  if (errors.length) console.warn('[resend] partial success', errors)
  return { ok: true, notifyOk, welcomeOk }
}