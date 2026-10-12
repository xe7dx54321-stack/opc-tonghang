export default function NewsHeatBadge({ score }: { score: number }) {
  const tone = score >= 80
    ? 'border-accent/50 bg-accent/10 font-semibold text-accent'
    : score >= 70
      ? 'border-accent/30 text-accent'
      : 'border-hair-2 text-ink-3'
  return <span className={`shrink-0 rounded-full border px-2.5 py-1 font-num text-xs ${tone}`} aria-label={`关注热度 ${score} 分`}>热度 {score}</span>
}
