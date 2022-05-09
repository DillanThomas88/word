
import { useState } from 'react'
import SVG from '../../svgs'


function WordForm(props) {


    const checkFirst = () => {
        if(props.id === 1) return true
        else return false
    }
    const [selected, setSelected] = useState(checkFirst())
    const [completed, setCompleted] = useState(checkFirst())

    const getWordBoxes = () => {

        let randomNum = (Math.floor(Math.random() * (props.word).length))

        let arr = []
        for (let i = 0; i < (props.word).length; i++) {
            if (i === props.givenLetter) {
                if (selected) {
                    arr.push(<div key={i} className="h-8 w-8 mx-1 uppercase outline outline-rose-300 outline-[1px] shadow-sm shadow-amber-300 rounded-sm  text-white flex justify-center items-center animate-colorfade">
                    {(props.word).split('')[i]}
                </div>)
                } else {

                    arr.push(<div key={i} className="h-8 w-8 mx-1 uppercase outline outline-neutral-300 outline-[1px] shadow-sm shadow-neutral-300 rounded-sm  text-white flex justify-center items-center animate-reversecolorfade">
                        {(props.word).split('')[i]}
                    </div>)
                }
            } else {
                if (selected) {
                    arr.push(<div key={i} className="h-8 w-8 mx-1 outline outline-amber-300 outline-[1px] rounded-sm bg-white shadow-sm shadow-amber-300"></div>)
                } else {
                    arr.push(<div key={i} className="h-8 w-8 mx-1 outline outline-neutral-300 outline-[1px] rounded-sm bg-white shadow-sm shadow-neutral-300"></div>)
                }
            }
        }

        return arr
    }


    const handleSelected = () => {
        setSelected(!selected)
        setCompleted(!completed)
    }

    //   fetchWordData(props.word)




    return (<div className='relative'>
        {completed ?
            <div className='absolute top-0 right-1 h-8 z-10 flex text-sm justify-center items-center text-neutral-400'>
                <div className='mr-1 animate-slidefade'>Completed</div>
                <SVG title={'complete'} classes={'text-neutral-400 h-6 w-6 animate-spin'} />
            </div>
            :
            <div className='absolute top-0 right-1 h-8 z-10 flex text-sm justify-center items-center text-rose-500'>
                <div className='mr-1 animate-slidefade'>New</div>
                <SVG title={'exclamation'} classes={'text-rose-500 h-6 w-6 animate-spin'} />
            </div>
        }
        {selected ?
            <div onClick={() => handleSelected()}
                className="w-full relative text-2xl font-bold flex flex-col border-y border-amber-200  py-3 bg-amber-100 px-6 shadow-md">
                {/* <div className="w-full text-center uppercase animate-appear">{props.word}</div> */}

                <div className="italic font-normal text-sm w-full flex justify-start animate-appear">{props.type}</div>
                <div className="font-medium text-sm w-full flex justify-start pb-2 animate-appear">{props.def}</div>
                <div className="flex w-full justify-start items-center flex">
                    <div className='border-b border-neutral-700 w-1 mr-2 opacity-50'></div>
                    <div className='w-2 h-2 flex justify-center items-center text-3xl opacity-75'>{props.id}</div>
                    <div className='border-b border-neutral-700 w-1 mx-2 opacity-50'></div>
                    {getWordBoxes()}
                </div>
            </div>
            :
            <div onClick={() => handleSelected()}
                className="w-full relative text-2xl font-bold flex flex-col border-y border-neutral-200 py-3 bg-neutral-100 px-2">
                {/* <div className="w-full text-center uppercase">{props.word}</div> */}

                {/* <div className="italic font-normal text-sm w-full flex justify-start">{props.type}</div>
                <div className="font-medium text-sm w-full flex justify-start pb-2">{props.def}</div> */}
                <div className="flex w-full justify-start items-center flex">
                    <div className='border-b border-neutral-700 w-1 mr-2 opacity-75'></div>
                    <div className='w-1 h-1 flex justify-center items-center text-xl opacity-75 font-normal'>{props.id}</div>
                    <div className='border-b border-neutral-700 w-1 mx-2 opacity-75'></div>
                    {getWordBoxes()}
                </div>
            </div>
        }
    </div>)
}

export default WordForm