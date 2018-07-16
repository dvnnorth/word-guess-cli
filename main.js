const Word = require (`./word`);
const inquirer = require(`inquirer`);
const request = require(`request`);

let cranberry = new Word(`cranberry`);
console.log(cranberry.guess(`c`), `// Expected true`);
console.log(cranberry.guess(`r`), `// Expected true`);
console.log(cranberry.guess(`K`), `// Expected false`);
console.log(cranberry.guess(`B`), `// Expected true`);
console.log(cranberry.guess(`       `), `// Expected false`);
console.log(cranberry.guess(24), `// Expected false`);
console.log(cranberry.guess(NaN), `// Expected false`);
console.log(cranberry.guess(undefined), `// Expected false`);
console.log(cranberry.guess(`24`), `// Expected false`);
console.log(cranberry.guess(``), `// Expected false`);
console.log(cranberry.guess(`     n        `), `// Expected true`);
console.log(cranberry.output(), `// Expected c r _ n b _ r r _`);