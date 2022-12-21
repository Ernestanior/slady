import req from "./index";
import { AxiosRequestConfig } from "axios";

interface INotificationModule {
    /** 操作提醒配置 */
    __message?: IMessageModule;
}
interface IMessageModule {
    // 移除通知
    disable?: boolean;
    // 移除成功通知
    disableSuccessInfo?: boolean;
    successInfo?: string;
}
const reqServicePlx = async <T>(config: AxiosRequestConfig & INotificationModule) => {

    try {
        return await req<T>(config);
    } catch (error) {
        let message = "";
        return {
            isSuccess: false,
            result: null,
            message,
        };
    }
}

export default reqServicePlx;
