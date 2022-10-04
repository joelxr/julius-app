import { differenceInDays, parseISO } from 'date-fns'

export default function getFrequency(items: any[]) {
  if (items && items.length) {
    const result = items
      .map((e) => e.date)
      .reduce((a, c, i, arr) => {
        if (i > 0) {
          const d1 = parseISO(c)
          const d2 = parseISO(arr[i - 1])
          const diff = differenceInDays(d1, d2)
          a.push(diff)
        }
        return a
      }, [])
      .reduce((a: number, c: number, i: number, arr: any[]) => {
        return a + c / arr.length
      }, 0)
    return result
  }
  return 0
}
