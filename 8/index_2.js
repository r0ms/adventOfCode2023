const data = require('./data.json')

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b)
const lcm = (a, b) => a / gcd(a, b) * b
const lcmAll = (numbers) => numbers.reduce(lcm, 1)

const walk = (nodes, startnode, directions) => {
  let steps = 0
  let nextnode = startnode
  while (!nodes[nextnode][directions[steps % directions.length]].match(/Z$/)) {
    nextnode = nodes[nextnode][directions[steps % directions.length]]
    steps++
  }
  return steps + 1
}
const solve = (data) => {
  const input = data.input
  const instruction = input.split('').map((e) => (e === 'L' ? 0 : 1))
  const allStarts = Object.keys(data.nodes).filter((a => a.match(/A$/)))
  const cycles = allStarts.map((a) => (walk(data.nodes, a, instruction)))
  return lcmAll(cycles)
}

console.log('result', solve(data))