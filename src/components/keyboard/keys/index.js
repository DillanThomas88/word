

function Key(props) {

    if (props.data.length > 1) {
        return (<button id={props.data}
            className="key w-[49px] h-[58px] mr-[6px] mt-2 rounded-sm bg-neutral-900 text-white text-xs">{props.data}</button>)

    } else {
        if (props.index === 10) {
            return (<button id={props.data}
                className=" key w-[32px] h-[58px] mt-2 mr-[6px] ml-[6px] rounded-sm bg-neutral-800 text-white text-xs">{props.data}</button>)
        } else {
            return (<button id={props.data}
                className="key w-[32px] h-[58px] mt-2 mr-[6px] rounded-sm bg-neutral-800 text-white text-xs">{props.data}</button>)
        }

    }
}

export default Key