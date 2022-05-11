

function Key(props) {

    if (props.data.length > 1) {
        return (<div id={props.data}
            className="key w-[49px] h-[58px] mx-[3px] mt-1.5 rounded-md bg-gradient-to-tl from-sky-800 to-sky-600 text-white text-xs hover:bg-black flex justify-center items-center">{props.data}</div>)

    } else {
        if (props.index === 10) {
            return (<div id={props.data}
                className=" key w-[32px] h-[58px] mt-1.5 mx-[3px] ml-[6px] rounded-md 
                bg-gradient-to-tl from-neutral-800 to-neutral-700 text-white text-xs 
                hover:bg-black flex justify-center items-center">{props.data}</div>)
        } else {
            return (<div id={props.data}

                className="key w-[32px] h-[58px] mt-1.5 mx-[3px] rounded-md 
                bg-gradient-to-tl from-neutral-800 to-neutral-700 text-white 
                text-xs hover:bg-black flex justify-center items-center">{props.data}</div>)
        }

    }
}

export default Key