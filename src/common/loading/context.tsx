import { Layout, Spin } from "antd"
import React, { FC } from "react"
import "./index.less";

/**
 * 内容加载中
 */
const LoadContext:FC = () => {
    return <Layout className="comp-load-context">
        <Spin size="large" />
    </Layout>
}

export default LoadContext;