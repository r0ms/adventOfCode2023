const data = require('./data.json')

function* execAll(str, regex) {
  let match;
  while (match = regex.exec(str)) {
    yield match;
  }
}

const cardValues = {
  'J': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'T': 10,
  'Q': 11,
  'K': 12,
  'A': 13,
}

const CARD_GROUP_REGEXP = /(?<c2>2)|(?<c3>3)|(?<c4>4)|(?<c5>5)|(?<c6>6)|(?<c7>7)|(?<c8>8)|(?<c9>9)|(?<cT>T)|(?<cJ>J)|(?<cQ>Q)|(?<cK>K)|(?<cA>A)/g

const isPair = (hand) => {
  return Object.values(hand)
    .filter((a) => (a === 2)).length === 1 && Object.values(hand)
    .filter((a) => (a === 3)).length === 0 ? 20 : false
}
const isTwoPair = (hand) => {
  return Object.values(hand)
    .filter((a) => (a === 2)).length === 2 ? 25 : false
}

const isThree = (hand) => {
  return Object.values(hand)
    .filter((a) => (a === 3)).length === 1 && Object.values(hand)
    .filter((a) => (a === 2)).length === 0 ? 30 : false
}

const isFull = (hand) => {
  return Object.values(hand)
    .filter((a) => (a === 3)).length === 1 && Object.values(hand)
    .filter((a) => (a === 2)).length === 1 ? 35 : false
}

const isFour = (hand) => {
  return Object.values(hand)
    .filter((a) => (a === 4)).length === 1 ? 40 : false
}

const isFive = (hand) => {
  return Object.values(hand)
    .filter((a) => (a === 5)).length === 1 ? 50 : false
}

const funnel = [isFive, isFour, isFull, isThree, isTwoPair, isPair]

const getKind = (hand) => {
  return funnel.reduce((memory, current) => {
    if (memory.pass)
      return memory
    if (!memory.kind) {
      memory.kind = 10
    }
    const newkind = current(memory.groupedHand) || memory.kind
    if (newkind !== memory.kind) {
      memory.pass = true
      memory.kind = newkind
    }
    return memory
  }, hand)
}

const groupedHands = data.map((handAndBet) => {
    handAndBet.groupedHand = Array.from(execAll(handAndBet.hand, CARD_GROUP_REGEXP))
      .reduce((a, b) => {
        a.c2 = a.c2 + Number(Boolean(b.groups.c2))
        a.c3 = a.c3 + Number(Boolean(b.groups.c3))
        a.c4 = a.c4 + Number(Boolean(b.groups.c4))
        a.c5 = a.c5 + Number(Boolean(b.groups.c5))
        a.c6 = a.c6 + Number(Boolean(b.groups.c6))
        a.c7 = a.c7 + Number(Boolean(b.groups.c7))
        a.c8 = a.c8 + Number(Boolean(b.groups.c8))
        a.c9 = a.c9 + Number(Boolean(b.groups.c9))
        a.cT = a.cT + Number(Boolean(b.groups.cT))
        a.cJ = a.cJ + Number(Boolean(b.groups.cJ))
        a.cQ = a.cQ + Number(Boolean(b.groups.cQ))
        a.cK = a.cK + Number(Boolean(b.groups.cK))
        a.cA = a.cA + Number(Boolean(b.groups.cA))
        a.j = a.j + Number(Boolean(b.groups.cJ))
        return a
      }, {
        c2: 0,
        c3: 0,
        c4: 0,
        c5: 0,
        c6: 0,
        c7: 0,
        c8: 0,
        c9: 0,
        cT: 0,
        cJ: 0,
        cQ: 0,
        cK: 0,
        cA: 0,
        j: 0
      })
    return handAndBet
  }).map((hand) => {
    const gh = hand.groupedHand
    if (gh.j === 0 || gh.j === 5) { // Edge case 5 J or none
      delete gh.j
      return hand
    }
    gh.cJ = 0 // reset J count
    const j = gh.j //buffer j
    delete gh.j // delete for next
    const keyToupdate = Object.entries(gh).reduce((lastKey, entry) => {
      const [key, value] = entry
      if (Math.max(gh[lastKey], value) === value)
        return key
      return lastKey
    }, 'c2')
    gh[keyToupdate] = gh[keyToupdate] + j
    hand.groupedHand = gh
    return hand
  })
  .map((hand) => {
    return getKind(hand)
  })
  .sort((a, b) => (a.kind > b.kind ? 1 : a.kind < b.kind ? -1 : 0))
  .reduce((memory, current) => {
    return {
      ...memory,
      [current.kind]: [
        ...(memory[current.kind] || []),
        current
      ]
    }
  }, {})

const t_1 = Object.values(groupedHands).map((hands) => {
  return hands.sort((a, b) => {
    const sA = a.hand.split('').map((c) => cardValues[c])
    const sB = b.hand.split('').map((c) => cardValues[c])
    let i = 0
    let j = 0
    do {
      j = sA[i] < sB[i] ? -1 : sA[i] > sB[i] ? 1 : 0
      i++
    } while (i < 5 && j === 0)
    return j
  })
})

const t = t_1.flat().reduce((a, b, i) => (a + (b.bet * (i + 1))), 0)


console.log('result', t)