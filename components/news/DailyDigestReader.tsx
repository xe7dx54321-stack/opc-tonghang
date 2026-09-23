import { renderInline } from './NewsReader'

type DigestSection = { title: string; paragraphs: string[] }

function parseDigest(body: string) {
  // 早期回填稿用空行分段，现行日报用 --- 分隔每条新闻。
  const blocks = /\n\s*---\s*\n/.test(body)
    ? body.split(/\n\s*---\s*\n/)
    : body.split(/\n\s*\n/)
  const [intro = '', ...rest] = blocks.map(block => block.trim()).filter(Boolean)
  const stories: DigestSection[] = []
  const footnotes: string[] = []

  for (const block of rest) {
    const paragraphs = block.split(/\n\s*\n/).map(text => text.trim()).filter(Boolean)
    const content = paragraphs.filter(text => {
      if (/^\*[^*]+\*$/.test(text)) {
        footnotes.push(text.slice(1, -1))
        return false
      }
      return true
    })
    if (!content.length) continue

    const heading = /^##\s+([^\n]+)(?:\n+|$)/.exec(content[0])
    const title = heading?.[1].trim() ?? `要闻 ${String(stories.length + 1).padStart(2, '0')}`
    if (heading) content[0] = content[0].slice(heading[0].length).trim()
    stories.push({ title, paragraphs: content.filter(Boolean) })
  }

  return { intro: intro.replace(/^##\s+[^\n]+\n+/, '').trim(), stories, footnotes }
}

export default function DailyDigestReader({ body }: { body: string }) {
  const { intro, stories, footnotes } = parseDigest(body)

  return (
    <div className="mx-auto max-w-3xl">
      {intro && (
        <section aria-label="今日速览" className="relative overflow-hidden rounded-2xl border border-hair-2 bg-bg-card px-5 py-6 sm:px-8 sm:py-8">
          <div className="absolute inset-y-0 left-0 w-1 bg-accent" aria-hidden="true" />
          <div className="font-num text-[11px] tracking-[0.16em] text-accent">今日速览</div>
          <p className="mt-4 text-base font-normal leading-8 text-ink-2">{renderInline(intro)}</p>
        </section>
      )}

      <div className="mt-9 space-y-5">
        {stories.map((story, index) => (
          <section key={`${index}-${story.title}`} className="rounded-2xl border border-hair bg-bg-card px-5 py-6 sm:px-8 sm:py-7">
            <div className="flex items-start gap-4">
              <span className="font-num pt-1 text-xs text-accent">{String(index + 1).padStart(2, '0')}</span>
              <h2 className="text-lg font-semibold leading-snug text-ink sm:text-xl">{story.title}</h2>
            </div>
            <div className="mt-5 space-y-4 border-t border-hair pt-5">
              {story.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-sm font-normal leading-7 text-ink-2 sm:text-[15px] sm:leading-8">
                  {renderInline(paragraph)}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {footnotes.length > 0 && (
        <div className="mt-9 border-t border-hair pt-5 text-xs leading-6 text-ink-3">
          {footnotes.map((note, i) => <p key={i}>{renderInline(note)}</p>)}
        </div>
      )}
    </div>
  )
}
