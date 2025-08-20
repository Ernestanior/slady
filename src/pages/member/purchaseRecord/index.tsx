import { FC, useCallback, useState } from "react";
import Template from "@/common/template/indexWithPagination";
import { useTranslation } from "react-i18next";
import { memberRecordService } from "@/store/apis/member";
import { Button, Space, Tag } from "antd";
import request from "@/store/request";
import { IPageResult } from "@/store/apis/account/common.interface";


const Refund: FC = () => {

    const { t } = useTranslation()
    const [type, setType] = useState<1 | 2>(2)
    const columns: any = [
        {
            dataIndex: "purchaseDate",
            title: t('DATE'),
            fixed: 'left',
            width: 150
        },
        {
            dataIndex: "saler",
            title: t('SALER'),
        },
        {
            dataIndex: "designList",
            title: t('ITEM'),
            width:400,
            render: (value: any) => {

                if (!Array.isArray(value) || value.length === 0) return <span>-</span>;

                return (
                    <Space wrap>
                        {value.map((item, idx) => (
                            <Tag key={idx} color="blue">
                                {item.designCode} - {item.price}
                            </Tag>
                        ))}
                    </Space>
                );
            }
        },
        {
            dataIndex: "member",
            title: t('MEMBER'),
            render: (value: any, item: any) => <div>
                <span>{item.memberName} {item.memberPhone}</span>
            </div>,
        },
        {
            dataIndex: "sum",
            title: t('TOTAL_AMOUNT'),
        },
        {
            dataIndex: "memberRemainingAmount",
            title: t('MEMBER_REMAINING_AMOUNT'),
        },
        {
            dataIndex: "remark",
            title: `${t('PAYMENT_DETAIL')}/${t('REFUND_REASON')}`,
            fixed: 'right',
            width: 150
        },
    ]

    const query = useCallback(async (query) => {
        console.log('type', type, query);

        const config = memberRecordService.MemberRecordList({}, { ...query, refund: type })
        const res = await request<IPageResult<any>>(config);
        if (res.isSuccess) {
            return res.result
        }
        return null
    }, [type])
    // const options: IOperationConfig = useMemo(() => {
    //     return [
    //         [
    //             {
    //                 text:t("DELETE"),
    //                 event(data) {
    //                     const value = {
    //                         title: t("DELETE"),
    //                         content: `${t("CONFIRM")}${t("DELETE")}: ${data.name} ？`,
    //                         onOk: () => {
    //                             const config = memberRecordService.MemberRecordDelete({},[data.id])
    //                             reqAndReload(config, () => {
    //                                 notification.success({message: "Delete Success"})
    //                             });
    //                         }
    //                     }
    //                     msgModal.createEvent("modal", value)
    //                 },
    //             }]
    //     ]
    // }, [t])

    return <section className="member-detail">
        <Button type={type === 2 ? 'primary' : 'default'} style={{ borderRadius: 20, marginRight: 5, marginBottom: 15 }} onClick={() => setType(2)}>{t('MEMBER_PURCHASE')}</Button>
        <Button type={type === 1 ? 'primary' : 'default'} style={{ borderRadius: 20, marginRight: 5, }} onClick={() => setType(1)}>{t('MEMBER_REFUND')}</Button>

        <div style={{ display: type === 1 ? "block" : "none" }}>
            <Template
                columns={columns}
                queryData={(query) => memberRecordService.MemberRecordList({}, { ...query, refund: 1 })}
                rowKey="id"
                scroll={{ x: 1500 }}
            />
        </div>
        <div style={{ display: type === 2 ? "block" : "none" }}>
            <Template
                columns={columns}
                queryData={(query) => memberRecordService.MemberRecordList({}, { ...query, refund: 2 })}
                rowKey="id"
                scroll={{ x: 1500 }}
            />
        </div>


    </section>
}

export default Refund;



