const data = require('./data.json')
const walk = (nodes, startnode, directions) => {
  let steps = 0
  let nextnode = startnode
  while(nodes[nextnode][directions[steps % directions.length]] !== 'ZZZ'){
    nextnode = nodes[nextnode][directions[steps % directions.length]]
    steps++
  }
  return steps +1
}
const solve = (data) => {
  const input = data.input
  const startNode = 'AAA'
  const instruction = input.split('').map((e) => (e === 'L' ? 0:1))
  return walk(data.nodes, startNode, instruction)
}

console.log('result', solve(data))