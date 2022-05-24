import { handleExit } from "./helpers"

function Modal({ children, handle }) {

    return (<div onClick={(e) => handle(e)} className="fixed w-full h-full z-40">
        <div className=" fixed w-full h-full bg-neutral-800 opacity-50">
        </div>

        <div className="absolute backdrop w-full h-full z-50 p-8 animate-modal ">
            {children}
        </div>


    </div>)
}

export default Modal