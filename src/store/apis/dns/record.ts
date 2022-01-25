/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IRecordForm,
    IRecordBatchForm,
    IRecordBatchOperateForm,
    IRecordListForm,
} from "./common.interface";

/**
 * @class RecordAPI
 * @description 记录管理API
 * @return 返回request的config
 */
class RecordAPI {

    /**
     * createRecord
     * 生成请求参数
     */
    CreateRecord = (params: ICreateRecordParams, data: IRecordForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/record/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * createRecord
     * 生成请求参数
     */
    BatchCreateRecord = (params: ICreateRecordParams, data: IRecordBatchForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/record/create/batch',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * deleteRecord
     * 生成请求参数
     */
    DeleteRecord = (params: IDeleteRecordParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/dns/record/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * deleteRecordByIds
     * 生成请求参数
     */
    DeleteRecordByIds = (params: IDeleteRecordByIdsParams, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/dns/record/delete/batch',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * disableRecord
     * 生成请求参数
     */
    DisableRecord = (params: IDisableRecordParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/dns/record/disable',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * disableRecordByIds
     * 生成请求参数
     */
    DisableRecordByIds = (params: IDisableRecordByIdsParams, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/dns/record/disable/batch',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * enableRecord
     * 生成请求参数
     */
    EnableRecord = (params: IEnableRecordParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/dns/record/enable',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * enableRecordByIds
     * 生成请求参数
     */
    EnableRecordByIds = (params: IEnableRecordByIdsParams, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/dns/record/enable/batch',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * exportRecord
     * 生成请求参数
     */
    ExportRecord = (params: IExportRecordParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/dns/record/export',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * generateRedis
     * 生成请求参数
     */
    GenerateRedis = (params: IGenerateRedisParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/dns/record/generate/redis',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * importFile
     * 生成请求参数
     */
    ImportFile = (params: IImportFileParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/dns/record/import',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'multipart/form-data';
        return config;
    }

    /**
     * modifyRecord
     * 生成请求参数
     */
    ModifyRecord = (params: IModifyRecordParams, data: IRecordForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/record/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * operateBatchRecord
     * 生成请求参数
     */
    OperateBatchRecord = (params: IOperateBatchRecordParams, data: IRecordBatchOperateForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/record/operate/batch',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * findRecord
     * 生成请求参数
     */
    FindRecord = (params: IFindRecordParams, data: IRecordListForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/record/page',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    /**
     * 解析量统计
     * 折线图
     */
    EntityResolveChart = (params: {}, data: IEntityParams) => {
        const config: AxiosRequestConfig = {
            url: '/dns/stat/entity/resolve-chart',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    /**
     * 解析量统计
     * 全球
     */
    global = (params: {}, data: IEntityParams) => {
        const config: AxiosRequestConfig = {
            url: '/dns/stat/entity/access-origin/global',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    /**
     * 解析量统计
     * 中国
     */
    //  /stat/entity/access-origin/mainland-china
    china = (params: {}, data: IEntityParams) => {
        const config: AxiosRequestConfig = {
            url: '/dns/stat/entity/access-origin/mainland-china',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
}
export default RecordAPI;

export interface IEntityParams {
    customerId?: number,
    date?: string,
    domainId?: number,
    endDate?: string,
    month?: string,
    recordId?: number,
    reportType: string,
    startDate?: string
}


/** createRecord的请求参数*/
interface ICreateRecordParams {
}

/** createRecord的请求参数*/
interface ICreateRecordParams {
}

/** deleteRecord的请求参数*/
interface IDeleteRecordParams {
    id: number;
}

/** deleteRecordByIds的请求参数*/
interface IDeleteRecordByIdsParams {
}

/** disableRecord的请求参数*/
interface IDisableRecordParams {
    id: number;
}

/** disableRecordByIds的请求参数*/
interface IDisableRecordByIdsParams {
}

/** enableRecord的请求参数*/
interface IEnableRecordParams {
    id: number;
}

/** enableRecordByIds的请求参数*/
interface IEnableRecordByIdsParams {
}

/** exportRecord的请求参数*/
interface IExportRecordParams {
    domainId: number;
}

/** generateRedis的请求参数*/
interface IGenerateRedisParams {
}

/** importFile的请求参数*/
interface IImportFileParams {
    domainId: number;
}

/** modifyRecord的请求参数*/
interface IModifyRecordParams {
}

/** operateBatchRecord的请求参数*/
interface IOperateBatchRecordParams {
}

/** findRecord的请求参数*/
interface IFindRecordParams {
}
