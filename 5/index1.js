const data = require('./data.json')
const chainMap = [
  ['seed-to-soil-map', 'soil-to-fertilizer-map'],
  ['soil-to-fertilizer-map', 'fertilizer-to-water-map'],
  ['fertilizer-to-water-map', 'water-to-light-map'],
  ['water-to-light-map', 'light-to-temperature-map'],
  ['light-to-temperature-map', 'temperature-to-humidity-map'],
  ['temperature-to-humidity-map','humidity-to-location-map'],
  ['humidity-to-location-map']
]

const whichNext = (data, sourceKey, value) => {
  const sourceMap = data[sourceKey]
  const destinationKey = chainMap.find((e) => (e[0] === sourceKey))[1]
  const sourceObj = sourceMap.map((line, index) => {
    const [destStart, sourceStart, range] = line.split(' ').map((e) => parseInt(e, 10))
    return {
      destStart,
      destEnd :  destStart + range -1,
      sourceStart,
      sourceEnd: sourceStart + range -1 ,
      range, 
      index
    }
  })
  const source = sourceObj.find((s) => s.sourceStart<= value && value < s.sourceStart + (s.range))
  let destValue = 0
    if(!source){
      destValue = value
    } else {
      const diff = value - source.sourceStart
      destValue = source.destStart + diff
    }
    return destinationKey ? whichNext(data, destinationKey, destValue) : destValue
}

console.log('result', data.seeds.split(' ').map((seed) => whichNext(data,'seed-to-soil-map', parseInt(seed, 10)))
.reduce((a, b) => (Math.min(a,b)), Infinity))