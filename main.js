const Word = require (`./word`);
const inquirer = require(`inquirer`);
const request = require(`request`);

console.log(`Loading dictionary...`);
request(`https://raw.githubusercontent.com/matthewreagan/WebstersEnglishDictionary/master/dictionary.json`, 
    (err, response, body) => {
        if (err) throw err;

        if (response.statusCode === 200) {
            // Create Dictionary
            const DICTIONARY = JSON.parse(body);
            const WORDS = Object.keys(DICTIONARY);
            let word, gameOn;

            // Game loop
            do {
                word = WORDS[WORDS.length * Math.random() << 0];
                console.log(word);
                console.log(DICTIONARY[word]);
                gameOn = false;
            } while(gameOn);

        }
        else throw new Error(`Couldn't retrieve dictionary, response timed out or failed.`);
    });