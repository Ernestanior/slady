import {FC, useEffect, useRef, useState} from "react";
import SelectP from "@/common/select";
import {IAsyncModule, IFormComponent, ILoadTrigger, ISelectProps} from "@/common/interface";
import {from} from "rxjs";
import request from "@/store/request";

const AsyncSelect:FC<IFormComponent & ILoadTrigger & IAsyncModule & ISelectProps> = (props) => {
    const {query, loader, loadTrigger, ...restProps} =  props;
    // data
    const [data, setData] = useState<any[]>([])
    const {current: _query} = useRef(query);
    const {current: _loader} = useRef(loader);
    const {current: _loadTrigger} = useRef(loadTrigger);

    // queryData and use loader generate list options
    useEffect(() => {
        const config = _query();
        const sub = from(request(config)).subscribe(res => {
            if(res.isSuccess){
                const _data:any = _loader ? _loader(res.result) : res.result;
                setData(_data);
                _loadTrigger && _loadTrigger(_data)
            }
        })
        return () => sub.unsubscribe()
    }, [_query, _loader, _loadTrigger])

    return <SelectP
        data={data}
        {...restProps}
    />
}

export default AsyncSelect
