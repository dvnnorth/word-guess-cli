const Letter = require(`./letter`);

/**
 * @desc Word - creates a word object that is a collection of Letter objects.
 * @constructor 
 * @param string word - the word represented by the word object. Parsed into Letter objects.
 * @const array letterCollection - a collection of Letter objects that represent the Word
 * @method output () - getter, pretty prints the Word object as a string of space-seperated characters
 *      or blanks, depending on which letters have been guessed.
 * @method guess (@param string char) - A function that takes a single character as a string and sees
 *      whether or not that character exists in the string and reveals it if so. Returns true or false
 *      based on whether the guess was correct or not.
 * @method revealAll () - reveals all of the Letter objects in letterCollection effectively revealing the word
 */
function Word (word) {

    // Generate collection of Letter objects
    const letterCollection = word.split(``).map((char) => new Letter(char, false));

    this.output = function () {
        return letterCollection.map((letterObj) => letterObj.output()).join(` `);
    }

    this.guess = function (letter) {
        letter = formatLetter(letter).toLowerCase();
        return letterCollection.reduce((goodGuess, letterObj) => {
            if (!letterObj.visible() && letterObj.getLetter().toLowerCase() === letter) {
                letterObj.reveal();
                goodGuess = true;
            }
            return goodGuess;
        }, false);
    }

    this.revealAll = function () {
        letterCollection.forEach((letterObj) => letterObj.reveal());
    }

    function formatLetter (letter) {
        if (!letter || letter === `` || typeof letter !== `string`) return ``;
        letter = letter.trim();
        letter[0] && (letter = letter[0]);
        return letter;
    }
}

module.exports = Word;