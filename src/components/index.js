const fs = require('fs');

// const jsonData = require('../../words.json'); 
// const arr = (jsonData.array).split(',')
//     .filter(d => !d.includes('ing'))
//     .filter(d => !d.includes('ed'))
//     .filter(d => d.length > 4)
// console.log(arr);

// export const words = (require('../../words.json').string).split(','); 

var randomWords = require('random-words');
const w = randomWords({ exactly: 200000, maxLength: 9 })




let words = w.filter(d => d.length > 3)
    .filter(d => d.split('')[d.length - 1] !== 's')
    .filter(d => d.split('')[d.length - 3] + d.split('')[d.length - 2] + d.split('')[d.length - 1] !== 'ing')


function removeDups(names) {
    let unique = {};
    names.forEach(function (i) {
        if (!unique[i]) {
            unique[i] = true;
        }
    });
    return Object.keys(unique);
}

let removeddups = removeDups(words)

fs.writeFile("theWords.json",
    `{
    "arr": "${(removeddups)}"
}`,
    (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            console.log(fs.readFileSync("words.txt", "utf8"));
        }
    });