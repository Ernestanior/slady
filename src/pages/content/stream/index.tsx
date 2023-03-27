import React, {FC, useEffect, useMemo, useState} from "react";
import Template from "@/common/template";
import {classificationService, streamService} from "@/store/apis/content";
import { Form, Input, notification, TableColumnProps, Tabs} from "antd";
import FormItem from "@/common/Form/formItem";
import {IOperationConfig} from "@/common/template/interface";
import msgModal from "@/store/message/service";
import {reqAndReload} from "@/common/utils";
import {INormalEvent} from "@/common/interface";
import CreateStream from "@/pages/content/stream/create";
import {from} from "rxjs";
import request from "@/store/request";

const {TabPane} = Tabs;
const Stream:FC = () => {
    const [subs,setSubs]=useState<any>()

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

    const [createFlag,setCreateFlag]=useState<boolean>(false)
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

    const options: IOperationConfig = useMemo(() => {
        return [
            [
                {
                    text: "Modify",
                    event(data) {
                        // historyService.push("/admin/create");
                        const value = {
                            title: "Edit",
                            api: streamService.StreamModify,
                            data,
                            content: <section>
                                <Form.Item name="title" label={<span className="login-label">Title</span>}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="description" label={<span className="login-label">Description</span>}>
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
                            content: `Confirm delete video: ${data.title} ？`,
                            onOk: () => {
                                const config = streamService.StreamDelete({}, [data.id]);
                                reqAndReload(config, () => notification.success({message: "Delete Success"}));
                            }
                        }
                        msgModal.createEvent("modal", value)
                    },
                }]
        ]
    }, [])

    return <>
        <Tabs type='card' destroyInactiveTabPane>
            {subs && subs.length && subs.map((item:{id:number;name:string})=><TabPane tab={item.name} key={item.id+""}>
                    <Template
                        filter={<FormItem span={5} noStyle name="keyWord">
                            <Input allowClear />
                        </FormItem>}
                        queryData={(data)=>streamService.StreamList({}, {...data,classificationId:item.id+""})}
                        columns={columns}
                        optList={options}
                        event={buttons}
                        rowKey="id"
                    />
                    <CreateStream onOk={()=>setCreateFlag(false)} visible={createFlag} classificationId={item.id +""}></CreateStream>
                </TabPane>
            )}
        </Tabs>
    </>

}
export default Stream;

const columns: TableColumnProps<any>[] = [
    {
        title:"Name",
        dataIndex: "title",
    },
    {
        title:"Description",
        dataIndex: "description",
    },
    {
        title: "Cover page",
        dataIndex: "imagePath",
        render:(data)=>{
            return data
        }
    },
    {
        title:"Time",
        dataIndex: "length",
    },
    {
        title:"Upload time",
        dataIndex: "createDate",
    },
    {
        title:"Like",
        dataIndex: "likeCount",
    },

]
