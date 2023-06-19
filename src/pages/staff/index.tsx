import React, {FC, useCallback, useMemo, useState} from "react";
import {INormalEvent} from "@/common/interface";
import {customerService} from "@/store/apis/account";
import {reqAndReload} from "@/common/utils";
import Template from "@/common/template";
import {IOperationConfig} from "@/common/template/interface";
import msgModal from "@/store/message/service";
import FormItem from "@/common/Form/formItem";
import {Input, notification, Tooltip} from "antd";
import CreateCustomer from "@/pages/staff/create";
import ModifyCustomer from "@/pages/staff/modify";
import {E_COLOR} from "@/common/const";
import Status from "@/common/status";
import moment from "moment";
const CustomerList:FC = () => {
    const [createFlag,setCreateFlag]=useState<boolean>(false)
    const [editFlag,setEditFlag]=useState<boolean>(false)
    const [selectData,setSelectData] = useState<any>()

    const buttons: INormalEvent[] = useMemo(() => {
        return [
            {
                text: "Create",
                primary: true,
                event() {
                    setCreateFlag(true)
                },
            },
        ];
    }, []);


    // const query = useCallback((data) => {
    //     return customerService.CustomerList({}, data);
    // }, [])

    const queryData=useCallback(async()=>{
        return staticData
    },[])

    const options: IOperationConfig = useMemo(() => {
        return [
            [
                {
                    text: "修改",
                    event(data) {
                        setSelectData(data)
                        setEditFlag(true)
                    },
                },
                {
                    text: "删除",
                    event(data) {
                        // deleteCustomer(data);
                        const value = {
                            title: "删除",
                            content: `确定删除: ${data.name} ？`,
                            onOk: () => {
                                const config = customerService.CustomerDelete({}, [data.id]);
                                reqAndReload(config, () => notification.success({message: "Delete Success"}));
                            }
                        }
                        msgModal.createEvent("modal", value)
                    },
                }]
        ]
    }, [])


    return <section>
         <Template
            optList={options}
            filter={<FormItem span={5} noStyle name="keyWord">
                <Input/>
            </FormItem>}
            event={buttons}
            columns={columns}
            // queryData={query}
            queryDataFunction={queryData}

            rowKey="email"
        />
        <CreateCustomer onOk={()=>setCreateFlag(false)} visible={createFlag}></CreateCustomer>
        <ModifyCustomer onOk={()=>setEditFlag(false)} visible={editFlag} data={selectData}></ModifyCustomer>
    </section>
}

export default CustomerList

const columns = [
    {
        dataIndex: "name",
        title: "名字",
    },
    {
        dataIndex: "role",
        title: "职位",
    },
]

const staticData = {
    number:0,
    numberOfElements:10,
    size:10,
    totalElements:16,
    totalPages:6,
    content:[
        {name:"Ahri", role:"销售"},
        {name:"Shawn", role:"销售经理"},
        {name:"Ann", role:"订单物流"},
        {name:"Hu Xiaoyi", role:"库存管理"},
    ]
}
