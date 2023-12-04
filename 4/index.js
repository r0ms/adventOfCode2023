const data =  require('./data.json')
const CARD_REMOVAL_REGEX = /^Card\W+\d+:/g
const i = (a, b) => (a.filter(Set.prototype.has, new Set(b)))
const r = data.map((l) => {
  let arrs = l.replace(CARD_REMOVAL_REGEX, '').trimStart().trimEnd().split(' | ')
  .map((e) => {
    return e.split(/\W+/)
  })
  return i(arrs[1], arrs[0]).length
}).map((win) => (win>0?(1<<win-1):0)).reduce((a, b)=>a+b, 0)
console.log('result', r)