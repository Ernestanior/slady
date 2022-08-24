import {FC} from "react";
import './index.less'
import {Col, Row} from "antd";

interface IProps{
    dataList?:any[];
}
const View:FC<IProps> = ({dataList,children}) => {
    return <>
        {dataList?.map((item)=>{
           return <Row key={item.label}>
               <Col span={8} style={{fontWeight:550}}>{item.label}</Col>
               <Col offset={1} span={15} style={{flexWrap:"wrap",wordBreak:"break-all"}}>{item.content}</Col>
           </Row>
        })
        }
        {children}
    </>
}

export default View;
