import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {Col, Row, Select} from "antd";
import SwitchP from "@/common/switch";
import SubmitModuleUI from "@/common/submit";
import {userService} from "@/store/apis/account";
import {reqAndCallback} from "@/common/utils";
import {from} from "rxjs";
import request from "@/store/request";

const LoginWhiteIP:FC = () => {
    // 当前的值
    const [originConfig, setOriginConfig] = useState<any>({
        accessWhiteFlag: 0,
        ipList: []
    })
    const [switchValue, setSwitchValue] = useState(0);
    const [ipList, setIpList] = useState<string[]>([])

    useEffect(() => {
        if(Object.keys(originConfig).length > 0){
            setSwitchValue(originConfig.accessWhiteFlag)
            setIpList(originConfig.ipList)
        }
    }, [originConfig])

    const visible = useMemo(() => {
        if(switchValue !== originConfig.accessWhiteFlag){
            return true;
        }
        if(originConfig.ipList.length !== ipList.length){
            return true
        }
        return ipList.some(ip => {
            if(!Array.isArray(originConfig.ipList)){
                return true
            }
            return !originConfig.ipList.includes(ip);
        })
    }, [originConfig, switchValue, ipList]);

    const submit = useCallback(() => {
        const data = {
            switchStatus: switchValue,
            ipList
        }
        const config = userService.ToggleAccessWhiteStatus({}, data);
        reqAndCallback(config, res => {
            setOriginConfig({
                accessWhiteFlag: switchValue,
                ipList
            })
        })

    }, [switchValue, ipList])

    const cancel = useCallback(() => {
        setSwitchValue(originConfig.accessWhiteFlag || 0)
        setIpList(originConfig.ipList || [])
    }, [originConfig])

    useEffect(() => {
        const sub = from(request(userService.FindAccessWhiteList({}, {}))).subscribe(res => {
            if(res.isSuccess && res.result){
                console.log(res.result)
                setOriginConfig(res.result);
            }
        })
        return () => sub.unsubscribe();
    }, [])

    return <section>
        <Row gutter={[15, 15]}>
            <Col span={8}>
                登录限制
            </Col>
            <Col span={16}>
                <SwitchP value={switchValue} trueValue={1} falseValue={0} onChange={v => setSwitchValue(v)} />
            </Col>
        </Row>
        <section style={{display: switchValue ? "block" : "none", padding: "15px 0"}}>
            <Row gutter={[15, 15]}>
                <Col span={8}>
                    白名单IP
                </Col>
                <Col span={16}>
                    <Select
                        placeholder="可以输入多个ip，支持空格，分号"
                        allowClear
                        tokenSeparators={[",", ";", " ", "\n"]}
                        mode="tags"
                        style={{
                            minWidth: 200
                        }}
                        value={ipList}
                        onChange={ips => {
                            setIpList(ips)
                        }}
                        open={false}
                    />
                </Col>
            </Row>
        </section>
        <SubmitModuleUI
            submit={submit}
            cancel={cancel}
            visible={visible}
        />
    </section>
}

export default LoginWhiteIP
