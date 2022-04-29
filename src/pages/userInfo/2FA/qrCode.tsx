import {FC, useEffect, useState} from "react";
import {Row, Col} from "antd";
import QRCode from "qrcode.react";
import {from} from "rxjs";
import request from "@/store/request";
import {authService} from "@/store/apis/account";
import useUpdateRef from "@/hoc/useUpdateRef";

interface IProps{
    visible: boolean
    onChange?: (data: any) => void
}

interface IQRCode{
    url: string,
    authKey: string,
    accountName: string,
}

const QrCode:FC<IProps> = ({visible, onChange}) => {
    const [qrData, setQrData] = useState<IQRCode|null>(null)
    const onChangeRef = useUpdateRef(onChange)

    // visible 之后，开启QR
    useEffect(() => {
        const sub = from(request<IQRCode>(authService.ViewTwoFactorAuth({}, {}))).subscribe(res => {
            if(res.isSuccess && res.result){
                setQrData(res.result)
                onChangeRef.current && onChangeRef.current(res.result.authKey)
            }
        })
        return () => sub.unsubscribe();
    }, [onChangeRef])

    if(!visible || !qrData){
        return null
    }

    return <section style={{padding: "0 15px"}}>
        <div className="tip-warn">
            <p>请先从您的应用程序库安装软件令牌安装器，如谷歌验证器，然后扫描这个QR码，更多信息可以在用户操作手册中找到</p>
        </div>
        <div style={{marginTop: 15}}>
            <Row>
                <Col span={5} style={{ minWidth: 200 }}>
                    <div>
                        <QRCode
                            size={180}
                            value={qrData.url}
                            fgColor="#000"
                        />
                    </div>
                </Col>
                <Col>
                    无法扫描QR码
                    <br />
                    如需手动添加条目，请在手机应用提供一下信息
                    <br />
                    账户: {qrData.accountName}
                    <br />
                    密匙: {qrData.authKey}
                    <br />
                    基于时间: 是
                </Col>
            </Row>
        </div>
    </section>
}

export default QrCode