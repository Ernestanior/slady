import React, {FC} from "react";
import Template from "@/common/template/indexWithPagination";
import {accessLogService} from "@/store/apis/log";
import moment from "moment";

const OperationList:FC = () => {
    return <section>
         <Template
            columns={columns}
            queryData={(data)=>accessLogService.FindAccessLog({},{...data})}
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
        render:(value:string)=>moment(value).format("YYYY-MM-DD HH:mm:ss")
    },
]

const operateMap:any = {
    "/user/create":"创建账号"
}
