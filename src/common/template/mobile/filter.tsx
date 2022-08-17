import {FC, useCallback, useState} from "react";
import {Button, Form, Row, Space} from "antd";
import {useForm} from "antd/es/form/Form";
import {ISubmit} from "@/common/interface";
import useSubmitEvent from "@/hooks/utils/useSubmitEvent";
import {trimAndRemoveUndefined} from "@/common/utils";
import {Popup} from "antd-mobile";
import { SearchOutlined} from "@ant-design/icons";
import './filter.less'
import IconFont from "@/common/icon";

interface IProps{
    submit: ISubmit;
    primarySearch?:any;
}
const Filter:FC<IProps> = ({submit, primarySearch,children}) => {
    const [visible,setVisible]=useState<boolean>(false)
    const [form] = useForm();

    const submitEvent = useCallback(() => {
        const values = form.getFieldsValue();
        // 对所有属性进行trim
        submit && submit(trimAndRemoveUndefined(values))
        setVisible(false)
    }, [form, submit])

    const submitTrigger = useSubmitEvent(submitEvent)

    return <>
        <Row>
            {primarySearch &&
                <Form form={form} style={{display:"flex"}}>
                        {primarySearch}
                        <Button type="primary" style={{marginRight:10,marginLeft:10,padding:5}} onClick={submitTrigger}>
                            <SearchOutlined style={{fontSize:20}}/>
                        </Button>
                </Form>
            }
            <Button type="primary" style={{padding:5}} onClick={()=>setVisible(true)}><IconFont type="iconfilter_major_monotone" style={{fontSize:20}}/></Button>
        </Row>
        <Popup
            visible={visible}
            onMaskClick={()=>setVisible(false)}
            position='left'
            bodyStyle={{ width: '80vw' }}
        >
            <Form form={form} labelCol={{span:24}} wrapperCol={{span:24}} className="mobile-filter-form" >
                <section className="header">
                    <h2>筛选</h2>
                    <Button onClick={() => {form.resetFields()}}>重置</Button>
                </section>
                <section className="content">
                    {children}
                </section>
                <Space className="footer">
                    <Button type="primary" onClick={submitTrigger}>
                        搜索
                    </Button>
                    <Button onClick={()=>setVisible(false)}>
                        取消
                    </Button>
                </Space>
            </Form>
        </Popup>

    </>
}

export default Filter;
