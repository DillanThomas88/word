
import { useState } from 'react'


function WordForm(props) {


    const [selected, setSelected] = useState(false)

    const getWordBoxes = () => {

        let randomNum = (Math.floor(Math.random() * (props.word).length))

        let arr = []
        for (let i = 0; i < (props.word).length; i++) {
            if (i === randomNum) {
                arr.push(<div key={i} className="h-8 w-8 mx-1 uppercase outline outline-emerald-300 outline-[1px] shadow-sm shadow-amber-800 rounded-sm bg-emerald-500 text-white flex justify-center items-center">
                    {(props.word).split('')[i]}
                </div>)
            } else {
                arr.push(<div key={i} className="h-8 w-8 mx-1 outline outline-amber-200 outline-[1px] rounded-sm bg-white"></div>)
            }
        }

        return arr
    }


    const handleSelected = () => {
        setSelected(!selected)
    }

    //   fetchWordData(props.word)




    return ( selected 
        ? <div onClick={() => handleSelected()} 
        className="w-full relative text-2xl font-bold flex flex-col border-y border-amber-200 py-3 bg-amber-100 px-6 shadow-md">
            {/* <div className="w-full text-center uppercase animate-appear">{props.word}</div> */}
            <div className='absolute top-0 right-0 mr-6 text-sm text-amber-600'>incomplete</div>
            <div className="italic font-normal text-sm w-full flex justify-start ">{props.type}</div>
            <div className="font-medium text-sm w-full flex justify-start pb-2 ">{props.def}</div>
            <div className="flex w-full justify-center items-center animate-appear">{getWordBoxes()}</div>
        </div>
        : 
        <div onClick={() => handleSelected()}
        className="w-full relative text-2xl font-bold flex flex-col border-y border-neutral-100 py-3 bg-neutral-100 px-6 opacity-50">
        {/* <div className="w-full text-center uppercase">{props.word}</div> */}
        <div className='absolute top-0 right-0 mr-6 text-sm text-amber-600'>incomplete</div>
        <div className="italic font-normal text-sm w-full flex justify-start">{props.type}</div>
        <div className="font-medium text-sm w-full flex justify-start pb-2">{props.def}</div>
        {/* <div className="flex w-full justify-center items-center">{getWordBoxes()}</div> */}
    </div>
        )
}

export default WordForm