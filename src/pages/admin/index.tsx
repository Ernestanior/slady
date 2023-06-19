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
import item1 from '../../assets/1.jpg'
import item2 from '../../assets/2.jpg'
import item3 from '../../assets/3.jpg'
import item4 from '../../assets/4.jpg'
import item5 from '../../assets/5.jpg'
import item6 from '../../assets/6.jpg'
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
        // const cusList = await request(adminService.UserList({}, {type:'admin',...filters}));
        // if (cusList.isSuccess && cusList.result) {
        //     const data: any = cusList.result;
        //     return data;
        // }
        return staticData;
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
        title: "照片",
        dataIndex: "pic",
        render:(item)=>{
            console.log(item)
            switch (item){
                case 1:
                    return <img src={item1}/>
                case 2:
                    return <img src={item2}/>
                case 3:
                    return <img src={item3}/>
                case 4:
                    return <img src={item4}/>
                case 5:
                    return <img src={item5}/>
                case 6:
                    return <img src={item6}/>
            }

        }

    },
    {
        title: "设计编号",
        dataIndex: "designId",
    },
    {
        title: "库存",
        dataIndex: "sum",
    },
    {
        title: "价格",
        dataIndex: "price",
    },
];
const staticData = {
    number:0,
    numberOfElements:10,
    size:10,
    totalElements:16,
    totalPages:6,
    content:[
        {designId:1, pic:1, sum:5, price:199},
        {designId:2, pic:2, sum:5, price:199},
        {designId:3, pic:6, sum:5, price:199},
        {designId:4, pic:4, sum:5, price:199},
        {designId:5, pic:5, sum:5, price:199},
        {designId:6, pic:1, sum:5, price:199},
        {designId:7, pic:2, sum:5, price:199},
        {designId:8, pic:4, sum:5, price:199},
        {designId:9, pic:4, sum:5, price:199},
        {designId:10, pic:5, sum:5, price:199},
        {designId:11, pic:6, sum:5, price:199},
        {designId:12, pic:1, sum:5, price:199},
        {designId:13, pic:2, sum:5, price:199},
        {designId:14, pic:4, sum:5, price:199},
        {designId:15, pic:5, sum:5, price:199},
        {designId:16, pic:1, sum:5, price:199},
    ]
}
