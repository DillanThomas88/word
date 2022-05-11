

function Key(props) {

    if (props.data.length > 1) {
        return (<button id={props.data}
            className="key w-[49px] h-[58px] mx-[3px] mt-2 rounded-md bg-green-800 text-white text-xs">{props.data}</button>)

    } else {
        if (props.index === 10) {
            return (<button id={props.data}
                className=" key w-[32px] h-[58px] mt-2 mx-[3px] ml-[6px] rounded-md bg-neutral-800 text-white text-xs">{props.data}</button>)
        } else {
            return (<button id={props.data}
                className="key w-[32px] h-[58px] mt-2 mx-[3px] rounded-md bg-neutral-800 text-white text-xs">{props.data}</button>)
        }

    }
}

export default Key