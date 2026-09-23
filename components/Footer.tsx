import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import Logo from '@/data/logo.svg'

export default function Footer() {
  const socials: { kind: Parameters<typeof SocialIcon>[0]['kind']; href?: string }[] = [
    { kind: 'mail', href: siteMetadata.email ? `mailto:${siteMetadata.email}` : undefined },
    { kind: 'github', href: siteMetadata.github || undefined },
    { kind: 'x', href: siteMetadata.x || undefined },
    { kind: 'linkedin', href: siteMetadata.linkedin || undefined },
  ]

  return (
    <footer className="mt-24 border-t border-hair">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-4 py-10 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="flex flex-col leading-tight">
            <div className="text-sm font-semibold text-ink">{siteMetadata.author}</div>
            <div className="font-num text-[11px] uppercase tracking-[0.18em] text-ink-3">
              © {new Date().getFullYear()} · 同行实验室
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex space-x-3 text-ink-2">
            {socials
              .filter((s) => s.href)
              .map((s) => (
                <span
                  key={s.kind}
                  className="rounded-md p-1.5 transition hover:bg-bg-alt hover:text-accent"
                >
                  <SocialIcon kind={s.kind} href={s.href} size={5} />
                </span>
              ))}
          </div>
          <div className="flex gap-4 text-xs text-ink-3">
            <Link href="/" className="hover:text-ink-2">
              首页
            </Link>
            <Link href="/blog" className="hover:text-ink-2">
              研究
            </Link>
            <Link href="/projects" className="hover:text-ink-2">
              Harness 工具
            </Link>
            <Link href="/uses" className="hover:text-ink-2">
              工具栈
            </Link>
            <Link href="/about" className="hover:text-ink-2">
              关于
            </Link>
            <Link href="/colophon" className="hover:text-ink-2">
              关于本站
            </Link>
          </div>
          <div className="font-num text-[11px] uppercase tracking-[0.18em] text-ink-3">
            Built with Next.js · Deployed on Vercel
          </div>
        </div>
      </div>
    </footer>
  )
}
