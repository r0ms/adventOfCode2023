const data = require('./data.json')
const NUMBER_CAPTURE_REGEXP = /\d+/g
const SYMBOL_CAPTURE_REGEXP = /[^{\.\d}^\r\n\0\t]/g // Used this for part 1
const GEAR_CAPTURE_REGEXP = /\*/g

// Get kind of capture and their position and range
const kindAndPositions = data.map((line, index) => {
  const group = []
  let hasMatchNumber = NUMBER_CAPTURE_REGEXP.exec(line)
  let hasMatchSymbol = GEAR_CAPTURE_REGEXP.exec(line)
  while(hasMatchNumber || hasMatchSymbol ) {

    if(hasMatchNumber){
      group.push(
        {
          kind: 'n',
        value : hasMatchNumber[0],
         position : {
            sX : hasMatchNumber.index,
            eX : hasMatchNumber.index + hasMatchNumber[0].length-1,
            y: index
          },
          range : {
            x : [hasMatchNumber.index-1, hasMatchNumber.index + hasMatchNumber[0].length],
            y: [index -1 < 0 ? 0: index-1 , index+1]
          }
        })
    }
    if(hasMatchSymbol){
      group.push(
        {
          kind:'g',
          symbol : hasMatchSymbol[0],
         position : {
            x : hasMatchSymbol.index,
            y: index
          }
        })
    }
    hasMatchNumber = hasMatchNumber ? NUMBER_CAPTURE_REGEXP.exec(line) : null
    hasMatchSymbol = hasMatchSymbol ? GEAR_CAPTURE_REGEXP.exec(line) : null
  } 
  return group
})

// Tell apart symbols and number
const symbols = []
const numbers = []
kindAndPositions.forEach((line) => {
  symbols.push(...line.filter((e) => e.kind === 'g'))
  numbers.push(...line.filter((e) => e.kind === 'n'))
})

// Find adjacents
let numberTouchingSymbols = []
symbols.forEach((symbol) => {
  const numbersTouch = numbers.filter((number) => {
    return   (symbol.position.x >= number.range.x[0] 
          && symbol.position.x <= number.range.x[1])
          && (symbol.position.y >= number.range.y[0]
          && symbol.position.y <= number.range.y[1])
  })
  // For part 2, we only want couples
  if(numbersTouch.length === 2){
    numberTouchingSymbols.push(numbersTouch)
  }
})
const result = numberTouchingSymbols.map((gearCouple) => {
  return gearCouple.reduce((a, b) => (a * parseInt(b.value, 10)), 1)
})
.reduce((a, b) => (a + b), 0)
console.log('result', result)
