import SVG from "../../../svgs"


function Key(props) {

    if (props.data.length > 2) {
        return (<div id={props.data}
            className="key w-[52px] h-[58px] mx-[3px] mt-1 rounded-md 
            bg-gradient-to-tl from-blue-700 to-blue-600 text-white font-bold text-xs 
            hover:bg-gradient-to-tl hover:from-blue-900 hover:to-blue-700
            hover:bg-black flex justify-center items-center">{props.data}</div>)

    } else if (props.data.length === 2) {
        return (<div id={props.data}
            className={`${props.results && 'pointer-events-none opacity-90'} key w-[52px] h-[58px] mx-[3px] mt-1 rounded-md 
            bg-gradient-to-tl from-blue-800 to-blue-600 text-white text-xs 
            hover:bg-gradient-to-tl hover:from-blue-900 hover:to-blue-700
            hover:bg-black flex justify-center items-center`}><SVG title={'delete'} classes={'h-1/2 w-full pointer-events-none'} /> </div>)
    } else {
        if (props.index === 10) {
            return (<div id={props.data}
                className={`${props.results && 'pointer-events-none opacity-90'} key w-[36px] h-[58px] mt-1 mx-[1px] ml-[10px] rounded-md 
                bg-gradient-to-tl from-neutral-800 to-neutral-700 text-white text-xs 
                hover:bg-gradient-to-tl hover:from-neutral-800 hover:to-neutral-800
                hover:bg-black flex justify-center items-center`}>{props.data}</div>)
        } else {
            return (<div id={props.data}

                className={`${props.results && 'pointer-events-none opacity-90'} key w-[36px] h-[58px] mt-1 mx-[1px] rounded-md 
                bg-gradient-to-tl from-neutral-800 to-neutral-700 text-white 
                hover:bg-gradient-to-tl hover:from-neutral-800 hover:to-neutral-800
                text-xs hover:bg-black flex justify-center items-center`}>{props.data}</div>)
        }

    }
}

export default Key