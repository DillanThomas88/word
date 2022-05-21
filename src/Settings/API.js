
const axios = require('axios');
const fs = require('fs');


// const options = {
//     method: 'GET',
//     url: 'https://wordsapiv1.p.rapidapi.com/words/?hasDetails=typeOf',
//     params: {

//         pronunciationpattern: '.*æm$',
//         partofspeech: 'true',
//         lettersmin: '5',
//         lettersMax: '9',
//         limit: '5',
//         page: '500',
//         frequencymin: '1',
//         frequencymax: '2',
//     },
//     headers: {
//         'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
//         'X-RapidAPI-Key': '243fa6edf4mshdc656e6ae210fc6p13e6dbjsn13052493e248'
//     }
// };

// axios.request(options).then(function (response) {
//     console.log(response.data.results.data);
//     fs.writeFile('src/write.json', response.data.results.data.toString(), err => {
//         if (err) {
//             console.error(err)
//             return
//         }
//         //file written successfully
//     })
// }).catch(function (error) {
//     console.error(error);
// });


// const W = require('../write.json')

// const arr = W.word.split(',')
//     .filter(data => data.split('').length > 4)
//     .filter(data => !data.includes(" "))
//     .filter(data => !data.includes("'"))
//     .filter(data => !data.includes("."))
//     .filter(data => !data.includes(";"))
//     .filter(data => !data.includes("/"))
//     .filter(data => !data.includes("-"))
//     .filter(data => !data.includes("aa"))
//     .filter(data => !data.includes("dh"))
//     .filter(data => !data.includes("pu"))
//     .filter(data => !data.includes("dj"))
//     .filter(data => !data.includes("ux"))
//     .filter(data => !data.includes("hl"))
//     .filter(data => !data.includes("pu"))
//     .filter(data => data.split('')[data.length - 1] !== 's')
//     .filter(data => data.split('')[data.length - 3] + data.split('')[data.length - 2] + data.split('')[data.length - 1] !== 'ing')
//     .filter(data => data.split('')[data.length - 3] + data.split('')[data.length - 2] + data.split('')[data.length - 1] !== 'est')
//     .filter(data => data.split('')[data.length - 2] + data.split('')[data.length - 1] !== 'ed')
//     .filter(data => data.split('')[data.length - 2] + data.split('')[data.length - 1] !== 'er')
//     .filter(data => data.split('')[data.length - 1] !== 'z')
//     .filter(data => data.split('')[data.length - 1] !== 'x')
//     .filter(data => data.split('')[data.length - 1] !== 'o')
//     .filter(data => data.split('')[data.length - 1] !== 'i')
//     .filter(data => data.split('')[data.length - 1] !== 'v')
//     .filter(data => data.split('')[data.length - 1] !== 'u')


// const shuffledArray = arr.sort((a, b) => 0.5 - Math.random());
// // console.log(shuffledArray.toString());


// // console.log(response.data.results.data);
// fs.writeFile('src/testy.json', shuffledArray.toString(), err => {
//     if (err) {
//       console.error(err);
//     }
//     // file written successfully
//   });

