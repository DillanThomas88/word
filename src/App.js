
import React, { useEffect, useState } from 'react';
import './output.css'
import WordForm from './components/WordForm';
import axios from 'axios'
import KeyBoard from './components/keyboard';
import SVG from './svgs';
import Settings,{ getInterval, readyUpPlayer, updateLetters, checkCompletion } from './Settings/index'


// !!!!!!!!!!!!! TO DO'S
// check if you guessed the right word
// flap board effect for scoring animations


function App() {

  const interval = getInterval()

  const [playerData, setPlayerData] = useState(readyUpPlayer())

  // console.log(playerData);

  //  ! work on updateing letter arrays for each
  const [wordData,setWordData] = useState({})


  const [isDark, setIsdark] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [isDaily, setIsdaily] = useState(true)
  const [letter, setLetter] = useState('')
  
  const [results, setResults] = useState(false)
  const [selectedNum, setSelectedNum] = useState('1')
  const [wordList, setWordList] = useState((require('./words.json').arr).split(','))

  const [word1def, setword1def] = useState({})
  const [word2def, setword2def] = useState({})
  const [word3def, setword3def] = useState({})
  const [word4def, setword4def] = useState({})

  const [currentWords, setCurrentWords] = useState([
    wordList[interval.default],
    wordList[interval.default + 1],
    wordList[interval.default + 2],
    wordList[interval.default + 3],
  ])

  const [completion, setcompletion] = useState(false)

  const getGivenLetters = (value, index1) => {

    let randomSalt = [37, 38, 39, 40]

    const getNumber = (salt) => {

      salt -= value
      if (salt >= value) {
        return getNumber(salt)
      }
      return salt
    }

    return getNumber(randomSalt[index1])
  }
  const [givenLetter, setGivenLetter] = useState([
    getGivenLetters(currentWords[0].length - 2, 0) + 1,
    getGivenLetters(currentWords[1].length - 2, 1) + 1,
    getGivenLetters(currentWords[2].length - 2, 2) + 1,
    getGivenLetters(currentWords[3].length - 2, 3) + 1,
  ])

  const fetchWordData = (state, x) => {

    const link = `https://www.dictionaryapi.com/api/v3/references/sd4/json/${x}?key=91ba64f6-a0ce-4747-8dfc-0da21c402c84`

    axios.get(link)
      .then(res => {
        // console.log(res.data);

        let loc = res.data[0]
        if (!res.data[0].fl) loc = res.data[1]
        state({
          type: loc.fl,
          def: loc.shortdef[0],

        })
      })
      .catch(err => console.log(err))
  }

  const handleReveal = () => {
    setRevealed(!revealed)
  }

  const handleTabs = () => {
    setIsdaily(!isDaily)
  }

  const nextCard = () => {
    let value = parseInt(selectedNum) + 1
    setLetter('')

    if (value > 4) {
      setSelectedNum(1)
    } else {
      setSelectedNum(value.toString())
    }
  }

  const handleLetters = (e) => {
    if (!e.target.getAttribute('id')) return

    const value = e.target.getAttribute('id')

    if (value.toLowerCase() == 'next') {
      return nextCard()
    }
    setLetter(value)
  }

  const handleCardSelection = (e) => {

    if (!e.target.classList.contains('card')) return

    setSelectedNum(e.target.getAttribute('id'))

  }

  const handleSubmit = () => {
    setResults(true)
    setcompletion(!completion)
    setSelectedNum(0)
  }

  const [incompleteFeild, setIncompleteFeild] = useState(false)
  const handleIncompleteFeild = () => {

    if (incompleteFeild) return

    setIncompleteFeild(!incompleteFeild)
    // console.log('started timer');

    let t = setInterval(() => {
      setIncompleteFeild(false)
      clearInterval(t)
      // console.log('stopped timer');

    }, 3100);


  }


  useEffect(() => {
    fetchWordData(setword1def, currentWords[0])
    fetchWordData(setword2def, currentWords[1])
    fetchWordData(setword3def, currentWords[2])
    fetchWordData(setword4def, currentWords[3])
  }, [currentWords])

  useEffect(() => {
    document.title = 'Key Letter'
    updateLetters(playerData)
    
    
    let four = checkCompletion(playerData.daily, currentWords, setcompletion)
    
    if(completion && four !== 4) {
      setcompletion(false)
    } else if (!completion && four === 4) {
      setcompletion(true)
    } else {}


  }, [playerData])

  return (
    <div style={{ height: window.innerHeight, width: window.innerWidth }} className="relative font-default overflow-hidden overflow-y-hidden grid content-start">
      <header className='absolute top-0 w-full pt-4'>

        <div className=' text-center  text-4xl uppercase'>
          <span className={`text-sky-500 font-semibold`}>Key</span><span className='text-slate-600 font-normal'>Letter</span>
        </div>

      </header>

      <main className={'pt-14'}>

        <div className='grid grid-cols-1'>
          <div className='flex mt-4 justify-start items-end ml-4'>
            <div onClick={() => handleTabs()}
              className={isDaily ? `mr-1 text-center uppercase flex justify-center bg-slate-100 items-center border-x border-t border-slate-400 px-4 pt-2 rounded-t-sm text-slate-700 font-bold` : ` mr-2 bg-gradient-to-tl from-slate-700 to-slate-500 text-white text-center uppercase flex justify-center items-center border-x border-t border-slate-300  px-4 pt-1 rounded-t-sm`}>
              <div className='uppercase font-normal'>Daily #</div>
              <div className='font-semibold text-lg px-1'>{interval.day}</div>

            </div>
            <div onClick={() => handleTabs()}
              className={isDaily ? ` bg-gradient-to-tr from-slate-700 to-slate-500 text-white text-center uppercase flex justify-center items-center border-x border-t border-slate-400 px-4 pt-1 rounded-t-sm` : `text-center uppercase flex justify-center bg-slate-100 items-center border-x border-t border-slate-400 px-4 pt-2 rounded-t-sm text-slate-700 font-bold`}>
              <div className='uppercase font-normal'>Weekly #</div>
              <div className='font-semibold text-lg px-1'>{interval.week}</div>

            </div>
          </div>

          {isDaily
            ? <div onClick={(e) => handleCardSelection(e)}
              className={results ? ' pointer-events-none bg-slate-100 h-screen pt-4' : 'bg-slate-100 h-screen pt-4'}>

              <div>
                <div id={1}
                  className='card w-full'>
                  <WordForm
                    id={1}
                    word={currentWords[0]}
                    type={word1def.type}
                    def={word1def.def}
                    givenLetter={givenLetter[0]}
                    letter={letter}
                    setLetter={setLetter}
                    selectedNum={selectedNum}
                    playerData={playerData}
                    setPlayerData={setPlayerData} />
                    
                </div>

                <div id={2}
                  className='card w-full'>
                  <WordForm
                    id={2}
                    word={currentWords[1]}
                    type={word2def.type}
                    def={word2def.def}
                    givenLetter={givenLetter[1]}
                    letter={letter}
                    setLetter={setLetter}
                    selectedNum={selectedNum}
                    playerData={playerData}
                    setPlayerData={setPlayerData} />
                </div>

                <div id={3}
                  className='card w-full'>
                  <WordForm
                    id={3}
                    word={currentWords[2]}
                    type={word3def.type}
                    def={word3def.def}
                    givenLetter={givenLetter[2]}
                    letter={letter}
                    setLetter={setLetter}
                    selectedNum={selectedNum}
                    playerData={playerData}
                    setPlayerData={setPlayerData} />
                </div>

                <div id={4}
                  className='card w-full'>
                  <WordForm
                    id={4}
                    word={currentWords[3]}
                    type={word4def.type}
                    def={word4def.def}
                    givenLetter={givenLetter[3]}
                    letter={letter}
                    setLetter={setLetter}
                    selectedNum={selectedNum}
                    playerData={playerData}
                    setPlayerData={setPlayerData} />
                </div>

              </div>

            </div>
            :
            <div onClick={(e) => handleCardSelection(e)}
              className=' bg-slate-100 h-screen'>

              <div className=' h-full '>
                <div className=''>
                  <div className='relative grid grid-cols-7 content-center justify-center items-center text-center mx-7 my-4 '>
                    <div className='text-sky-500 scale-125'>●</div>
                    <div className='text-sky-500 scale-125'>●</div>
                    <div className='text-slate-500 scale-125'>●</div>
                    <div className='text-slate-500 scale-125'>●</div>
                    <div className='text-slate-500 scale-125'>●</div>
                    <div className='text-slate-500 scale-125'>●</div>
                    <div className='text-slate-500 scale-125'>●</div>
                    <div className='absolute flex justify-center items-center h-full ml-6 text-orange-300'>
                      <div className='border border-sky-500 w-6 flex justify-center items-center'></div>
                      <div className='border border-sky-500 w-12 flex justify-center items-center'></div>
                      <div className='border border-slate-500 w-12 flex justify-center items-center'></div>
                      <div className='border border-slate-500 w-12 flex justify-center items-center'></div>
                      <div className='border border-slate-500 w-12 flex justify-center items-center'></div>
                      <div className='border border-slate-500 w-12 flex justify-center items-center'></div>
                      <div className='border border-slate-500 w-6 flex justify-center items-center'></div>
                    </div>
                  </div>
                </div>

              </div>

            </div>}

        </div>

        <div className='absolute bottom-0 mb-2 px-1 w-full flex flex-col justify-center items-center rounded-lg'>
          {completion ? <>
            <div className='w-full flex justify-center items-center'>
              <button onClick={() => handleSubmit()}
                className='uppercase w-11/12 py-[4px] rounded-lg text-sky-500 bg-gradient-to-tl from-sky-200 to-white shadow-md shadow-slate-300 flex justify-center border border-sky-500' >
                <div className='font-medium animate-throb mr-2 pointer-events-none'>Submit</div> <div className='font-normal pointer-events-none'></div>
              </button>
            </div>
          </> : <>
            <div className='relative w-full flex justify-center items-center'>
              <div onClick={() => handleIncompleteFeild()}
                className='uppercase w-11/12 py-[4px] rounded-md bg-white border border-slate-400 text-slate-500 shadow-md shadow-slate-300 flex justify-center' >
                <div className='font-medium mr-2 pointer-events-none'>Submit</div>
              </div>
              {incompleteFeild ? !results && <>
                <div className='absolute z-50 pointer-events-none bottom-16 flex justify-center items-center   pr-4 py-1 bg-amber-100 font-medium text-sm text-orange-600 border border-orange-500 rounded-full shadow-md shadow-neutral-600 animate-opacityfade'>
                  <SVG title={'exclamation'} classes={'w-6 ml-2'} />
                  <div className='flex flex-col justify-center items-center'>
                    <div className='font-semibold text-center'>Don't have the answers?</div>
                    <div className='flex justify-center items-center text-center text-xs px-2'>Try again with random letters.</div>
                  </div>
                </div>

              </> : <>
                <div className='absolute pointer-events-none'></div>
              </>}
            </div>

          </>}
          <KeyBoard handleLetters={handleLetters} />
        </div>



      </main>

      <footer>
      </footer>

    </div>
  );


}

export default App;
