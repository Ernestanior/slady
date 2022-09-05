import React, {FC, ReactNode, useCallback, useMemo, useRef, useState} from "react";
import Template, {reloadMainList} from "@/common/template";
import NewsFilter from "@/pages/news/filter";
import NewsFilterMobile from "@/pages/news/filterMobile";
import {INormalEvent} from "@/common/interface";
import historyService from "@/store/history";
import {AxiosRequestConfig} from "axios";
import requestNews from "@/store/request/requestNews";
import { Image, Space, TableColumnProps, Modal, notification, Input} from "antd";
import {from} from "rxjs";
import ViewNewsDetail from "@/pages/news/view";
import {LanguageType} from "@/pages/news/form";
import isMobile from "@/app/isMobile";
import FormItem from "@/common/Form/formItem";
import {IOperationConfig} from "@/common/template/interface";
import msgModal from "@/store/message/service";
import View from "@/common/popup/view";

interface IPage{
    pages: number,
    total: number,
    records: any[]
}

const NewsList:FC = () => {

    const [confirmModalVisible, setConfirmModalVisible] = useState(false)

    const buttons: INormalEvent[] = useMemo(()=> {
        return [{
            text: '新增',
            primary: true,
            event(){
                if(isMobile){
                    notification.error({message:"手机端无法使用该功能"})
                    return
                }
                historyService.push("/news/create")
            }
        }, {
            text: '生成静态页面',
            primary: true,
            event(){
                setConfirmModalVisible(true)
            }
        }]
    }, [])

    const queryDataFunction = useCallback(async (filters) => {
        const {searchPage, date, ...restFilters} = filters
        const data:any = {
            ...searchPage,
            ...restFilters
        }
        if(Array.isArray(date) && date.length > 1){
            data.startDate = date[0].format("YYYY-MM-DD HH:mm:ss")
            data.endDate = date[1].format("YYYY-MM-DD HH:mm:ss")
        }
        const config: AxiosRequestConfig = {
            method: "post",
            url: "/api/information/get-page",
            data
        }
        const res = await requestNews<IPage>(config);
        if(res.isSuccess && res.result){
            const repData = res.result
            return {
                content: repData.records,
                totalElements: repData.total
            } as any
        }
        return null;
    }, [])

    const delData = useRef<any>(null)
    const [delModalVisible, setDelModalVisible] = useState(false)

    // 删除
    const del = useCallback(() => {
        if(!delData.current){
            return
        }
        const config:AxiosRequestConfig = {
            method: "delete",
            url: "/api/information/delete",
            params: {
                id: delData.current.id
            }
        }
        from(requestNews(config)).subscribe(res => {
            if(res.isSuccess){
                setDelModalVisible(false)
                reloadMainList()
                delData.current = null
            }
        })
    }, [delData])


    const options: IOperationConfig = useMemo(() => {
        return [
            {
                text: "查看",
                hide:()=>!isMobile,
                event(data) {
                    if (data) {
                        const {
                            id,
                            entry,
                            imageUrl,
                            locales,
                            publishDate
                        } = data
                        const dataList=[
                            {label:'ID',content:id},
                            {label:'条目名称',content:entry},
                            {label:'图片',content:<Image width={150} height={80} src={imageUrl} fallback={errorImage}/>},
                            {label:'语言',content:localeRender(locales)},
                            {label:'发布日期',content:publishDate},
                        ]
                        const value = {
                            node: <View dataList={dataList} />,
                        }
                        msgModal.createEvent("popup", value)
                    }
                },
            },
            {
                text: "修改",
                event(data) {
                    if(isMobile){
                        notification.error({message:"手机端无法使用该功能"})
                        return
                    }
                    historyService.push(`/news/${data.id}`)
                }
            },
            {
                text: "删除",
                event(data) {
                    delData.current = data;
                    // setDelModalVisible(true)
                    const value = {
                        title: "删除",
                        content: `你确定要删除新闻 ID：${data.id}`,
                        onOk: () => del()
                    }
                    msgModal.createEvent("modal", value)
                },
            },
        ]
    },[del])

    // 按钮的loading
    const [loading, setLoading] = useState(false)

    // 生成静态Html页面
    const reGenerateStaticHtml = useCallback(() => {
        setLoading(true);
        const config: AxiosRequestConfig = {
            method: "get",
            url: "/api/generate/general/html"
        }
        from(requestNews(config)).subscribe(res => {
            if(res.isSuccess){
                setConfirmModalVisible(false)
            }else{
                notification.error({
                    message: "API调用失败，请联系技术支持！"
                })
            }
            setLoading(false)
        })
    }, [])

    return <section>
        <Template
            filter={isMobile?<NewsFilterMobile/>:<NewsFilter />}
            event={buttons}
            columns={isMobile?columnMobile:columns}
            queryDataFunction={queryDataFunction}
            optList={options}
            rowKey="id"
            primarySearch={primarySearch}
        />
        <Modal title="确认删除" visible={delModalVisible} onOk={del} onCancel={() => setDelModalVisible(false)}>
            <p>确认删除新闻：{delData.current && delData.current.entry}</p>
        </Modal>
        <Modal
            title="确认"
            visible={confirmModalVisible}
            onOk={reGenerateStaticHtml}
            confirmLoading={loading}
            onCancel={() => setConfirmModalVisible(false)}
            afterClose={() => {
                if(loading){
                    setLoading(false)
                }
            }}
        >
            <p>是否重新生成静态页面</p>
            <p style={{fontSize: "0.75em"}}>注意：API调用完成后，需要等待编译程序运行完成页面才会刷新</p>
        </Modal>
        <ViewNewsDetail.UI />
    </section>
}

