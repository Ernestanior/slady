import {FC} from "react";
import "./progressCenter.less"

const ProgressCenter:FC = ({children}) => {
    return <div className="progress-center">
        {children}
    </div>
}

export default ProgressCenter;
