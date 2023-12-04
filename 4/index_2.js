const data =  require('./data.json')
const i = (a, b) => (a.filter(Set.prototype.has, new Set(b)))
const wins = new Array(data.length).fill(1)
data.map((l) => {
  let arrs = l.replace(/^Card\W+\d+:/g, '').trimStart().trimEnd().split(' | ')
  .map((e) => ( e.split(/\W+/)))
  return i(arrs[1], arrs[0]).length
}).forEach((n, index) => {
  const removed = wins.splice(index+1, n)
  wins.splice(index+1, 0, ...removed.map((value) => value+wins[index]))
})
console.log('result',wins.reduce((a,b) => a+b, 0))