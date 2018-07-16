function Letter (letter, isDisplayed) {

    if (typeof letter === `string`) letter = letter.trim();
    if (!letter || letter === `` || typeof letter !== `string`) letter = `a`;
    if (!isDisplayed || typeof isDisplayed !== 'boolean') isDisplayed = false;
    const blank = `_`;

    letter = letter[0];

    this.output = function () {
        if (isDisplayed) return letter;
        return blank;
    }

    this.reveal = function () {
        isDisplayed = true;
    }

}

module.exports = Letter;