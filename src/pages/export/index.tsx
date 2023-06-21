import React, {FC, useCallback} from "react";
import Template from "@/common/template";
import item4 from '../../assets/4.jpg'
import item5 from '../../assets/5.jpg'
import item6 from '../../assets/6.jpg'
const Export:FC = () => {
    const queryData=useCallback(async()=>{
        return staticData
    },[])

    return <section>
         <Template
            columns={columns}
            // queryData={query}
            queryDataFunction={queryData}
            rowKey="id"
        />
    </section>
}

export default Export

const columns = [
    {
        dataIndex: "pic",
        title: "出库商品",
    },
    {
        dataIndex: "designId",
        title: "设计师号",
    },
    {
        dataIndex: "operator",
        title: "操作者",
    },
    {
        dataIndex: "time",
        title: "时间",
    },
]

const staticData = {
    number:0,
    numberOfElements:10,
    size:10,
    totalElements:16,
    totalPages:6,
    content:[
        {pic:item4,designId:"4011", operator:"Liu Nini", time:"2023/6//20 15:00:27"},
        {pic:item5,designId:"1345", operator:"Liu Nini", time:"2023/6//20 15:00:27"},
        {pic:item6,designId:"8872", operator:"老板", time:"2023/6//20 15:00:27"},
    ]
}
