import React, {FC, useCallback, useMemo, useState} from "react";
import Template from "@/common/template";
import {INormalEvent} from "@/common/interface";
import {Input, notification, TableColumnProps} from "antd";
import {adminService} from "@/store/apis/account";
import { reqAndReload} from "@/common/utils";
import request from "@/store/request";
import {IOperationConfig} from "@/common/template/interface";
import msgModal from "@/store/message/service";
import FormItem from "@/common/Form/formItem";
import CreateAdmin from "@/pages/admin/create";
import ModifyAdmin from "@/pages/admin/modify";
import Status from "@/common/status";
import {E_COLOR} from "@/common/const";

const AdminList: FC = () => {
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

    const queryDataFunction = useCallback(async (filters) => {
        const cusList = await request(adminService.UserList({}, {type:'admin',...filters}));
        if (cusList.isSuccess && cusList.result) {
            const data: any = cusList.result;
            return data;
        }
        return null;
    }, []);

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
                                const config = adminService.UserStatus({}, {ids: [data.id],status:0});
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
                                const config = adminService.UserStatus({}, {ids: [data.id],status:1});
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
                // {
                //     text: "Modify",
                //     event(data) {
                //         // historyService.push("/admin/create");
                //         const value = {
                //             title: "Edit",
                //             api: adminService.UserModify,
                //             id:data.id,
                //             content: <section>
                //                 <Form.Item name="email" label={<span className="login-label">Login Email</span>}>
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
                            content: `Confirm delete user: ${data.email} ？`,
                            onOk: () => {
                                const config = adminService.UserDelete({}, [data.id]);
                                reqAndReload(config, () => notification.success({message: "Delete Success"}));
                            }
                        }
                        msgModal.createEvent("modal", value)
                    },
                }]
        ]
    }, [ ])

    return (
        <section>
            <Template
                filter={<FormItem span={5} noStyle name="keyWord">
                    <Input/>
                </FormItem>}
                event={buttons}
                columns={columns}
                // queryData={query}
                optList={options}
                queryDataFunction={queryDataFunction}
                rowKey="id"
            />
            <CreateAdmin onOk={()=>setCreateFlag(false)} visible={createFlag}></CreateAdmin>
            <ModifyAdmin onOk={()=>setEditFlag(false)} visible={editFlag} data={selectData}></ModifyAdmin>
        </section>
    );
};

export default AdminList;

const columns: TableColumnProps<any>[] = [
    {
        title: "Users",
        dataIndex: "email",
    },
    {
        dataIndex: "status",
        title: "Status",
        render:(data:any)=>{
            return data?<Status color={E_COLOR.enable}>Enable</Status>:<Status color={E_COLOR.disable}>Disable</Status>
        }
    },
];
