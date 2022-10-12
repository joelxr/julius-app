export default function getItemsByDate(items: any[], key = 'date') {
  if (items && items.length) {
    const result = items.reduce((a: any, c: any) => {
      let prop = ''

      if (key === 'date' && c[key]) {
        prop = c[key].slice(0, 10)
      } else if (c[key]) {
        prop = c[key]
      }

      if (prop) {
        if (a[prop]) {
          a[prop].items.push(c)
        } else {
          a[prop] = { items: [c] }
        }
      }

      return a
    }, {})
    return result
  }
  return []
}
