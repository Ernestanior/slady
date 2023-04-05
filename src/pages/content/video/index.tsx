import React, {FC, useEffect, useMemo, useState} from "react";
import Template from "@/common/template";
import {classificationService, videoService} from "@/store/apis/content";
import { Form, Input, notification, TableColumnProps, Tabs} from "antd";
import FormItem from "@/common/Form/formItem";
import {IOperationConfig} from "@/common/template/interface";
import msgModal from "@/store/message/service";
import {reqAndReload} from "@/common/utils";
import {INormalEvent} from "@/common/interface";
import CreateVideo from "@/pages/content/video/create";
import {from} from "rxjs";
import request from "@/store/request";

const {TabPane} = Tabs;
const Video:FC = () => {
    const [subs,setSubs]=useState<any>()


    useEffect(()=>{
        const config = classificationService.ClassList({}, {
            searchPage:{desc:0,page:0,pageSize:999,sort:""}
        })
        const sub = from(request(config)).subscribe((res:any) => {
            if(res.isSuccess){
                setSubs(res.result.content.filter((item:any)=>item.id!==1))
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
                            title: "Modify",
                            api: videoService.VideoModify,
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
                                const config = videoService.VideoDelete({}, [data.id]);
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
                        queryData={(data)=>videoService.VideoList({}, {...data,classificationId:item.id+""})}
                        columns={columns}
                        optList={options}
                        event={buttons}
                        rowKey="id"
                    />
                    <CreateVideo onOk={()=>setCreateFlag(false)} visible={createFlag} classificationId={item.id +""}></CreateVideo>
                </TabPane>
            )}
        </Tabs>
    </>

}
export default Video;

const columns: TableColumnProps<any>[] = [
    {
        title:"Name",
        dataIndex: "title",
    },
    {
        title:"Description",
        dataIndex: "description",
        render:(data)=>data || '-'
    },
    {
        title: "Cover page",
        dataIndex: "imagePath",
        render:(data,item)=>{
            return <a rel="noreferrer" target='_blank' href={"https://stg-gp-media-svc.greypanel.com/media"+item.contentPath}>
                <img alt="" style={{width:250}}  src={"https://stg-gp-media-svc.greypanel.com/media"+data}></img>
            </a> }
    },
    {
        title:"Time",
        dataIndex: "length",
    },
    {
        title:"Upload time",
        dataIndex: "createDate",
    },

];
