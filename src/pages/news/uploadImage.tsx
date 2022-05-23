import {FC, useMemo} from "react";
import {IFormComponent} from "@/common/interface";
import {Button, Image, message, Upload, UploadProps} from "antd";
import {CloudUploadOutlined} from "@ant-design/icons"
import {AxiosRequestConfig} from "axios";
import requestNews from "@/store/request/requestNews";
import {from} from "rxjs";
import useUpdateRef from "@/hoc/useUpdateRef";

const { Dragger } = Upload;

interface IReq{
    // 0表示上传成功
    errno: number,
    data: {
        url: string
    }
}

export const uploadImageFile = (file: File) => {
    const formData = new FormData()
    formData.append("image", file)
    const config:AxiosRequestConfig = {
        url: "/image/upload",
        method: "post",
        data: formData
    }
    return requestNews<IReq>(config)
}

const UploadImage: FC<IFormComponent<string>> = ({value, onChange}) => {
    const onChangeRef = useUpdateRef(onChange)
    // upload config
    const props: UploadProps = useMemo(() => {
        return {
            name: 'file',
            beforeUpload(file){
                // upload
                from(uploadImageFile(file)).subscribe(res => {
                    if(res.isSuccess && res.result && !res.result.errno){
                        if(onChangeRef.current){
                            onChangeRef.current(res.result.data.url)
                            message.success("upload image successful !")
                        }
                    }else{
                        message.error("upload image fail! ")
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
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <Button className="upload-area-button" type="primary" color="blue">Choose File</Button>
            </section>
        </Dragger>
    }

    // display
    return <section>
        <Image src={value}/>
    </section>
}

export default UploadImage