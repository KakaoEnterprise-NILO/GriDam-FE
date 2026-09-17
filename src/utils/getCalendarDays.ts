export function getCalendarDays(year: number, month: number): string[][] {
  const result: string[][] = []
  const firstDay = new Date(year, month - 1, 1)
  const lastDay = new Date(year, month, 0)

  let week: string[] = []

  // 1일 이전 공백 채우기
  for (let i = 0; i < firstDay.getDay(); i++) {
    week.push('')
  }

  // 날짜 채우기
  for (let d = 1; d <= lastDay.getDate(); d++) {
    week.push(String(d))
    if (week.length === 7) {
      result.push(week)
      week = []
    }
  }

  // 마지막 줄 공백 채우기
  if (week.length > 0) {
    while (week.length < 7) week.push('')
    result.push(week)
  }

  return result
}
