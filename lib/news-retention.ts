// Editions expire at midnight Beijing time on the same calendar date next month.
export function beijingToday(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now)
}

export function newsExpiryDay(day: string): string | null {
  const stamp = Date.parse(`${day}T00:00:00Z`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isFinite(stamp) || new Date(stamp).toISOString().slice(0, 10) !== day) return null
  const [year, month, date] = day.split('-').map(Number)
  const last = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
  return new Date(Date.UTC(year, month, Math.min(date, last))).toISOString().slice(0, 10)
}

export function isNewsDayActive(day: string, today = beijingToday()): boolean {
  const expiry = newsExpiryDay(day)
  return expiry !== null && expiry > today
}
