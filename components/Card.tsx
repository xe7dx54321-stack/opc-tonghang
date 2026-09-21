import Image from './Image'
import Link from './Link'

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
  code?: string
  tag?: string
  status?: 'live' | 'beta' | 'soon'
}

const STATUS_STYLES: Record<string, string> = {
  live: 'bg-success/15 text-success border-success/30',
  beta: 'bg-accent/15 text-accent border-accent/30',
  soon: 'bg-bg-alt text-ink-3 border-hair-2',
}

const STATUS_LABELS: Record<string, string> = {
  live: '● Live',
  beta: '◐ Beta',
  soon: '○ Soon',
}

const Card = ({ title, description, imgSrc, href, code, tag, status }: CardProps) => (
  <div className="max-w-[544px] p-4 md:w-1/2">
    <div className="h-full overflow-hidden rounded-xl border border-hair bg-bg-card transition hover:border-accent/40">
      {imgSrc && (
        <div className="relative">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-48"
                width={544}
                height={306}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          )}
          {status && (
            <div
              className={`absolute right-3 top-3 rounded-md border px-2 py-1 font-num text-[10px] uppercase tracking-[0.18em] backdrop-blur-md ${STATUS_STYLES[status]}`}
            >
              {STATUS_LABELS[status]}
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between gap-2">
          {code && (
            <div className="font-num text-[10px] uppercase tracking-[0.18em] text-ink-3">
              {code}
            </div>
          )}
          {tag && (
            <div className="font-num text-[10px] uppercase tracking-[0.18em] text-accent">
              {tag}
            </div>
          )}
        </div>
        <h2 className="mt-3 mb-3 text-xl font-bold leading-7 tracking-tight text-ink">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`} className="hover:text-accent">
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="mb-4 max-w-none text-sm leading-relaxed text-ink-2">{description}</p>
        {href && (
          <Link
            href={href}
            className="text-sm font-medium text-accent hover:underline"
            aria-label={`Link to ${title}`}
          >
            查看详情 →
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card