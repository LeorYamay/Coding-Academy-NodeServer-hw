import ms from 'ms'

console.log(ms(60000, {long:true}),":1 minute")
console.log(ms(2*60000, {long:true}),":2 minutes")
console.log(ms(-3*60000, {long:true}),":-3 minutes")
console.log(ms(ms('10 hours'), {long:true}),":10 hours")