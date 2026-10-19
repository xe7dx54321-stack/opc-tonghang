// Keep today and the previous 30 Beijing calendar dates.
export function beijingToday(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now)
}

export function newsExpiryDay(day: string): string | null {
  const stamp = Date.parse(`${day}T00:00:00Z`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isFinite(stamp) || new Date(stamp).toISOString().slice(0, 10) !== day) return null
  return new Date(stamp + 31 * 86400000).toISOString().slice(0, 10)
}

export function isNewsDayActive(day: string, today = beijingToday()): boolean {
  const expiry = newsExpiryDay(day)
  return expiry !== null && day <= today && expiry > today
}
