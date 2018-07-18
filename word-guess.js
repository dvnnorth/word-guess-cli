const Word = require(`./word`);
const inquirer = require(`inquirer`);
const request = require(`request`);
const ALPHABET = `abcdefghijklmnopqrstuvwxyz`;

console.log(`Loading dictionary...`);
request(`https://raw.githubusercontent.com/matthewreagan/WebstersEnglishDictionary/master/dictionary.json`,
    (err, response, body) => {
        if (err) throw err;

        if (response.statusCode === 200) {
            // Create Dictionary
            const DICTIONARY = JSON.parse(body);
            const WORDS = Object.keys(DICTIONARY);

            game(WORDS, DICTIONARY);

        }
        else throw new Error(`Couldn't retrieve dictionary, response timed out or failed.`);
    });

function game(WORDS, DICTIONARY) {

    gameLoop();

    function gameLoop() {

        let word = new Word(WORDS[WORDS.length * Math.random() << 0]);
        let guesses = [];

        intro();

        inputLoop(10);

        function inputLoop(strikes) {

            if (strikes === 0) {
                console.log(`Oh no! You got 10 strikes...\n`);
                console.log(`The word was:\n`);
                console.log(`${word.getWord()}: ${DICTIONARY[word.getWord()]}\n`);
                console.log(`Game over!\n`);
                confirm(gameLoop, `Play again? (y or n)`);
                return;
            }

            if (strikes > 0 && word.isRevealed()) {
                console.log(`You won! Congratulations!\n`);
                console.log(`The word was:\n`);
                console.log(`${word.getWord()}: ${DICTIONARY[word.getWord()]}\n`);
                console.log(`Game over!\n`);
                confirm(gameLoop, `Play again? (y or n)`);
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
                            console.log(`You've already guessed ${input.toUpperCase()}! Guess another letter...\n`);
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
                if (answers.yOrN && typeof answers.yOrN === `string` && answers.yOrN !== ``) {
                    answers.yOrN = answers.yOrN[0].toLowerCase();
                    if (answers.yOrN === `y`) {
                        callback();
                    }
                    else if (answers.yOrN === `n`) {
                        console.log(`\nGoodbye!\n`);
                    }
                    else throw INVALID_INPUT;
                }
                else throw INVALID_INPUT;
            });
        }
    }

    function intro() {
        console.log(`\n\n`);
        console.log(`====================================== W O R D   G U E S S ============================================================`)
        console.log(`=======================================================================================================================`);
        console.log(`= Welcome to Word Guess! Where the titles are generic and the words are either esoteric or archaic and usually hard.  =`);
        console.log(`= A word will be selected at random from the Unabridged Webster's English Dictionary (that's a whole lot of words!)   =`);
        console.log(`= and you will guess which word has been selected. Each incorrect guess will earn you a strike. You have 10 strikes,  =`);
        console.log(`= after that, game over! Good luck!                                                                                   =`);
        console.log(`=======================================================================================================================`);
        console.log(`\n\n`);
    }
}