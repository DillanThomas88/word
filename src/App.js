
import React, { useEffect, useState } from 'react';
import './output.css'
import WordForm from './components/WordForm';
import axios from 'axios'
import KeyBoard from './components/keyboard';
import SVG from './svgs';
import Settings, { getInterval, readyUpPlayer, updateLetters, checkCompletion, updatePlayerHints } from './Settings/index'
import Modal from './components/Modal';
import ModalCard from './components/Modal/card';
import { getCurrentTime } from './components/Modal/helpers';




// !!!!!!!!!!!!! TO DO'S
// check if you guessed the right word
// flap board effect for scoring animations


function App() {


  const interval = getInterval()

  const [playerData, setPlayerData] = useState(readyUpPlayer())


  const [isDark, setIsdark] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [isDaily, setIsdaily] = useState(true)
  const [letter, setLetter] = useState('')
  const [infoModal, setInfoModal] = useState(false)
  const [time, setTime] = useState(getCurrentTime())

  const [results, setResults] = useState(playerData.results)
  const [selectedNum, setSelectedNum] = useState('1')
  const [wordList, setWordList] = useState((require('./words.json').list).split(','))

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

  const [hints,setHints] = useState(playerData.hints)

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

  const fetchWordData = async (state, findWord) => {





    const options = {
      method: 'GET',
      url: `https://wordsapiv1.p.rapidapi.com/words/${findWord}`,
      headers: {
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
      }
    };

    axios.request(options).then(function (response) {
      // console.log(response.data);
      let loc = response.data.results[0]
      // if (!res.data[0]) loc = res.data.meanings[0]
      state({
        type: loc.partOfSpeech,
        def: loc.definition,
        hint: loc.typeOf[0]

      })
    }).catch(function (error) {
      console.error(error);
    });

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
    // console.log(playerData);
    setResults(true)
    updateLetters({ ...playerData, results: true })
    // console.log(playerData);
    setcompletion(!completion)
    setSelectedNum(1)
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



  const info = (e) => {
    // console.log(e.target);
    if (e.target.classList.contains('backdrop')
      || e.target.classList.contains('open')
      || e.target.classList.contains('close')) setInfoModal(!infoModal)
    // setInfoModal(!infoModal)
  }

  const activateHint = () => {
    let newarr = [...hints]
    newarr[selectedNum - 1] = true
    setHints(newarr) 
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
    // console.log(playerData);


    let four = checkCompletion(playerData.daily, currentWords, setcompletion)

    if (completion && four !== 4) {
      setcompletion(false)
    } else if (!completion && four === 4) {
      setcompletion(true)
    } else { }


  }, [playerData])
  useEffect(() => {
    console.log(playerData);
    let t = null

    t = setInterval(() => {
      setTime(getCurrentTime())
    }, 1000);

    return () => clearInterval(t)

  }, [time])

  useEffect(() => {
    console.log(playerData);
    updatePlayerHints(setPlayerData,playerData,hints)
  },[hints])

  return (
    <div style={{ height: window.innerHeight, width: window.innerWidth }} className="relative font-sans">
      {infoModal &&
        <Modal handle={info}>
          <ModalCard handle={info} title={'information'}>
            <div className='text-center my-2'>
              <p className=' text-xs font-medium opacity-50'>Time remaining for today's words</p>
              <p>{time}</p>
            </div>

          <span className='text-xs font-medium lowercase flex justify-center opacity-50 mt-4'>keyletter-version {playerData.version}</span>
          </ModalCard>
        </Modal>}

      <header className='absolute top-0 w-full pt-4'>

        <div className=' text-center text-5xl sm:text-2xl uppercase'>
          <span className={`text-blue-500 font-normal`}>Key</span>
          <span className='text-slate-600 font-thin'>Letter</span>
        </div>
          

      </header>

      <main className={' pt-16 flex flex-col items-end justify-between h-full animate-fadein'}>

        <div className='grid grid-cols-1'>
          <div className='flex mt-4 justify-start items-end ml-4 font-serif'>
            <div onClick={() => handleTabs()}
              className={isDaily ? `mr-1 text-center uppercase flex justify-center bg-slate-100 items-center border-x border-t border-slate-400 px-4 pt-2 rounded-t-sm text-slate-700 font-bold` : ` mr-2 bg-gradient-to-tl from-slate-700 to-slate-500 text-white text-center uppercase flex justify-center items-center border-x border-t border-slate-300  px-4 pt-1 rounded-t-sm`}>
              <div className='uppercase font-normal'>Daily</div>
              <div className='font-semibold text-lg px-1'>#{interval.day}</div>

            </div>
            <div onClick={() => handleTabs()}
              className={isDaily ? ` bg-gradient-to-tr from-slate-700 to-slate-500 text-white text-center uppercase flex justify-center items-center border-x border-t border-slate-400 px-4 pt-1 rounded-t-sm` : `text-center uppercase flex justify-center bg-slate-100 items-center border-x border-t border-slate-400 px-4 pt-2 rounded-t-sm text-slate-700 font-bold`}>
              <div className='uppercase font-normal'>Weekly #</div>
              <div className='font-semibold text-lg px-1'>{interval.week}</div>

            </div>
          </div>
          <div className='h-4 w-full bg-slate-100 shadow-md shadow-neutral-300 z-20'></div>

          {isDaily
            ? <div onClick={(e) => handleCardSelection(e)}
              className={results ? ' bg-slate-100 w-screen overflow-y-scroll' : 'bg-slate-100 w-screen '}>

              <div className='overflow-y-scroll'>
                <div id={1}
                  className='card w-full'>
                  <WordForm
                    id={1}
                    hints={hints}
                    word={currentWords[0]}
                    type={word1def.type}
                    def={word1def.def}
                    hint={word1def.hint}
                    givenLetter={givenLetter[0]}
                    letter={letter}
                    setLetter={setLetter}
                    selectedNum={selectedNum}
                    playerData={playerData}
                    setPlayerData={setPlayerData}
                    results={results} />

                </div>

                <div id={2}
                  className='card w-full'>
                  <WordForm
                    id={2}
                    hints={hints}
                    word={currentWords[1]}
                    type={word2def.type}
                    def={word2def.def}
                    hint={word2def.hint}
                    givenLetter={givenLetter[1]}
                    letter={letter}
                    setLetter={setLetter}
                    selectedNum={selectedNum}
                    playerData={playerData}
                    setPlayerData={setPlayerData}
                    results={results} />
                </div>

                <div id={3}
                  className='card w-full'>
                  <WordForm
                    id={3}
                    hints={hints}
                    word={currentWords[2]}
                    type={word3def.type}
                    def={word3def.def}
                    hint={word3def.hint}
                    givenLetter={givenLetter[2]}
                    letter={letter}
                    setLetter={setLetter}
                    selectedNum={selectedNum}
                    playerData={playerData}
                    setPlayerData={setPlayerData}
                    results={results} />
                </div>

                <div id={4}
                  className='card w-full mb-72'>
                  <WordForm
                    id={4}
                    hints={hints}
                    word={currentWords[3]}
                    type={word4def.type}
                    def={word4def.def}
                    hint={word4def.hint}
                    givenLetter={givenLetter[3]}
                    letter={letter}
                    setLetter={setLetter}
                    selectedNum={selectedNum}
                    playerData={playerData}
                    setPlayerData={setPlayerData}
                    results={results} />
                </div>
                {/* <div className='h-10 w-full bg-slate-100'></div> */}

              </div>

            </div>
            :
            <div onClick={(e) => handleCardSelection(e)}
              className=' bg-slate-100 h-screen w-screen'>

              <div className=' h-full '>
                <div className='h-full'>
                  <div className='relative grid grid-cols-7 content-center justify-center items-center text-center mx-7 my-4 '>
                    <div className='text-blue-500'>●</div>
                    <div className='text-blue-500'>●</div>
                    <div className='text-slate-500'>●</div>
                    <div className='text-slate-500'>●</div>
                    <div className='text-slate-500'>●</div>
                    <div className='text-slate-500'>●</div>
                    <div className='text-slate-500'>●</div>
                    <div className='absolute flex justify-center items-center h-full ml-6 mt-1 text-amber-300'>
                      <div className='border border-blue-500 w-6 flex justify-center items-center'></div>
                      <div className='border border-blue-500 w-12 flex justify-center items-center'></div>
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

        <div className={results ? ' bg-white py-2 fixed bottom-0 w-screen left-0 z-40' :
          isDaily ? 'bg-white py-2 fixed bottom-0 w-screen left-0 z-40' : 'pointer-events-none bg-white py-2 fixed bottom-0 w-screen left-0 z-40'}
          style={{ boxShadow: ' 0px -2px 5px #d4d4d4' }}
        >
          {!isDaily ? <div className='absolute z-40 w-full h-full top-0 left-0 opacity-25 bg-black'></div> : <></>}

          {completion ? results ? <>
            <div className={` w-full flex justify-center items-center my-1`}>
              <div onClick={(e) => info(e)}
                className='open uppercase px-4 mx-2 w-[52px] h-[36px] rounded-full border border-blue-500 shadow-md shadow-slate-300 flex justify-center hover:scale-110 text-blue-500 flex items-center font-bold font-serif lowercase text-xl'>
                i
              </div>
              <button onClick={() => handleSubmit()}
                className={`${results && 'pointer-events-none'} uppercase w-full py-[4px] rounded-full text-slate-300 shadow-md shadow-slate-300 flex justify-center border border-slate-300`} >
                <div className='font-normal pointer-events-none text-lg'>Completed</div> <div className='font-normal pointer-events-none'></div>
              </button>
              <div onClick={() => activateHint()}  className={`${results && 'pointer-events-none'} pointer-events-none uppercase px-4 mx-2 w-[52px] h-[36px] rounded-full border border-slate-300 shadow-md shadow-slate-300 flex justify-center hover:opacity-50 
              flex items-center text-xs font-semibold text-slate-300 font-sans`}>
                Hint
              </div>
            </div>

          </> : <>

            <div className={`${results && 'pointer-events-none'} w-full flex justify-center items-center my-1`}>
              <div onClick={(e) => info(e)} className=' open pointer-events-none uppercase px-4 mx-2 w-[52px] h-[36px] rounded-full border border-slate-300 shadow-md shadow-slate-300 flex justify-center hover:scale-110 text-slate-300 flex items-center font-bold font-serif lowercase text-xl'>
                i
              </div>
              <button onClick={() => handleSubmit()}
                className='uppercase w-full py-[4px] rounded-full text-blue-500 shadow-md shadow-slate-300 flex justify-center border border-blue-500' >
                <div className='font-normal pointer-events-none text-lg'>Submit</div> <div className='font-normal pointer-events-none'></div>
              </button>
              <div onClick={() => activateHint()} className='pointer-events-none uppercase px-4 mx-2 w-[52px] h-[36px] rounded-full border border-slate-300 shadow-md shadow-slate-300 flex justify-center hover:scale-110 
              flex items-center text-xs font-semibold text-slate-300 font-sans'>
                Hint
              </div>
            </div>

          </> : <>

            <div className={results ? 'pointer-events-none opacity-90 relative w-full flex justify-between items-center my-1' : ' relative w-full flex justify-between items-center my-1'}>
              <div onClick={(e) => info(e)} className='open uppercase px-4 mx-2 w-[52px] h-[36px] rounded-full border border-blue-400 shadow-md shadow-slate-300 flex justify-center hover:scale-110 text-blue-500 flex items-center font-bold font-serif lowercase text-xl'>
                i
              </div>
              <div onClick={() => handleIncompleteFeild()}
                className={` uppercase w-full py-1 rounded-full bg-white border border-slate-300 text-slate-300 shadow-md shadow-slate-300 flex justify-center`} >
                <div className='font-sans pointer-events-none text-xl font-normal'>Submit</div>
              </div>
              <div onClick={() => activateHint()}  className=' uppercase px-4 mx-2 w-[52px] h-[36px] rounded-full border border-blue-400 shadow-md shadow-slate-300 flex justify-center hover:scale-110 
              flex items-center text-xs font-semibold text-blue-500 font-sans'>
                Hint
              </div>
              {incompleteFeild ? !results && <div className='absolute w-full flex justify-center items-center'>
                <div className='absolute z-40 pointer-events-none bottom-16 flex justify-center items-center pr-4 py-1 bg-amber-100 font-medium text-sm text-amber-600 border border-amber-400 rounded-full  shadow-md shadow-neutral-600 animate-opacityfade'>
                  <SVG title={'exclamation'} classes={'w-6 ml-2'} />
                  <div className='flex flex-col justify-center items-center'>
                    <div className='font-semibold text-center'>Don't have the answers?</div>
                    <div className='flex justify-center items-center text-center text-xs px-2'>You have incomplete words</div>
                  </div>
                </div>

              </div> : <>

                <div className='absolute pointer-events-none'></div>

              </>}

            </div>

          </>}
          <KeyBoard handleLetters={handleLetters} results={results} />
        </div>





      </main>

      <footer>
      </footer>

    </div>
  );


}

export default App;
