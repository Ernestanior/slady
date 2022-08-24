import {FC, useState, ReactNode, useEffect, useMemo, useCallback} from "react";
import {Select, Spin} from "antd";
import {AxiosRequestConfig} from "axios";
import {from, Subject} from "rxjs";
import {IFormComponent} from "@/common/interface";
import {debounceTime} from "rxjs/operators";
import request from "@/store/request";
import {siteService} from "@/store/apis/site";
import isMobile from "@/app/isMobile";

interface IValueType{
    key?: string;
    label: ReactNode;
    value: string | number
}

const AsyncQuerySiteSelector:FC<IFormComponent> = ({onChange,type}) => {
    // 搜索状态
    const [fetching, setFetching] = useState(false)
    // 搜索结果
    const [options, setOptions] = useState<IValueType[]>([])

    // 请求参数
    const [queryConfig, setQueryConfig] = useState<AxiosRequestConfig | null>(null);
    // 请求参数变动，触发修改，并且如果有正在执行的请求，则注销当前请求
    useEffect(() => {
        if(queryConfig){
            setFetching(true)
            const sub = from(request<any>(queryConfig)).subscribe(res => {
                setFetching(false);
                if(res.isSuccess){
                    if(Array.isArray(res.result)){
                        if(type === "siteName"){
                            return setOptions(res.result.map(t => ({
                                key: t.id,
                                label: `${t.name}`,
                                value: t.name
                            })))
                        }
                        if(type === "uniqueName"){

                            return  setOptions(res.result.map(t => ({
                                key: t.id,
                                label: `${t.uniqueName}`,
                                value: t.uniqueName
                            })))
                        }
                        setOptions(res.result.map(t => ({
                            key: t.id,
                            label: `${t.name}/${t.uniqueName}`,
                            value: t.id
                        })))
                    }
                }
            })
            return () => {
                setFetching(false)
                sub.unsubscribe()
            }
        }
    }, [queryConfig,type])

    // select 输入框值发生变化
    const searchValue$ = useMemo(() => new Subject<string>(), [])
    const triggerSearchEvent = useCallback((e) => {
        searchValue$.next(e)
    }, [searchValue$]);

    // 输入框的值变化，触发请求参数变化
    useEffect(() => {
        const sub = searchValue$.pipe(debounceTime(800)).subscribe(searchValue => {
            // 两个字符以下不进行搜索
            if(searchValue && searchValue.length > 0){
                if(type === "siteName"){
                    return  setQueryConfig(siteService.FindSiteSearchList({
                        siteName: searchValue
                    }))
                }
                if(type === "uniqueName"){
                    return  setQueryConfig(siteService.FindSiteSearchList({
                        uniqueName: searchValue,
                        siteUniqueNamePreciseSearch: 0
                    }))
                }
                setQueryConfig(siteService.FindSiteSearchList({
                    keyWord: searchValue
                }))
            }else {
                setQueryConfig(null)
            }
        })
        return () => sub.unsubscribe()
    }, [type,searchValue$])

    return <Select
        showSearch
        onChange={onChange}
        onSearch={triggerSearchEvent}
        filterOption={false}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        options={options}
        placeholder={isMobile?"":"站点名称"}
    />
}

export default AsyncQuerySiteSelector