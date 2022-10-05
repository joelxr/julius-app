import { parse, parseISO, parseJSON, format, differenceInDays } from 'date-fns'

export const money = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const quantity = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
})

export const relativeDateFormat = (date: string) => {
  const d = parseISO(date)
  const now = new Date()
  const diff = differenceInDays(now, d)
  if (diff > 7) return format(d, 'dd MMM')
  return format(d, 'EEE')
}
