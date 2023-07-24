import {BehaviorSubject, from, skip, Subject} from "rxjs";
import {IAccountInfo} from "./interface";
import {ICallback} from "@/common/interface";
import request from "@/store/request";
import {userService} from "@/store/apis/account";
import {getToken, removeToken, saveToken} from "@/store/request/token";
import {throttleTime} from "rxjs/operators";
import {notification} from "antd";
import {setLanguage} from "@/locale";

export enum E_LOGIN_STATE{
    pending,
    fail,
    success
}

/**
 * 登录账户
 */
class Account{
    readonly info$ = new BehaviorSubject<IAccountInfo | null>(null);
    readonly loginState$ = new BehaviorSubject<E_LOGIN_STATE>(E_LOGIN_STATE.pending);
    /** 二级验证 */
    readonly auth2FAuth$ = new BehaviorSubject(true);

    constructor() {
        this.info$.pipe(skip(1)).subscribe(info => {
            this.loginState$.next(!!info ? E_LOGIN_STATE.success : E_LOGIN_STATE.fail);
        })

        this.sessionExpired$.pipe(throttleTime(1000)).subscribe(() => {
            notification.warn({
                message: "当前登录用户凭据过期, 请重新登录！"
            })
            this.autoLogout();
        })
    }

    // 载入token，需要校验token有效
    loadToken = (token: any, cb?: ICallback) => {
        // saveToken(token);
        // accountService.info$.next(token)
        const infoConfig = userService.ViewUserBasic({}, {});
        infoConfig.headers["ims-token"] = token;
        from(request<IAccountInfo>(infoConfig)).subscribe(res => {
            if(res.isSuccess && res.result){
                    // save token
                    saveToken(token);
                    accountService.info$.next(res.result)
                    // reload sale Info
            }else{
                removeToken();
            }
        })
    }

    reloadInfo = () => {
        const infoConfig = userService.ViewUserBasic({}, {});
        from(request<IAccountInfo>(infoConfig)).subscribe(res => {
            if(res.isSuccess && res.result){
                accountService.info$.next(res.result)
                setLanguage(res.result.locale || 'en_US')
            }
        })
    }


    autoLogout = () => {
        removeToken();
        // this.info$.next(null)
        window.location.reload()
    }

    private sessionExpired$ = new Subject<boolean>();
    sessionExpired = () => {
        this.sessionExpired$.next(true)
    }

    // 返回是否触发
    autoLogin = () => {
        console.log(this.info$.value)
        // 当前有登录用户，则不需要自动重新登录，但是需要告诉调用者，已经触发
        if(this.info$.value){
            return true;
        }
        const token = getToken();

        if(token){
            this.loginState$.next(E_LOGIN_STATE.pending);
            accountService.loadToken(token)
        }else{
            this.loginState$.next(E_LOGIN_STATE.fail);
        }

        return !!token
    }

    active2FAuthFail = () => {
        this.auth2FAuth$.next(false);
    }

    reset2FAuth = () => {
        window.location.reload();
    }
}


const accountService = new Account();

export default accountService;
