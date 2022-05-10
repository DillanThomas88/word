
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

  const [givenLetter, setGivenLetter] = useState([
    Math.floor(Math.random() * (currentWords[0].length - 2)) + 1,
    Math.floor(Math.random() * (currentWords[1].length - 2)) + 1,
    Math.floor(Math.random() * (currentWords[2].length - 2)) + 1,
    Math.floor(Math.random() * (currentWords[3].length - 2)) + 1,
  ])


  const handleNewWords = () => {
    setCurrentWords([
      wordList[Math.floor(Math.random() * wordList.length - 1)],
      wordList[Math.floor(Math.random() * wordList.length - 1)],
      wordList[Math.floor(Math.random() * wordList.length - 1)]
    ])
  }


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
        // console.log({
        //   data: res.data,
        //   type: res.data[0].fl,
        //   def: res.data[0].shortdef[0],

        // });
      })
      // .then(res => {
      //   const arr = res.data[0].meanings[0].definitions
      //   console.log(arr);
      //   let def = ''
      //   arr.forEach(element => {
      //     if(def === ''){
      //       def = element.definition
      //     } else {
      //       if((element.definition).length > def.length) def = element.definition
      //     }
      //   });

      //   console.log(def);
      //   state({
      //     type: res.data[0].meanings[0].partOfSpeech,
      //     def: res.data[0].meanings[0].definitions[0].definition,

      //   })
      // })
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
    <div style={{ height: window.innerHeight, width: window.innerWidth }} className="relative font-default overflow-hidden grid content-start">
      <header className='pt-4'>

        <div className=' text-center  text-4xl uppercase'>
          <span className={`text-green-500 font-semibold`}>Key</span><span className='text-slate-600 font-normal'>Letter</span>
        </div>

      </header>

      <main className=''>

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

        <div className='absolute bottom-0 mb-2 mx-1 w-full flex justify-center items-center'>
          <KeyBoard handleLetters={handleLetters} />
        </div>



      </main>

      <footer>
      </footer>

    </div>
  );


}

export default App;
