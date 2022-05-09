

import {ReactComponent as Exclamation} from './exclamation.svg'
import {ReactComponent as Completed} from './complete.svg'


function SVG({title, classes}) {
    const svg = {
        exclamation: <Exclamation className={classes} />,
        complete: <Completed className={classes} />,
    }
    return(<>
        {svg[title]}
    </>)
}
export default SVG