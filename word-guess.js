const Word = require(`./word`);
const inquirer = require(`inquirer`);
const request = require(`request`);
const wrap = require(`word-wrap`);
const size = require(`window-size`);

const ALPHABET = `abcdefghijklmnopqrstuvwxyz`;

console.log(`Loading dictionary...`);
request(`https://raw.githubusercontent.com/matthewreagan/WebstersEnglishDictionary/master/dictionary.json`,
    (err, response, body) => {
        if (err) throw err;

        if (response.statusCode === 200) {
            // Create Dictionary
            const DICTIONARY = JSON.parse(body);
            const WORDS = Object.keys(DICTIONARY);

            intro();
            game(WORDS, DICTIONARY);

        }
        else throw new Error(`Couldn't retrieve dictionary, response timed out or failed.`);
    });

function game(WORDS, DICTIONARY) {

    gameLoop();

    function gameLoop() {

        let word = new Word(WORDS[WORDS.length * Math.random() << 0]);
        let guesses = [];

        inputLoop(10);

        function inputLoop(strikes) {

            if (strikes === 0) {
                console.log(`\x1b[31m` + `\x1b[1m` + `Oh no! You got 10 strikes...\n` + `\x1b[0m`);
                console.log(`The word was:\n`);
                console.log(`${word.getWord()}: ${DICTIONARY[word.getWord()]}\n`);
                console.log(`\x1b[1m` + `Game over!\n` + `\x1b[0m`);
                confirm(gameLoop, `Try again? (y or n)`);
                return;
            }

            if (strikes > 0 && word.isRevealed()) {
                console.log(`\x1b[32m` + `\x1b[1m` + `You won! Congratulations!\n` + `\x1b[0m`);
                console.log(`The word was:\n`);
                console.log(`${word.getWord()}: ${DICTIONARY[word.getWord()]}\n`);
                console.log(`\x1b[1m` + `Game over!\n` + `\x1b[0m`);
                confirm(gameLoop, `Guess another word? (y or n)`);
                return;
            }

            console.log(word.toString() + `\n`);
            letterGuess(strikes);
        }

        function letterGuess(strikes) {
            const INVALID_INPUT = new Error(`Invalid input: input undefined or not a string!`);

            inquirer.prompt([{
                type: `input`,
                name: `letter`,
                message: `Guess a letter (you have ${10 - strikes} strikes${strikes === 1 ? `. Last chance, make it count!` : ``}): `
            }])
                .then(answers => {
                    if (answers.letter === undefined || typeof answers.letter !== `string`) {
                        throw INVALID_INPUT;
                    }
                    else if (answers.letter === `` || answers.letter.length > 1 || !ALPHABET.includes(answers.letter.toLowerCase())) {
                        console.log(`Guess must be a single alphabetical character!\n`);
                        letterGuess(strikes);
                    }
                    else {
                        let input = answers.letter.toLowerCase();

                        if (guesses.includes(input)) {
                            console.log(`\nYou've already guessed ${input.toUpperCase()}! Guess another letter...\n`);
                            letterGuess(strikes);
                        }
                        else {
                            let goodGuess = word.guess(input);
                            guesses.push(input);
                            if (goodGuess) {
                                console.log(`\nGood guess!\n`);
                                inputLoop(strikes);
                            }
                            else {
                                console.log(`\nYou guessed incorrectly...\n`);
                                inputLoop(strikes - 1);
                            }
                        }
                    }
                });
        }

        function confirm(callback, msg) {
            inquirer.prompt([{
                type: `input`,
                name: `yOrN`,
                message: msg
            }]).then((answers) => {
                const INVALID_INPUT = new Error(`Invalid input: Expected y or n`);
                if (answers.yOrN && typeof answers.yOrN === `string`) {

                    if (answers.yOrN === '') {
                        console.log(`Must enter y or n!`);
                        confirm(callback, msg);
                    }
                    else {
                        answers.yOrN = answers.yOrN[0].toLowerCase();
                        if (answers.yOrN === `y`) {
                            console.log(`\n`);
                            callback();
                        }
                        else if (answers.yOrN === `n`) {
                            console.log(`\nGoodbye!\n`);
                        }
                        else {
                            console.log(`Must enter y or n!`);
                            confirm(callback, msg);
                        }
                    }
                }
                else throw INVALID_INPUT;
            });
        }
    }
}

function intro() {

    let line = ``;
    let introText = `Welcome to Word Guess where the titles are generic and the words are either esoteric or archaic and usually hard! A word will be selected at random from the Unabridged Webster's English Dictionary (that's a whole lot of words!)  and you will then try to guess which word has been selected. Each incorrect guess will earn you a strike and you have only have 10 strikes. If you get 10 strikes, you lose, but if you guess correctly without getting 10 strikes, you win! Well, enough instructions and introductions; good luck and have fun!`;

    for (let i = 0; i < size.width; i++) {
        line += `=`;
    }

    let lineSegment = line.slice(0, parseInt((size.width - 20) / 2));
    let title = lineSegment + ` W O R D   G U E S S ` + lineSegment;

    if (title.length > size.width) title = title.slice(1);
    if (title.length < size.width) title += `=`;

    console.log(`\n\n`);
    console.log(`\x1b[1m`);
    console.log(line);
    console.log(title);
    console.log(line);
    console.log(`\x1b[0m`);
    console.log(wrap(introText, { width: size.width - 1, indent: `` }));
    console.log(`\x1b[1m`);
    console.log(line);
    console.log(`\n\n`);
    console.log(`\x1b[0m`);
}