import React, {FC, useCallback} from "react";
import Template from "@/common/template";

const OperationList:FC = () => {
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

export default OperationList

const columns = [
    {
        dataIndex: "page",
        title: "页面",
    },
    {
        dataIndex: "function",
        title: "功能",
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
        {page:"商品 - 612-713 - 详情",function:"下单", operator:"Liu Nini", time:"2023/6//20 15:00:27"},
        {page:"商品 - 156-338 - 详情",function:"修改照片", operator:"Liu Nini", time:"2023/6//20 15:00:27"},
        {page:"商品",function:"新增", operator:"老板", time:"2023/6//20 15:00:27"},

    ]
}
