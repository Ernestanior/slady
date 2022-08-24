/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IAccessWhiteForm,
    IUserForm,
    IUserListForm,
    ISubUserListForm,
    IUserPwdForm,
    IvalidateTwoFactorPinForm,
} from "./common.interface";

/**
 * @class UserAPI
 * @description 用户管理API
 * @return 返回request的config
 */
class UserAPI {

    /**
     * toggleAccessWhiteStatus
     * 生成请求参数
     */
    ToggleAccessWhiteStatus = (params: IToggleAccessWhiteStatusParams, data: IAccessWhiteForm) => {
        const config: AxiosRequestConfig = {
            url: '/user/access-white',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * findAll
     * 生成请求参数
     */
    FindAll = (params: IFindAllParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/all',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * viewUserBasic
     * 生成请求参数
     */
    ViewUserBasic = (params: IViewUserBasicParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/basic',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * createUser
     * 生成请求参数
     */
    CreateUser = (params: ICreateUserParams, data: IUserForm) => {
        const config: AxiosRequestConfig = {
            url: '/user/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * createSubUser
     * 生成请求参数
     */
    CreateSubUser = (params: ICreateSubUserParams, data: IUserForm) => {
        const config: AxiosRequestConfig = {
            url: '/user/create/sub-user',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * delete
     * 生成请求参数
     */
    Delete = (params: IDeleteParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * deleteSubUser
     * 生成请求参数
     */
    DeleteSubUser = (params: IDeleteSubUserParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/delete/sub-user',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * disableUser
     * 生成请求参数
     */
    DisableUser = (params: IDisableUserParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/disable',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
   * disableUser
   * 生成请求参数
   */
    DisableTwoFactorAuth = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/disable/two-factor-auth',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * enableUser
     * 生成请求参数
     */
    EnableUser = (params: IEnableUserParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/enable',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
  * EnableTwoFactorAuth
  * 生成请求参数
  */
    EnableTwoFactorAuth = (params: {}, data: IEnableTwoFactorAuthParams) => {
        const config: AxiosRequestConfig = {
            url: '/user/enable/two-factor-auth',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    /**
     * getUserByCustomerId
     * 生成请求参数
     */
    GetUserByCustomerId = (params: IGetUserByCustomerIdParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/find-by-customer',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * findChildUserIds
     * 生成请求参数
     */
    FindChildUserIds = (params: IFindChildUserIdsParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/find-child-ids',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * findUserIdsByEntityId
     * 生成请求参数
     */
    FindUserIdsByEntityId = (params: IFindUserIdsByEntityIdParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/find-ids/by-entity-id',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * internalLogin
     * 生成请求参数
     */
    InternalLogin = (params: IInternalLoginParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/internal-login',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * findUser
     * 生成请求参数
     */
    FindUser = (params: IFindUserParams, data: IUserListForm) => {
        const config: AxiosRequestConfig = {
            url: '/user/list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * findUserListByIds
     * 生成请求参数
     */
    FindUserListByIds = (params: IFindUserListByIdsParams, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/user/list-user',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * findAccessWhiteList
     * 生成请求参数
     */
    FindAccessWhiteList = (params: IFindAccessWhiteListParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/list/access-white',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * findUserPageByCustomer
     * 生成请求参数
     */
    FindUserPageByCustomer = (params: IFindUserPageByCustomerParams, data: IUserListForm) => {
        const config: AxiosRequestConfig = {
            url: '/user/list/by-customer',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * findUserList
     * 生成请求参数
     */
    FindUserList = () => {
        const config: AxiosRequestConfig = {
            url: '/user/list/by-type',
            method: 'get'
        };
        config.headers = {};
        return config;
    }

    /**
     * subUserList
     * 生成请求参数
     */
    SubUserList = (params: ISubUserListParams, data: ISubUserListForm) => {
        const config: AxiosRequestConfig = {
            url: '/user/list/sub-user',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * modifyUser
     * 生成请求参数
     */
    ModifyUser = (params: IModifyUserParams, data: IUserForm) => {
        const config: AxiosRequestConfig = {
            url: '/user/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * modifyUserBasic
     * 生成请求参数
     */
    ModifyUserBasic = (params: IModifyUserBasicParams, data: IUserForm) => {
        const config: AxiosRequestConfig = {
            url: '/user/modify-basic',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * modify user autoLogout time
     */
    ModifyUserAutoLogoutTime = (params: {sessionExpire: number, userId: number}, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/user/modify-session-expire',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * modifyPwd
     * 生成请求参数
     */
    ModifyPwd = (params: IModifyPwdParams, data: IUserPwdForm) => {
        const config: AxiosRequestConfig = {
            url: '/user/modify-pwd',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * modifySubUser
     * 生成请求参数
     */
    ModifySubUser = (params: IModifySubUserParams, data: IUserForm) => {
        const config: AxiosRequestConfig = {
            url: '/user/modify/sub-user',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * resetUserPwd
     * 生成请求参数
     */
    ResetUserPwd = (params: IResetUserPwdParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/reset-pwd',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * 启用全部站点
     */
    EnableAllSiteAuth = (params: {userId: number}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site-user/enable/all',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * 启用全部站点
     */
    DisableAllSiteAuth = (params: {userId: number}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site-user/disable/all',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * getUserById
     * 生成请求参数
     */
    GetUserById = (params: IGetUserByIdParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/view',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * viewUserPwd
     * 生成请求参数
     */
    ViewUserPwd = (params: IViewUserPwdParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/view-pwd',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
    * ViewTwoFactorAuth
    * 生成请求参数
    */
    ViewTwoFactorAuth = (params: IViewTwoFactorAuthParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/view/two-factor-auth',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
   * validateTwoFactorPin
   * 生成请求参数
   */
    validateTwoFactorPin = (params: IvalidateTwoFactorPinParams, data: IvalidateTwoFactorPinForm) => {
        const config: AxiosRequestConfig = {
            url: '/user/validate/two-factor-pin',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * 全部功能列表
     */
    queryFunctionResourceList = () => {
        const config: AxiosRequestConfig = {
            url: '/resource/list-all',
            method: 'post',
            params: {},
            data: {}
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

}
export default UserAPI;


/** toggleAccessWhiteStatus的请求参数*/
interface IToggleAccessWhiteStatusParams {
}

/** findAll的请求参数*/
interface IFindAllParams {
}

/** viewUserBasic的请求参数*/
interface IViewUserBasicParams {
}

/** createUser的请求参数*/
interface ICreateUserParams {
}

/** createSubUser的请求参数*/
interface ICreateSubUserParams {
}

/** delete的请求参数*/
interface IDeleteParams {
    id: number;
}

/** deleteSubUser的请求参数*/
interface IDeleteSubUserParams {
    id: number;
}

/** disableUser的请求参数*/
interface IDisableUserParams {
    id: number;
}

/** enableUser的请求参数*/
interface IEnableUserParams {
    id: number;
}
/** EnableTwoFactorAuth的请求参数*/
interface IEnableTwoFactorAuthParams {
    authKey: string;
    pin: string;
}
/** getUserByCustomerId的请求参数*/
interface IGetUserByCustomerIdParams {
    customerId: number;
}

/** findChildUserIds的请求参数*/
interface IFindChildUserIdsParams {
}

/** findUserIdsByEntityId的请求参数*/
interface IFindUserIdsByEntityIdParams {
    id: number;
}

/** internalLogin的请求参数*/
interface IInternalLoginParams {
    userId: number;
}

/** findUser的请求参数*/
interface IFindUserParams {
}

/** findUserListByIds的请求参数*/
interface IFindUserListByIdsParams {
}

/** findAccessWhiteList的请求参数*/
interface IFindAccessWhiteListParams {
}

/** findUserPageByCustomer的请求参数*/
interface IFindUserPageByCustomerParams {
    customerId: number;
}

/** subUserList的请求参数*/
interface ISubUserListParams {
}

/** modifyUser的请求参数*/
interface IModifyUserParams {
}

/** modifyUserBasic的请求参数*/
interface IModifyUserBasicParams {
}

/** modifyPwd的请求参数*/
interface IModifyPwdParams {
}

/** modifySubUser的请求参数*/
interface IModifySubUserParams {
}

/** resetUserPwd的请求参数*/
interface IResetUserPwdParams {
    id: number;
}

/** getUserById的请求参数*/
interface IGetUserByIdParams {
    id: number;
}

/** viewUserPwd的请求参数*/
interface IViewUserPwdParams {
    id: number;
}
/**ViewTwoFactorAuth的请求参数*/
interface IViewTwoFactorAuthParams {
}

/** validateTwoFactorPin的请求方式*/
interface IvalidateTwoFactorPinParams {
}
