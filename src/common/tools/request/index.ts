import {AxiosRequestConfig, AxiosResponse, default as axios} from 'axios'
import Middleware from "../middleware";

class RequestPlx<T=any>{
    middleware_before = new Middleware<AxiosRequestConfig>();
    middleware_after = new Middleware<AxiosResponse<T>>();

    async request(config: AxiosRequestConfig){
        try {
            const _config = {...config}
            // 预处理
            await this.middleware_before.apply(_config);
            // 网络请求-此处最好使用config的复制，否则在middleware中修改config，会将原来的config也修改掉
            const response = await axios.request(_config);
            // 请求结果解析
            await this.middleware_after.apply(response);
            return response;
        }catch (err: any){
            await this.middleware_after.apply(err.response)
            return err as any
        }
    }
}

export default RequestPlx
