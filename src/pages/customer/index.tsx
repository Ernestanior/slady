import React, {FC, useCallback, useMemo, useState} from "react";
import {INormalEvent} from "@/common/interface";
import {customerService} from "@/store/apis/account";
import {reqAndReload} from "@/common/utils";
import Template from "@/common/template";
import {IOperationConfig} from "@/common/template/interface";
import msgModal from "@/store/message/service";
import FormItem from "@/common/Form/formItem";
import {Input, notification} from "antd";
import CreateCustomer from "@/pages/customer/create";
import ModifyCustomer from "@/pages/customer/modify";
import {E_COLOR} from "@/common/const";
import Status from "@/common/status";
import SubsCustomer from "@/pages/customer/subscription";
const CustomerList:FC = () => {
    const [createFlag,setCreateFlag]=useState<boolean>(false)
    const [editFlag,setEditFlag]=useState<boolean>(false)
    const [subsFlag,setSubsFlag]=useState<boolean>(false)
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


    const query = useCallback((data) => {
        return customerService.CustomerList({}, data);
    }, [])

    const options: IOperationConfig = useMemo(() => {
        return [
            [
                {
                    text: "Disable",
                    hide: (data) => data.status !== 1,
                    event(data) {
                        const value = {
                            title: "Disable",
                            content: `Confirm disable: ${data.name} ？`,
                            onOk: () => {
                                const config = customerService.CustomerStatus({}, {ids: [data.id],status:0});
                                reqAndReload(config);
                            }
                        }
                        msgModal.createEvent("modal", value)
                    }
                },
                {
                    text: "Enable",
                    hide: (data) => data.status === 1,
                    event(data) {
                        const value = {
                            title: "Enable",
                            content: `Confirm enable: ${data.name} ？`,
                            onOk: () => {
                                const config = customerService.CustomerStatus({}, {ids: [data.id],status:1});
                                reqAndReload(config);
                            }
                        }
                        msgModal.createEvent("modal", value)
                    }
                },
                {
                    text: "Modify",
                    event(data) {
                        setSelectData(data)
                        setEditFlag(true)
                    },
                },
                {
                    text: "Subscriptions",
                    event(data) {
                        setSelectData(data)
                        setSubsFlag(true)
                    },
                },
                // {
                //     text: "Modify",
                //     event(data) {
                //         // historyService.push("/admin/create");
                //         const value = {
                //             title: "Edit",
                //             api: customerService.CustomerModify,
                //             data,
                //             content: <section>
                //                 <Form.Item name="name" label={<span className="login-label">Name</span>}>
                //                     <Input />
                //                 </Form.Item>
                //             </section>,
                //         }
                //         msgModal.createEvent("modalF", value)
                //     },
                // },
                {
                    text: "Delete",
                    event(data) {
                        // deleteCustomer(data);
                        const value = {
                            title: "Delete",
                            content: `Confirm delete: ${data.name} ？`,
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
            queryData={query}
            rowKey="email"
        />
        <CreateCustomer onOk={()=>setCreateFlag(false)} visible={createFlag}></CreateCustomer>
        <ModifyCustomer onOk={()=>setEditFlag(false)} visible={editFlag} data={selectData}></ModifyCustomer>
        <SubsCustomer onOk={()=>{setSubsFlag(false);setSelectData(undefined)}} visible={subsFlag} data={selectData}></SubsCustomer>
    </section>
}

export default CustomerList

const columns = [
    {
        dataIndex: "email",
        title: "Name",
    },
    {
        dataIndex: "status",
        title: "Status",
        render:(data:any)=>{
            return data?<Status color={E_COLOR.enable}>Enable</Status>:<Status color={E_COLOR.disable}>Disable</Status>
        }
    },
]

