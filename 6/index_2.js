const data = {t: 40929790, d:215106415051100}
const example = {t:71530, d:940200}
const s = (d)=> {
let w = []
for (let i = 0; i <= d.t; i++){
  const r = d.t - i
  if (r * i > d.d)
    w.push(i)
}
return w.length
}
console.log("result",s(data))
