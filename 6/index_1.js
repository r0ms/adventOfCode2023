const data = require('./data.json')
let winTimes = []
const w = (hold, time, record) => {
  if(hold === time)
    return winTimes
  const remaining = time - hold
  if(remaining * hold > record){
    winTimes.push(hold)
  }
  return w(hold+1, time, record)
}
console.log("result", data.map(({t, d}) => {
winTimes = []
return w(0, t, d).length}).reduce((a, b) => (a*b), 1))

