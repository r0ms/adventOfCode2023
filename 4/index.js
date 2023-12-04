const data =  require('./data.json')
const i = (a, b) => (a.filter(Set.prototype.has, new Set(b)))
console.log('result', data.map((l) => {
  let arrs = l.replace(/^Card\W+\d+:/g, '').trimStart().trimEnd().split(' | ')
  .map((e) => (e.split(/\W+/)))  
  return i(arrs[1], arrs[0]).length
}).map((win) => (win?(1<<win-1):0)).reduce((a, b)=>a+b, 0))