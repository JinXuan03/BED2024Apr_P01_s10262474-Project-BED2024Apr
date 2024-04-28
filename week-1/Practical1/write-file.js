const fs = require('node:fs');

const content = 'Some content!';
const filePath = '/Users/65883/Documents/Node/Practical1/notes.txt';

fs.writeFile(filePath, content, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File written successfully');
});