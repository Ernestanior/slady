import React, {FC} from "react";
import Template from "@/common/template";
import {accessLogService} from "@/store/apis/log";
import {useTranslation} from "react-i18next";
const Export:FC = () => {
    const [t]=useTranslation()
    const columns = [
        {
            dataIndex: "pic",
            title: t("EXPORT_ITEM"),
        },
        {
            dataIndex: "designId",
            title: t("DESIGN_CODE"),
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

export default Export



