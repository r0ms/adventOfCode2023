const data = require('./data.json')
const containOnlyZero = (a) => (a.reduce((a, b )=> (a+b), 0) === 0)

const solve = data => {
  const t = data.map(line => {
    return [line.split(' ').map(a => parseInt(a, 10)).reverse()]
  })
  .map((s) => {
    let buferedS = s
    let index = 0
    do{
      let newS =[]
      buferedS[index].reduce((mem, current, i) => {
        if(i === 0) return mem
        newS.push(current - mem)
        return current
      },buferedS[index][0])

      buferedS.push(newS)
      index ++
    } while (!containOnlyZero(buferedS[buferedS.length -1])) // update this
    return buferedS
  })
  t.map((a) => {
    a[a.length - 1].push(0)
    return a
  }).map((arr) => {return arr.reduceRight((a, b, i) => {
    let leastValue = b[b.length-1]
    b.push(a[a.length-1]+leastValue)
    return b
  }, arr[arr.length-1])
})
//console.log(t)
  return t.reduce((a, b) => {
    return a + b[0][b[0].length-1]
  }, 0)
}
console.log(solve(data))