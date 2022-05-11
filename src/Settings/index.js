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