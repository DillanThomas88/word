
import React, { useEffect, useState } from 'react';
import './output.css'
import WordForm from './components/WordForm';
import axios from 'axios'
import KeyBoard from './components/keyboard';


function App() {

  const startDay = require('./settings.json').day

  const styles = {
    color: require('./settings.json').color,
    bg: require('./settings.json').bgColor,
    outline: require('./settings.json').outline,
  }

  const dayOfYear = date =>
    Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

  const interval = (dayOfYear(new Date()) - startDay) * 4


  const [isDark, setIsdark] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [isDaily, setIsdaily] = useState(true)
  const [letter, setLetter] = useState('')
  const [selectedNum, setSelectedNum] = useState('1')
  const [wordList, setWordList] = useState((require('./words.json').arr).split(','))
  const [word1def, setword1def] = useState({})
  const [word2def, setword2def] = useState({})
  const [word3def, setword3def] = useState({})
  const [word4def, setword4def] = useState({})
  const [currentWords, setCurrentWords] = useState([
    wordList[interval],
    wordList[interval + 1],
    wordList[interval + 2],
    wordList[interval + 3],
  ])

  const [completion, setcompletion] = useState(true)

  const getGivenLetters = (x, index1, index2) => {

    let eq = [11, 19, 29, 31]
    let eq2 = [37, 53, 57, 73]

    const getNumber = (y) => {
      y -= x

      if (y > x) {
        return getNumber(y)
      }

      return y
    }

    return getNumber(eq[index1] + eq2[index2])
  }


  const [givenLetter, setGivenLetter] = useState([
    getGivenLetters(currentWords[0].length - 2, 0, 3),
    getGivenLetters(currentWords[0].length - 2, 1, 2),
    getGivenLetters(currentWords[0].length - 2, 2, 1),
    getGivenLetters(currentWords[0].length - 2, 3, 0),
  ])

  console.log(givenLetter);


  const fetchWordData = (state, x) => {

    const first = `https://www.dictionaryapi.com/api/v3/references/sd4/json/${x}?key=91ba64f6-a0ce-4747-8dfc-0da21c402c84`
    const second = `https://api.dictionaryapi.dev/api/v2/entries/en/${x}`

    axios.get(first)
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
    setcompletion(!completion)
    setSelectedNum(0)
  }


  useEffect(() => {
    fetchWordData(setword1def, currentWords[0])
    fetchWordData(setword2def, currentWords[1])
    fetchWordData(setword3def, currentWords[2])
    fetchWordData(setword4def, currentWords[3])
  }, [currentWords])

  useEffect(() => {
    document.title = 'Key Letter'
  }, [])

  return (
    <div style={{ height: window.innerHeight, width: window.innerWidth }} className="relative font-default overflow-hidden overflow-y-hidden grid content-start">
      <header className='absolute top-0 w-full pt-4'>

        <div className=' text-center  text-4xl uppercase'>
          <span className={`text-green-500 font-semibold`}>Key</span><span className='text-slate-600 font-normal'>Letter</span>
        </div>

      </header>

      <main className='pt-14'>

        <div className='grid grid-cols-1'>
          <div className='flex mt-4 justify-start items-center ml-4'>
            <div onClick={() => handleTabs()}
              className={isDaily ? `mr-2 text-center uppercase flex justify-center bg-slate-200 items-center border-x border-t border-slate-300 px-4 pt-2 rounded-t-sm text-slate-700 font-bold` : `mr-2  opacity-75 text-center uppercase flex justify-center items-center border-x border-t border-slate-300  px-4 pt-2 rounded-t-sm`}>
              <div className='uppercase font-medium'>Daily #</div>
              <div className='font-semibold text-lg '>{interval / 4 + 1}</div>

            </div>
            <div onClick={() => handleTabs()}
              className={isDaily ? `opacity-75 text-center uppercase flex justify-center items-center border-x border-t border-slate-400 px-4 pt-2 rounded-t-sm` : `text-center uppercase flex justify-center bg-slate-200 items-center border-x border-t border-slate-200 px-4 pt-2 rounded-t-sm text-slate-700 font-bold`}>
              <div className='uppercase font-medium'>Weekly #</div>
              <div className='font-semibold text-lg '>{Math.floor((interval / 4) / 7) + 1}</div>

            </div>
          </div>

          {isDaily
            ? <div onClick={(e) => handleCardSelection(e)}
              className='bg-slate-200 h-screen'>

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
                    selectedNum={selectedNum} />
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
                    selectedNum={selectedNum} />
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
                    selectedNum={selectedNum} />
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
                    selectedNum={selectedNum} />
                </div>

              </div>

              <div className='hidden bg-slate-100 h-screen '>
                <div className='bg-slate-100'>
                  <div className='relative grid grid-cols-7 content-center justify-center text-center mx-7 my-4 '>
                    <div className='text-green-500'>●</div>
                    <div className='text-green-500'>●</div>
                    <div className='text-slate-300'>●</div>
                    <div className='text-slate-300'>●</div>
                    <div className='text-slate-300'>●</div>
                    <div className='text-slate-300'>●</div>
                    <div className='text-slate-300'>●</div>
                    <div className='absolute flex justify-center items-center h-full ml-6 text-orange-300'>
                      <div className='border border-green-500 w-6 flex justify-center items-center'></div>
                      <div className='border border-green-500 w-12 flex justify-center items-center'></div>
                      <div className='border border-slate-300 w-12 flex justify-center items-center'></div>
                      <div className='border border-slate-300 w-12 flex justify-center items-center'></div>
                      <div className='border border-slate-300 w-12 flex justify-center items-center'></div>
                      <div className='border border-slate-300 w-12 flex justify-center items-center'></div>
                      <div className='border border-slate-300 w-6 flex justify-center items-center'></div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            :
            <div onClick={(e) => handleCardSelection(e)}
              className=' bg-slate-200 h-screen'>

              <div className='hidden'>
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
                    selectedNum={selectedNum} />
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
                    selectedNum={selectedNum} />
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
                    selectedNum={selectedNum} />
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
                    selectedNum={selectedNum} />
                </div>
              </div>
              <div className=' h-full '>
                <div className=''>
                  <div className='relative grid grid-cols-7 content-center justify-center text-center mx-7 my-4 '>
                    <div className='text-green-500'>●</div>
                    <div className='text-green-500'>●</div>
                    <div className='text-white'>●</div>
                    <div className='text-white'>●</div>
                    <div className='text-white'>●</div>
                    <div className='text-white'>●</div>
                    <div className='text-white'>●</div>
                    <div className='absolute flex justify-center items-center h-full ml-6 text-orange-300'>
                      <div className='border border-green-500 w-6 flex justify-center items-center'></div>
                      <div className='border border-green-500 w-12 flex justify-center items-center'></div>
                      <div className='border border-white w-12 flex justify-center items-center'></div>
                      <div className='border border-white w-12 flex justify-center items-center'></div>
                      <div className='border border-white w-12 flex justify-center items-center'></div>
                      <div className='border border-white w-12 flex justify-center items-center'></div>
                      <div className='border border-white w-6 flex justify-center items-center'></div>
                    </div>
                  </div>
                </div>

              </div>

            </div>}

        </div>

        <div className='absolute bottom-0 mb-2 px-1 w-full flex flex-col justify-center items-center'>
          {completion ? <>
            <div className='w-full flex justify-center items-center'>
              <button onClick={() => handleSubmit()}
                className='uppercase w-11/12 py-[4px] rounded-md bg-green-500 text-white shadow-md shadow-slate-300 flex justify-center' >
                <div className='font-medium animate-throb mr-2 pointer-events-none'>Submit</div> <div className='font-normal pointer-events-none'></div>
              </button>
            </div>
          </> : <>
            <div className='w-full flex justify-center items-center'>
              <div className='uppercase w-11/12 py-[4px] rounded-md bg-neutral-400 text-white shadow-md shadow-slate-300 flex justify-center' >
                <div className='font-medium mr-2 pointer-events-none'>Submit</div>
              </div>
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
