import RequestPlx from "@/common/tools/request";
import {getToken} from "@/store/request/token";
import {AxiosRequestConfig} from "axios";
import {notification} from "antd";

const requestPlx = new RequestPlx();

const dev_url = 'http://localhost:10087';

// add dev server url
requestPlx.middleware_before.use(async (config, next) => {
    // prefix url
    config.url = "/v3/api" + config.url;
    if(process.env.NODE_ENV === "development"){
        config.url = dev_url + config.url;
    }
    await next()
})

// header add token
requestPlx.middleware_before.use(async (config, next) => {
    const token = getToken();
    if(token && !config.headers["greycdn-token"]){
        config.headers["greycdn-token"] = token;
    }
    await next()
})

// analysis response status
requestPlx.middleware_after.use(async (rep, next) => {
    if(rep.status !== 200){
        notification.error({
            message: rep.status,
            description: rep.statusText
        })
        rep.data = {
            isSuccess: false,
            result: rep.statusText,
            message: rep.statusText
        };
    }
    await next()
})

requestPlx.middleware_after.use(async (rep, next) => {
    let isSuccess = false;
    let result = null;
    let message = ""
    if(rep.data){
        if(!!rep.data.code && rep.data.code !== 200){
            notification.error({
                message: rep.data.code,
                description: rep.data.msg
            })
            message = rep.data.msg;
        }else{
            isSuccess = true
            result = rep.data.data
        }
    }
    rep.data = {
        isSuccess,
        result,
        message
    }
    await next()
})

async function request<T>(config: AxiosRequestConfig){
    const rep = await requestPlx.request(config);
    if(rep.data){
        return rep.data as IRequestResult<T>;
    }else{
        return {
            isSuccess: false,
            result: null,
            message: "-"
        }
    }
}

interface IRequestResult<T=any>{
    isSuccess: boolean;
    result: T;
    message: string;
}

export default request;
