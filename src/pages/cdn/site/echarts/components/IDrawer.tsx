import  { FC } from "react";
import { Drawer } from "antd";
import IconFont from "@/common/icon";
interface Iprops {
    visible: boolean;
    onClose?: () => void;
    data: any;
    width?: string
    title?:string
}
const IDrawer: FC<Iprops> = (props) => {
    return (
        <Drawer
            width={props.width||"20%"}
            headerStyle={{ background: "#1e2d42", color: "white" }}
            title={
            props.title && props.title ? <span style={{ color: "#fff" }}>
                                            {props.title}
                                        </span>:
                                        <span style={{ color: "#fff" }}>
                                            <IconFont style={{color:"rgb(0, 180, 255)",marginRight:"15px"}} type="icontishi" />
                                            提示
                                        </span>
            }
            bodyStyle={{
                color:"#666",
                fontSize:"14px"
            }}
            placement="right"
            closable={false}
            onClose={props.onClose}
            visible={props.visible}
        >
            <p>{props.data}</p>
        </Drawer>
    );
};

export default IDrawer;

