import {FC, useCallback} from "react";
import {Input} from "antd"
import createObserverForm, {IObserverForm} from "@/hoc/createObserverForm";
import Footer from "@/common/Form/footer";
import useUpdateRef from "@/hoc/useUpdateRef";
import FormItem from "@/common/Form/formItem";
import SwitchP from "@/common/switch";
import useObserver from "@/hoc/useObserver";
import QrCode from "@/pages/userInfo/2FA/qrCode";
import useAccountInfo from "@/store/account";
import PIN from "@/pages/userInfo/2FA/pin";
import {from} from "rxjs";
import request from "@/store/request";
import {authService} from "@/store/apis/account";
import accountService from "@/store/account/service";

const FAFormItem:FC<IObserverForm> = ({data$, cb, form}) => {
    const formData = useObserver(data$, {
        qrCode: false,
        authFlag: -1
    })

    const info = useAccountInfo();
    const infoRef = useUpdateRef(info)
    const cbRef = useUpdateRef(cb)

    const closeEvent = useCallback(() => {
        if(cbRef.current){
            cbRef.current();
        }
    }, [cbRef])
    // save data
    const saveFA = useCallback(() => {
        const data = form.getFieldsValue();
        if(!infoRef.current){
            return;
        }
        // 关闭
        if(data.authFlag === -1){
            from(request(authService.DisableTwoFactorAuth({}, {}))).subscribe(res => {
                if(res.isSuccess){
                    accountService.reloadInfo();
                    closeEvent();
                }
            })
            return
        }
        // 开启
        from(request(authService.EnableTwoFactorAuth({}, {
            authKey: data.authKey,
            pin: data.pin
        }))).subscribe(res => {
            if(res.isSuccess){
                accountService.reloadInfo();
                closeEvent();
            }
        })
    }, [closeEvent, form, infoRef])

    return <section>
        <FormItem noStyle span={12} name="authFlag" initialValue={-1}>
            <SwitchP
                label="二次验证"
                trueValue={1}
                falseValue={-1}
            />
        </FormItem>
        <FormItem name="authKey">
            <QrCode
                visible={formData.qrCode}
            />
        </FormItem>
        <FormItem noStyle hidden={!formData.qrCode} span={12} name="pin">
            <PIN />
        </FormItem>
        <FormItem hidden name="qrCode">
            <Input/>
        </FormItem>
        <Footer marginBottom={30} submit={saveFA} cancel={cbRef.current} />
    </section>
}

interface IFAFormData{
    authFlag: -1 | 1;
}

const FAForm = createObserverForm<IFAFormData>(FAFormItem, {
    layout: "vertical"
})

export default FAForm
