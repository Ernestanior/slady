import {FC, useCallback, useEffect, useMemo, useState} from "react";
import SubmitModuleUI from "@/common/submit";
import useAccountInfo from "@/store/account";
import {Col, Row} from "antd";
import SelectP from "@/common/select";
import {userService} from "@/store/apis/account";
import {reqAndCallback} from "@/common/utils";
import accountService from "@/store/account/service";

const ModifyLogoutTime:FC = () => {
    const info = useAccountInfo();

    const [sessionExpire, setSessionExpire] = useState(info ? info.sessionExpire : 30);

    useEffect(() => {
        if(info){
            setSessionExpire(info.sessionExpire);
        }
    }, [info])

    const visible = useMemo(() => {
        if(info){
            return info.sessionExpire !== sessionExpire;
        }
        return false
    }, [info, sessionExpire])

    const submit = useCallback(() => {
        if(!info){
            return;
        }
        const config = userService.ModifyUserAutoLogoutTime({ sessionExpire: sessionExpire, userId: info.id }, {});
        reqAndCallback(config, () => {
            accountService.reloadInfo();
        })
    }, [sessionExpire, info])

    const cancel = useCallback(() => {
        if(info){
            setSessionExpire(info.sessionExpire)
        }
    }, [info])

    if(!info){
        return null;
    }
    return <section>
        <Row gutter={[15, 15]} align="middle">
            <Col span={8}>
                自动登出时间
            </Col>
            <Col>
                <SelectP
                    value={sessionExpire}
                    data={autoLogoutTimeList}
                    onChange={time => setSessionExpire(time)}
                    style={{
                        minWidth: 75,
                        width: 150,
                    }}
                />
            </Col>
            <Col flex={1}>
                分钟
            </Col>
        </Row>
        <SubmitModuleUI
            submit={submit}
            cancel={cancel}
            visible={visible}
        />
    </section>
}

export default ModifyLogoutTime;


const autoLogoutTimeList = [5, 10, 15, 20, 30, 45, 60, 120, 180, 240];
