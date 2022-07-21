import { FC, useCallback } from "react";
import Template from "@/common/template";
import { TableColumnProps } from "antd";
import {userService} from "@/store/apis/account";
import Status from "@/common/status";
import { E_COLOR } from "@/common/const";
import request from "@/store/request";
import CustomerFilter from "./filter";

const CustomerList: FC = () => {
  const queryDataFunction = useCallback(async (filters) => {
    const res = await request(userService.SubUserList({}, filters));
    if(res.isSuccess){
      return res.result as any
    }
    return null
  }, []);

  const columns: TableColumnProps<any>[] = [
    {
      key: "name",
      title: "名称",
      dataIndex: "name",
    },
    {
      key: "email",
      title: "邮箱",
      dataIndex: "email",
    },
    {
      key: "subType",
      title: "类型",
      dataIndex: "subType",
      width:150,
      render(value) {
        switch (value) {
          case 'admin':
            return '管理员';
          case 'viewer':
            return '查看员';
          case 'operator':
            return '编辑员';
        }
      }
    },
    {
      key: "parentEmail",
      title: "主账号",
      dataIndex: "parentEmail",
    },
    {
      key: "status",
      title: "状态",
      dataIndex: "status",
      width:150,
      render(value) {
        if (value > -1) {
          return <Status color={E_COLOR.enable}>
            启用
          </Status>
        }
        return <Status color={E_COLOR.off}>
          禁用
        </Status>
      }
    }
  ];

  return (
    <section>
      <Template
        filter={<CustomerFilter />}
        columns={columns}
        // queryData={query}
        queryDataFunction={queryDataFunction}
        rowKey="id"
      />
    </section>
  );
};

export default CustomerList;



