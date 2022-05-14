
import { useState, useEffect } from 'react'
import SVG from '../../svgs'
import { showResults, updatePlayerData } from '../../Settings/index'


function WordForm(props) {

    // console.log();
    const arrInt = props.id - 1

    const [selected, setSelected] = useState()
    const [word, setWord] = useState(props.playerData.daily[arrInt])
    const [completed, setCompleted] = useState(false)
    const [answer, setAnswer] = useState(props.word.split('').map(d => d.toUpperCase()))


    // console.log(props.playerData.daily[props.id],word);
    const getWordBoxes = () => {
        let arr = []
        
        if(props.results) {
            word.forEach((words, index) => {
                    if(words === answer[index]){
                        arr.push(<div key={index} className="h-8 w-8 mr-1 
                        uppercase border border-slate-500 border-[1px] 
                        shadow-sm shadow-slate-300 rounded-sm  text-white 
                        flex justify-center items-center bg-gradient-to-tr from-sky-600 to-sky-500">
                        {answer[index]}
                    </div>)
                    } else {
                        arr.push(<div key={index} className="h-8 w-8 mr-1 
                            uppercase border border-slate-500 border-[1px] 
                            shadow-sm shadow-slate-300 rounded-sm  text-slate-500 
                            flex justify-center items-center bg-slate-100 opacity-50">
                            {answer[index]}
                        </div>)
                    }
                    
                
            });

            return arr
        }

        let randomNum = (Math.floor(Math.random() * (props.word).length))

        for (let i = 0; i < (props.word).length; i++) {
            if (i === props.givenLetter) {
                if (selected) {
                    arr.push(<div key={i} className="h-8 w-8 mr-1 uppercase border border-slate-500 border-[1px] shadow-sm shadow-slate-300 rounded-sm  text-white flex justify-center items-center animate-colorfade">
                        {(props.word).split('')[i]}
                    </div>)
                } else {

                    arr.push(<div key={i} className="h-8 w-8 mr-1 uppercase border border-slate-500 border-[1px]  shadow-sm shadow-slate-300 rounded-sm  text-white flex justify-center items-center animate-reversecolorfade">
                        {(props.word).split('')[i]}
                    </div>)
                }
            } else {
                if (selected) {
                    if (word[i]) {
                        arr.push(<div key={i} className="h-8 w-8 mr-1  animate-pop border border-slate-500 border-[1px] bg-white shadow-sm rounded-sm shadow-slate-300 text-sky-500 flex justify-center items-center">{word[i]}</div>)
                    } else {
                        arr.push(<div key={i} className="h-8 w-8 mr-1 border border-slate-500 border-[1px] bg-white shadow-sm rounded-sm shadow-slate-300"></div>)
                    }

                } else {
                    if (word[i]) {
                        arr.push(<div key={i} className="h-8 w-8 mr-1 border border-slate-500 border-[1px] bg-white shadow-sm rounded-sm shadow-slate-300 text-neutral-700 flex justify-center items-center">{word[i]}</div>)
                    } else {
                        arr.push(<div key={i} className="h-8 w-8 mr-1 border border-slate-500 border-[1px] bg-white to-white shadow-sm rounded-sm shadow-slate-300"></div>)
                    }

                }
            }
        }

        return arr
    }


    const handleSelected = () => {
        setSelected(!selected)
    }

    //   fetchWordData(props.word)

    useEffect(() => {
        if (selected) {

            if (props.letter === '') return


            if (props.letter === '<<') {

                if (word.length === props.givenLetter + 1) {
                    setWord(word.splice(0, word.length - 2))

                } else { setWord(word.splice(0, word.length - 1)) }

            } else {
                if (word.length === props.word.split('').length) return

                setWord(word => [...word, props.letter])

                //  ! App.js useEffect update daily letter array by ADDING a letter
                // updatePlayerData(props.setPlayerData, [...word, props.letter], arrInt, props.playerData )
            }

            props.setLetter('')

        }

    }, [selected, completed, props.letter])


    useEffect(() => {
        if (parseInt(props.selectedNum) !== props.id) {
            setSelected(false)
        } else {
            setSelected(true)
        }



    }, [props.selectedNum])

    useEffect(() => {

        if (selected)

        //  ! App.js useEffect update daily letter array by REMOVING a letter
        console.log(props.word.split(''));
        updatePlayerData(props.setPlayerData, [...word], arrInt, props.playerData )

            if (word.length === props.givenLetter) {
                setWord(word => [...word, props.word.split('')[props.givenLetter].toUpperCase()])
                
            }

        if (completed) {
            if (word.length === (props.word.split('')).length) return

            setCompleted(!completed)

        } else {
            if (word.length !== (props.word.split('')).length) return

            setCompleted(!completed)
        }
        


        if (completed) return

        setCompleted(!completed)

    }, [word])


    useEffect(() => {
        if(props.results){
            showResults(answer, [...word])


        }

    },[props.results])




    return (<div className='relative pointer-events-none'>
        {completed ?
            <div className='absolute top-2 right-2 z-20 flex text-sm justify-center items-center text-slate-700'>
                <div className='mr-1 animate-slidefade'></div>
                <SVG title={'complete'} classes={'text-green-500 h-6 w-6 animate-spin'} />
            </div>
            :
            <div className='absolute top-2 right-2 z-20 flex text-sm justify-center items-center text-slate-600'>
                <div className='mr-1 animate-slidefade'></div>
                <SVG title={'exclamation'} classes={'text-orange-500 h-6 w-6 animate-spin'} />
            </div>
        }
        {selected ?
            <div onClick={() => handleSelected()}
                className="w-full relative text-2xl font-bold flex flex-col border-b border-slate-300  py-3 bg-white px-6 shadow-md shadow-slate-300 z-10">
                {/* <div className="w-full text-center uppercase animate-appear">{props.word}</div> */}

                <div className="italic font-normal text-sm w-full flex justify-start animate-appear">{props.type}</div>
                <div className="font-medium text-sm w-full flex justify-start pb-2 animate-appear">{props.def}</div>
                <div className="flex w-full justify-start items-center flex text-lg">
                    {/* <div className='border-b border-slate-700 w-1 mr-2 opacity-50'></div> */}
                    {/* <div className='w-2 h-2 flex ml-1 mr-2 justify-center items-center text-3xl opacity-75'>{props.word.length}</div> */}
                    {/* <div className='border-b border-slate-700 w-1 mx-2 opacity-50'></div> */}
                    {getWordBoxes()}
                </div>
            </div>
            :
            <div onClick={() => handleSelected()}
                className="w-full relative text-2xl font-bold flex flex-col border-b border-slate-300 py-3 bg-slate-100 px-2 opacity-90">
                {/* <div className="w-full text-center uppercase">{props.word}</div> */}

                {/* <div className="italic font-normal text-sm w-full flex justify-start">{props.type}</div>
                <div className="font-medium text-sm w-full flex justify-start pb-2">{props.def}</div> */}
                <div className="flex w-full justify-start items-center flex text-lg">
                    {/* <div className='border-b border-slate-700 w-1 mr-2 opacity-75'></div> */}
                    {/* <div className='w-1 h-1 ml-1 mr-2 flex justify-center items-center text-xl opacity-75 font-normal'>{props.word.length}</div> */}
                    {/* <div className='border-b border-slate-700 w-1 mx-2 opacity-75'></div> */}
                    {getWordBoxes()}
                </div>
            </div>
        }
    </div>)
}

export default WordForm