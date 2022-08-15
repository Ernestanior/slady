import { FC, useCallback } from "react";
import Template from "@/common/template";
import {Button, Input, Row, Space, TableColumnProps} from "antd";
import {userService} from "@/store/apis/account";
import Status from "@/common/status";
import { E_COLOR } from "@/common/const";
import request from "@/store/request";
import CustomerFilter from "./filter";
import CustomerFilterMobile from "./filterMobile";
import FormItem from "@/common/Form/formItem";
import isMobile from "@/app/isMobile";
import msgModal from "@/store/message/service";

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
      key: "parentName",
      title: "客戶名称(主账号)",
      dataIndex: "parentName",
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
  const columnMobile: TableColumnProps<any>[] = [
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
      title: "操作",
      dataIndex: "opt",
      render(_:any, data:any){
        return <Space>
          <Button onClick={() => {
            if (data) {
              const {
                id,
                email,
                subType,
                parentEmail,
                status
              } = data
              const value = {
                node: <section>
                  <Row>ID：{id}</Row>
                  <Row>邮箱：{email}</Row>
                  <Row>类型：{subTypeMap(subType)}</Row>
                  <Row>主账号：{parentEmail}</Row>
                  <Row>状态：{status === 1?<Status color={E_COLOR.enable}>启用</Status>:<Status color={E_COLOR.disable}>禁用</Status>}</Row>
                </section>,
              }
              msgModal.createEvent("popup", value)
            }
          }}>查看</Button>
        </Space>
      }
    }
  ]
  return (
    <section>
      <Template
        filter={isMobile?<CustomerFilterMobile />:<CustomerFilter />}
        columns={isMobile?columnMobile:columns}
        // queryData={query}
        queryDataFunction={queryDataFunction}
        rowKey="id"
        primarySearch={primarySearch}
      />
    </section>
  );
};

export default CustomerList;

const primarySearch=<>
  <FormItem noStyle name="parentName" >
    <Input style={{width:"70vw"}} placeholder="客户名称（主账号）" allowClear/>
  </FormItem>
</>

const subTypeMap=(type:string)=>{
  switch (type){
    case 'viewer':
      return '查看员'
    case 'admin':
      return '管理员'
    case 'operator':
      return '编辑员'
  }
}