export default NewsList;

const columnMobile: TableColumnProps<any>[] = [
    {
        title: "ID",
        dataIndex: "id",
        width:50
    },
    {
        title: "条目名称",
        dataIndex: "entry",
        width:150
    }
]
const columns: TableColumnProps<any>[] = [
    {
        title: "ID",
        dataIndex: "id",
    },
    {
        title: "条目名称",
        dataIndex: "entry",
    },
    {
        title: "图片",
        dataIndex: "imageUrl",
        render(url){
            return <Image
                width={150}
                height={80}
                src={url}
                fallback={errorImage}
            />
        }
    },
    {
        title: "语言",
        dataIndex: "locales",
        width:300,
        render(locales: string[]){
            const els: ReactNode[] = [];
            locales.forEach(locale => {
                if(locale === LanguageType.ZH_CN){
                    els.push(<span style={{padding:10,borderRadius:5,backgroundColor:"#b6ecff"}}>简体中文</span>)
                }
                if(locale === LanguageType.ZH_TW){
                    els.push(<span style={{padding:10,borderRadius:5,backgroundColor:"#b6ffb7"}}>繁体中文</span>)
                }
                if(locale === LanguageType.EN_US){
                    els.push(<span style={{padding:10,borderRadius:5,backgroundColor:"#ffb6f9"}}>English</span>)
                }
            })
            return <Space>
                {els}
            </Space>
        }
    },
    {
        title: "发布日期",
        dataIndex: "publishDate",
    }
]

export const errorImage = `data:image/png;base64,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`

const primarySearch=<>
    <FormItem noStyle name="entry" >
        <Input style={{width:"70vw"}} placeholder="条目名称" allowClear/>
    </FormItem>
</>

const localeRender=(locales:any[])=>{
    const els: ReactNode[] = [];
    locales.forEach(locale => {
        if(locale === LanguageType.ZH_CN){
            els.push(<span style={{padding:10,borderRadius:5,backgroundColor:"#b6ecff"}}>简体中文</span>)
        }
        if(locale === LanguageType.ZH_TW){
            els.push(<span style={{padding:10,borderRadius:5,backgroundColor:"#b6ffb7"}}>繁体中文</span>)
        }
        if(locale === LanguageType.EN_US){
            els.push(<span style={{padding:10,borderRadius:5,backgroundColor:"#ffb6f9"}}>English</span>)
        }
    })
    return <Space>
        {els}
    </Space>
}