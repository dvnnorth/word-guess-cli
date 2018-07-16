const Letter = require(`./letter`);
console.log(`1 ----------------------`);
console.log(`Expected: _ X`);
let x = new Letter(`X`, false);
console.log(x.output());
x.reveal();
console.log(x.output());

console.log(`2 ----------------------`);
console.log(`Expected: a a`);
let a = new Letter(`a`, true);
console.log(a.output());
a.reveal();
console.log(a.output());

console.log(`3 ----------------------`);
console.log(`Expected: _ D`);
let D = new Letter(`D`, false);
console.log(D.output());
D.reveal();
console.log(D.output());

console.log(`4 ----------------------`);
let K = new Letter(`K`, true);
console.log(`Expected: K K`);
console.log(K.output());
K.reveal();
console.log(K.output());

console.log(`5 ----------------------`);
console.log(`Expected: _ a`);
let m = new Letter(``, 20);
console.log(m.output());
m.reveal();
console.log(m.output());

console.log(`6 ----------------------`);
console.log(`Expected: _ a`);
let J = new Letter(`    `, false);
console.log(J.output());
J.reveal();
console.log(J.output());

console.log(`7 ----------------------`);
console.log(`Expected: _ s`);
let l = new Letter(`supercalifragilisticexpialadocious`, false);
console.log(l.output());
l.reveal();
console.log(l.output());

console.log(`8 ----------------------`);
console.log(`Expected: _ a`);
let P = new Letter(undefined, false);
console.log(P.output());
P.reveal();
console.log(P.output());

console.log(`9 ----------------------`);
console.log(`Expected: _ a`);
let r = new Letter(null, false);
console.log(r.output());
r.reveal();
console.log(r.output());

console.log(`10 ----------------------`);
let T = new Letter(NaN, false);
console.log(T.output());
T.reveal();
console.log(T.output());