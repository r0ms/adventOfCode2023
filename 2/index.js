const data = require('./data.json')
const MAX_RED = 12
const MAX_GREEN = 13
const MAX_BLUE = 14
const PULL_SEPARATION_REGEX = /(([0-9]+) (blue|red|green))/g

const isPossiblePull = ({red, blue, green}) => {
  return (red <= MAX_RED && green <= MAX_GREEN && blue <= MAX_BLUE)
}

// Used for part 1
const isPossibleGame = ({p}) => {
  return p.reduce((prev, next) => {
    return prev && isPossiblePull(next)
  }, true)
}

const result = data.map((game) => {
  return game.replace(' ', '') //trim whitespace
})
.map((g) => g.toLowerCase())
.map(game => { // extract game from the rest
  return game.split(':')
})
.map(([game, pulls])=> {
  return {
    g : parseInt(game.replace(/\D/g, ''), 10),
    p : pulls.split(';').map((pull) => {
      const formattedPull = {
        red : 0,
        green: 0, 
        blue: 0
      }
      pull.match(PULL_SEPARATION_REGEX).forEach((match) => {
        const [value, color] = match.split(' ')
        formattedPull[color] = parseInt(value, 10)
      })
      return formattedPull
    }),
    m : {
      red: 0,
      blue: 0,
      green : 0
    }
  }
})
.map((game) => {
  return {
    ...game,
    m : {
      red : game.p.reduce((a,b) => (Math.max(a, b.red)) , game.m.red),
      green : game.p.reduce((a,b) => (Math.max(a, b.green)), game.m.green),
      blue : game.p.reduce((a,b) => (Math.max(a, b.blue)), game.m.blue),
    }
  }
})
.map((game) => {
  const pred = game.m.red ? game.m.red : 1
  const pgreen = game.m.green ? game.m.green : 1
  const pblue = game.m.blue ? game.m.blue : 1
  return {
    ...game,
    power : pred*pgreen*pblue 
  }
})
.reduce((a, b) => a + b.power, 0) // Comment for part 1
//.filter(isPossibleGame) //Uncomment for part 1
//.reduce((a,b) => a + b.g, 0) //Uncomment for part 1
console.log('result', result)