import { h } from 'vue'

interface HighlightTextProps {
  query: string
  text: string
}

const style = 'color: black; background-color: yellow; border-radius: 2px;'

export default ({ query, text }: HighlightTextProps) => {
  if (query === text) {
    return h('span', { style }, text)
  }

  const splitResult = text.split(new RegExp(query, 'i'))
  const result: any[] = []

  while (splitResult.length) {
    const r = splitResult.shift() || ''
    const rIndex = text.indexOf(r.toLocaleLowerCase())
    const queryIndex = text.indexOf(query.toLocaleLowerCase())

    if (rIndex > queryIndex) {
      result.push({ text: query, highlight: true })
      result.push({ text: r, highlight: false })
    } else {
      result.push({ text: r, highlight: false })
    }
  }

  return h(
    'span',
    result
      .filter((r) => !!r.text)
      .map((r) => {
        if (r.highlight) {
          return h('span', { style }, r.text)
        } else {
          return h('span', r.text)
        }
      })
  )
}
