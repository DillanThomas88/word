import {ReactComponent as Close} from './close.svg'


function SVG({title, classes}) {

    const svg = {
        close: <Close />,
    }

    return(<>

    <div className={classes}>
        {svg[title]}
    </div>

    </>)
}
export default SVG