import {FC, useCallback, useEffect, useState} from "react";
import {Button, Select} from "antd";
import {BackwardOutlined, CaretLeftOutlined, CaretRightOutlined, ForwardOutlined} from "@ant-design/icons";

const {Option} = Select;

interface IProps {
    hide: boolean;
    size: number;
    current: number;
    totalPages:number;
    onChange?: (page:number,pageSize: number | undefined) => void;
}

const FooterDetail: FC<IProps> = ({hide, size, onChange, current,totalPages}) => {
    const [pageSize,setPageSize]=useState<string>(`${size}`)
    const [currentPage,setCurrentPage] = useState<number>(current)

    useEffect(()=>{
        onChange && onChange(currentPage,parseInt(pageSize))
    },[pageSize,currentPage,onChange])

    const goPrev=useCallback(()=>{
       if(currentPage>1) {
           setCurrentPage(currentPage-1)
       }
    },[currentPage])
    const goNext=useCallback(()=>{
        if(currentPage<totalPages) {
            setCurrentPage(currentPage+1)
        }
    },[currentPage,totalPages])

    if(hide){
        return null
    }
    return <section style={{display: "flex",alignItems:"center",justifyContent:"space-between",padding:10}}>
        <div>
            <Select
                defaultValue={size.toString() as any}
                style={{
                    width: 65,
                    margin: "0 10px",
                }}
                onChange={setPageSize}
                size="small"
            >
                <Option value="5">5</Option>
                <Option value="10">10</Option>
                <Option value="15">15</Option>
                <Option value="20">20</Option>
                <Option value="50">50</Option>
            </Select>
            条/页
        </div>
        <div>
            <Button style={{padding:6,marginRight:10}} onClick={()=>setCurrentPage(1)}><BackwardOutlined style={{fontSize:18}}/></Button>
            <Button style={{padding:5,marginRight:10}} onClick={goPrev}><CaretLeftOutlined style={{fontSize:16}}/></Button>
            {current}
            <Button style={{padding:5,marginLeft:10,marginRight:10}} onClick={goNext}><CaretRightOutlined style={{fontSize:16}}/></Button>
            <Button style={{padding:6,marginRight:10}} onClick={()=>setCurrentPage(totalPages)}><ForwardOutlined style={{fontSize:18}}/></Button>
        </div>
    </section>


};
export default FooterDetail;

