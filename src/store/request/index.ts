import RequestPlx from "@/common/tools/request";
import {getToken} from "@/store/request/token";
import {AxiosRequestConfig} from "axios";
import {notification} from "antd";
import accountService from "@/store/account/service";

const requestPlx = new RequestPlx();

// const dev_url = 'http://localhost:10087';
const dev_url = 'http://192.168.8.10:10087';

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

// analysis response status not 200
requestPlx.middleware_after.use(async (rep, next) => {
    // when network error, res is undefined
    if(rep && rep.status !== 200){
        rep.data = {
            ...rep.data,
            isSuccess: false,
            result: rep.statusText,
            message: rep.statusText,
        };
        if(rep.status === 401){
            if(rep.data && rep.data.code === 460){
                accountService.active2FAuthFail();
            }else{
                accountService.sessionExpired();
            }
        }else{
            notification.error({
                message: rep.status,
                description: rep.statusText
            })
        }
    }else{
        let isSuccess = false;
        let result = null;
        let message = ""
        if(!rep){
            rep = {
                status: 500,
                data: {},
                statusText: "network error",
                headers: [],
                config: {}
            }
            notification.error({
                message: 500,
                description: "网络请求失败"
            })
        }
        if(rep.data){
            if(!!rep.data.code && rep.data.code !== 200){
                if(window.location.hash !== "#/login"){
                    notification.error({
                        message: rep.data.code,
                        description: rep.data.msg
                    })
                }
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
    }
    await next()
})

async function request<T>(config: AxiosRequestConfig){
    const rep = await requestPlx.request(config);
    if(rep.data){
        if(rep.data.isSuccess){
            if(config.method && config.method.toUpperCase() === "PUT"){
                // 创建操作
                if(config.url && config.url.toLowerCase().indexOf("create") > -1){
                    notification.success({
                        message: "创建成功"
                    })
                }else{
                    notification.success({
                        message: "配置已更新"
                    })
                }
            }
        }
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
