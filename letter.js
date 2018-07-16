/**
 * @desc Letter - creates a letter object. Letter objects contain a single character string
 *      the letter itself, and whether or not the letter is displayed or not.
 * @constructor 
 * @param string letter - the letter, lower-case or upper-case, as a single character string.
 *      Defaults to 'a'.
 * @param bool isDisplayed - Whether or not the letter is blank (_) or displayed (the character).
 *      Defaults to false.
 * @method output () - getter, outputs the letter or an underscore depending on the value of isDisplayed
 * @method reveal () - mutator, changes isDisplayed to true
 * @method visible () - getter, returns the status of isDisplayed
 * @method getLetter () - getter, returns the letter
 * @function formatLetter (@param letter) - helper function that formats a string parameter to be a single character
 */
function Letter (letter, isDisplayed) {

    // Error handling and initialization
    if (!isDisplayed || typeof isDisplayed !== 'boolean') isDisplayed = false;
    letter = formatLetter(letter);

    // Create output to be given when isDisplayed is false, an underscore representing a blank space
    const blank = `_`;

    // output returns the letter or the blank depending on the value of isDisplayed
    this.output = function () {
        if (isDisplayed) return letter;
        return blank;
    }

    // reveal switches the value of isDisplayed to true
    this.reveal = function () {
        isDisplayed = true;
    }

    // visible returns the status of isDisplayed
    this.visible = function () {
        return isDisplayed;
    }

    this.getLetter = function () {
        return letter;
    }

    function formatLetter(letter) {
        if (!letter || letter === `` || typeof letter !== `string`) return `a`;
        letter = letter.trim();
        letter[0] && (letter = letter[0]);
        return letter;
    }

}

module.exports = Letter;