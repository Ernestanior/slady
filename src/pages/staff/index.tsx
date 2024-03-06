import React, {FC, useCallback, useMemo, useState} from "react";
import {INormalEvent} from "@/common/interface";
import {userService} from "@/store/apis/account";
import {reqAndReload} from "@/common/utils";
import Template from "@/common/template";
import {IOperationConfig} from "@/common/template/interface";
import msgModal from "@/store/message/service";
import FormItem from "@/common/Form/formItem";
import {Input, notification} from "antd";
import CreateCustomer from "@/pages/staff/create";
import ModifyCustomer from "@/pages/staff/modify";
import {useTranslation} from "react-i18next";
const CustomerList:FC = () => {
    const {t}=useTranslation()
    const [createFlag,setCreateFlag]=useState<boolean>(false)
    const [editFlag,setEditFlag]=useState<boolean>(false)
    const [selectData,setSelectData] = useState<any>()

    const buttons: INormalEvent[] = useMemo(() => {
        return [
            {
                text: t("CREATE"),
                primary: true,
                event() {
                    setCreateFlag(true)
                },
            },
        ];
    }, [t]);

    const queryData=useCallback((data)=>{
        return userService.FindUser({},data)
    },[])

    const columns = [
        {
            dataIndex: "name",
            title: t("NAME"),
        },
        {
            dataIndex: "type",
            title: t("ROLE"),
        },
    ]

    const options: IOperationConfig = useMemo(() => {
        return [
            [
                {
                    text: t("EDIT"),
                    event(data) {
                        setSelectData(data)
                        setEditFlag(true)
                    },
                },
                {
                    text:t("DELETE"),
                    event(data) {
                        const value = {
                            title: t("DELETE"),
                            content: `${t("CONFIRM")}${t("DELETE")}: ${data.name} ？`,
                            onOk: () => {
                                const config = userService.DeleteUser({},[data.id])
                                reqAndReload(config, () => notification.success({message: "Delete Success"}));
                            }
                        }
                        msgModal.createEvent("modal", value)
                    },
                }]
        ]
    }, [t])

    return <section>
         <Template
            optList={options}
            filter={<FormItem span={5} noStyle name="keyWord">
                <Input/>
            </FormItem>}
            event={buttons}
            columns={columns}
            queryData={queryData}
            rowKey="id"
        />
        <CreateCustomer onOk={()=>setCreateFlag(false)} visible={createFlag}></CreateCustomer>
        <ModifyCustomer onOk={()=>setEditFlag(false)} visible={editFlag} data={selectData}></ModifyCustomer>
    </section>
}

export default CustomerList



