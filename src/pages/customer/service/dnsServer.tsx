import React, {FC} from "react";
import FormStringList from "@/common/customFormComponent/formList";
import {Col, Row} from "antd";
import {IFormComponent, IFormModule} from "@/common/interface";
import AsyncSelect from "@/common/async/select";
import {nameServerService} from "@/store/apis/dns";
import {compareA_B} from "@/common/utils";

const queryServerList = () => {
    return nameServerService.FindNameServerPage({}, {
        keyWord: "",
        defaultFlag: 1,
        searchPage: {
            page: 1,
            pageSize: 999,
            desc: 1,
            sort: ""
        }
    } as any)
}

const serverLoader = ({content}: any) => {
    if(Array.isArray(content)){
        return content.concat([{
            id: "custom",
            name: "自定义DNS服务器"
        }])
    }
    return []
}

interface IServerValue{
    customNameServerFlag: 1 | 0,
    definedServers: string[],
    customNameServers: string[],
}

const DNSServer:FC<IFormComponent<IServerValue>> = ({value, onChange}) => {
    return <section>
        <Row gutter={15}>
            <Col span={12}>
                <p>
                    DNS服务器
                </p>
                <div className="cdn-select-component">
                    <AsyncSelect
                        query={queryServerList}
                        loader={serverLoader}
                        selectedFunction={(item: any) => {
                            // 非自定义服务器
                            if(value && !value.customNameServerFlag){
                                console.log(item.domains, value.definedServers)
                                return compareA_B(item.domains, value.definedServers)
                            }
                            if(value && !!value.customNameServerFlag){
                                return item.id === "custom";
                            }
                            return false
                        }}
                        onChange={(_, item) => {
                            console.log(item)
                            if(item.id === "custom"){
                                onChange && onChange({
                                    customNameServerFlag: 1,
                                    definedServers: [],
                                    customNameServers: value ? value.customNameServers : []
                                })
                            }else{
                                onChange && onChange({
                                    customNameServerFlag: 0,
                                    definedServers: item.domains,
                                    customNameServers: value ? value.customNameServers : []
                                })
                            }
                        }}
                    />
                </div>
            </Col>
        </Row>
        {
            value && !!value.customNameServerFlag && <div style={{marginTop: 20 }}>
                <FormStringList
                    text="自定义DNS服务器"
                    value={value && value.customNameServers}
                    onChange={e => {
                        if(value.customNameServerFlag){
                            onChange && onChange({
                                customNameServerFlag: 1,
                                definedServers: value ? value.definedServers : [],
                                customNameServers: e
                            })
                        }
                    }}
                />
            </div>
        }
    </section>
}

export default DNSServer

// 解析dns server
export const analysisDnsServer = (data: any) => {
    const _data = {...data};
    // 由于方便处理dns服务器配置放在了同一个属性customNameServersConfig下，这里需要对内容进行展开
    _data.customNameServerFlag = 0;
    _data.customNameServers = []
    if(data.customNameServersConfig){
        _data.customNameServerFlag = data.customNameServersConfig.customNameServerFlag;
        // 自定义
        if(_data.customNameServerFlag){
            _data.customNameServers = data.customNameServersConfig.customNameServers;
        }else{
            // 非自定义
            _data.customNameServers = data.customNameServersConfig.definedServers;
        }
    }
    delete _data.customNameServersConfig;
    return _data;
}
