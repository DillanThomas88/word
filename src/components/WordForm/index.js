
import { useState } from 'react'
import SVG from '../../svgs'


function WordForm(props) {


    const [selected, setSelected] = useState(false)
    const [completed, setCompleted] = useState(false)

    const getWordBoxes = () => {

        let randomNum = (Math.floor(Math.random() * (props.word).length))

        let arr = []
        for (let i = 0; i < (props.word).length; i++) {
            if (i === props.givenLetter) {
                arr.push(<div key={i} className="h-8 w-8 mx-1 uppercase outline outline-emerald-300 outline-[1px] shadow-sm shadow-amber-300 rounded-sm bg-emerald-500 text-white flex justify-center items-center">
                    {(props.word).split('')[i]}
                </div>)
            } else {
                arr.push(<div key={i} className="h-8 w-8 mx-1 outline outline-amber-200 outline-[1px] rounded-sm bg-white shadow-sm shadow-amber-300"></div>)
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
            <div className='absolute top-0 right-1 h-8 z-10 flex text-sm justify-center items-center text-emerald-500'>
                <div className='mr-1 animate-slidefade'>Ready</div>
                <SVG title={'complete'} classes={'text-emerald-400 h-6 w-6 animate-spin'} />
            </div>
            :
            <div className='absolute top-0 right-1 h-8 z-10 flex text-sm justify-center items-center text-amber-500'>
                <div className='mr-1 animate-slidefade'>incomplete</div>
                <SVG title={'exclamation'} classes={'text-amber-400 h-6 w-6 animate-spin'} />
            </div>
        }
        {selected ?
            <div onClick={() => handleSelected()}
                className="w-full relative text-2xl font-bold flex flex-col border-y border-amber-200 py-3 bg-amber-100 px-6 shadow-md">
                {/* <div className="w-full text-center uppercase animate-appear">{props.word}</div> */}

                <div className="italic font-normal text-sm w-full flex justify-start ">{props.type}</div>
                <div className="font-medium text-sm w-full flex justify-start pb-2 ">{props.def}</div>
                <div className="flex w-full justify-center items-center animate-appear">{getWordBoxes()}</div>
            </div>
            :
            <div onClick={() => handleSelected()}
                className="w-full relative text-2xl font-bold flex flex-col border-y border-neutral-100 py-3 bg-neutral-100 px-6 opacity-75">
                {/* <div className="w-full text-center uppercase">{props.word}</div> */}

                <div className="italic font-normal text-sm w-full flex justify-start">{props.type}</div>
                <div className="font-medium text-sm w-full flex justify-start pb-2">{props.def}</div>
                {/* <div className="flex w-full justify-center items-center">{getWordBoxes()}</div> */}
            </div>
        }
    </div>)
}

export default WordForm