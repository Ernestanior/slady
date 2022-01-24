import {FC, useCallback, useMemo} from "react";
import Template from "@/common/template";
import CustomerFilter from "@/pages/customerList/filter";
import {INormalEvent} from "@/common/interface";
import {TableColumnProps} from "antd";
import {customerService} from "@/store/apis/account";

const CustomerList:FC = () => {
    const buttons: INormalEvent[] = useMemo(()=> {
        return [{
            text: '新增',
            primary: true,
            event(){

            }
        }]
    }, [])
    const query = useCallback((data) => {
        return customerService.FindCustomer({}, data);
    }, [])
    return <section>
        <Template
            filter={<CustomerFilter />}
            event={buttons}
            columns={columns}
            queryData={query}
        />
    </section>
}

export default CustomerList

const columns: TableColumnProps<any>[] = [
    {
        title: "客户名称",
        dataIndex: "name"
    }
]
