import {Tag, TagProps} from "antd";
import {FC} from "react";


const Status:FC<TagProps> = (props) => {
    return <Tag {...props} style={{borderRadius: 15, paddingLeft: 15, paddingRight: 15}} />
}

export default Status;
