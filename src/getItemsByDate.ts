export default function getItemsByDate(items: any[], key = 'date') {
  if (items && items.length) {
    const result = items.reduce((a: any, c: any) => {
      if (a[c[key]]) {
        a[c[key]].items.push(c)
      } else {
        a[c[key]] = { items: [c] }
      }
      return a
    }, {})
    return result
  }
  return []
}
