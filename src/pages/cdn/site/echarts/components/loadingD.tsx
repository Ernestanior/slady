import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { FC } from "react";
const antIcon = <LoadingOutlined style={{ fontSize: 28 }} spin />;
const LoadingD: FC = () => {
    return (
        <>
            <Spin style={{ margin: "20% 50%" }} indicator={antIcon} />
        </>
    )
};

export default LoadingD;
