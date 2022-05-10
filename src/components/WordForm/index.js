
import { useState, useEffect } from 'react'
import SVG from '../../svgs'


function WordForm(props) {

    console.log(props.letter);

    const [selected, setSelected] = useState()
    const [word, setWord] = useState([])
    const [completed, setCompleted] = useState(false)

    const getWordBoxes = () => {

        let randomNum = (Math.floor(Math.random() * (props.word).length))

        let arr = []
        for (let i = 0; i < (props.word).length; i++) {
            if (i === props.givenLetter) {
                if (selected) {
                    arr.push(<div key={i} className="h-8 w-8 mx-1 uppercase  shadow-sm shadow-slate-300 rounded-sm  text-white flex justify-center items-center animate-colorfade">
                        {(props.word).split('')[i]}
                    </div>)
                } else {

                    arr.push(<div key={i} className="h-8 w-8 mx-1 uppercase   shadow-sm shadow-slate-300 rounded-sm  text-white flex justify-center items-center animate-reversecolorfade">
                        {(props.word).split('')[i]}
                    </div>)
                }
            } else {
                if (selected) {
                    if(word[i]){
                        arr.push(<div key={i} className="h-8 w-8 mx-1  bg-white shadow-sm rounded-sm shadow-slate-300 text-green-500 flex justify-center items-center">{word[i]}</div>)
                    } else {
                        arr.push(<div key={i} className="h-8 w-8 mx-1  bg-white shadow-sm rounded-sm shadow-slate-300"></div>)
                    }

                } else {
                    if(word[i]){
                        arr.push(<div key={i} className="h-8 w-8 mx-1  bg-slate-100 shadow-sm rounded-sm shadow-slate-300 text-neutral-700 flex justify-center items-center">{word[i]}</div>)
                    } else {
                        arr.push(<div key={i} className="h-8 w-8 mx-1 border bg-slate-100 to-white shadow-sm rounded-sm shadow-slate-300"></div>)
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
                // console.log(word);
                // console.log('object');
                if(word.length === props.givenLetter + 1) {
                    setWord(word.splice(0, word.length - 2))
                } else {
                    setWord(word.splice(0, word.length - 1))
                }

            } else {
                if (word.length === props.word.split('').length) return

                setWord(word => [...word, props.letter])
            }

            props.setLetter('')

        }
    }, [selected, completed, props.letter])


    useEffect(() => {
        if (props.selectedNum != props.id) {
            setSelected(false)
        } else {
            setSelected(true)
        }



    }, [props.selectedNum])

    useEffect(() => {

        if(selected) 

        if(word.length === props.givenLetter) setWord(word => [...word, props.word.split('')[props.givenLetter].toUpperCase()])

        if (completed) {
            if(word.length === (props.word.split('')).length) return  
            
            setCompleted(!completed)

        } else {
            if(word.length !== (props.word.split('')).length) return 

            setCompleted(!completed)
        }

        if (completed) return

        setCompleted(!completed)

    }, [word])




    return (<div className='relative pointer-events-none'>
        {completed ?
            <div className='absolute top-1 right-1 z-20 flex text-sm justify-center items-center text-slate-700'>
                <div className='mr-1 animate-slidefade'></div>
                <SVG title={'complete'} classes={'text-green-500 h-6 w-6 animate-spin'} />
            </div>
            :
            <div className='absolute top-1 right-1 z-20 flex text-sm justify-center items-center text-slate-600'>
                <div className='mr-1 animate-slidefade'>Incomplete</div>
                <SVG title={'exclamation'} classes={'text-orange-500 h-6 w-6 animate-spin'} />
            </div>
        }
        {selected ?
            <div onClick={() => handleSelected()}
                className="w-full relative text-2xl font-bold flex flex-col border-b border-slate-300  py-3 bg-slate-200 px-6 shadow-md shadow-slate-400 z-10">
                {/* <div className="w-full text-center uppercase animate-appear">{props.word}</div> */}

                <div className="italic font-normal text-sm w-full flex justify-start animate-appear">{props.type}</div>
                <div className="font-medium text-sm w-full flex justify-start pb-2 animate-appear">{props.def}</div>
                <div className="flex w-full justify-start items-center flex">
                    {/* <div className='border-b border-slate-700 w-1 mr-2 opacity-50'></div> */}
                    {/* <div className='w-2 h-2 flex ml-1 mr-2 justify-center items-center text-3xl opacity-75'>{props.word.length}</div> */}
                    {/* <div className='border-b border-slate-700 w-1 mx-2 opacity-50'></div> */}
                    {getWordBoxes()}
                </div>
            </div>
            :
            <div onClick={() => handleSelected()}
                className="w-full relative text-2xl font-bold flex flex-col  py-3 bg-slate-300 px-2 opacity-90">
                {/* <div className="w-full text-center uppercase">{props.word}</div> */}

                {/* <div className="italic font-normal text-sm w-full flex justify-start">{props.type}</div>
                <div className="font-medium text-sm w-full flex justify-start pb-2">{props.def}</div> */}
                <div className="flex w-full justify-start items-center flex">
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