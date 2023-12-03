const data = require('./data.json')

const replaceOverlap = {
'one' : 'onee',
'two' : 'twoo',
'three' : 'threee',
'four' : 'fourr',
'five' : 'fivee',
'six' : 'sixx',
'seven' : 'sevenn',
'eight' : 'eightt',
'nine' : 'ninee',
}

const substitutionMap = {
'one' : 1,
'two' : 2,
'three' : 3,
'four' : 4,
'five' : 5,
'six' : 6,
'seven' : 7,
'eight' : 8,
'nine' : 9,
}

const result =  data.map((l) => l.toLocaleLowerCase())
            .map(l => {
              const withTrailing = l.replace(/(one|two|three|four|five|six|seven|eight|nine)/g, (m) => replaceOverlap[m])
              const newline = withTrailing.replace(/(one|two|three|four|five|six|seven|eight|nine)/g, (m) => substitutionMap[m])
              return newline
            })
            .map((line) => (line.replace(/\D/g, ''))).filter(e => !!e)
            .map(l => (parseInt(`${l.slice(0, 1)}${l.slice(-1)}`, 10)))
            .reduce((a,b) => (a+b), 0)
console.log('result', result)
