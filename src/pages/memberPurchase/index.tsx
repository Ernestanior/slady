import { FC, useCallback, useState } from "react";
import Template, { reloadMainList } from "@/common/template";
import { useTranslation } from "react-i18next";
import { memberRecordService } from "@/store/apis/member";
import { Button } from "antd";
import request from "@/store/request";
import { IPageResult } from "@/store/apis/account/common.interface";


const Refund: FC = () => {

    const { t } = useTranslation()
    const [type, setType] = useState<1 | 2>(1)
    const columns = [
        {
            dataIndex: "designs",
            title: t('ITEM'),
            render: (data: any) => {
                return data?.map((item: any) => <div>
                    <div>{item?.designCode}: ${item?.price}</div>
                </div>)
            }
        },
        {
            dataIndex: "purchaseDate",
            title: t('DATE'),
        },
        {
            dataIndex: "saler",
            title: t('SALER'),
        },
        {
            dataIndex: "member",
            title: t('MEMBER'),
            render: (value: any, item: any) => <div>
                <span>{item.memberName} {item.memberPhone}</span>
            </div>
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
        <Button type={type === 1 ? 'primary' : 'default'} style={{ borderRadius: 20, marginRight: 5, }} onClick={() => setType(1)}>{t('MEMBER_REFUND')}</Button>
        <Button type={type === 2 ? 'primary' : 'default'} style={{ borderRadius: 20, marginRight: 5, marginBottom: 15 }} onClick={() => setType(2)}>{t('MEMBER_PURCHASE')}</Button>

        <div style={{ display: type===1?"block":"none" }}>
            <Template
                columns={columns}
                queryData={(query) => memberRecordService.MemberRecordList({}, { ...query, refund: 1 })}
                rowKey="id"
            />
        </div>
        <div style={{ display: type===2?"block":"none" }}>
            <Template
                columns={columns}
                queryData={(query) => memberRecordService.MemberRecordList({}, { ...query, refund: 2 })}
                rowKey="id"
            />
        </div>


    </section>
}

export default Refund;



