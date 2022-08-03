import {FC, useCallback} from "react";
import FormItem from "@/common/Form/formItem";
import {Button, Col, Input, Row, Dropdown, Menu, FormInstance, Popconfirm} from "antd";
import {PlusCircleFilled} from "@ant-design/icons"
import Editor from "@/pages/news/editor";
import UploadImage from "@/pages/news/uploadImage";
import PublishTime from "@/pages/news/publishTime";
import Footer from "@/common/Form/footer";
import historyService from "@/store/history";
import {ISubmit} from "@/common/interface";
import {BehaviorSubject} from "rxjs";
import useObserver from "@/hoc/useObserver";
import IconFont from "@/common/icon";
import moment from "moment";

export enum LanguageType{
    ZH_CN = "zh_cn",
    ZH_TW = "zh_tw",
    EN_US = "en",
}

/**
 * 不要使用数组，数组会动态计算，导致富文本组件产生非常重的diff压力
 * @param submitNews
 * @param title
 * @constructor
 */
const NewsForm:FC<{submitNews: ISubmit, title: string, data$: BehaviorSubject<any>, form: FormInstance}> = ({submitNews, title, data$, form}) => {
    const data = useObserver(data$, {
        languageList: [LanguageType.ZH_CN]
    })

    // 添加语言下拉列表
    const dropList = [
        {
            key: LanguageType.ZH_CN,
            label: "简体中文",
        },
        {
            key: LanguageType.ZH_TW,
            label: "繁体中文",
        },
        {
            key: LanguageType.EN_US,
            label: "English",
        }
    ].filter(item => {
        return !data.languageList.includes(item.key)
    })

    const menu = <Menu
        items={dropList}
        onClick={({key}) => {
            form.setFieldsValue({
                languageList: [
                    ...data.languageList,
                    key
                ]
            })
        }}
    />

    const delLanguage = useCallback((type: LanguageType) => {
        const value:LanguageType[] = form.getFieldValue("languageList") || []
        form.setFieldsValue({
            languageList: value.filter(item => item !== type)
        })
    }, [form])

    return <section style={{marginTop: 20}}>
        <Row>
            <Col flex={1}>
                <h3>{title}</h3>
            </Col>
            <Col hidden={data.languageList.length === 3}>
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                    <Button type="primary" >
                        <PlusCircleFilled />
                        添加语言
                    </Button>
                </Dropdown>
            </Col>
        </Row>
        <div className="new-form">
            <FormItem label="条目名称" name="entry">
                <Input />
            </FormItem>
            <FormItem hidden name="id">
                <Input />
            </FormItem>
            <FormItem hidden name="languageList" initialValue={[LanguageType.ZH_CN]}>
                <Input />
            </FormItem>
            <FormItem noStyle hidden={!data.languageList.includes(LanguageType.ZH_CN)}>
                <p>简体中文</p>
                <FormItem label="*标题" name="simplifiedFormTitle">
                    <Input />
                </FormItem>
                <FormItem label="*内容" name= "simplifiedFormContent">
                    <Editor key="simplified-content" />
                </FormItem>
            </FormItem>
            <FormItem noStyle hidden={!data.languageList.includes(LanguageType.ZH_TW)}>
                <Row>
                    <Col flex={1}>
                        <p>繁体中文</p>
                    </Col>
                    <Col>
                        <Popconfirm
                            placement="bottomRight"
                            title="确认删除！"
                            onConfirm={() => delLanguage(LanguageType.ZH_TW)} okText="应用" cancelText="取消">
                            <IconFont type="iconshanchu2" />
                        </Popconfirm>
                    </Col>
                </Row>
                <FormItem label="*标题" name="traditionalFormTitle">
                    <Input />
                </FormItem>
                <FormItem label="*内容" name="traditionalFormContent">
                    <Editor key="traditional-content" />
                </FormItem>
            </FormItem>
           <FormItem noStyle hidden={!data.languageList.includes(LanguageType.EN_US)}>
               <Row>
                   <Col flex={1}>
                       <p>English</p>
                   </Col>
                   <Col>
                       <Popconfirm
                           placement="bottomRight"
                           title="确认删除！"
                           onConfirm={() => delLanguage(LanguageType.EN_US)} okText="应用" cancelText="取消">
                           <IconFont type="iconshanchu2" />
                       </Popconfirm>
                   </Col>
               </Row>
               <FormItem label="*标题" name="englishFormTitle">
                   <Input />
               </FormItem>
               <FormItem label="*内容" name="englishFormContent">
                   <Editor key="english-content" />
               </FormItem>
           </FormItem>
            <FormItem label="图片" name="imageUrl">
                <UploadImage />
            </FormItem>
            <FormItem label="发布时间" name="publishDate">
                <PublishTime />
            </FormItem>
            <FormItem hidden name="id">
                <Input />
            </FormItem>
        </div>
        <Footer marginBottom={30} submit={submitNews} cancel={() => { historyService.push("/news") }} />
    </section>
}

export default NewsForm

/**
 * 将表单数据转换给api的函数
 */
export const getJsonFromForm = (form: FormInstance) => {
    const data = form.getFieldsValue();
    const languageList:LanguageType[]  = data.languageList;
    const simplifiedForm = {
        title: data.simplifiedFormTitle,
        content: data.simplifiedFormContent,
        locale: LanguageType.ZH_CN
    }
    const traditionalForm = {
        title: data.traditionalFormTitle,
        content: data.traditionalFormContent,
        locale: LanguageType.ZH_TW
    }
    const englishForm = {
        title: data.englishFormTitle,
        content: data.englishFormContent,
        locale: LanguageType.EN_US
    }
    const contents = [simplifiedForm, traditionalForm, englishForm].filter(fm => {
        return languageList.includes(fm.locale)
    })
    const jsonData:any = {
        entry: data.entry,
        publishDate: moment.isMoment(data.publishDate)
            ? data.publishDate.format("YYYY-MM-DD HH:mm:ss")
            : moment().format("YYYY-MM-DD HH:mm:ss"),
        imageUrl: data.imageUrl,
        contents
    }
    if(data.id){
        jsonData.id = data.id
    }
    return jsonData
}

export interface IData {
    id: number,
    imageUrl: string,
    entry: string,
    publishDate: string,
    contents: Array<{
        title: string;
        content: string;
        locale: LanguageType
    }>
}

/**
 * 根据查看的接口转换为
 */
export const parseQueryJsonToForm = (data: IData) => {
    const fmData:any = {};
    let languageList = data.contents.map(item => item.locale)
    if(languageList.length === 0){
        languageList = [LanguageType.ZH_CN]
    }
    fmData.id = data.id;
    fmData.imageUrl = data.imageUrl;
    fmData.entry = data.entry;
    fmData.publishDate = moment(data.publishDate, "YYYY-MM-DD HH:mm:ss");
    fmData.languageList = languageList;
    // 简体中文
    data.contents.forEach(content => {
        if(content.locale === LanguageType.ZH_CN){
            fmData.simplifiedFormTitle = content.title;
            fmData.simplifiedFormContent = content.content
        }
        if(content.locale === LanguageType.ZH_TW){
            fmData.traditionalFormTitle = content.title;
            fmData.traditionalFormContent = content.content
        }
        if(content.locale === LanguageType.EN_US){
            fmData.englishFormTitle = content.title;
            fmData.englishFormContent = content.content
        }
    })
    return fmData
}