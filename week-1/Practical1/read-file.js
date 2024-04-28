const fs = require('node:fs');

const filePath = '/Users/65883/Documents/Node/Practical1/notes.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
