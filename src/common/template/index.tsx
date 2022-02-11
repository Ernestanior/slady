import {FC, useState, useCallback, useRef, useLayoutEffect, useMemo, useEffect} from "react";
import {Table, TableColumnProps, TablePaginationConfig} from "antd";
import {IEventListModule, IFilerModule, IQueryModule} from "@/common/interface";
import Filter from "@/common/template/filter";
import FuncList from "@/common/template/func";
import request from "@/store/request";
import {IPageResult, ISearchPage} from "@/store/apis/account/common.interface";
import {BehaviorSubject, from, Subject, switchMap} from "rxjs";
import {SorterResult} from "antd/es/table/interface";

interface ITableModule{
    columns: TableColumnProps<any>[];
    rowKey: string;
    scroll?: {
        x?: number;
        y?: number
    }
}

interface IPageParams {
    keyWord: string;
    searchPage: ISearchPage;
    /** 高级搜索 */
    filters: any;
    moreFilters: any;
    /** 此次刷新是否显示loading */
    __disableLoading?: boolean;
}

/**
 * 用来刷新
 */
const event$ = new Subject<boolean>()

export const reloadMainList = () => {
    event$.next(true)
}

const Template:FC<IFilerModule & IEventListModule & ITableModule & IQueryModule> = (props) => {

    // 表格loading
    const [loading, setLoading] = useState(false);

    const [tableData, setTableData] = useState<any[]>([]);

    const [pagination, setPagination] = useState<TablePaginationConfig>({
        defaultCurrent: 1,
        pageSize: 15,
        total: 15
    });

    // ref 保证引用不会改变
    const { current: queryData } = useRef(props.queryData);
    const { current: queryDataFunction } = useRef(props.queryDataFunction);


    // 查询Promise
    const queryEvent = useCallback(
        (data: any) => {
            if (queryData) {
                const config = queryData(data);
                if (config) {
                    return request<IPageResult<any>>(config);
                }
                throw Error("template的queryData请求config为null");
            }
            if (queryDataFunction) {
                return queryDataFunction(data);
            }
            throw Error("template没有加载数据获取模块");
        },
        [queryData, queryDataFunction]
    );

    const params$ = useMemo(
        () =>
            new BehaviorSubject<IPageParams>({
                keyWord: "",
                searchPage: {
                    desc: 1,
                    page: 1,
                    pageSize: 15,
                    sort: "",
                },
                filters: {},
                moreFilters: {},
                __disableLoading: false,
            }),
        []
    );

    useEffect(() => {
        const sub = event$.subscribe(() => {
            params$.next(params$.value)
        })
        return () => sub.unsubscribe()
    }, [params$])

    // 如果设置过滤初始值，则跳过默认首次订阅行为
    const params$$ = useMemo(() => {
        return params$;
    }, [params$]);

    useLayoutEffect(() => {
        const sub = params$$
            .pipe(
                switchMap((params) => {
                    if (!params.__disableLoading) {
                        setLoading(true);
                    }
                    let { filters, moreFilters, ...paramObj } = params;
                    paramObj = { ...paramObj, ...filters, ...moreFilters, keyWord: trimPlx(params.keyWord) };
                    //
                    delete paramObj.__disableLoading;
                    return from(queryEvent(paramObj));
                })
            )
            .subscribe((data) => {
                try {
                    const result = reqAnalysis(data);
                    let resultData: any[] = [];
                    let totalElements = 0;
                    if (result) {
                        // 分页数据
                        if (typeof result.totalElements !== "undefined") {
                            setPagination({
                                total: result.totalElements,
                                current: params$.value.searchPage.page,
                                hideOnSinglePage: true,
                                pageSize: params$.value.searchPage.pageSize,
                            });
                            resultData = result.content;
                            totalElements = result.totalElements;
                            // 不分页数据
                        } else if (Array.isArray(result)) {
                            setPagination({
                                total: result.length,
                                current: 1,
                                hideOnSinglePage: true,
                                pageSize: result.length,
                            });
                            resultData = result;
                            totalElements = result.length;
                            setPagination(pagination => {
                                return {...pagination, total: totalElements}
                            })
                        } else {
                            console.error("数据请求异常！");
                        }
                    } else {
                        console.error("接口数据请求失败");
                    }
                    setTableData(resultData);
                } catch (error) {
                    console.error(error);
                }
                if (!params$.value.__disableLoading) {
                    setLoading(false);
                }
            });
        return () => sub.unsubscribe();
    }, [
        params$$,
        params$,
        queryEvent,
    ]);

    /**
     * 新增搜索条件
     * disableLoading 表示此次刷新是否触发loading
     * */
    const submit = useCallback(
        (key: keyof IPageParams, value: any, disableLoading = false) => {
            const nextValue = { ...params$.value };
            if (key !== "searchPage" && key !== "moreFilters") {
                // 搜索第一页面
                nextValue.searchPage.page = 1;
            }
            nextValue[key] = value;
            nextValue.__disableLoading = disableLoading;
            params$.next(nextValue);
        },
        [params$]
    );

    // 表格onchange事件
    const tableOnChange = useCallback(
        (
            page: TablePaginationConfig,
            _: any,
            sorter: SorterResult<any> | SorterResult<any>[]
        ) => {
            const st = Array.isArray(sorter) ? sorter[0] : sorter;
            const searchPageOld = params$.value.searchPage;
            const searchPage = {
                desc: st.order === "ascend" ? 0 : 1,
                page: searchPageOld.page,
                pageSize: searchPageOld.pageSize,
                sort: !!st.order ? st.field || "" : "",
            };
            submit("searchPage", searchPage);
        },
        [submit, params$]
    );

    // 分页修改
    const pageOnChange = useCallback(
        (page: number, pageSize?: number | undefined) => {
            // 当前值
            const searchPage = { ...params$.value.searchPage };
            searchPage.page = page;
            searchPage.pageSize = pageSize || searchPage.pageSize;
            submit("searchPage", searchPage);
        },
        [params$, submit]
    );

    return <section>
        {props.filter && <Filter submit={data => { submit('filters', data)}}>{props.filter}</Filter>}
        {props.event && <FuncList event={props.event} />}
        <section style={{ marginTop: (!props.filter && !props.event) ? 0 : 15 }}>
            <Table
                sticky
                dataSource={tableData}
                pagination={{
                    ...pagination,
                    onChange: pageOnChange,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                }}
                rowKey={props.rowKey}
                onChange={tableOnChange}
                columns={props.columns}
                loading={loading}
                rowClassName={rowClassName}
                scroll={props.scroll}
            />
        </section>
    </section>
}

export default Template


/**
 * 请求结果解析-
 * @return 返回后台传输值
 * 支持reqService和reqServicePlx
 * @param res
 */
export const reqAnalysis = (res: any) => {
    // 根据支持reqService和reqServicePlx
    if (res && res.hasOwnProperty("isSuccess")) {
        return res.result || null;
    }
    return res;
};

export const trimPlx = (str?: any) => {
    if(str){
        if(typeof str !== "string"){
            return str;
        }
        return str.trim();
    }
    return ""
}

// 表格的行className
export function rowClassName(_:any, idx: number){
    return 'cdn-' + (idx % 2 === 0 ? 'row-odd' : 'row-even');
}
