const data = require('./data.json')
const array_chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));

const i_chainMap = [
  ['humidity-to-location-map', 'temperature-to-humidity-map'],
  ['temperature-to-humidity-map', 'light-to-temperature-map'],
  ['light-to-temperature-map', 'water-to-light-map'],
  ['water-to-light-map', 'fertilizer-to-water-map'],
  ['fertilizer-to-water-map', 'soil-to-fertilizer-map'],
  ['soil-to-fertilizer-map', 'seed-to-soil-map'],
  ['seed-to-soil-map']
]

const whichNext = (data, sourceKey, value) => {
  const sourceMap = data[sourceKey]
  const destinationKey = i_chainMap.find((e) => (e[0] === sourceKey))[1]
  const sourceObj = sourceMap.map((line, index) => {
    const [sourceStart, destStart, range] = line.split(' ').map((e) => parseInt(e, 10))
    return {
      destStart,
      destEnd: destStart + range - 1,
      sourceStart,
      sourceEnd: sourceStart + range - 1,
      range,
      index
    }
  })
  const source = sourceObj.find((s) => s.sourceStart <= value && value < s.sourceStart + (s.range))
  let destValue = 0
  if (!source) {
    destValue = value
  } else {
    const diff = value - source.sourceStart
    destValue = source.destStart + diff
  }
  return destinationKey ? whichNext(data, destinationKey, destValue) : destValue
}
const seedsRange = array_chunks(data.seeds.split(' ').map((e) => (parseInt(e, 10))), 2).map((couple) => {
  return [couple[0], couple[0] + couple[1] - 1]
})
let locationsPossible = []
let i = 0
do {
  const seed = whichNext(data, 'humidity-to-location-map', i)
  if (seedsRange.filter((a) => {
      return a[0] <= seed && seed < a[1]
    }).length)
    locationsPossible.push(i)
  i++
} while (locationsPossible.length === 0)
console.log("Go grab a coffee or a tea 🍵, it may take a while...")
console.log('result', locationsPossible[0])