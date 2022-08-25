import RequestPlx from "@/common/tools/request";
import {AxiosRequestConfig} from "axios";
import {notification} from "antd";
import md5 from "md5"

const requestNewPlx = new RequestPlx();

const appKey = 'wuiGrLHgOeu/mfAvPiUnmw=='
const appSecret ='tQ4W943KH2HgPdMgMGihvEpOhKm0VyT+oXuN535UWg0='

const dev_url = 'http://localhost:10087';
// const dev_url = 'http://192.168.8.15:10087';

// add server url
requestNewPlx.middleware_before.use(async (config, next) => {
    // prefix url
    config.url = `/stream-news${config.url}`;
    if(process.env.NODE_ENV === "development"){
        config.url = dev_url + config.url;
    }
    await next()
})

// add Header - sign
requestNewPlx.middleware_before.use(async (config, next) => {
    // prefix url
    config.headers = config.headers || {};
    config.headers["Content-Type"] = "application/json"
    config.headers.appKey = appKey;
    config.headers.timestamp = Date.now();
    config.headers.sign = md5(`${appKey}${appSecret}${config.headers.timestamp}`)
    await next()
})

requestNewPlx.middleware_after.use(async (rep, next) => {
    if(!rep.data){
        rep.data = {}
    }
    if(rep.status !== 200){
        rep.data = {
            isSuccess: false,
            result: null,
            message: "-"
        }
        // status - 200
    }else{
        // rep.data.errno
        if(typeof rep.data.code === "undefined"){
            // success
            if(rep.data.errno === 0){
                rep.data = {
                    isSuccess: true,
                    result: rep.data.data,
                    message: rep.data.message
                }
            }else{
                // fail
                rep.data = {
                    isSuccess: false,
                    result: null,
                    message: rep.data.message
                }
            }
        }else{
            if(rep.data.code !== 200){
                rep.data = {
                    isSuccess: false,
                    result: null,
                    message: rep.data.msg
                }
            }else{
                // rep.data.code 200
                rep.data = {
                    isSuccess: true,
                    result: rep.data.data,
                    message: rep.data.msg
                }
            }
        }
    }
    await next()
})

async function requestNews<T>(config: AxiosRequestConfig){
    const rep = await requestNewPlx.request(config);
    if(rep.data){
        if(rep.data.isSuccess){
            if(config.url && config.url.toLowerCase().indexOf("add") > -1){
                notification.success({
                    message: "添加成功"
                })
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

export default requestNews