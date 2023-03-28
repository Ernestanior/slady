import React, {FC, useCallback, useMemo} from "react";
import Template from "@/common/template";
import {classificationService} from "@/store/apis/content";
import {Form, Input, notification, TableColumnProps} from "antd";
import FormItem from "@/common/Form/formItem";
import {INormalEvent} from "@/common/interface";
import msgModal from "@/store/message/service";
import {IOperationConfig} from "@/common/template/interface";
import {reqAndReload} from "@/common/utils";

const Classification:FC = () => {
    const buttons: INormalEvent[] = useMemo(() => {
        return [
            {
                text: "Create",
                primary: true,
                event() {
                    // historyService.push("/admin/create");
                    const value = {
                        title: "Create",
                        api: classificationService.ClassCreate,
                        content: <section>
                            <Form.Item name="name" label={<span className="login-label">Name</span>}>
                                <Input />
                            </Form.Item>
                        </section>,
                    }
                    msgModal.createEvent("modalF", value)
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
                            api: classificationService.ClassModify,
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
                            content: `Confirm delete classification: ${data.name} ？`,
                            onOk: () => {
                                const config = classificationService.ClassDelete({}, [data.id]);
                                reqAndReload(config, () => notification.success({message: "Delete Success"}));
                            }
                        }
                        msgModal.createEvent("modal", value)
                    },
                }]
        ]
    }, [])


    const query = useCallback((data) => {
        return classificationService.ClassList({}, data)
    }, [])
    return <Template
        filter={<FormItem span={5} noStyle name="keyWord">
            <Input allowClear />
        </FormItem>}
        event={buttons}
        queryData={query}
        columns={columns}
        optList={options}
        rowKey="id"
    />
}
export default Classification;

const columns: TableColumnProps<any>[] = [
    {
        title:"id",
        dataIndex: "id",
    },
    {
        title: "name",
        dataIndex: "name",
        sorter: true,
    },

];
