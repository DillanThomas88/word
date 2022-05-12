import template from './settings.json'

export function readyUpPlayer() {

    // console.log(template.keyLetterData);

    let data = {}

    if (!localStorage.getItem("keyLetterData")) {

        data = template.keyLetterData


    } else { data = JSON.parse(localStorage.getItem("keyLetterData")) }

    if (data.currentday !== dayOfYear(new Date())) {
        data = template.keyLetterData
        data.currentday = dayOfYear(new Date())
    }



    localStorage.setItem('keyLetterData', JSON.stringify(data))
    return data

}

const dayOfYear = date =>
    Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

export function getInterval() {

    const startDay = template.day

    let interval = (dayOfYear(new Date()) - startDay) * 4

    return {
        default: interval,
        day: interval / 4 + 1,
        week: Math.floor((interval / 4) / 7) + 1
    }
}


// ! update local LETTERS

export function updateLetters(data) {

    localStorage.setItem('keyLetterData', JSON.stringify(data))

}

export function updatePlayerData(func, arr, index, location) {
    let x = { ...location }
    x.daily[index] = arr

    func(x)
}


export function checkCompletion(letterArr, wordArr, func) {
    let x = 0
    letterArr.forEach((element, index) => {
        if (element.length === wordArr[index].length) {
            x++
        }
    });
    return x
    
}

// ! scoring

export function showResults(answer, guess){

    let ranInterval = Math.floor(Math.random()*1000)
    // console.log(answer, guess);


    const showLetter = () => {

        let randomNum = Math.floor(Math.random()*answer.length)

        if(!answer.length) return
        
        
        
        let t = setInterval(() => {

            if(answer[randomNum] == guess[randomNum]){
                // console.log('correct');
            } else {
                // console.log('incorrect')
            };
            // console.log(answer[randomNum] , guess[randomNum]);
            answer.splice(randomNum,1)
            guess.splice(randomNum,1)
            showLetter()
            ranInterval = Math.floor(Math.random()*1000)
            
            clearInterval(t)
        }, 300 + ranInterval);

    }

    showLetter()

}