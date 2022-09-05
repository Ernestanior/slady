import {FC, useEffect, useMemo, useState} from "react";
import {IFormComponent} from "@/common/interface";
import {Button, Image, message, Upload, UploadProps} from "antd";
import {CloudUploadOutlined} from "@ant-design/icons"
import {AxiosRequestConfig} from "axios";
import requestNews from "@/store/request/requestNews";
import {from} from "rxjs";
import useUpdateRef from "@/hoc/useUpdateRef";
import {errorImage} from "@/pages/news/list";
import IconFont from "@/common/icon";
import ConditionShow from "@/common/conditionShow";

const { Dragger } = Upload;

interface IReq{
    // 0表示上传成功
    alt: string
    href: string
    url: string
}

export const uploadImageFile = (file: File) => {
    const formData = new FormData()
    formData.append("image", file)
    const config:AxiosRequestConfig = {
        url: "/api/file/upload/pic",
        method: "post",
        data: formData
    }
    return requestNews<IReq>(config)
}

const UploadImage: FC<IFormComponent<string>> = ({value, onChange}) => {
    const [img,setImg]=useState<string|undefined>()

    const onChangeRef = useUpdateRef(onChange)

    useEffect(()=>{
        setImg(value)
    },[value])
    // upload config
    const props: UploadProps = useMemo(() => {
        return {
            name: 'file',
            beforeUpload(file){
                // upload
                from(uploadImageFile(file)).subscribe(res => {
                    if(res.isSuccess && res.result){
                        if(onChangeRef.current){
                            onChangeRef.current(res.result.href)
                            message.success("upload image successful !")
                        }
                    }else{
                        message.error(res.message)
                    }
                })
                return false
            }
        }
    }, [onChangeRef]);

    if(!value){
        // upload
        return <Dragger className="upload-drag-area" {...props} showUploadList={false}>
            <section className="upload-area">
                <p className="ant-upload-drag-icon">
                    <CloudUploadOutlined />
                </p>
                <p className="ant-upload-text">Drag and drop a file here <br /> or </p>
                <Button className="upload-area-button" type="primary" color="blue">Choose File</Button>
            </section>
        </Dragger>

    }

    // display
    return <section>

        <ConditionShow removeMode visible={!!img}>
            <Image
                src={img}
                fallback={errorImage}
            />
            <span style={{width:30,height:30,margin:"10px 0",border:"1px solid #666",borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <IconFont style={{color:"#666",fontSize:26}} type={"iconshanchu"} onClick={()=>{setImg(undefined);onChangeRef.current && onChangeRef.current(undefined)}}/>
            </span>
        </ConditionShow>

        <ConditionShow removeMode visible={!img}>
            <Dragger className="upload-drag-area" {...props} showUploadList={false}>
                <section className="upload-area">
                    <p className="ant-upload-drag-icon">
                        <CloudUploadOutlined />
                    </p>
                    <p className="ant-upload-text">Drag and drop a file here <br /> or </p>
                    <Button className="upload-area-button" type="primary" color="blue">Choose File</Button>
                </section>
            </Dragger>
        </ConditionShow>


    </section>
}

export default UploadImage