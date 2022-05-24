import SVG from "../../../svgs"

function ModalCard({ handle, title, children }) {
    return (<div className="w-full min-h-[100px] max-h-full bg-white rounded-lg shadow-md shadow-neutral-800 text-neutral-700 overflow-y-scroll">

        {/* Exit Button */}        
        <div onClick={(e) => handle(e)}
            className="absolute close right-4 top-4 h-7 w-7 m-5">
            <SVG title={'close'} classes={'w-full h-full float-right pointer-events-none'} />
        </div>
        
        {/* Content */}
        <div className="p-4 w-full h-full ">
            <label className="font-serif uppercase flex justify-center text-center text-2xl">{title}</label>
            <div className="border-b"></div>
            <div>{children}</div>



        </div>
    </div>)
}

export default ModalCard