const request = require('request');
const args = process.argv;
const fs = require('fs');

if (args.length < 4) {
  console.error('Usage: node yourScript.js <url>');
  process.exit(1); // Exit with an error code
}

const url = args[2]; // starts from the third and fourth value of process.argv
const newFile = args[3];
const filePath = newFile;

request(url, (error, response, body) => {
  if (error) {
    console.log('error:', error); // Print the error if one occurred
  } else {

    fs.writeFile(newFile, body, error => { //create newFile using body from previous function
      if (error) {
        console.error(error);
      } else {
       
        fs.stat(filePath, (err, stats) => { //find stats for new file
          if (err) {
            console.error('Error getting file stats:', err);
          } else {
            const fileBytes = stats.size; //stats.size = bytes in file
            console.log(`Downloaded and saved ${fileBytes} to ${newFile} `);
          }
        });
      }
    });
  }
});