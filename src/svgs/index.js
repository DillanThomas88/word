

import {ReactComponent as Exclamation} from './exclamation.svg'
import {ReactComponent as Completed} from './complete.svg'
import {ReactComponent as Delete} from './delete.svg'


function SVG({title, classes}) {
    const svg = {
        exclamation: <Exclamation className={classes} />,
        exclamationx: <Exclamation className={classes} />,
        complete: <Completed className={classes} />,
        delete: <Delete className={classes} />,
        
    }
    return(<>
        {svg[title]}
    </>)
}
export default SVG