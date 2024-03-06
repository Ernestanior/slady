import React, {FC} from "react";
import Template from "@/common/template/indexWithPagination";
import {accessLogService} from "@/store/apis/log";
import moment from "moment";
import {useTranslation} from "react-i18next";

const OperationList:FC = () => {
    const [t]=useTranslation()
    // const operateMap:any = {
    //     "/user/create":t('CREATE_ACCOUNT')
    // }
    const columns = [
        {
            dataIndex: "userName",
            title: t('OPERATOR'),
        },
        {
            dataIndex: "uri",
            title: t('INTERFACE'),
            render:(res:any)=>{
                console.log(res)
                return res
            }
        },
        // {
        //     dataIndex: "uri",
        //     title:  t('BEHAVIOR'),
        //     render:(value:any)=>operateMap[value]
        // },
        {
            dataIndex: "createDate",
            title:  t('OPERATION_TIME'),
            render:(value:string)=>moment(value).format("YYYY-MM-DD HH:mm:ss")
        },
    ]

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



