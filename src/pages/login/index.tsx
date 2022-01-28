import { Col, Layout, Row } from "antd";
import React, {FC} from "react";
import LoginForm from "./form";
import "./index.less";
import moment from "moment";
// import {getToken} from "@/store/request/token";

const Login: FC = () => {
    // const [init, setInit] = useState(false);
    // useEffect(() => {
    //     if(!getToken()){
    //         setInit(true)
    //     }
    // }, [])
    //
    // if(!init){
    //     return null;
    // }
  return (
      <Layout className="page-login-ct" style={{ height: '100%' }}>
          <Layout.Content>
              <div className="login-form">
                  <Row>
                      <Col span={9}/>
                      <Col span={6}>
                          <LoginForm />
                      </Col>
                      <Col span={9}/>
                  </Row>
              </div>
          </Layout.Content>
          <Layout.Footer className="ft" style={{ textAlign: "center" }}>
              {/*<FormattedMessage id="GREYPANEL_INFO" />*/}
              <span style={{cursor: 'pointer' }} onClick={() => {
                  return window.open("https://www.greypanel.com/")
              }} >Greypanel</span> - 为您提供专业的网络安全解决方案，搭建更安全更快捷的网络
              <br />
              Copyright &copy; {moment(new Date()).format("YYYY")} Greypanel. All Rights Reserved.
          </Layout.Footer>
      </Layout>
  );
};

export default Login;
