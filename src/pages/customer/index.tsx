import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import {INormalEvent} from "@/common/interface";
import {customerService} from "@/store/apis/account";
import {reqAndReload} from "@/common/utils";
import Template from "@/common/template";
import {IOperationConfig} from "@/common/template/interface";
import msgModal from "@/store/message/service";
import FormItem from "@/common/Form/formItem";
import {Checkbox, Form, Input, InputNumber, notification, Switch} from "antd";
import {classificationService} from "@/store/apis/content";
import {from} from "rxjs";
import request from "@/store/request";
const CustomerList:FC = () => {
    const [subs,setSubs]=useState<any[]>([])
    useEffect(()=>{
       const config = classificationService.ClassList({}, {
           searchPage:{desc:0,page:0,pageSize:999,sort:""}
       })
        const sub = from(request(config)).subscribe((res:any) => {
            if(res.isSuccess){
                setSubs(res.result.content)
            }
        })
        return () => sub.unsubscribe()
    },[])
    const buttons: INormalEvent[] = useMemo(() => {
        return subs.length?[
            {
                text: "Create",
                primary: true,
                event() {
                    const value = {
                        title: "Create",
                        api: customerService.CustomerCreate,
                        content: <section>
                            <Form.Item name="email" label={<span className="login-label">Login Email</span>}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="password" label={<span className="login-label">Password</span>}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="subscription" label="Subscriptions">
                                <Checkbox.Group>
                                    {subs.map((item)=><Checkbox value={item} >
                                        {item.name}
                                    </Checkbox>
                                    )}
                                </Checkbox.Group>
                            </Form.Item>
                            <Form.Item name="period" label="Period" >
                                <InputNumber/>
                            </Form.Item>
                            <Form.Item name="status" label="Status" >
                                <Switch />
                            </Form.Item>

                        </section>,
                    }
                    msgModal.createEvent("modalF", value)
                },
            },
        ]:[];
    }, [subs]);


    const query = useCallback((data) => {
        return customerService.CustomerList({}, data);
    }, [])


    const options: IOperationConfig = useMemo(() => {
        return [
            [
                {
                    text: "Modify",
                    event(data) {
                        // historyService.push("/admin/create");
                        const value = {
                            title: "Edit",
                            api: customerService.CustomerModify,
                            data,
                            content: <section>
                                <Form.Item name="name" label={<span className="login-label">Name</span>}>
                                    <Input />
                                </Form.Item>
                            </section>,
                        }
                        msgModal.createEvent("modalF", value)
                    },

                },
                {
                    text: "Delete",
                    event(data) {
                        // deleteCustomer(data);
                        const value = {
                            title: "Delete",
                            content: `Confirm delete customer: ${data.name} ？`,
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
            rowKey="id"
        />
    </section>
}

export default CustomerList

const columns = [
    {
        dataIndex: "name",
        title: "名称",
    },
]

