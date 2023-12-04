const data =  require('./data.json')
const CARD_REMOVAL_REGEX = /^Card\W+\d+:/g
const i = (a, b) => (a.filter(Set.prototype.has, new Set(b)))
const wins = new Array(data.length).fill(1)
data.map((l) => {
  let arrs = l.replace(CARD_REMOVAL_REGEX, '').trimStart().trimEnd().split(' | ')
  .map((e) => {
    return e.split(/\W+/)
  })
  return i(arrs[1], arrs[0]).length
})
.forEach((n, index, arr) => {
  const removed = wins.splice(index+1, n)
  wins.splice(index+1, 0, ...removed.map((value) => value+wins[index]))
})
const r = wins.reduce((a,b) => a+b, 0)
console.log('result', r)