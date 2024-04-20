const path = require('node:path');

const notes = '/users/joe/notes.txt';

path.dirname(notes); // /users/joe
path.basename(notes); //notes.txt
path.extname(notes) // .txt

const fs = require('node:fs');

fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

const fs = require('node:fs');

fs.readFile('/Users/joe/test.txt', content, err => {
    if (err) {
        console.error(err);
    } else {
      // file written successfully
    }
});

const chalk = require('chalk');

console.log(chalk.yellow('hi!'));