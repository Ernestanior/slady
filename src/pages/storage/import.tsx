import React, {FC} from "react";
import Template from "@/common/template";
import {accessLogService} from "@/store/apis/log";
import {useTranslation} from "react-i18next";
const Import:FC = () => {
    const [t]=useTranslation()
    const columns = [
        {
            dataIndex: "pic",
            title: t("IMPORT_ITEM"),
            render:(pic:string)=><img alt="" src={pic}/>
        },
        {
            dataIndex: "designId",
            title: t("DESIGN_CODE"),
        },
        {
            dataIndex: "color",
            title: t("COLOR"),
        },
        {
            dataIndex: "size",
            title: t("SIZE"),
        },
        {
            dataIndex: "operator",
            title: t("OPERATOR"),
        },
        {
            dataIndex: "time",
            title: t("TIME"),
        },
    ]

    return <section>
        <Template
            columns={columns}
            queryData={(data)=>accessLogService.FindAccessLog({},{
                ...data,uri:"/item/modify-stock"
            })}
            rowKey="id"
        />
    </section>
}

export default Import


