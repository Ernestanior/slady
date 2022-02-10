import {BehaviorSubject, from, skip, Subject} from "rxjs";
import {IAccountInfo, ISaleInfo} from "./interface";
import {ICallback} from "@/common/interface";
import request from "@/store/request";
import {saleService, userService} from "@/store/apis/account";
import {getToken, removeToken, saveToken} from "@/store/request/token";
import {throttleTime} from "rxjs/operators";
import {notification} from "antd";

export enum E_USER_TYPE{
    SALE = "saler",
    SALE_MANAGER = 'sales_manager'
}

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
    readonly saleInfo$ = new BehaviorSubject<ISaleInfo | null>(null);
    readonly loginState$ = new BehaviorSubject<E_LOGIN_STATE>(E_LOGIN_STATE.pending);

    constructor() {
        this.info$.pipe(skip(1)).subscribe(info => {
            this.loginState$.next(!!info ? E_LOGIN_STATE.success : E_LOGIN_STATE.fail);
        })

        this.sessionExpired$.pipe(throttleTime(1000)).subscribe(() => {
            notification.error({
                message: "当前登录用户凭据过期, 请重新登录！"
            })
            this.autoLogout();
        })
    }

    // 载入token，需要校验token有效
    loadToken = (token: string, cb?: ICallback) => {
        const infoConfig = userService.ViewUserBasic({}, {});
        infoConfig.headers["greycdn-token"] = token;
        from(request<IAccountInfo>(infoConfig)).subscribe(res => {
            if(res.isSuccess && res.result){
                //
                if(![E_USER_TYPE.SALE, E_USER_TYPE.SALE_MANAGER].includes(res.result.type)){
                    cb && cb("用户账号类型不正确");
                    removeToken();
                    this.loginState$.next(E_LOGIN_STATE.fail);
                }else{
                    // save token
                    saveToken(token);
                    accountService.info$.next(res.result)
                    // reload sale Info
                    accountService.autoLoadSaleInfo();
                }
            }else{
                removeToken();
            }
        })
    }

    autoLoadSaleInfo = () => {
        from(request<ISaleInfo>(saleService.viewSale({}, {}))).subscribe(res => {
            if(res.isSuccess && res.result){
                accountService.saleInfo$.next(res.result)
            }
        })
    }

    autoLogout = () => {
        removeToken();
        this.info$.next(null)
        this.saleInfo$.next(null)
    }

    private sessionExpired$ = new Subject<boolean>();
    sessionExpired = () => {
        this.sessionExpired$.next(true)
    }

    // 返回是否触发
    autoLogin = () => {
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
}


const accountService = new Account();

export default accountService;
