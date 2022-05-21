import template from './settings.json'

const t = new Date();
const today = Math.ceil((t - new Date(t.getFullYear(),0,1)) / 86400000);
export function readyUpPlayer() {

    // console.log(template.keyLetterData);
    

    let data = {}

    if (!localStorage.getItem("keyLetterData")) {

        data = template.keyLetterData


    } else { data = JSON.parse(localStorage.getItem("keyLetterData")) }

    if (data.currentday !== today) {
        data = template.keyLetterData
        data.currentday = today
    }
    
    if(data.version !== 0.6) {
        localStorage.setItem('keyLetterData', JSON.stringify(template.keyLetterData))
    } else {
        localStorage.setItem('keyLetterData', JSON.stringify(data))
    }
    return data

}


export function getInterval() {

    const startDay = template.day

    let interval = (today - startDay) * 4

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

            answer.splice(randomNum,1)
            guess.splice(randomNum,1)
            showLetter()
            ranInterval = Math.floor(Math.random()*1000)
            
            clearInterval(t)
        }, 300 + ranInterval);

    }

    showLetter()

}


