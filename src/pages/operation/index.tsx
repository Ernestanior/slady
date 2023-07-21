import React, {FC} from "react";
import Template from "@/common/template";
import {accessLogService} from "@/store/apis/log";

const OperationList:FC = () => {
    return <section>
         <Template
            columns={columns}
            queryData={(data:any)=>accessLogService.FindAccessLog({},data)}
            // queryDataFunction={queryData}
            rowKey="id"
        />
    </section>
}

export default OperationList

const columns = [
    {
        dataIndex: "userName",
        title: "操作者",
    },
    {
        dataIndex: "uri",
        title: "调用接口",
    },
    {
        dataIndex: "uri",
        title: "行为",
        render:(value:any)=>operateMap[value]
    },
    {
        dataIndex: "createDate",
        title: "操作时间",
    },
]

const operateMap:any = {
    "/user/create":"创建账号"
}
