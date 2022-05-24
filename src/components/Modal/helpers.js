export function handleExit(id){
 id()
}

export function getCurrentTime() {

    const correntValue = (int) => {
      let arr = String(int).split("")

      if (arr.length === 1) {
        return `0${int}`
      } else {
        return int
      }
    }

    let time = new Date()
    let hour = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()

    return `${correntValue(23 - hour)}:${correntValue(59 - minute)}:${correntValue(59 - second)}`


  }